use crate::config::Config;
use redis::{
    AsyncCommands, Client, FromRedisValue, RedisResult, Value,
    aio::MultiplexedConnection,
    streams::{StreamReadOptions, StreamReadReply},
};
use store::models::website::WebsiteStatus;

use std::time::Instant;
use std::{
    collections::HashMap,
    sync::{Arc, Mutex},
};

pub mod config;

#[derive(Clone, Debug)]
pub struct RedisClient {
    pub conn: Arc<tokio::sync::Mutex<MultiplexedConnection>>,
}

fn normalize_url(url: &str) -> String {
    if url.starts_with("http://") || url.starts_with("https://") {
        url.to_string()
    } else {
        format!("https://{}", url)
    }
}

impl RedisClient {
    pub async fn new() -> RedisResult<Self> {
        let config = Config::default();

        let client = Client::open(config.redis_url)?;
        let conn = client.get_multiplexed_async_connection().await?;
        Ok(Self {
            conn: Arc::new(tokio::sync::Mutex::new(conn)),
        })
    }

    pub async fn xadd(&self, url: &str, id: &str) -> RedisResult<()> {
        let mut fields: HashMap<&str, &str> = HashMap::new();
        fields.insert("url", url);
        fields.insert("id", id);

        let mut conn = self.conn.lock().await;
        let _id: String = conn
            .xadd("ping:website", "*", &[("url", url), ("id", id)])
            .await?;
        println!("{:?}", _id);
        Ok(())
    }

    pub async fn create_group(&self, group_name: &str) -> RedisResult<()> {
        let mut conn = self.conn.lock().await;
        let res: RedisResult<Value> = redis::cmd("XGROUP")
            .arg("CREATE")
            .arg("ping:website")
            .arg(group_name)
            .arg("$")
            .arg("MKSTREAM") // Ensures stream is created if it doesn't exist
            .query_async(&mut *conn)
            .await;

        if let Err(e) = res {
            // If it's not BUSYGROUP, bubble up
            let msg = e.to_string();
            if !msg.contains("BUSYGROUP") {
                return Err(e);
            }
        }

        Ok(())
    }

    pub async fn xread_group(
        &self,
        group: &str,
        consumer: &str,
        store: &Arc<Mutex<store::store::Store>>,
    ) -> RedisResult<()> {
        let mut conn = self.conn.lock().await;

        let opts = StreamReadOptions::default()
            .group(group, consumer)
            .count(10)
            .block(0);

        let reply: StreamReadReply = conn.xread_options(&["ping:website"], &[">"], &opts).await?;

        for stream in reply.keys {
            for entry in stream.ids {
                let url = entry
                    .map
                    .get("url")
                    .and_then(|v| String::from_redis_value(v).ok())
                    .unwrap_or_default();
                let wid = entry
                    .map
                    .get("id")
                    .and_then(|v| String::from_redis_value(v).ok())
                    .unwrap_or_default();


                let url = normalize_url(&url);

                let http_client = reqwest::Client::builder()
                    .user_agent("Mozilla/5.0 (compatible; MyPingBot/1.0)")
                    .build()
                    .unwrap();

                let start = Instant::now();
                let mut status = WebsiteStatus::Down;
                let mut duration_ms = 0_u128;

                match http_client.get(&url).send().await {
                    Ok(resp) => {
                        let status_code = resp.status();

                        let _ = resp.bytes().await;
                        duration_ms = start.elapsed().as_millis();
                        if status_code.is_success() {
                            status = WebsiteStatus::Up;
                        }
                    }
                    Err(err) => {
                        duration_ms = start.elapsed().as_millis();
                        eprintln!("Request error for {}: {}", url, err);
                    }
                }

                println!(
                    "Result -> url={} status={:?} time={}ms",
                    url, status, duration_ms
                );

                {
                    let mut locked_store = store.lock().unwrap();
                    let data =
                        locked_store.save_ping_result(wid, status, duration_ms.try_into().unwrap());

                    eprintln!("{:?}", data);
                }

                let _: i32 = redis::cmd("XACK")
                    .arg(&stream.key)
                    .arg(group)
                    .arg(&entry.id)
                    .query_async(&mut *conn)
                    .await?;
            }
        }

        Ok(())
    }
}

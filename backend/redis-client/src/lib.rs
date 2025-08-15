use redis::{
    AsyncCommands, Client, RedisResult,
    aio::MultiplexedConnection,
    streams::{StreamAddOptions, StreamReadOptions},
};

use crate::config::Config;

pub mod config;

#[derive(Clone, Debug)]
pub struct RedisClient {
    pub conn: MultiplexedConnection,
}

impl RedisClient {
    pub async fn new() -> RedisResult<Self> {
        let config = Config::default();

        let client = Client::open(config.redis_url)?;
        let conn = client.get_multiplexed_async_connection().await?;
        Ok(Self { conn })
    }

    // pub async fn xadd(&mut self, stream: &str, url: &str, id: &str) -> RedisResult<()> {
    //     let mut fields: HashMap<&str, &str> = HashMap::new();
    //     fields.insert("url", url);
    //     fields.insert("id", id);

    //     self.conn.xadd(stream, "*", fields).await?;
    //     Ok(())
    // }

    // pub async fn xadd_bulk(
    //     &mut self,
    //     stream: &str,
    //     websites: &[(String, String)],
    // ) -> RedisResult<()> {
    //     for (url, id) in websites {
    //         self.xadd(stream, url, id).await?;
    //     }
    //     Ok(())
    // }

    // pub async fn xread_group(
    //     &mut self,
    //     group: &str,
    //     consumer: &str,
    //     stream: &str,
    //     count: usize,
    // ) -> RedisResult<Option<Vec<(String, String, HashMap<String, String>)>>> {
    //     let opts = StreamReadOptions::default()
    //         .group(group, consumer)
    //         .count(count);

    //     let res: Option<redis::streams::StreamReadReply> =
    //         self.conn.xread_options(&[stream], &[">"], &opts).await?;

    //     if let Some(reply) = res {
    //         let mut messages = Vec::new();
    //         for stream_key in reply.keys {
    //             for msg in stream_key.ids {
    //                 let id = msg.id.clone();

    //                 let fields: HashMap<String, String> = msg
    //                     .map
    //                     .iter()
    //                     .map(|(k, v)| (k.clone(), format!("{:?}", v)))
    //                     .collect();
    //                 messages.push((stream_key.key.clone(), id, fields));
    //             }
    //         }
    //         Ok(Some(messages))
    //     } else {
    //         Ok(None)
    //     }
    // }

    // pub async fn xack(&mut self, stream: &str, group: &str, event_id: &str) -> RedisResult<()> {
    //     self.conn.xack(stream, group, &[event_id]).await?;
    //     Ok(())
    // }

    // pub async fn xack_bulk(
    //     &mut self,
    //     stream: &str,
    //     group: &str,
    //     event_ids: &[String],
    // ) -> RedisResult<()> {
    //     self.conn.xack(stream, group, event_ids).await?;
    //     Ok(())
    // }
}

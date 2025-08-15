use redis_client::RedisClient;
use std::sync::{Arc, Mutex};
use store::{self, store::Store};
use tokio::time::{self, Duration};

use crate::push_to_stream::push_to_stream;
pub mod push_to_stream;

#[tokio::main(flavor = "multi_thread")]
async fn main() -> Result<(), std::io::Error> {
    let s = Arc::new(Mutex::new(Store::new().unwrap()));
    let mut locked_s = s.lock().unwrap();
    let redis_client = RedisClient::new().await.unwrap();

    let mut interval = time::interval(Duration::from_secs(3 ));

    loop {
        interval.tick().await;

        let websites = { locked_s.get_website_bulk() };

        match websites {
            Ok(_) => match websites {
                Ok(w) => {
                    if let Err(err) = push_to_stream(&redis_client, &w).await {
                        eprintln!("Redis push error: {:?}", err);
                    } else {
                        println!("Pushed {} websites to Redis", w.len());
                    }
                }
                Err(e) => {
                    println!("{}", e);
                }
            },

            Err(e) => {
                println!("{}", e);
            }
        }
    }
}

use redis_client::RedisClient;
use std::sync::{Arc, Mutex};
use store::{self, store::Store};

use anyhow::Result;

#[tokio::main(flavor = "multi_thread")]
async fn main() -> Result<()> {
    let s = Arc::new(Mutex::new(Store::new().unwrap()));
    let mut locked_s = s.lock().unwrap();
    let redis_client = RedisClient::new().await.unwrap();

    redis_client.create_group("workers").await?;
    loop {
        redis_client.xread_group("workers", "worker-1").await?;
    }
}

use redis::{Client, RedisResult, aio::MultiplexedConnection};

#[derive(Clone)]
pub struct RedisClient {
    pub conn: MultiplexedConnection,
}

impl RedisClient {
    pub async fn new(redis_url: &str) -> RedisResult<Self> {
        let client = Client::open(redis_url)?;
        let conn = client.get_multiplexed_async_connection().await?;
        println!("{:?}",conn);
        Ok(Self { conn })
    }
}

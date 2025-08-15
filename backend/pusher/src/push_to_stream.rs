use redis_client::RedisClient;
use store::models::website::Website;

pub async fn push_to_stream(
    redis_client: &RedisClient,
    websites: &Vec<Website>,
    stream: &str,
) -> redis::RedisResult<()> {

    for w in websites {
        println!("{:#?}", w);

        redis_client.xadd(stream, &w.url, &w.id).await?;
    }
    Ok(())
}

use redis_client::RedisClient;
use store::models::website::Website;

pub async fn push_to_stream(
    redis_client: &RedisClient,
    websites: &Vec<Website>,
) -> redis::RedisResult<()> {

    for w in websites {
        println!("{:#?}", w);

        redis_client.xadd( &w.url, &w.id).await?;
    }
    Ok(())
}

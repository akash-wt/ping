use std::sync::{Arc, Mutex};

use redis_client::RedisClient;
use store::{self, store::Store};

#[tokio::main(flavor = "multi_thread")]
async fn main() -> Result<(), std::io::Error> {
    let redis_client = Arc::new(RedisClient::new().await.unwrap());
    let s = Arc::new(Mutex::new(Store::new().unwrap()));
    let mut locked_s = s.lock().unwrap();

    let websites = locked_s.get_website_bulk().unwrap();


    println!("{:?}", redis_client);
    println!("{:#?}", websites);

    // for
    Ok(())  
}



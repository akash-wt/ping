use dotenvy::dotenv;
use std::env;

pub struct Config {
    pub redis_url: String,
}

impl Default for Config {
    fn default() -> Self {
        dotenv().ok();
        let redis_url = env::var("REDIS_URL")
            .unwrap_or_else(|_| panic!("Please provide the REDIS_URL envirenment variable!"));

        Self { redis_url }
    }
}

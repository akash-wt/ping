use std::env;

use dotenvy::dotenv;

pub struct Config {
    pub jwt_secret: String,
    pub redis_url: String,
}

impl Default for Config {
    fn default() -> Self {
        dotenv().ok();
        let jwt_secret = env::var("JWT_SECRET")
            .unwrap_or_else(|_| panic!("Please provide the JWT_SECRET envirenment variable!"));

        let redis_url = env::var("REDIS_URL")
            .unwrap_or_else(|_| panic!("Please provide the REDIS_URL envirenment variable!"));

        Self {
            jwt_secret,
            redis_url,
        }
    }
}

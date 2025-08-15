use std::env;

use dotenvy::dotenv;

pub struct Config {
    pub jwt_secret: String,
}

impl Default for Config {
    fn default() -> Self {
        dotenv().ok();
        let jwt_secret = env::var("JWT_SECRET")
            .unwrap_or_else(|_| panic!("Please provide the JWT_SECRET envirenment variable!"));

        Self { jwt_secret }
    }
}

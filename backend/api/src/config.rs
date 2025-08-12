use std::env;

use dotenvy::dotenv;

pub struct Config {
    pub jwt_secret: String,
}

impl Default for Config {
    fn default() -> Self {
        dotenv().ok();
        let jwt_secret = env::var("JWT_SECRET")
            .unwrap_or_else(|_| panic!("Please provide the database_url envirenment variable!"));

            println!("{}",jwt_secret);
        Self { jwt_secret }
    }
}

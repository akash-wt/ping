use std::env;

use dotenvy::dotenv;

pub struct Config {
    pub db_url: String,
}

impl Default for Config {
    fn default() -> Self {
        dotenv().ok();
        let db_url = env::var("DATABASE_URL")
            .unwrap_or_else(|_| panic!("Plear provide the database_url envirenment variable!"));

        Self { db_url }
    }
}

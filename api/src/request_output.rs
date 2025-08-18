use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize)]
pub struct CreateWebsiteOutput {
    pub id: String,
}
#[derive(Serialize, Deserialize)]
pub struct GetWebsiteOutput {
    pub url: String,
    pub id: String,
    pub user_id: String,
}

#[derive(Serialize, Deserialize)]
pub enum WebsiteStatus {
    Up,
    Down,
    Unknown,
}
#[derive(Serialize)]
pub struct GetWebsiteTickOutput {
    pub id: String,
    pub response_time_ms: i32,
    pub status: store::models::website::WebsiteStatus,
    pub region_id: String,
    pub website_id: String,
    pub created_at: chrono::NaiveDateTime,
}

#[derive(Serialize)]
pub struct GetWebsiteTicksOutput {
    pub ticks: Vec<GetWebsiteTickOutput>,
}


#[derive(Serialize, Deserialize)]
pub struct CreateUserOutput {
    pub id: String,
}

#[derive(Serialize, Deserialize)]
pub struct SigninOutput {
    pub jwt: String,
}

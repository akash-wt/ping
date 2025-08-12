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
pub struct CreateUserOutput {
    pub id: String,
}

#[derive(Serialize, Deserialize)]
pub struct SigninOutput {
    pub jwt: String,
}

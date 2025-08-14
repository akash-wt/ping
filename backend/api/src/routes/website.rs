use std::sync::{Arc, Mutex};

use crate::{
    auth_middleware::UserId,
    request_input::CreateWebsiteInput,
    request_output::{CreateWebsiteOutput, GetWebsiteOutput},
};
use poem::{
    handler,
    web::{Data, Json, Path},
};
use store::store::Store;

#[handler]
pub fn get_website(
    Path(website_id): Path<String>,
    Data(s): Data<&Arc<Mutex<Store>>>,
    UserId(_auth_user_id): UserId,
) -> Json<GetWebsiteOutput> {
    let mut locked_s = s.lock().unwrap();

    let wedsite = locked_s.get_website(website_id).unwrap();

    Json(GetWebsiteOutput {
        url: wedsite.url,
        id: wedsite.id,
        user_id: wedsite.user_id,
    })
}

#[handler]
pub fn create_website(
    Json(data): Json<CreateWebsiteInput>,
    Data(s): Data<&Arc<Mutex<Store>>>,
    UserId(auth_user_id): UserId,
) -> Json<CreateWebsiteOutput> {
    let mut loacked_s = s.lock().unwrap();

    let website = loacked_s.create_website(auth_user_id, data.url).unwrap();

    let response = CreateWebsiteOutput { id: website.id };
    Json(response)
}

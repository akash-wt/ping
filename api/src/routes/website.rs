use std::sync::{Arc, Mutex};

use crate::{
    auth_middleware::UserId,
    request_input::CreateWebsiteInput,
    request_output::{
        CreateWebsiteOutput, GetWebsiteOutput, GetWebsiteTickOutput, GetWebsiteTicksOutput,
    },
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
pub fn get_website_ticks(
    Data(s): Data<&Arc<Mutex<Store>>>,
    UserId(auth_user_id): UserId,
) -> Json<GetWebsiteTicksOutput> {
    let mut locked_s = s.lock().unwrap();

    let website_ticks = locked_s.get_website_ticks(auth_user_id).unwrap();

    let ticks = website_ticks
        .into_iter()
        .map(|t| GetWebsiteTickOutput {
            id: t.id,
            response_time_ms: t.response_time_ms,
            status: t.status,
            region_id: t.region_id,
            website_id: t.website_id,
            created_at: t.createdAt,
        })
        .collect();

    Json(GetWebsiteTicksOutput { ticks })
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

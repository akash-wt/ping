use std::sync::{Arc, Mutex};

use crate::{
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
) -> Json<GetWebsiteOutput> {
    let mut locked_s = s.lock().unwrap();

    let wedsite = locked_s.get_website(website_id).unwrap();

    Json(GetWebsiteOutput { url: wedsite.url })
}

#[handler]
 pub fn create_website(
    Json(data): Json<CreateWebsiteInput>,
    Data(s): Data<&Arc<Mutex<Store>>>,
) -> Json<CreateWebsiteOutput> {
    let mut loacked_s = s.lock().unwrap();
    let website = loacked_s
        .create_website(
            String::from("dd020379-1e62-44b2-8a3d-c4e17c30d044"),
            data.url,
        )
        .unwrap();

    let response = CreateWebsiteOutput { id: website.id };
    Json(response)
}

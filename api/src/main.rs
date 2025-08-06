use crate::{request_input::CreateWebsiteInput, request_output::CreateWebsiteOutput};
use poem::{
    Route, Server, get, handler,
    listener::TcpListener,
    post,
    web::{Json, Path},
};
use store::store::Store;

pub mod request_input;
pub mod request_output;

#[handler]
fn get_website(Path(website_id): Path<String>) -> String {
    format!("hello: {website_id}")
}

#[handler]
fn create_website(Json(data): Json<CreateWebsiteInput>) -> Json<CreateWebsiteOutput> {
    let url = data.url;

    let s = Store::default();
    let id = s.create_website(url);
    let res = CreateWebsiteOutput { id };

    Json(res)
}

#[tokio::main] 
async fn main() -> Result<(), std::io::Error> {
    let app = Route::new()
        .at("/website/:website_id", get(get_website))
        .at("/website", post(create_website));

    Server::new(TcpListener::bind("0.0.0.0:3000"))
        .name("hello-world")
        .run(app)
        .await
}

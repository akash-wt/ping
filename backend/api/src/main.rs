use std::sync::{Arc, Mutex};

use poem::{EndpointExt, Route, Server, get, listener::TcpListener, post};
use store::store::Store;

use crate::routes::{
    user::{sign_in, sign_up},
    website::{create_website, get_website},
};
pub mod request_input;
pub mod request_output;
pub mod routes;
pub mod auth_middleware;
pub mod config;

#[tokio::main(flavor = "multi_thread")]
async fn main() -> Result<(), std::io::Error> {
    let s = Arc::new(Mutex::new(Store::new().unwrap()));
    let app = Route::new()
        .at("/status/:website_id", get(get_website))
        .at("/website", post(create_website))
        .at("user/signup", post(sign_up))
        .at("user/signin", post(sign_in))
        .data(s);

    Server::new(TcpListener::bind("0.0.0.0:3000"))
        .name("hello-world")
        .run(app)
        .await
}

use std::sync::{Arc, Mutex};

use poem::{
    EndpointExt, Route, Server, get, http::Method, listener::TcpListener, middleware::Cors, post,
};
use store::store::Store;

use crate::routes::{
    user::{sign_in, sign_up},
    website::{create_website, get_website_ticks},
};
pub mod auth_middleware;
pub mod config;
pub mod request_input;
pub mod request_output;
pub mod routes;

#[tokio::main(flavor = "multi_thread")]
async fn main() -> Result<(), std::io::Error> {
    let s = Arc::new(Mutex::new(Store::new().unwrap()));

    let app = Route::new()
        .at("/get_website_ticks", get(get_website_ticks))
        .at("/website", post(create_website))
        .at("/user/signup", post(sign_up))
        .at("/user/signin", post(sign_in))
        .data(s)
        .with(
            Cors::new()
                .allow_origin("http://localhost:3000")
                .allow_methods(vec![Method::GET, Method::POST, Method::DELETE])
                .allow_credentials(true),
        );

    Server::new(TcpListener::bind("0.0.0.0:3001"))
        .name("hello-world")
        .run(app)
        .await
}

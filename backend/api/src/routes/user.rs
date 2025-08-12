use std::sync::{Arc, Mutex};

use crate::{
    config::Config, request_input::CreateUserInput, request_output::{CreateUserOutput, SigninOutput}
};
use jsonwebtoken::{EncodingKey, Header, encode};
use poem::{
    Error, handler,
    http::StatusCode,
    web::{Data, Json},
};
use serde::{Deserialize, Serialize};
use store::store::Store;

#[derive(Debug, Serialize, Deserialize)]
pub struct Claims {
    pub sub: String,
    pub exp: usize,
}

#[handler]
pub fn sign_up(
    Json(data): Json<CreateUserInput>,
    Data(s): Data<&Arc<Mutex<Store>>>,
) -> Result<Json<CreateUserOutput>, Error> {
    let mut loacked_s = s.lock().unwrap();
    let user_id = loacked_s
        .sign_up(data.username, data.password)
        .map_err(|_| Error::from_status(StatusCode::CONFLICT))?;

    let response = CreateUserOutput {
        id: user_id.to_string(),
    };

    Ok(Json(response))
}

#[handler]
pub fn sign_in(
    Json(data): Json<CreateUserInput>,
    Data(s): Data<&Arc<Mutex<Store>>>,
) -> Result<Json<SigninOutput>, Error> {
    let mut locked_s = s.lock().unwrap();

    let id = locked_s.sign_in(data.username, data.password);

    match id {
        Ok(u_id) => {
            let my_claims = Claims {
                sub: u_id,
                exp: 111111111,
            };

            let config = Config::default();
            println!("{}",config.jwt_secret);

            let token = encode(
                &Header::default(),
                &my_claims,
                &EncodingKey::from_secret(config.jwt_secret.as_ref()),
            )
            .map_err(|_| Error::from_status(StatusCode::UNAUTHORIZED))?;

            let response = SigninOutput {
                jwt: String::from(token),
            };

            Ok(Json(response))
        }
        Err(_) => Err(Error::from_status(StatusCode::UNAUTHORIZED)),
    }
}

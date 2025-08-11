use std::sync::{Arc, Mutex};

use crate::{
    request_input::CreateUserInput,
    request_output::{CreateUserOutput, SigninOutput},
};
use poem::{
    Error, handler,
    http::StatusCode,
    web::{Data, Json},
};
use store::store::Store;

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
            let response = SigninOutput {
                jwt: String::from(u_id),
            };

            Ok(Json(response))
        }
        Err(_) => Err(Error::from_status(StatusCode::UNAUTHORIZED)),
    }
}

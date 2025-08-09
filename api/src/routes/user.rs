use std::sync::{Arc, Mutex};

use crate::{
    request_input::CreateUserInput,
    request_output::{CreateUserOutput, SigninOutput},
};
use poem::{
    handler,
    web::{Data, Json},
};
use store::store::Store;

#[handler]
pub fn sign_up(
    Json(data): Json<CreateUserInput>,
    Data(s): Data<&Arc<Mutex<Store>>>,
) -> Json<CreateUserOutput> {
    let mut loacked_s = s.lock().unwrap();
    let user_id = loacked_s.sign_up(data.username, data.password).unwrap();

    let response = CreateUserOutput {
        id: user_id.to_string(),
    };

    Json(response)
}

#[handler]
pub fn sign_in(
    Json(data): Json<CreateUserInput>,
    Data(s): Data<&Arc<Mutex<Store>>>,
) -> Json<SigninOutput> {
    let mut locked_s = s.lock().unwrap();

    let _exists = locked_s.sign_in(data.username, data.password).unwrap();
    let response = SigninOutput{
        jwt:String::from("aks")
    } ;

    Json(response)
}   

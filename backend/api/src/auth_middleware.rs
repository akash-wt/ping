use jsonwebtoken::{DecodingKey, Validation, decode};
use poem::{Error, FromRequest, Request, RequestBody, Result, http::StatusCode};

use crate::{config::Config, routes::user::Claims};

pub struct UserId(pub String);

impl<'a> FromRequest<'a> for UserId {
    async fn from_request(req: &'a Request, body: &mut RequestBody) -> Result<Self> {
        let token = req
            .headers()
            .get("Authorization")
            .and_then(|value| value.to_str().ok())
            .ok_or_else(|| Error::from_string("missing token", StatusCode::UNAUTHORIZED))?;

        let config = Config::default();
        println!("{}",token);

        let token_data = decode::<Claims>(
            &token,
            &DecodingKey::from_secret(config.jwt_secret.as_ref()),
            &Validation::default(),
        )
        .map_err(|_| Error::from_string("missing malformed!", StatusCode::UNAUTHORIZED))?;

        Ok(UserId(token_data.claims.sub))
    }
}

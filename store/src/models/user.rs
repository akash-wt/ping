use crate::store::Store;
use bcrypt::{DEFAULT_COST, hash, verify};
use diesel::{prelude::*, result::Error};
use uuid::Uuid;

#[derive(Queryable, Selectable, Insertable)]
#[diesel(table_name = crate::schema::user)]
#[diesel(check_for_backend(diesel::pg::Pg))]
pub struct User {
    id: String,
    username: String,
    password: String,
}

impl Store {
    pub fn sign_up(
        &mut self,
        username: String,
        password: String,
    ) -> Result<String, diesel::result::Error> {
        let user_id = Uuid::new_v4();

        let hashed_password = hash(password, DEFAULT_COST).map_err(|_| Error::NotFound)?;

        let u = User {
            username,
            password: hashed_password,
            id: user_id.to_string(),
        };

        diesel::insert_into(crate::schema::user::table)
            .values(&u)
            .returning(User::as_returning())
            .get_result(&mut self.conn)?;

        Ok(user_id.to_string())
    }

    pub fn sign_in(
        &mut self,
        username_input: String,
        password_input: String,
    ) -> Result<String, diesel::result::Error> {
        use crate::schema::user::dsl::*;

        let user_result = user
            .filter(username.eq(username_input))
            .select(User::as_select())
            .first(&mut self.conn)?;

        let is_valid =
            verify(password_input, &user_result.password).map_err(|_| Error::NotFound)?;

        if !is_valid {
            return Err(Error::NotFound);
        }

        Ok(user_result.id)
    }
}

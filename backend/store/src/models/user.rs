use crate::store::Store;
use diesel::{prelude::* };
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
        let u = User {
            username,
            password,
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

        if user_result.password != password_input {
            return Err(diesel::result::Error::NotFound);
        }

        Ok(user_result.id)
    }
}

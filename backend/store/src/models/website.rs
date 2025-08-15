use crate::store::Store;
use chrono::Utc;
use diesel::prelude::*;
use uuid::Uuid;

#[derive(Queryable, Selectable, Insertable)]
#[diesel(table_name = crate::schema::website)]
#[diesel(check_for_backend(diesel::pg::Pg))]

#[derive(Debug)]
pub struct Website {
    pub id: String,
    pub url: String,
    pub time_added: chrono::NaiveDateTime,
    pub user_id: String,
}

impl Store {
    pub fn create_website(
        &mut self,
        user_id: String,
        url: String,
    ) -> Result<Website, diesel::result::Error> {
        let id = Uuid::new_v4();

        let website = Website {
            user_id,
            url,
            id: id.to_string(),
            time_added: Utc::now().naive_local(),
        };

        let website_result = diesel::insert_into(crate::schema::website::table)
            .values(&website)
            .returning(Website::as_returning())
            .get_result(&mut self.conn)?;

        Ok(website_result)
    }

    pub fn get_website(&mut self, input_id: String) -> Result<Website, diesel::result::Error> {
        use crate::schema::website::dsl::*;

        let website_result = website
            .filter(id.eq(input_id))
            .select(Website::as_select())
            .first(&mut self.conn)?;

        Ok(website_result)
    }

    pub fn get_website_bulk(&mut self) -> Result<Vec<Website>, diesel::result::Error> {
        use crate::schema::website::dsl::*;

        let website_result = website
            .select(Website::as_select())
            .load::<Website>(&mut self.conn)?;

        Ok(website_result)
    }
}

use std::io::Write;
use uuid::Uuid;
use crate::store::Store;
use chrono::Utc;
use diesel::{deserialize::{FromSql, FromSqlRow}, expression::AsExpression, pg::{Pg, PgValue}, prelude::*, serialize::{IsNull, Output, ToSql}};

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

#[derive(Debug, Clone, Copy, AsExpression, FromSqlRow)]
#[diesel(sql_type = crate::schema::sql_types::WebsiteStatus)]
pub enum WebsiteStatus {
    Up,
    Down,
    Unknown,
}

#[derive(Queryable, Selectable, Insertable)]
#[diesel(table_name = crate::schema::website_tick)]
#[diesel(check_for_backend(diesel::pg::Pg))]
#[derive(Debug)]
pub struct WebsiteTick {
    pub id: String,
    pub response_time_ms: i32,
    pub status: WebsiteStatus,
    pub region_id: String,
    pub website_id: String,
    pub createdAt: chrono::NaiveDateTime,
}

impl FromSql<crate::schema::sql_types::WebsiteStatus, Pg> for WebsiteStatus {
    fn from_sql(bytes: PgValue) -> diesel::deserialize::Result<Self> {
        match bytes.as_bytes() {
            b"Up" => Ok(WebsiteStatus::Up),
            b"Down" => Ok(WebsiteStatus::Down),
            b"Unknown" => Ok(WebsiteStatus::Unknown),
             v => Err(format!("Unrecognized WebsiteStatus variant: {v:?}").into()),
        }
    }
}

impl ToSql<crate::schema::sql_types::WebsiteStatus, Pg> for WebsiteStatus {
    fn to_sql<'b>(&'b self, out: &mut Output<'b, '_, Pg>) -> diesel::serialize::Result {
        match self {
            WebsiteStatus::Up => out.write_all(b"Up")?,
            WebsiteStatus::Down => out.write_all(b"Down")?,
            WebsiteStatus::Unknown => out.write_all(b"Unknown")?,
        }
        Ok(IsNull::No)
    }
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

    pub fn save_ping_result(
        &mut self,
        wid: String,
        status: WebsiteStatus,
        duration_ms: i32,
    ) -> Result<WebsiteTick, diesel::result::Error> {
        let id = Uuid::new_v4().to_string();

        let website = WebsiteTick {
            id,
            response_time_ms: duration_ms,
            status,
            region_id: String::from("12"),
            website_id: wid,
            createdAt: Utc::now().naive_local(),
        };

        let website_result = diesel::insert_into(crate::schema::website_tick::table)
            .values(&website)
            .returning(WebsiteTick::as_returning())
            .get_result(&mut self.conn)?;

        Ok(website_result)
    }
}

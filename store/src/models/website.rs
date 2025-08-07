use crate::store::Store;
use chrono::Utc;
use diesel::prelude::*;
use uuid::{Uuid, uuid};

#[derive(Queryable, Selectable, Insertable)]
#[diesel(table_name = crate::schema::website)]
#[diesel(check_for_backend(diesel::pg::Pg))]

pub struct Website {
    id: String,
    url: String,
    time_added: chrono::NaiveDateTime,
    user_id: String
}

impl Store {
    
    pub fn create_website(&mut self, user_id:String, url: String) -> String {
        let id =Uuid::new_v4();
        let website=Website{
            user_id,
            url,
            id:id.to_string(),
            time_added:Utc::now().naive_local()

        };

        let website = diesel::insert_into(c)
    }
    pub fn get_website(&self, url: String) -> String {
       
        return String::from("ksfnskbfkd");
    }
}

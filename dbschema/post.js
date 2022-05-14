/*  tb_post Schema
    id:{
      primary key 
      type:bigInt
    }
    userId: {
      type: string,
    },
    body: {
      type: String,
      max: 500,
    },
    title: {
      type: String,
    },
    creation_datetime: timestamp
*/

/* tb_post_likes schema

    id:{
      primary key 
      type:bigInt
    }
    userId: {
      type: String,
    },
    post_id: {
      type: string
    }
    creation_datetime: timestamp


*/
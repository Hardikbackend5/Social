/*  tb_post Schema
    id:{
      primary key 
      type:bigInt
    }
    user_id: {
      type: string,
    },
    description: {
      type: String,
      max: 500,
    },
    img: {
      type: String,
    },
    creation_datetime: timestamp
*/

/* tb_post_likes schema

    id:{
      primary key 
      type:bigInt
    }
    user_id: {
      type: String,
    },
    post_id: {
      type: string
    }
    creation_datetime: timestamp


*/
const commonFunc = require('../commonFunction');


async function insert_post(opts) {
    try {
      
        let sql = 'INSERT INTO tb_posts (userId, body, title) VALUES (?,?,?) ';
        let data = await commonFunc.executeSqlQuery(sql, [opts.userId, opts.body, opts.title]);
        return data;

    } catch (error) {
        throw error;
    }
}

async function get_posts(opts) {
    try {
        let values = [];
        let sql = 'SELECT * FROM tb_posts WHERE 1=1 ';
        if(opts.post_id){
            sql += ' AND id = ? '
            values.push(opts.post_id)
        }
        if(opts.userId){
            sql += ' AND userId = ? '
            values.push(opts.userId)
        }
        if(opts.user_ids && opts.user_ids.length){
            sql += ' AND userId IN (?) '
            values.push(opts.user_ids)
        }
        if(opts.sort_by == 1){
            sql += " ORDER BY creation_datetime DESC "
        }else{
            sql += " ORDER BY creation_datetime ASC "
        }
        console.log(">>>>>>>>>>>>>>",sql,values)
        let data = await commonFunc.executeSqlQuery(sql, values);
        return data
    } catch (error) {
        throw error;
    }
}

async function update_post(opts) {
    try {
        let sql = 'UPDATE tb_posts SET body = ?, title = ? where id = ? ';
        let data = await commonFunc.executeSqlQuery(sql, [opts.body, opts.title, opts.post_id]);
        return data
    } catch (error) {
        throw error;
    }
}

async function delete_post(opts) {
    try {
        let sql = 'DELETE from tb_posts where id = ? ';
        let data = await commonFunc.executeSqlQuery(sql, [opts.post_id]);
        return data
    } catch (error) {
        throw error;
    }
}

async function get_post_likes(opts) {
    try {
        let values = [opts.post_id];
        let sql = 'SELECT * FROM tb_post_likes WHERE post_id = ? ';
        if(opts.userId){
            sql += ' AND userId = ? '
            values.push(opts.userId)
        }
        let data = await commonFunc.executeSqlQuery(sql, values);
        return data
    } catch (error) {
        throw error;
    }
}

async function like_post(opts) {
    try {
        let values = [opts.post_id, opts.userId];
        let sql = 'INSERT INTO tb_post_likes (post_id, userId) VALUES (?,?) ';
        let data = await commonFunc.executeSqlQuery(sql, values);
        return data
    } catch (error) {
        throw error;
    }
}

async function dislike_post(opts) {
    try {
        let sql = 'DELETE from tb_post_likes where post_id = ? AND userId = ?';
        let data = await commonFunc.executeSqlQuery(sql, [opts.post_id, opts.userId]);
        return data
    } catch (error) {
        throw error;
    }
}

async function get_followers(opts) {
    try {
        let values = [opts.user_id];
        let sql = 'SELECT follower_id FROM tb_followers WHERE user_id = ? '; // follower id is the user id of that user who that users follow 
        if(opts.follower_user_id){
           sql += " AND follower_id = ? ";
           values.push(opts.follower_user_id)
        }
        let data = await commonFunc.executeSqlQuery(sql, values);
        return data
    } catch (error) {
        throw error;
    }
}

module.exports = {
    insert_post,
    get_posts,
    update_post,
    delete_post,
    get_post_likes,
    like_post,
    dislike_post,
    get_followers
    
}
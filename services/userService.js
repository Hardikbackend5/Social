const commonFunc = require('../commonFunction');


async function follow_user(opts) {
    try {
        let sql = 'INSERT INTO tb_followers (user_id, follower_id) VALUES (?,?) ';
        let data = await commonFunc.executeSqlQuery(sql, [opts.user_id, opts.follow_user_id]);
        return data;

    } catch (error) {
        throw error;
    }
}

async function unfollow_user(opts) {
    try {
        let sql = 'DELETE from tb_followers where user_id = ? AND follower_id = ?';
        let data = await commonFunc.executeSqlQuery(sql, [opts.user_id, opts.follow_user_id]);
        return data
    } catch (error) {
        throw error;
    }
}

module.exports = {
    follow_user,
    unfollow_user
}
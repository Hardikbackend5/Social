const commonFunc = require('../commonFunction');


async function insert_user(opts) {
    try {
      
        let sql = 'INSERT INTO tb_users (email, username, password, profile_image) VALUES (?,?,?,?) ';
        let data = await commonFunc.executeSqlQuery(sql, [opts.email, opts.username, opts.password, opts.profile_image]);
        return data;

    } catch (error) {
        throw error;
    }
}

async function is_email_exists(opts) {
    try {
      
        let sql = 'SELECT * FROM tb_users WHERE email = ? ';
        let data = await commonFunc.executeSqlQuery(sql, [opts.email]);
        return data
    } catch (error) {
        throw error;
    }
}


module.exports = {
    insert_user,
    is_email_exists
}
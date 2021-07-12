'use strict'

const crypto = require('crypto');
const Service = require('egg').Service;

class UserService extends Service {
    async register(username, password) {
        /** 获取User模型 */
        const user = new this.ctx.model.User();
        /** 对密码进行加密 */
        const pwd = crypto.createHash('md5').update(password).digest('hex');
        user.username = username;
        user.password = pwd;
        return user.save();
    }

    async login(username, password) {
        const { ctx } = this;
        let pwd = crypto.createHash('md5').update(password).digest('hex');
        /** 调用Mongoose中的findOne方法 */
        let user = await ctx.model.User.findOne({ username, password: pwd });
        return user;
    }
}

module.exports = UserService;
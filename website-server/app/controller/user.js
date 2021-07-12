const Controller = require('egg').Controller;

class UserController extends Controller {
    async register() {
        const { ctx } = this;
        /** ctx。request.body得到网络访问的请求体 */
        const { username, password } = ctx.request.body;
        /** 调用业务逻辑下的register方法 */
        await ctx.service.user.register(username, password);
        ctx.body = { username, password };
    }

    async login() {
        const { ctx } = this;
        const { username, password } = ctx.request.body;
        const user = await ctx.service.user.login(username, password);
        if (user) {
            const token = await ctx.app.jwt.sign({
                username: user.username,
                id: user._id
            },
            /** 使用JWT配置的secret值作为密钥 */
            this.config.jwt.secret,
            {
                /** 设置有效时间(秒) */
                expiresIn: 3600
            }
            )
            ctx.body = { status: 'ok' , token};
        } else {
            ctx.body = {
                status: 'error',
            };
        }
    }
}

module.exports = UserController;
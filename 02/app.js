/**
 * 在 Koa 中配置路由
 * 静态资源托管
 */
const Koa = require('koa')
const Router = require('@koa/router')
const static = require('koa-static')
const path = require('path')
// 设置前缀路径
const mount = require('koa-mount')

const app = new Koa()
const router = new Router()

router.get('/', ctx => {
    ctx.body = 'home page'
})

router.post('/', ctx => {
    ctx.body = 'post /'
})

router.get('/foo', ctx => {
    ctx.body = 'foo page'
})

app.use(router.routes()).use(router.allowedMethods())

// http://localhost:3000/static/css/main.css
app.use(mount('/static', static(path.join(__dirname, './public'))))

app.listen(3000, () => {
    console.log('http://localhost:3000')
})
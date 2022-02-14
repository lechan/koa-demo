/**
 * 在 Koa 中间件
 * 中间件执行栈结构（洋葱模型）
 * 异步中间件
 * 中间件合并
 */
const Koa = require('koa')
const fs = require('fs')
const util = require('util')
const compose = require('koa-compose')

const app = new Koa()

app.use(async (ctx, next) => {
    const data = await util.promisify(fs.readFile)('./views/index.html')
    ctx.type = 'html'
    ctx.body = data
    next()
})

const one = (ctx, next) => {
    console.log('>> one')
    next()
    console.log('<< one')
}

const two = (ctx, next) => {
    console.log('>> two')
    next()
    console.log('<< two')
}

const three = (ctx, next) => {
    console.log('>> three')
    next()
    console.log('<< three')
}

// app.use(one)
// app.use(two)
// app.use(three)
app.use(compose([one, two, three]))

app.listen(3000, () => {
    console.log('http://localhost:3000')
})
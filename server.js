const Koa = require('koa');
const Router = require('koa-router');
const bodyParser = require('koa-parser');
const _ = require('lodash');
const app = new Koa();
const PORT = 4000;
const router = new Router();

app.use(bodyParser());

const posts = [
    {
        "id" : '1',
        "name" : "qwerty",
        "content" : "asddfdsfdfg"
    },
    {
        "id" : '2',
        "name" : "lkjkjhjhfg",
        "content" : "asddfdsfdfg"
    },
    {
        "id" : '3',
        "name" : "zxxccv",
        "content" : "asddfdsfdfg"
    },

]

router.get('/', (ctx) => {
    ctx.body = "App de koa"
})

//GET
router.get('/posts', ctx => {
    ctx.body = posts;
})

//POST
router.post('/posts', ctx => {
    console.log(ctx.request.body);
    let {id, name, content} = ctx.request.body;

    if(!id){
        ctx.throw(400, "id is required field")
    }
    if(!name){
        ctx.throw(400, "name is required field")
    }
    if(!content){
        ctx.throw(400, "content is required field")
    }

    posts.push({id, name, content});
    ctx.body = posts
})

//GET /posts/:id
router.get('/posts/:id', ctx => {
    ctx.body = posts.find(post => post.id === ctx.params.id);
})

//DELETE by id
router.delete('/posts/:id', ctx => {
    ctx.body = _.remove(posts, p => p.id === ctx.params.id);
})

//UPDATE by id
router.put('/posts/:id', ctx => {
    let {id, name, content} = ctx.request.body;

    const index = posts.findIndex(p => p.id === ctx.params.id)
    if(id){
        posts[index].id = id;
    }
    if(name){
        posts[index].name = name;
    }
    if(content){
        posts[index].content = content;
    }

    ctx.body = posts;

})

app.use(router.routes());

/*
app.use(async (ctx, next) => {
    console.log(`${ctx.method} ${ctx.url} ${new Date()}`);
    return await next();
})

app.use(async ctx => {
    ctx.body = "yeiii"
})
*/

app.listen(PORT);
console.log(`server listen ${PORT}`);
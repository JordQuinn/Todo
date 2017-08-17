const express = require('express')
const app = express()
const path = require('path')
const mustacheExpress = require('mustache-express');
const bodyParser = require("body-parser");
const shortid = require('shortid')
//empty array to put new todos in
let todos = []

let completed = []

app.engine('mustache', mustacheExpress());
app.set('views', './views')
app.set('view engine', 'mustache')

app.use(express.static(path.join(__dirname, 'static')))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))

//render the index page to add new todos and see completed todos
app.get("/", function (req, res) {
  res.render('index', {todos: todos, completed: completed});
});

//input new todos
app.post("/todo/add", function(req, res){
  todos.push({
    id: shortid.generate(),
    newtodo: req.body.newtodo
  })
  res.redirect('/');
 })


app.post('/todo/complete', function(req, res, next){
  let id = req.body.id
  let completeTodo = todos.filter(function (item){
    return item.id == id
  })[0]
  completed.push(completeTodo.newtodo)

  todos = todos.filter(function(item){
    return item.id !==id
  })
  res.redirect('/');
})


app.listen(3000, function(){
  console.log("App running on port 3000")
})

const express = require('express')
const app = express()
const path = require('path')
const mustacheExpress = require('mustache-express');
const bodyParser = require("body-parser");
const shortid = require('shortid')
//empty array to put new todos in
let todos = []
//seeded "completed todo to check if it shows up"
let completed = ["dance"]

app.engine('mustache', mustacheExpress());
app.set('views', './views')
app.set('view engine', 'mustache')

app.use(express.static(path.join(__dirname, 'static')))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))

//render the index page to add new todos and see completed todos
app.get("/", function (req, res) {
  res.render('index', {todos: todos, completed: completed});
  console.log(completed)
});

//input new todos
app.post("/todo/add", function (req, res){
  todos.push({
    id: shortid.generate(),
    newtodo: req.body.newtodo})
  res.redirect('/');
      console.log(todos)
 })
//put completed todos in new array but it doesn't work
 // app.post("/todo/complete", function (req, res){
 //   completed.push({
 //     completed: req.body.todos})
 //   res.redirect('/');
 //       console.log(completed)
 //  })

app.post('/todo/complete', function(req, res, next){
  let id = req.body.id
  let completeTodo = todos.filter(function (item){
    return item.id == id
  })[0]
  completed.push(completeTodo)

  todos = todos.filter(function(item){
    return item.id !==id
  })
  res.redirect('/');
})


app.listen(3000, function(){
  console.log("App running on port 3000")
})

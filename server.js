const express = require('express');
const app = express();
const pg = require('pg');
const bodyParser = require('body-parser');
const $ = require("jquery");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Origin","Origin, X-Requested-With, Content-Type, Accept");
  next();
});




const db = new pg.Pool({
  username: 'mario',
  password: 'luigi',
  database: 'yoshi',
  host: 'localhost'
});







db.connect()

  .then(() => {

    console.log('connected to db');

    db.query(`CREATE TABLE IF NOT EXISTS todos (

      _id SERIAL PRIMARY KEY,

      action VARCHAR(256)

    )`)

    .then(() => console.log('todos table is up and running'))
    .then()
    .catch((err) => console.log(err));

  })


  // .catch((err) => console.log(err));









//Serve the basic index.html file and the styles....
app.get('/', (req, res) => res.sendFile(__dirname + '/index.html'));
app.get('/styles.css', (req, res) => res.sendFile(__dirname + '/styles.css'));





//this is the route that the button click uses.
app.post('/addTodos', function(req, res){
  // console.log(req.body.input);
  // console.log('arnold',req.body.input);

  //This finally works! The console told me that my
  //value===column name.
  //this didn't make sense to me since the syntax looks correct.
  //then i wrapped ${req.body.input} in singlequotes
  //voila!
  db.query(`INSERT INTO todos (action) VALUES ('${req.body.input}') RETURNING *`)
  .then(()=>console.log(`${req.body.input} has been entered into the db`))
  .catch((err) => console.log(err))




  //now lets add a <li> to our dom with req.body.input
  //as the value
  //window is undefined...
  //global.window is undefined...
  //document is undefined...
  //process.browser is undefined...
  //global is undefined...
  // let newListItem = global.createElement("li");
  // var node = global.createTextNode("`${req.body.input}`");
  // newListItem.appendChild(node);
  // let element = global.getElementById("myList");
  // element.appendChild(newListItem);



  res.json(JSON.stringify({"input": req.body.input}));
});








app.listen(3000, () => console.log('listening on port 3000'));
module.exports = { db,/* app, someOtherThing, coolStuff*/ };

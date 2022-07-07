const express = require('express');
const mongoose = require('mongoose');
const exphb = require('express-handlebars');
const todoRouters  = require('./routes/todos');
const path = require('path')
const PORT = process.env.PORT || 3000;
const app = express();
const hbs = exphb.create({
  defaultLayout: 'main',
  extname: 'hbs',
});

app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', 'views');
app.use(todoRouters);
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')));

async function start() {
  try {
    await mongoose.connect('mongodb+srv://Vika:_MwpYv5KzwdbS4y@cluster0.joehpqb.mongodb.net/todos', {
      useNewUrlParser: true,
      useFindAndModify: false,
    });
    app.listen(PORT, () => {
      console.log('Server has been started');
    });

  } catch (e) {
    console.log(e);
  }
}
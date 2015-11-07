var config = require('./config'),
    path = require('path'),
    fs = require('fs'),
    express = require('express');

var app = express();
var indexRouter = express.Router();

indexRouter.route('/')
  .all(function (req, res) {
    var moviePath = path.join(__dirname, 'public', 'movies');
    fs.readdir(moviePath, (err, files) => {
      console.log(files);
      res.render('index', { title: 'Customer Monitor', message: files });
    });
  });

indexRouter.route('/admin')
  .all(function (req, res) {
    res.render('admin', { title: 'Customer Monitor', message: 'Test' });
  });

app.set('port', config.server.port);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app
  .use(express.static(path.join(__dirname, 'public')))
  .use(indexRouter)
  .use(function (req, res) {
        res.status(404).render('404', {title: 'Not Found :('});
  });

app.listen(app.get('port'), function () {
  console.log('Express server listening on port ' + app.get('port'));
});

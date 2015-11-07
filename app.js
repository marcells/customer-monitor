var config = require('./config'),
    path = require('path'),
    fs = require('fs'),
    express = require('express'),
    app = express(),
    indexRouter = express.Router(),
    server = require('http').Server(app);
    io = require('socket.io')(server);

const MOVIES_DIRECTORY = '/movies/';

indexRouter.route('/')
  .all(function (req, res) {
    res.render('index', { title: 'Customer Monitor', message: 'Test' });
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

server.listen(app.get('port'), function () {
  console.log('Express server listening on port ' + app.get('port'));
});

io.on('connection', function (socket) {
  var moviePath = path.join(__dirname, 'public', 'movies');
  fs.readdir(moviePath, (err, files) => {
    console.log(socket);
    io.emit('moviesChanged', { movies: files.map(x => MOVIES_DIRECTORY + x) });
  });
});

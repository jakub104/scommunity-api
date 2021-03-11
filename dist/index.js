'use strict';

require('babel-polyfill');

require('./Database/mongoose');

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _cors = require('cors');

var _cors2 = _interopRequireDefault(_cors);

var _http = require('http');

var _http2 = _interopRequireDefault(_http);

var _socket = require('socket.io');

var _socket2 = _interopRequireDefault(_socket);

var _posts = require('./Routes/posts');

var _posts2 = _interopRequireDefault(_posts);

var _auth = require('./Routes/auth');

var _auth2 = _interopRequireDefault(_auth);

var _users = require('./Routes/users');

var _users2 = _interopRequireDefault(_users);

var _messages = require('./Routes/messages');

var _messages2 = _interopRequireDefault(_messages);

var _notifications = require('./Routes/notifications');

var _notifications2 = _interopRequireDefault(_notifications);

var _chats = require('./Routes/chats');

var _chats2 = _interopRequireDefault(_chats);

var _setUser = require('./Middlewares/setUser');

var _setUser2 = _interopRequireDefault(_setUser);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();
// MIDDLEWARES

// import fileUpload from 'express-fileupload'
// import fs from 'fs'
// ROUTES

app.use((0, _cors2.default)());
app.use(_express2.default.json());
app.use(_setUser2.default);
app.use('/api/posts', _posts2.default);
app.use('/api/auth', _auth2.default);
app.use('/api/users', _users2.default);
app.use('/api/messages', _messages2.default);
app.use('/api/notifications', _notifications2.default);
app.use('/api/chats', _chats2.default);
app.get('/', function (req, res) {
	res.send('About page');
});

var server = _http2.default.createServer(app);
var io = (0, _socket2.default)(server, {
	cors: { origin: "*" }
});

io.on('connection', function (socket) {
	console.log('|' + socket.id + '| connected');
	socket.on('disconnect', function () {
		console.log('|' + socket.id + '| disconnected');
		socket.removeAllListeners();
	});
	socket.on('message', function (message, chatId) {
		io.sockets.emit('message', message, chatId);
	});
	socket.on('writing', function (user) {
		socket.broadcast.emit('writing', user);
	});
});

var PORT = process.env.PORT || 3000;
server.listen(PORT, function () {
	return console.log('Server is running on port http://localhost:' + PORT + '...');
});
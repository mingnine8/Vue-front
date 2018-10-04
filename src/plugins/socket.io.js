import io from 'socket.io-client';
//const io = require('socket.io-client');
let socket = io('http://localhost:3113', { autoConnect: false });

export default socket;
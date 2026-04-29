import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import User from './models/Users.js';
import authRoute from './routes/auth.js';
import cookieParser from 'cookie-parser';
import todoRoute from './routes/todos.js';
import caseRoute from './routes/case.js';
import adminCreateWeapon from './routes/admin.js';
import Items from './models/Items.js';
import { createCase, seedItems } from './seed/items.js';
import http from 'http';
import { Server } from 'socket.io';

dotenv.config();

const app = express();
app.use(
  cors({
    origin: process.env.APICLIENT,
    credentials: true,
  })
);
const server = http.createServer(app);
const PORT = process.env.PORT || 3001;
app.use(express.json());
app.use(cookieParser());
export const io = new Server(server, {
  cors: {
    origin: process.env.APICLIENT,
    credentials: true,
  },
});

io.on('connection', (socket) => {
  io.emit('users_online', io.sockets.sockets.size);
  console.log('Users', io.sockets.sockets.size);

  socket.on('disconnect', () => {
    io.emit('users_online', io.sockets.sockets.size);
  });

  socket.on('get_users_online', () => {
    // ✅ клиент сам запрашивает
    socket.emit('users_online', io.sockets.sockets.size);
  });
});

const bannedip = new Set([
  //'93.123.84.40',
  // '93.23.4.40',
  //'94.103.0.47',
  //'94.103.0.232',
  //'95.153.182.144',
]);
const checkip = async (req, res, next) => {
  const ip2 = req.ip;
  const headers = req.headers['x-forwarded-for'];
  console.log(ip2, headers);
  const result = bannedip.has(ip2);
  // const result = bannedip.some((ip) => ip === ip2);
  console.log(result);
  if (result) {
    return res.status(403).json({ message: 'Вы забанены!' });
  }

  next();
};
app.set('trust proxy', 1);
// Routes
app.use('/api/auth', checkip, authRoute);
app.use('/api/todo', checkip, todoRoute);
app.use('/api/case', caseRoute);
app.use('/api/admin', adminCreateWeapon);

//app.get('/', (req, res) => {
// return res.json({ mesage: 'API IS Running' });
//});

app.post('/testuser', async (req, res) => {
  try {
    const user = await User.create({ username: 'Bob', password: '12345' });
    res.json(user);
  } catch (error) {
    res.status(400).json({ error: err.mesage });
  }
});

app.use((req, res) => {
  res.status(404).json({ mesage: 'Route not found' });
});

const startServer = async () => {
  try {
    //await createCase();
    //await seedItems();
    await mongoose.connect(process.env.MONGO_URI);

    console.log('MongoDB connected');
    server.listen(PORT, () => console.log(`Server runnig on port ${PORT}`));
  } catch (err) {
    console.error('MongoDB error', err);
  }
};

startServer();

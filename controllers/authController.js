import User from '../models/Users.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
//register user
export const register = async (req, res) => {
  try {
    const { username, password } = req.body;
    const isUsed = await User.findOne({ username });
    if (isUsed) {
      return res.status(400).json({ message: 'Имя уже занято' });
    }
    if (!password) {
      return res.status(400).json({ message: 'Введите пароль' });
    }
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    const newUser = new User({
      username,
      password: hash,
    });
    await newUser.save();
    const token = jwt.sign(
      {
        id: newUser._id,
      },
      process.env.JWT_SECRET,
      { expiresIn: '2h' }
    );
    console.log(token);
    return res
      .cookie('token', token, {
        httpOnly: true,
        sameSite: 'none',
        secure: true,
        maxAge: 2 * 60 * 60 * 1000,
      })
      .json({
        user: {
          id: newUser._id,
          username: newUser.username,
          createdAt: newUser.createdAt,
          updatedAt: newUser.updatedAt,
        },
        message: 'Регистрация прошла успешно',
      });
  } catch (err) {
    return res.status(500).json({ message: 'Ошибка при регистрации.' });
  }
};

//login user
export const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: 'Пользователь не найден' });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: 'Неверный пароль' });
    }
    const token = jwt.sign(
      {
        id: user._id,
      },
      process.env.JWT_SECRET,
      { expiresIn: '2h' }
    );
    console.log(token);
    return res
      .cookie('token', token, {
        httpOnly: true,
        sameSite: 'none',
        secure: true,
        maxAge: 2 * 60 * 60 * 1000,
      })
      .json({
        message: 'Успешный вход',
        user: {
          id: user._id,
          username: user.username,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt,
        },
      });
  } catch (err) {
    return res.status(500).json({ message: 'Ошибка при авторизации' });
  }
};

//logout
export const logout = async (req, res) => {
  try {
    res.cookie('token', '', {
      httpOnly: true,
      maxAge: 0,
      sameSite: 'none',
      secure: true,
    });
    return res.json({ message: 'Выход выполнен' });
  } catch (error) {
    return res.status(500).json({ message: 'Ошибка при выходе' });
  }
};

//get me
export const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(400).json({ message: 'Пользователь не найден' });
    }

    return res.json({
      message: 'Успешная проверка',
      user: {
        id: user._id,
        username: user.username,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      },
    });
  } catch (err) {
    return res.status(500).json({ message: 'Ошибка сервера' });
  }
};

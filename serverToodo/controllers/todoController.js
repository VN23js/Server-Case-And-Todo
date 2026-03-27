import Todo from '../models/Todo.js';

export const createTodo = async (req, res) => {
  try {
    const { title, text } = req.body;
    const isLong = 100;
    const maxText = title.length > isLong;

    if (maxText) {
      return res.status(400).json({ message: 'Слишком длинный заголовок !' });
    }
    if (!title || !text) {
      return res.status(400).json({ message: 'Заполните все поля!' });
    }
    const newTodo = new Todo({
      title,
      text,
      userId: req.userId,
    });
    await newTodo.save();
    //console.log(newTodo);
    return res.json({
      message: 'Задача успешно создана.',
      newTodo,
    });
  } catch (error) {
    return res.status(500).json({ message: 'Ошибка при создание задачи.' });
  }
};

export const getTodo = async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;
    console.log(page);
    const limit = 5;
    const totalTodos = await Todo.countDocuments({ userId: req.userId });
    console.log(totalTodos);
    const todos = await Todo.find({ userId: req.userId })
      .sort({
        createdAt: -1,
      })
      .skip((page - 1) * limit)
      .limit(limit);
    const hasMore = page * limit < totalTodos;
    if (todos.length === 0) {
      return res.status(200).json({ message: 'Задач пока нету.' });
    }
    return res.json({
      message: 'Список задач',
      todos: todos || [],
      totalTodos,
      hasMore,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Ошибка при при получение задач.' });
  }
};

export const updateTodo = async (req, res) => {
  try {
    const { title, text, id, completed } = req.body;
    const isLong = 100;
    const maxText = title.length > isLong;

    if (maxText) {
      return res.status(400).json({ message: 'Слишком длинный заголовок !' });
    }
    const todos = await Todo.findById(id);
    if (!todos) {
      return res.status(404).json({ message: 'Задача не найдена.' });
    }

    if (todos.userId.toString() !== req.userId) {
      return res.status(403).json({
        message: 'Вы не являетесь автором этого поста',
      });
    }

    todos.completed = !todos.completed;
    console.log(todos.completed);
    todos.title = title;
    todos.text = text;
    await todos.save();
    return res.json({ message: 'Задача успешно обновлена', todos });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Ошибка при обновлении задачи.' });
  }
};

export const deleteTodo = async (req, res) => {
  try {
    const { id } = req.body;
    const todos = await Todo.findByIdAndDelete({
      _id: id,
      userId: req.userId,
    });
    if (!todos) {
      return res.status(404).json({ message: 'Задача не найдена.' });
    }

    return res.json({ message: 'Задача успешно удалена', todos });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Ошибка при удалении задачи.' });
  }
};

export const completedTodo = async (req, res) => {
  try {
    const { id } = req.body;

    const todos = await Todo.findOne({
      _id: id,
      userId: req.userId,
    });

    if (!todos) {
      return res.status(404).json({ message: 'Задача не найдена.' });
    }
    todos.completed = !todos.completed;
    await todos.save();
    return res.json({ message: 'Задача обновлена.', todos });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Ошибка.' });
  }
};

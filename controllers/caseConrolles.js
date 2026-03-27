import { io } from '../index.js';
import Case from '../models/Case.js';
import Items from '../models/Items.js';
import RouletteSession from '../models/RouletteSessionSchema.js';

export const getCase = async (req, res) => {
  try {
    const caseId = req.params.id;
    const caseData = await Case.findById(caseId);
    const caseItems = await Items.find({
      _id: { $in: caseData.items },
    });
    const newSortedItems = caseData.items.map((itemId) => {
      return caseItems.find(
        (item) => item._id.toString() === itemId.toString()
      );
    });

    return res.json({ caseItems: newSortedItems });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Ошибка сервера при получении предметов',
      error: error.message,
    });
  }
};
export const getAllSession = async (req, res) => {
  try {
    const session = await RouletteSession.find({ isSpinned: true })
      .sort({
        updatedAt: -1,
      })
      .limit(10);

    const allWinItems = session.map((item) => {
      return item.winIndex;
    });

    const newlistId = await Items.find({
      _id: { $in: allWinItems },
    });
    const result = allWinItems.map((id) =>
      newlistId.find((item) => item._id.toString() === id.toString())
    );
    const DataWinIndex = session.map((item) => {
      const winItem = result.find(
        (s) => s._id.toString() === item.winIndex.toString()
      );
      return { ...item._doc, winItem };
    });

    return res.json({ DataWinIndex });
  } catch (error) {
    res.status(500).json({
      message: 'Ошибка сервера при получении кейсов',
      error: error.message,
    });
  }
};

export const getInvenory = async (req, res) => {
  try {
    const allSession = await RouletteSession.find({
      isSpinned: true,
      userId: req.userId,
    }).sort({ updatedAt: -1 });

    if (allSession.length === 0) {
      return res.json({ inventory: [] });
    }
    console.log(allSession);
    const allWinItems = allSession.map((item) => {
      return item.winIndex;
    });
    console.log(allWinItems);
    const listinvetory = await Items.find({
      _id: { $in: allWinItems },
    });
    const result = allWinItems.map((id) =>
      listinvetory.find((item) => item._id.toString() === id.toString())
    );
    console.log(result);
    return res.json({ inventory: result });
  } catch (error) {
    res.status(500).json({
      message: 'Ошибка сервера при получении предметов',
      error: error.message,
    });
  }
};

export const getCaseMain = async (req, res) => {
  try {
    const cases = await Case.find({});

    return res.json({ cases });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Ошибка сервера при получении кейсов',
      error: error.message,
    });
  }
};

export const randomtItems = async (req, res) => {
  try {
    const caseId = req.params.id; // айди кейса
    const caseData = await Case.findById(caseId); // находим кейс по айди
    const items = await Items.find({
      _id: { $in: caseData.items },
    });

    function shuffleArray(array) {
      const arr = [...array];

      for (let i = arr.length - 1; i > 0; i--) {
        const randomIndex = Math.floor(Math.random() * (i + 1));

        [arr[i], arr[randomIndex]] = [arr[randomIndex], arr[i]];
      }

      return arr;
    }
    const shuffled = shuffleArray(items);

    if (!req.userId) {
      return res.json({ itemsrulet: shuffled, CaseName: caseData.name });
    }

    const lookSession = await RouletteSession.findOne({
      userId: req.userId,
      isSpinned: false,
      caseId: caseId,
    });
    if (!lookSession) {
      // if dont have session
      const itemsOrderId = shuffled.map((item) => item._id);
      const session = await RouletteSession.create({
        userId: req.userId,
        itemsOrder: itemsOrderId,
        caseId: caseId,
      });
      // В таблице Items ищем массив
      const newlistId = await Items.find({
        _id: { $in: session.itemsOrder },
      });
      //  newlistId находит нам  предметы  по порядку
      // newSortedItems возвращает порядок какой  находиться в Session
      const newSortedItems = session.itemsOrder.map((itemId) => {
        return newlistId.find(
          (item) => item._id.toString() === itemId.toString()
        );
      });
      res.json({ itemsrulet: newSortedItems, CaseName: caseData.name });
    }
    // Если есть Session
    const listItems = await Items.find({
      _id: { $in: lookSession.itemsOrder },
    });
    const sortedItems = lookSession.itemsOrder.map((itemId) => {
      return listItems.find(
        (item) => item._id.toString() === itemId.toString()
      );
    });

    return res.json({ itemsrulet: sortedItems, CaseName: caseData.name });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Ошибка сервера при получении предметов',
      error: error.message,
    });
  }
};

export const randomRulet = async (req, res) => {
  try {
    const caseId = req.params.id;
    const session = await RouletteSession.findOne({
      userId: req.userId,
      isSpinned: false,
      caseId: caseId,
    });

    const winIndex = Math.floor(Math.random() * session.itemsOrder.length);
    const winItemId = session.itemsOrder[winIndex];
    const winItem = await Items.findById(winItemId);
    console.log(session.itemsOrder.length);
    console.log(winItem);
    console.log(winIndex);
    const isSpinnedTrue = true;
    session.isSpinned = isSpinnedTrue;
    session.winIndex = winItemId._id.toString();
    await session.save();

    //
    const WinIndex = () => {
      if (winItem._id.toString() === session.winIndex) {
        return {
          ...session._doc,
          winItem,
        };
      }
    };
    const DataWinIndex = WinIndex();

    //new session
    const newSession = await RouletteSession.create({
      userId: req.userId,
      itemsOrder: session.itemsOrder,
      caseId: caseId,
    });
    io.emit('new_drop', DataWinIndex);
    return res.json({ winIndex, winItem });
  } catch (error) {
    res.status(500).json({
      message: 'Ошибка сервера',
      error: error.message,
    });
  }
};

import { io } from '../index.js';
import Case from '../models/Case.js';
import Items from '../models/Items.js';
import RouletteSession from '../models/RouletteSessionSchema.js';
import Users from '../models/Users.js';

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
    //// Поиск кейсов
    const casesId = session.map((itme) => {
      return itme.caseId;
    });
    const casesFullData = await Case.find({
      _id: { $in: casesId },
    });

    ////Поиск кейсов
    /* const DataWinInde = session.map((item) => {
      const winItem = result.find(
        (s) => s._id.toString() === item.winIndex.toString()
      );

      return { ...item._doc, winItem };
    });
    const DataWinIndex = DataWinInde.map((item) => {
      const CasesFullData = casesFullData.find(
        (s) => s._id.toString() === item.caseId.toString()
      );

      return { ...item, CasesFullData };
    });
*/ const itemsMap = new Map(
      newlistId.map((item) => [item._id.toString(), item])
    );
    const casesMap = new Map(
      casesFullData.map((item) => [item._id.toString(), item])
    );
    const DataWinIndex = session.map((item) => {
      const winItem = itemsMap.get(item.winIndex.toString());
      const casesData = casesMap.get(item.caseId.toString());
      return {
        ...item._doc,
        winItem,
        casesData,
      };
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

    const allWinItems = allSession.map((item) => {
      return item.winIndex;
    });
    /// console.log(allWinItems);
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
    //// Поиск кейсов

    const casesData = await Case.findById(caseId);

    ////Поиск кейсов

    const WinIndex = () => {
      return {
        ...session._doc,
        winItem,
        casesData,
      };
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

export const GetCaseUser = async (req, res) => {
  try {
    const id = req.params.id;
    console.log(id);
    const UserInfo = await Users.findById(id);
    if (!UserInfo) {
      return res
        .status(400)
        .json({ message: 'Ошибка нету такого пользователя' });
    }
    console.log({ UserName: UserInfo.username });

    const session = await RouletteSession.find({
      userId: id,
      isSpinned: true,
    }).sort({
      updatedAt: -1,
    });

    const itemsId = session.map((item) => {
      return item.winIndex;
    });
    const itemData = await Items.find({
      _id: { $in: itemsId },
    });
    const maxPriceItem = itemData.reduce((max, item) => {
      if (item.price > max.price) {
        return {
          _id: item._id,
          nameSkin: item.nameSkin,
          nameWeapon: item.nameWeapon,
          linkImg: item.linkImg,
          price: item.price,
        };
      }
      return max;
    }, itemData[0]);
    // Все предметы
    const allWinItems = session.map((item) => {
      return item.winIndex;
    });
    /// console.log(allWinItems);
    const listinvetory = await Items.find({
      _id: { $in: allWinItems },
    });
    const result = allWinItems.map((id) =>
      listinvetory.find((item) => item._id.toString() === id.toString())
    );
    //Все предметы
    if (itemData.length === 0) {
      return res.json({
        maxPriceItem: null,
        UserName: UserInfo.username,
        inventory: null,
      });
    }
    return res.json({
      maxPriceItem,
      UserName: UserInfo.username,
      inventory: result,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Ошибка не удалось найти такого пользователя',
      error: error.message,
    });
  }
};

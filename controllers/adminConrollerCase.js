export const createAdminWeapon = async (req, res) => {
  console.log(req.body.payloadData);
  try {
    return res.json({
      message: 'Успех',
    });
  } catch (error) {
    res.status(500).json({
      message: 'Ошибка не удалось',
      error: error.message,
    });
  }
};

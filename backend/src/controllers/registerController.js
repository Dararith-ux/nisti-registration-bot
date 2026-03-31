import Registration from '../models/Registration.js';

// Handle Telegram Mini App registration requests.
export const createRegistration = async (req, res, next) => {
  try {
    const { fullName, gender, institution, phone, email, telegramUser } = req.body;

    // Telegram user data is expected from WebApp SDK on the frontend.
    const telegramId =
      String(telegramUser?.id || req.body.telegramId || '').trim();

    if (!telegramId) {
      return res.status(400).json({
        success: false,
        message: 'Telegram user id is required.'
      });
    }

    const requiredFields = { fullName, gender, institution, phone, email };
    const missingField = Object.entries(requiredFields).find(([, value]) => !value)?.[0];

    if (missingField) {
      return res.status(400).json({
        success: false,
        message: `Missing required field: ${missingField}`
      });
    }

    const existingRegistration = await Registration.findOne({ telegramId });

    if (existingRegistration) {
      return res.status(409).json({
        success: false,
        message: 'This Telegram account is already registered.'
      });
    }

    const registration = await Registration.create({
      telegramId,
      telegramUsername: telegramUser?.username || '',
      telegramFirstName: telegramUser?.first_name || '',
      telegramLastName: telegramUser?.last_name || '',
      fullName,
      gender,
      institution,
      phone,
      email
    });

    return res.status(201).json({
      success: true,
      message: 'Registration successful.',
      data: {
        id: registration._id,
        telegramId: registration.telegramId,
        fullName: registration.fullName
      }
    });
  } catch (error) {
    // Handle MongoDB duplicate key errors as a safe fallback.
    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: 'This Telegram account is already registered.'
      });
    }

    return next(error);
  }
};

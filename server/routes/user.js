import express from 'express';
import bcrypt from 'bcrypt';
import { User } from '../models/User.js';

const router = express.Router();

router.post('/register', async (req, res) => {
  const { name, username, password, email, phone, dob, gender } = req.body;

  try {
    const user = await User.findOne({ username });
    if (user) {
      return res.status(400).json({ success: false, message: 'Username đã tồn tại' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      username,
      password: hashedPassword,
      email,
      phone,
      dob,
      gender,
    });

    await newUser.save();
    return res.status(201).json({ success: true, message: 'Đăng ký thành công!' });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Đăng ký thất bại. Vui lòng thử lại.', error });
  }
});
export {router as UserRouter}

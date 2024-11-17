  import express from 'express';
  import { Admin } from '../models/Admin.js';
  import { User } from '../models/User.js';
  import jwt from 'jsonwebtoken';
  import bcrypt from 'bcrypt';

  const router = express.Router();

  router.post('/login', async (req, res) => {
    try {
      const { username, password } = req.body;
      
      // Kiểm tra nếu là admin
      const admin = await Admin.findOne({ username });
      if (admin) {
        const validPassword = await bcrypt.compare(password, admin.password);
        if (!validPassword) {
          return res.json({ message: 'Sai mật khẩu' });
        }
        // Tạo token với thông tin admin
        const token = jwt.sign({ username: admin.username, role: admin.role, userId: admin._id }, process.env.Admin_Key);
        res.cookie('token', token, { httpOnly: true, secure: true });
        return res.json({ login: true, role: admin.role, username: admin.username, userId: admin._id });
      }

      // Kiểm tra nếu là user
      const user = await User.findOne({ username });
      if (user) {
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
          return res.json({ message: 'Sai mật khẩu' });
        }
        // Tạo token với thông tin user
        const token = jwt.sign({ username: user.username, role: 'user', userId: user._id }, process.env.User_Key);
        res.cookie('token', token, { httpOnly: true, secure: true });
        return res.json({ login: true, role: 'user', username: user.username, userId: user._id ,token: token});
      }

      return res.json({ message: 'Người dùng không tồn tại' });
    } catch (er) {
      res.status(500).json({ message: 'Lỗi máy chủ', error: er.message });
    }
  });

  const verifyAdmin = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
      return res.json({ message: 'Admin không hợp lệ' });
    } else {
      jwt.verify(token, process.env.Admin_Key, (err, decoded) => {
        if (err) {
          return res.json({ message: 'Token không hợp lệ' });
        } else {
          req.username = decoded.username;
          req.role = decoded.role;
          if (req.role.startsWith('admin')) {
            next();
          } else {
            return res.json({ message: 'Quyền không hợp lệ' });
          }
        }
      });
    }
  };

  const verifyUser = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
      return res.json({ message: 'User không hợp lệ' });
    } else {
      jwt.verify(token, process.env.User_Key, (err, decoded) => {
        if (err) {
          return res.json({ message: 'Token không hợp lệ' });
        } else {
          req.username = decoded.username;
          req.role = decoded.role || 'user';
          req.userId = decoded.userId;
          next();
        }
      });
    }
  };

  router.get('/verify', verifyUser, (req, res) => {
    return res.json({ login: true, role: req.role, username: req.username, userId: req.userId });
  });

  router.get('/logout', (req, res) => {
    res.clearCookie('token');
    return res.json({ logout: true });
  });

  export { router as AdminRouter, verifyAdmin, verifyUser };

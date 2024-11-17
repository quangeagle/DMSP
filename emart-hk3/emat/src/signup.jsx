import React, { useState } from "react";
import Footer from "./footer";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [dob, setDob] = useState("");
  const [phone, setPhone] = useState("");
  const [gender, setGender] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validate = () => {
    const newErrors = {};

    // Kiểm tra email
    const emailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
    if (!emailRegex.test(email)) {
      newErrors.email = "Email phải đúng định dạng @gmail.com.";
    }

    // Kiểm tra số điện thoại
    const phoneRegex = /^0\d{9}$/;
    if (!phoneRegex.test(phone)) {
      newErrors.phone = "Số điện thoại phải bắt đầu bằng số 0 và gồm 10 chữ số.";
    }

    // Kiểm tra mật khẩu
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
    if (!passwordRegex.test(password)) {
      newErrors.password =
        "Mật khẩu phải có ít nhất 6 ký tự, gồm 1 chữ hoa, 1 chữ thường, 1 số và 1 ký tự đặc biệt.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validate()) {
      return; // Ngăn gửi form nếu không hợp lệ
    }

    axios
      .post("http://localhost:3004/user/register", {
        username,
        name,
        email,
        password,
        dob,
        gender,
        phone,
      })
      .then((res) => {
        if (res.data.success) {
          navigate("/login");
        } else {
          alert(res.data.message);
        }
      })
      .catch((err) => {
        console.error(err);
        alert("Đăng ký thất bại. Vui lòng thử lại.");
      });
  };

  return (
    <>
      <div className="bg-slate-100">
        <div className="w-3/5 ml-12">
          <p className="text-4xl w-full pb-8 pl-24 pt-3">Đăng Kí Tài Khoản</p>
          <div>
            <div>
              <div className="ml-4">
                <div className="container">
                  <div className="mb-4">
                    <form className="student-form" onSubmit={handleSubmit}>
                      <label className="text-gray-700 mb-2">Tên</label>
                      <input
                        type="text"
                        className="border border-gray-300 p-2 rounded w-full"
                        placeholder="Nhập tên"
                        onChange={(e) => setName(e.target.value)}
                      />
                      <label className="text-gray-700 mb-2">Tên đăng nhập</label>
                      <input
                        type="text"
                        className="border border-gray-300 p-2 rounded w-full mb-4"
                        placeholder="Nhập tên đăng nhập"
                        onChange={(e) => setUsername(e.target.value)}
                      />
                      <label className="text-gray-700 mb-2">Số điện thoại</label>
                      <input
                        type="text"
                        className="border border-gray-300 p-2 rounded w-full mb-4"
                        placeholder="Nhập số điện thoại"
                        onChange={(e) => setPhone(e.target.value)}
                      />
                      {errors.phone && <p className="text-red-500">{errors.phone}</p>}
                      <label className="text-gray-700 mb-2">Email</label>
                      <input
                        type="email"
                        className="border border-gray-300 p-2 rounded w-full mb-4"
                        placeholder="Nhập email"
                        onChange={(e) => setEmail(e.target.value)}
                      />
                      {errors.email && <p className="text-red-500">{errors.email}</p>}
                      <label className="text-gray-700 mb-2">Mật khẩu</label>
                      <input
                        type="password"
                        className="border-gray-300 p-2 rounded w-full mb-4"
                        placeholder="Nhập mật khẩu"
                        onChange={(e) => setPassword(e.target.value)}
                      />
                      {errors.password && (
                        <p className="text-red-500">{errors.password}</p>
                      )}
                      <div className="flex items-center">
                        <div className="w-1/2 pr-2">
                          <label className="text-gray-700 mb-2">Ngày sinh</label>
                          <input
                            type="date"
                            className="border border-gray-300 p-2 rounded w-full"
                            onChange={(e) => setDob(e.target.value)}
                          />
                        </div>
                        <div className="w-1/2 pl-2">
                          <label className="text-gray-700 mb-2">Giới tính</label>
                          <div className="flex items-center">
                            <label className="mr-4 flex items-center">
                              <input
                                type="radio"
                                name="gender"
                                value="male"
                                className="form-radio h-4 w-4 text-yellow-500"
                                onChange={(e) => setGender(e.target.value)}
                              />
                              <span className="ml-2">Nam</span>
                            </label>
                            <label className="flex items-center">
                              <input
                                type="radio"
                                name="gender"
                                value="female"
                                className="form-radio h-4 w-4 text-yellow-500"
                                onChange={(e) => setGender(e.target.value)}
                              />
                              <span className="ml-2">Nữ</span>
                            </label>
                          </div>
                        </div>
                      </div>
                      <button
                        type="submit"
                        className="mt-3 bg-white hover:bg-gray-500 p-2"
                      >
                        Đăng Kí
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default Signup;

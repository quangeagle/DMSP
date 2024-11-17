// UserContext.js
import React, { createContext, useState, useContext } from 'react';

// Tạo Context
const UserContext = createContext();

// Tạo Provider
export function UserProvider({ children }) {
  const [userId, setUserId] = useState(null);

  // Hàm để cập nhật userId
  const updateUserId = (id) => {
    setUserId(id);
  };

  return (
    <UserContext.Provider value={{ userId, updateUserId }}>
{children}
    </UserContext.Provider>
  );
}

// Hook tùy chỉnh để sử dụng context
export function useUser() {
  return useContext(UserContext);
}

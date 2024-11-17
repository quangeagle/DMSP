// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useUser } from './UserContext';

// const Shipping = () => {
//   const [cartItems, setCartItems] = useState([]);
//   const [shippingInfo, setShippingInfo] = useState({
//     address: '',
//     name: '',
//     phone: '',
//     email: '',
//     selectedDate: '',
//     selectedTime: '',
//     paymentMethod: 'COD', // Default to 'COD' or 'CreditCard'
//     creditCardNumber: '',
//     expiryDate: '',
//     securityCode: '',
//     note: ''
//   });
//   const { userId } = useUser();
//   const [errors, setErrors] = useState({});

//   useEffect(() => {
//     if (userId) {
//       axios.get(`http://localhost:3004/cart/${userId}`)
//         .then(response => {
//           console.log('Cart items response:', response.data);
//           if (response.data && Array.isArray(response.data.cartItems)) {
//             setCartItems(response.data.cartItems);
//           } else {
//             console.error('Received data is not in the expected format:', response.data);
//             setCartItems([]);
//           }
//         })
//         .catch(error => {
//           console.error('Error fetching cart items:', error);
//         });
//     }
//   }, [userId]);

//   const handleShippingInfoChange = (e) => {
//     const { name, value } = e.target;
//     setShippingInfo({
//       ...shippingInfo,
//       [name]: value,
//     });
//   };

//   const validate = () => {
//     const newErrors = {};

//     // Address validation for "Ho Chi Minh"
//     if (!/Việt Nam.*Hồ Chí Minh/i.test(shippingInfo.address)) {
//       newErrors.address = 'Address must include "Việt Nam" and "Hồ Chí Minh".';
//     }

//     // Phone number validation: must be 10 digits
//     if (!/^\d{10}$/.test(shippingInfo.phone)) {
//       newErrors.phone = 'Phone number must be exactly 10 digits.';
//     }

//     // Email validation for "@gmail.com"
//     if (!/^[a-zA-Z0-9._%+-]+@gmail\.com$/.test(shippingInfo.email)) {
//       newErrors.email = 'Email must be a valid Gmail address ending in @gmail.com.';
//     }

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleSubmit = () => {
//     if (validate()) {
//       axios.post('http://localhost:3004/ship/themship', { 
//         ...shippingInfo, 
//         userId,
//         orderItems: cartItems.map(item => ({
//           productId: item.productId._id,
//           quantity: item.quantity
//         }))
//       })
//         .then(response => {
//           console.log('Shipping info saved successfully');
//         })
//         .catch(error => {
//           console.error('Error saving shipping info:', error);
//         });
//     } else {
//       console.error('Validation errors:', errors);
//     }
//   };

//   // Calculate today's date and max date for the delivery date field
//   const today = new Date();
//   const maxDate = new Date();
//   maxDate.setDate(today.getDate() + 7);

//   // Format date to yyyy-mm-dd for HTML date input
//   const formatDate = (date) => date.toISOString().split('T')[0];

//   return (
//     <div className="p-4">
//       <h2 className="text-xl font-bold mb-4">Giỏ hàng</h2>
//       {/* Cart items display omitted for brevity */}
//       <table className="w-full border-collapse border">
//         <thead>
//           <tr>
//             <th className="border p-2">Hình sản phẩm</th>
//             <th className="border p-2">Tên sản phẩm</th>
//             <th className="border p-2">Số lượng</th>
//             <th className="border p-2">Giá</th>
//           </tr>
//         </thead>
//         <tbody>
//           {cartItems.length > 0 ? (
//             cartItems.map(item => (
//               <tr key={item._id || item.productId}>
//                 <td className="border p-2">
//                   <img src={item.productId.imageUrl} alt="Product" className="w-20 h-20 object-cover" />
//                 </td>
//                 <td className="border p-2">{item.productId.name}</td>
//                 <td className="border p-2">{item.quantity}</td>
//                 <td className="border p-2">{item.productId.price}₫</td>
//               </tr>
//             ))
//           ) : (
//             <tr>
//               <td colSpan="4" className="border p-2 text-center">Giỏ hàng trống</td>
//             </tr>
//           )}
//         </tbody>
//       </table>
//       <h2 className="text-xl font-bold mt-6 mb-4">Thông tin giao hàng</h2>
//       <div className="mb-4">
//         <label className="block mb-2">
//           Địa chỉ:
//           <input
//             type="text"
//             name="address"
//             value={shippingInfo.address}
//             onChange={handleShippingInfoChange}
//             className="border p-2 w-full"
//           />
//           {errors.address && <p className="text-red-500">{errors.address}</p>}
//         </label>
//         <label className="block mb-2">
//           Tên:
//           <input
//             type="text"
//             name="name"
//             value={shippingInfo.name}
//             onChange={handleShippingInfoChange}
//             className="border p-2 w-full"
//           />
//         </label>
//         <label className="block mb-2">
//           Số điện thoại:
//           <input
//             type="text"
//             name="phone"
//             value={shippingInfo.phone}
//             onChange={handleShippingInfoChange}
//             className="border p-2 w-full"
//           />
//           {errors.phone && <p className="text-red-500">{errors.phone}</p>}
//         </label>
//         <label className="block mb-2">
//           Email:
//           <input
//             type="email"
//             name="email"
//             value={shippingInfo.email}
//             onChange={handleShippingInfoChange}
//             className="border p-2 w-full"
//           />
//           {errors.email && <p className="text-red-500">{errors.email}</p>}
//         </label>
//         <label className="block mb-2">
//           Ngày giao hàng:
//           <input
//             type="date"
//             name="selectedDate"
//             value={shippingInfo.selectedDate}
//             min={formatDate(today)}
//             max={formatDate(maxDate)}
//             onChange={handleShippingInfoChange}
//             className="border p-2 w-full"
//           />
//         </label>
//         {/* Additional fields omitted for brevity */}
//       </div>
//       <button
//         onClick={handleSubmit}
//         className="bg-blue-500 text-white py-2 px-4 rounded"
//       >
//         Xác nhận
//       </button>
//     </div>
//   );
// };

// export default Shipping;




import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useUser } from './UserContext';
import { Navigate } from 'react-router-dom';
const today = new Date();
const maxDate = new Date();
maxDate.setDate(today.getDate() + 7);
const formatDate = (date) => {
  return date.toISOString().split('T')[0];
};
const Shipping = () => {
  const [cartItems, setCartItems] = useState([]); 
  const [shippingInfo, setShippingInfo] = useState({
    address: '',
    district: '',
    ward: '',
    name: '',
    phone: '',
    email: '',
    selectedDate: '',
  
   
  
  });
  const { userId } = useUser();
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');
  
  // Danh sách quận huyện tại TP Hồ Chí Minh
  const districtsHCM = [
    { code: '01', name: 'Quận 1' },
    { code: '02', name: 'Quận 2' },
    { code: '03', name: 'Quận 3' },
    { code: '04', name: 'Quận 4' },
    { code: '05', name: 'Quận 5' },
    { code: '06', name: 'Quận 6' },
    { code: '07', name: 'Quận 7' },
    { code: '08', name: 'Quận 8' },
    { code: '09', name: 'Quận 9' },
    { code: '10', name: 'Quận 10' },
    { code: '11', name: 'Quận 11' },
    { code: '12', name: 'Quận 12' },
    { code: '13', name: 'Quận Bình Tân' },
    { code: '14', name: 'Quận Bình Thạnh' },
    { code: '15', name: 'Quận Gò Vấp' },
    { code: '16', name: 'Quận Phú Nhuận' },
    { code: '17', name: 'Quận Tân Bình' },
    { code: '18', name: 'Quận Tân Phú' },
    { code: '19', name: 'Quận Thủ Đức' },
    { code: '20', name: 'Huyện Bình Chánh' },
    { code: '21', name: 'Huyện Cần Giờ' },
    { code: '22', name: 'Huyện Củ Chi' },
    { code: '23', name: 'Huyện Hóc Môn' },
    { code: '24', name: 'Huyện Nhà Bè' }
  ];
  // Danh sách phường cho mỗi quận
  const wardsData = {
    '01': [
      { code: '001', name: 'Phường Tân Định' },
      { code: '002', name: 'Phường Đa Kao' },
      { code: '003', name: 'Phường Bến Nghé' },
      { code: '004', name: 'Phường Bến Thành' },
      { code: '005', name: 'Phường Nguyễn Thái Bình' },
      { code: '006', name: 'Phường Phạm Ngũ Lão' },
      { code: '007', name: 'Phường Cầu Ông Lãnh' },
      { code: '008', name: 'Phường Cô Giang' },
      { code: '009', name: 'Phường Nguyễn Cư Trinh' },
      { code: '010', name: 'Phường Cầu Kho' },
    ],
    '02': [
      { code: '001', name: 'Phường Thảo Điền' },
      { code: '002', name: 'Phường An Phú' },
      { code: '003', name: 'Phường Bình An' },
      { code: '004', name: 'Phường Bình Trưng Đông' },
      { code: '005', name: 'Phường Bình Trưng Tây' },
      { code: '006', name: 'Phường Bình Khánh' },
      { code: '007', name: 'Phường An Khánh' },
      { code: '008', name: 'Phường Thủ Thiêm' },
    ],
    '03': [
      { code: '001', name: 'Phường Võ Thị Sáu' },
      { code: '002', name: 'Phường 2' },
      { code: '003', name: 'Phường 3' },
      { code: '004', name: 'Phường 4' },
      { code: '005', name: 'Phường 5' },
      { code: '006', name: 'Phường 6' },
      { code: '007', name: 'Phường 7' },
      { code: '008', name: 'Phường 8' },
      { code: '009', name: 'Phường 9' },
      { code: '010', name: 'Phường 10' },
      { code: '011', name: 'Phường 11' },
      { code: '012', name: 'Phường 12' },
      { code: '013', name: 'Phường 13' },
      { code: '014', name: 'Phường 14' },
    ],
    '04': [
      { code: '001', name: 'Phường 1' },
      { code: '002', name: 'Phường 2' },
      { code: '003', name: 'Phường 3' },
      { code: '004', name: 'Phường 4' },
      { code: '005', name: 'Phường 5' },
      { code: '006', name: 'Phường 6' },
      { code: '007', name: 'Phường 8' },
      { code: '008', name: 'Phường 9' },
      { code: '009', name: 'Phường 10' },
      { code: '010', name: 'Phường 12' },
      { code: '011', name: 'Phường 13' },
      { code: '012', name: 'Phường 14' },
      { code: '013', name: 'Phường 15' },
      { code: '014', name: 'Phường 16' },
      { code: '015', name: 'Phường 18' },
    ],
    // Quận 5
    '05': [
      { code: '001', name: 'Phường 1' },
      { code: '002', name: 'Phường 2' },
      { code: '003', name: 'Phường 3' },
      { code: '004', name: 'Phường 4' },
      { code: '005', name: 'Phường 5' },
      { code: '006', name: 'Phường 6' },
      { code: '007', name: 'Phường 7' },
      { code: '008', name: 'Phường 8' },
      { code: '009', name: 'Phường 9' },
      { code: '010', name: 'Phường 10' },
      { code: '011', name: 'Phường 11' },
      { code: '012', name: 'Phường 12' },
      { code: '013', name: 'Phường 13' },
      { code: '014', name: 'Phường 14' },
      { code: '015', name: 'Phường 15' },
    ],
    // Quận 6
    '06': [
      { code: '001', name: 'Phường 1' },
      { code: '002', name: 'Phường 2' },
      { code: '003', name: 'Phường 3' },
      { code: '004', name: 'Phường 4' },
      { code: '005', name: 'Phường 5' },
      { code: '006', name: 'Phường 6' },
      { code: '007', name: 'Phường 7' },
      { code: '008', name: 'Phường 8' },
      { code: '009', name: 'Phường 9' },
      { code: '010', name: 'Phường 10' },
      { code: '011', name: 'Phường 11' },
      { code: '012', name: 'Phường 12' },
      { code: '013', name: 'Phường 13' },
      { code: '014', name: 'Phường 14' },
    ],
    // Quận 7
    '07': [
      { code: '001', name: 'Phường Tân Thuận Đông' },
      { code: '002', name: 'Phường Tân Thuận Tây' },
      { code: '003', name: 'Phường Tân Kiểng' },
      { code: '004', name: 'Phường Tân Hưng' },
      { code: '005', name: 'Phường Bình Thuận' },
      { code: '006', name: 'Phường Tân Quy' },
      { code: '007', name: 'Phường Phú Thuận' },
      { code: '008', name: 'Phường Tân Phú' },
      { code: '009', name: 'Phường Tân Phong' },
      { code: '010', name: 'Phường Phú Mỹ' },
    ],
    '08': [
    { code: '001', name: 'Phường 1' },
    { code: '002', name: 'Phường 2' },
    { code: '003', name: 'Phường 3' },
    { code: '004', name: 'Phường 4' },
    { code: '005', name: 'Phường 5' },
    { code: '006', name: 'Phường 6' },
    { code: '007', name: 'Phường 7' },
    { code: '008', name: 'Phường 8' },
    { code: '009', name: 'Phường 9' },
    { code: '010', name: 'Phường 10' },
    { code: '011', name: 'Phường 11' },
    { code: '012', name: 'Phường 12' },
    { code: '013', name: 'Phường 13' },
    { code: '014', name: 'Phường 14' },
    { code: '015', name: 'Phường 15' },
    { code: '016', name: 'Phường 16' },
  ],
  '09': [
    { code: '001', name: 'Phường Long Bình' },
    { code: '002', name: 'Phường Long Thạnh Mỹ' },
    { code: '003', name: 'Phường Tân Phú' },
    { code: '004', name: 'Phường Hiệp Phú' },
    { code: '005', name: 'Phường Tăng Nhơn Phú A' },
    { code: '006', name: 'Phường Tăng Nhơn Phú B' },
    { code: '007', name: 'Phường Phước Long A' },
    { code: '008', name: 'Phường Phước Long B' },
    { code: '009', name: 'Phường Trường Thạnh' },
    { code: '010', name: 'Phường Long Phước' },
    { code: '011', name: 'Phường Long Trường' },
    { code: '012', name: 'Phường Phước Bình' },
    { code: '013', name: 'Phường Phú Hữu' },
  ],
  

  // Quận 10
  '10': [
    { code: '001', name: 'Phường 1' },
    { code: '002', name: 'Phường 2' },
    { code: '003', name: 'Phường 3' },
    { code: '004', name: 'Phường 4' },
    { code: '005', name: 'Phường 5' },
    { code: '006', name: 'Phường 6' },
    { code: '007', name: 'Phường 7' },
    { code: '008', name: 'Phường 8' },
    { code: '009', name: 'Phường 9' },
    { code: '010', name: 'Phường 10' },
    { code: '011', name: 'Phường 11' },
    { code: '012', name: 'Phường 12' },
    { code: '013', name: 'Phường 13' },
    { code: '014', name: 'Phường 14' },
    { code: '015', name: 'Phường 15' },
  ],

  // Quận 11
  '11': [
    { code: '001', name: 'Phường 1' },
    { code: '002', name: 'Phường 2' },
    { code: '003', name: 'Phường 3' },
    { code: '004', name: 'Phường 4' },
    { code: '005', name: 'Phường 5' },
    { code: '006', name: 'Phường 6' },
    { code: '007', name: 'Phường 7' },
    { code: '008', name: 'Phường 8' },
    { code: '009', name: 'Phường 9' },
    { code: '010', name: 'Phường 10' },
    { code: '011', name: 'Phường 11' },
    { code: '012', name: 'Phường 12' },
    { code: '013', name: 'Phường 13' },
    { code: '014', name: 'Phường 14' },
    { code: '015', name: 'Phường 15' },
    { code: '016', name: 'Phường 16' },
  ],

  // Quận 12
  '12': [
    { code: '001', name: 'Phường Thạnh Xuân' },
    { code: '002', name: 'Phường Thạnh Lộc' },
    { code: '003', name: 'Phường Hiệp Thành' },
    { code: '004', name: 'Phường Thới An' },
    { code: '005', name: 'Phường Tân Chánh Hiệp' },
    { code: '006', name: 'Phường An Phú Đông' },
    { code: '007', name: 'Phường Tân Thới Hiệp' },
    { code: '008', name: 'Phường Trung Mỹ Tây' },
    { code: '009', name: 'Phường Tân Hưng Thuận' },
    { code: '010', name: 'Phường Đông Hưng Thuận' },
    { code: '011', name: 'Phường Tân Thới Nhất' },
  ],

  // Quận Bình Tân
  '13': [
    { code: '001', name: 'Phường An Lạc' },
    { code: '002', name: 'Phường An Lạc A' },
    { code: '003', name: 'Phường Bình Trị Đông' },
    { code: '004', name: 'Phường Bình Trị Đông A' },
    { code: '005', name: 'Phường Bình Trị Đông B' },
    { code: '006', name: 'Phường Tân Tạo' },
    { code: '007', name: 'Phường Tân Tạo A' },
  ],

  // Quận Bình Thạnh
  '14': [
    { code: '001', name: 'Phường 1' },
    { code: '002', name: 'Phường 2' },
    { code: '003', name: 'Phường 3' },
    { code: '004', name: 'Phường 5' },
    { code: '005', name: 'Phường 6' },
    { code: '006', name: 'Phường 7' },
    { code: '007', name: 'Phường 11' },
    { code: '008', name: 'Phường 12' },
    { code: '009', name: 'Phường 13' },
    { code: '010', name: 'Phường 14' },
    { code: '011', name: 'Phường 15' },
    { code: '012', name: 'Phường 17' },
    { code: '013', name: 'Phường 19' },
    { code: '014', name: 'Phường 21' },
    { code: '015', name: 'Phường 22' },
    { code: '016', name: 'Phường 24' },
    { code: '017', name: 'Phường 25' },
    { code: '018', name: 'Phường 26' },
    { code: '019', name: 'Phường 27' },
    { code: '020', name: 'Phường 28' },
  ],

  // Quận Gò Vấp
  '15': [
    { code: '001', name: 'Phường 1' },
    { code: '002', name: 'Phường 3' },
    { code: '003', name: 'Phường 4' },
    { code: '004', name: 'Phường 5' },
    { code: '005', name: 'Phường 6' },
    { code: '006', name: 'Phường 7' },
    { code: '007', name: 'Phường 8' },
    { code: '008', name: 'Phường 9' },
    { code: '009', name: 'Phường 10' },
    { code: '010', name: 'Phường 11' },
    { code: '011', name: 'Phường 12' },
    { code: '012', name: 'Phường 13' },
    { code: '013', name: 'Phường 14' },
    { code: '014', name: 'Phường 15' },
    { code: '015', name: 'Phường 16' },
    { code: '016', name: 'Phường 17' },
  ],

  // Quận Phú Nhuận
  '16': [
    { code: '001', name: 'Phường 1' },
    { code: '002', name: 'Phường 2' },
    { code: '003', name: 'Phường 3' },
    { code: '004', name: 'Phường 4' },
    { code: '005', name: 'Phường 5' },
    { code: '006', name: 'Phường 7' },
    { code: '007', name: 'Phường 8' },
    { code: '008', name: 'Phường 9' },
    { code: '009', name: 'Phường 10' },
    { code: '010', name: 'Phường 11' },
    { code: '011', name: 'Phường 12' },
    { code: '012', name: 'Phường 13' },
    { code: '013', name: 'Phường 14' },
    { code: '014', name: 'Phường 15' },
    { code: '015', name: 'Phường 17' },
  ],

  // Quận Tân Bình
  '17': [
    { code: '001', name: 'Phường 1' },
    { code: '002', name: 'Phường 2' },
    { code: '003', name: 'Phường 3' },
    { code: '004', name: 'Phường 4' },
    { code: '005', name: 'Phường 5' },
    { code: '006', name: 'Phường 6' },
    { code: '007', name: 'Phường 7' },
    { code: '008', name: 'Phường 8' },
    { code: '009', name: 'Phường 9' },
    { code: '010', name: 'Phường 10' },
    { code: '011', name: 'Phường 11' },
    { code: '012', name: 'Phường 12' },
    { code: '013', name: 'Phường 13' },
    { code: '014', name: 'Phường 14' },
    { code: '015', name: 'Phường 15' },
  ]

    // Thêm các phường cho các quận khác...
  };

  // State để lưu danh sách phường hiển thị theo quận
  const [wards, setWards] = useState([]);

  useEffect(() => {
    if (userId) {
      axios.get(`http://localhost:3004/cart/${userId}`)
        .then(response => {
          if (response.data && Array.isArray(response.data.cartItems)) {
            setCartItems(response.data.cartItems);
          } else {
            setCartItems([]);
          }
        })
        .catch(error => {
          console.error('Error fetching cart items:', error);
        });
    }
  }, [userId]);

  useEffect(() => {
    // Cập nhật danh sách phường khi quận thay đổi
    if (shippingInfo.district) {
      setWards(wardsData[shippingInfo.district] || []);
    } else {
      setWards([]);
    }
  }, [shippingInfo.district]);

  const handleShippingInfoChange = (e) => {
    const { name, value } = e.target;
    setShippingInfo({
      ...shippingInfo,
      [name]: value,
    });
  };

  const validate = () => {
    const newErrors = {};

    

    if (!/^\d{10}$/.test(shippingInfo.phone)) {
      newErrors.phone = 'Phone number must be exactly 10 digits.';
    }

    if (!/^[a-zA-Z0-9._%+-]+@gmail\.com$/.test(shippingInfo.email)) {
      newErrors.email = 'Email must be a valid Gmail address ending in @gmail.com.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validate()) {
      axios.post('http://localhost:3004/ship/themship', {
        ...shippingInfo,
        userId,
        orderItems: cartItems.map(item => {
          // Kiểm tra nếu productId tồn tại và không phải null
          if (item.productId && item.productId._id) {
            return {
              productId: item.productId._id,
              quantity: item.quantity
            };
          } else {
            console.error('Product ID is missing or invalid:', item);
            return null;  // Hoặc có thể xử lý cách khác nếu cần
          }
        }).filter(item => item !== null)  // Lọc bỏ các item bị lỗi
      })
      .then(response => {
        console.log('Shipping info saved successfully');
        setSuccessMessage('Đặt hàng thành công!');
        Navigate("/")
      })
      .catch(error => {
        console.error('Error saving shipping info:', error);
      });
    } else {
      console.error('Validation errors:', errors);
    }
  };

  const today = new Date();
  const maxDate = new Date();
  maxDate.setDate(today.getDate() + 7);

  // Format date to yyyy-mm-dd for HTML date input
  
  return (
    <div className="p-4">
      
      <h2 className="text-xl font-bold mb-4">Giỏ hàng</h2>
      <table className="w-full border-collapse border">
        <thead>
          <tr>
            <th className="border p-2">Hình sản phẩm</th>
            <th className="border p-2">Tên sản phẩm</th>
            <th className="border p-2">Số lượng</th>
            <th className="border p-2">Giá</th>
          </tr>
        </thead>
        <tbody>
        {cartItems.length > 0 ? (
  cartItems
    .filter(item => item.productId) // Only include items with a valid productId
    .map(item => (
              <tr key={item._id || item.productId}>
                <td className="border p-2">
                  <img src={item.productId.imageUrl} alt="Product" className="w-20 h-20 object-cover" />
                </td>
                <td className="border p-2">{item.productId.name}</td>
                <td className="border p-2">{item.quantity}</td>
                <td className="border p-2">{item.productId.price}₫</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="border p-2 text-center">Giỏ hàng trống</td>
            </tr>
          )}
        </tbody>
      </table>
      <h2 className="text-xl font-bold mt-6 mb-4">Thông tin giao hàng</h2>
      <div className="mb-4">
        <label className="block mb-2">
          Quận:
          <select
            name="district"
            value={shippingInfo.district}
            onChange={handleShippingInfoChange}
            className="border p-2 w-full"
          >
            <option value="">Chọn quận</option>
            {districtsHCM.map(district => (
              <option key={district.code} value={district.code}>{district.name}</option>
            ))}
          </select>
        </label>
        <label className="block mb-2">
          Phường:
          <select
            name="ward"
            value={shippingInfo.ward}
            onChange={handleShippingInfoChange}
            className="border p-2 w-full"
            disabled={!shippingInfo.district}
          >
            <option value="">Chọn phường</option>
            {wards.map(ward => (
              <option key={ward.code} value={ward.code}>{ward.name}</option>
            ))}
          </select>
        </label>
        <label className="block mb-2">
          Địa chỉ chi tiết:
          <input
            type="text"
            name="address"
            value={shippingInfo.address}
            onChange={handleShippingInfoChange}
            className="border p-2 w-full"
          />
          {errors.address && <p className="text-red-500">{errors.address}</p>}
        </label>
        {/* Các trường khác cho tên, số điện thoại, email, v.v. */}
        <label className="block mb-2">
         Tên:          <input
            type="text"
            name="name"
            value={shippingInfo.name}
            onChange={handleShippingInfoChange}
            className="border p-2 w-full"
          />
        </label>
        <label className="block mb-2">
          Số điện thoại:
          <input
            type="text"
            name="phone"
            value={shippingInfo.phone}
            onChange={handleShippingInfoChange}
            className="border p-2 w-full"
          />
          {errors.phone && <p className="text-red-500">{errors.phone}</p>}
        </label>
        <label className="block mb-2">
          Email:
          <input
            type="email"
            name="email"
            value={shippingInfo.email}
            onChange={handleShippingInfoChange}
            className="border p-2 w-full"
          />
          {errors.email && <p className="text-red-500">{errors.email}</p>}
        </label>
        <label className="block mb-2">
          Ngày giao hàng:
          <input
            type="Date"
            name="selectedDate"
            value={shippingInfo.selectedDate}
            min={formatDate(today)}
            max={formatDate(maxDate)}
            onChange={handleShippingInfoChange}
            className="border p-2 w-full"
          />
        </label>
      </div>
      <button
        onClick={handleSubmit}
        className="bg-blue-500 text-white py-2 px-4 rounded"
      >
        Xác nhận
      </button>
      {successMessage && (
        <div className="mt-4 p-4 bg-green-200 text-green-800 rounded">
          {successMessage}
        </div>
      )}
    </div>
  );
};

export default Shipping;

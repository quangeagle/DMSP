// import React, { useEffect, useState } from 'react';
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import Login from './Login';
// import Home from './Home';
// import LikeList from './LikeList';
// import DetailProduct from './detailProduct';
// import ListProduct from './ListProduct';
// import ShoppingCart from './Cart';
// import Shipping from './ship';
// import Signup from './signup';
// import Kho from './Admin/Kho';
// import QlNhaCC from './Admin/QlNhaCungCap';
// import Ship2 from './Admin/Ship';
// import axios from 'axios';
// import CreateSupplierAndCategory from './Admin/CreateSupplierAndCategory';
// import CreateProduct from './Admin/CreateProduct';
// import CreatePromotion from './Admin/CreatePromotion';
// import SupplierList from './Admin/listNCC';
// import CategoryList from './Admin/CategoryList';
// import ProductList from './Admin/ProductList';
// import Header from './header';


//   function App() {
//   const [role, setRole] = useState('');

//   axios.defaults.withCredentials = true;

  
//   useEffect(() => {
//     axios.get('http://localhost:3004/auth/verify')
//       .then(res => {
//         if (res.data.login) {
//           setRole(res.data.role);
//           setUsername(res.data.username); // Assuming the backend sends the username
//         } else {
//           setRole('');
//           setUsername('');
//         }
//         console.log(res);
//       }).catch(err => console.log(err));
//   }, []);
//   return (
//     <Router>
//       <div>
//       <Header username={username} />
//         <Routes>
//           <Route path="/" element={<Home />} />
//           <Route path="/login" element={<Login setRoleVar={setRole} />} />
//           <Route path="/likelist" element={<LikeList />} />
//           <Route path="/home" element={<Home />} />
//           <Route path="/product/:id" element={<DetailProduct />} />
//           <Route path="/listProduct" element={<ListProduct />} />
//           <Route path="/Cart" element={<ShoppingCart />} />
//           <Route path="/ship" element={<Shipping />} />
//           <Route path="/signup" element={<Signup />} />
//           <Route path="/kho" element={<Kho />} />
//           <Route path="/Qlnhacc" element={<QlNhaCC />} />
//           <Route path="/ship2" element={<Ship2 />} />
//           <Route path="/taonhacungcap" element={<CreateSupplierAndCategory/>} />
//           <Route path="/dsncc" element={<SupplierList/>} />
//             <Route path="/create-product/:categoryId" element={<CreateProduct />} />
//             <Route path="/create-promotion" element={<CreatePromotion />} />
//             <Route path="/supplier/:supplierId/categories" element={<CategoryList />} />
//             <Route path="/category/:categoryId/products" element={<ProductList />} />
//         </Routes>
//       </div>
//     </Router>
//   );
// }

// export default App;
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Login';
import Home from './Home';
import LikeList from './LikeList';
import DetailProduct from './detailProduct';
import ListProduct from './ListProduct';
import ShoppingCart from './Cart';
import Shipping from './ship';
import Signup from './signup';
import Kho from './Admin/Kho';
import QlNhaCC from './Admin/QlNhaCungCap';
import Ship2 from './Admin/Ship';
import axios from 'axios';
import CreateSupplierAndCategory from './Admin/CreateSupplierAndCategory';
import CreateProduct from './Admin/CreateProduct';
import CreatePromotion from './Admin/CreatePromotion';
import SupplierList from './Admin/listNCC';
import CategoryList from './Admin/CategoryList';
import ProductList from './Admin/ProductList';
import Header from './header';
import { useUser } from './UserContext';


function App() {
  const { userId, updateUserId } = useUser(); // Sử dụng UserContext
  const [role, setRole] = useState('');
  const [username, setUsername] = useState('');

  axios.defaults.withCredentials = true;

  useEffect(() => {
    axios.get('http://localhost:3004/auth/verify')
      .then(res => {
        if (res.data.login) {
          setRole(res.data.role);
          setUsername(res.data.username);
          updateUserId(res.data.userId); // Cập nhật userId trong context
        } else {
          setRole('');
          setUsername('');
          updateUserId(''); // Đặt userId thành chuỗi rỗng nếu không đăng nhập
        }
        console.log(res);
      }).catch(err => console.log(err));
  }, [updateUserId]);

  return (
    <Router>
      <div>
      <Header username={username} /> 
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login setRoleVar={setRole} />} />
          <Route path="/likelist" element={<LikeList />} />
          <Route path="/home" element={<Home />} />
          <Route path="/product/:id" element={<DetailProduct />} />
          <Route path="/listProduct/:categoryId" element={<ListProduct />} />
          <Route path="/Cart" element={<ShoppingCart />} />
          <Route path="/ship" element={<Shipping />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/kho" element={<Kho />} />
          <Route path="/Qlnhacc" element={<QlNhaCC />} />
          <Route path="/ship2" element={<Ship2 />} />
          <Route path="/taonhacungcap" element={<CreateSupplierAndCategory />} />
          <Route path="/dsncc" element={<SupplierList />} />
          <Route path="/create-product/:categoryId" element={<CreateProduct />} />
          <Route path="/create-promotion" element={<CreatePromotion />} />
          <Route path="/supplier/:supplierId/categories" element={<CategoryList />} />
          <Route path="/category/:categoryId/products" element={<ProductList />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

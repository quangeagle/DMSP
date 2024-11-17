// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const Kho = () => {
//   const [newProducts, setNewProducts] = useState([]);
//   const [lowStockProducts, setLowStockProducts] = useState([]);
//   const [allProducts, setAllProducts] = useState([]);
//   const [showNewProducts, setShowNewProducts] = useState(false);
//   const [showLowStock, setShowLowStock] = useState(false);
//   const [selectedProductId, setSelectedProductId] = useState('');
//   const [quantityToAdd, setQuantityToAdd] = useState(0);

//   // Fetch new products when `showNewProducts` changes
//   useEffect(() => {
//     if (showNewProducts) {
//       axios.get('http://localhost:3004/product/new-products')
//         .then((response) => setNewProducts(response.data))
//         .catch((error) => console.error('Lỗi khi tải sản phẩm mới:', error));
//     }
//   }, [showNewProducts]);

//   // Fetch low stock products when `showLowStock` changes
//   useEffect(() => {
//     if (showLowStock) {
//       axios.get('http://localhost:3004/product/low-stock-products')
//         .then((response) => setLowStockProducts(response.data))
//         .catch((error) => console.error('Lỗi khi tải sản phẩm tồn kho:', error));
//     }
//   }, [showLowStock]);

//   // Fetch all products initially
//   useEffect(() => {
//     axios.get('http://localhost:3004/product/get')
//       .then((response) => setAllProducts(response.data))
//       .catch((error) => console.error('Lỗi khi tải tất cả sản phẩm:', error));
//   }, []);

//   const handleAddProductQuantity = () => {
//     axios.post('http://localhost:3004/product/add-quantity', {
//       productId: selectedProductId,
//       quantity: quantityToAdd
//     })
//     .then((response) => {
//       setAllProducts(response.data); // Update all products after adding quantity
//       setSelectedProductId(''); // Clear selected product
//       setQuantityToAdd(0); // Reset quantity
//     })
//     .catch((error) => console.error('Lỗi khi thêm số lượng sản phẩm:', error));
//   };

//   return (
//     <>
//       <div className="bg-amber-400 h-14 w-full flex items-center justify-between px-4">
//         <img src="emart.png" alt="Emart" className="w-36 h-8" />
//         <div>
//           <button
//             className="bg-blue-600 text-white px-4 py-2 rounded mr-2"
//             onClick={() => setShowNewProducts(!showNewProducts)}
//           >
//             {showNewProducts ? 'Ẩn sản phẩm mới' : 'Hiển thị sản phẩm mới'}
//           </button>
//           <button
//             className="bg-blue-600 text-white px-4 py-2 rounded"
//             onClick={() => setShowLowStock(!showLowStock)}
//           >
//             {showLowStock ? 'Ẩn sản phẩm tồn kho' : 'Hiển thị sản phẩm tồn kho'}
//           </button>
//         </div>
//       </div>

//       {showNewProducts && (
//         <div className="p-4">
//           <h2 className="text-xl font-bold mb-4">Sản phẩm mới:</h2>
//           {newProducts.length === 0 ? (
//             <p>Không có sản phẩm mới nào.</p>
//           ) : (
//             <ul className="list-disc pl-6">
//               {newProducts.map((product) => (
//                 <li key={product._id} className="mb-2">
//                   {product.name} - 
//                   <button
//                     className="bg-green-600 text-white px-2 py-1 ml-2 rounded"
//                     onClick={() => setSelectedProductId(product._id)}
//                   >
//                     Thêm vào kho
//                   </button>
//                 </li>
//               ))}
//             </ul>
//           )}
//         </div>
//       )}

//       {showLowStock && (
//         <div className="p-4">
//           <h2 className="text-xl font-bold mb-4">Sản phẩm tồn kho (số lượng dưới 10):</h2>
//           {lowStockProducts.length === 0 ? (
//             <p>Không có sản phẩm nào có số lượng dưới 10.</p>
//           ) : (
//             <ul className="list-disc pl-6">
//               {lowStockProducts.map((item) => (
//                 <li key={item._id} className="mb-2">
//                   {item.name} - Số lượng: {item.quantity}
//                 </li>
//               ))}
//             </ul>
//           )}
//         </div>
//       )}

//       {selectedProductId && (
//         <div className="p-4">
//           <h2 className="text-xl font-bold mb-4">Thêm số lượng sản phẩm vào kho:</h2>
//           <input
//             type="number"
//             placeholder="Số lượng"
//             value={quantityToAdd}
//             onChange={(e) => setQuantityToAdd(Number(e.target.value))}
//             className="border p-2 mb-2 w-full"
//           />
//           <button
//             onClick={handleAddProductQuantity}
//             className="bg-green-600 text-white px-4 py-2 rounded"
//           >
//             Thêm số lượng
//           </button>
//         </div>
//       )}

//       <div className="p-4">
//         <h2 className="text-xl font-bold mb-4">Danh sách tất cả sản phẩm:</h2>
//         {allProducts.length === 0 ? (
//           <p>Không có sản phẩm nào.</p>
//         ) : (
//           <ul className="list-disc pl-6">
//             {allProducts.map((product) => (
//               <li key={product._id} className="mb-2">
//                 {product.name} - Số lượng: {product.quantity}
//                 <button
//                   className="bg-yellow-600 text-white px-2 py-1 ml-2 rounded"
//                   onClick={() => {
//                     setSelectedProductId(product._id);
//                     setQuantityToAdd(0);
//                   }}
//                 >
//                   Thêm số lượng
//                 </button>
//               </li>
//             ))}
//           </ul>
//         )}
//       </div>
//     </>
//   );
// };

// export default Kho;




import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Kho = () => {
  const [newProducts, setNewProducts] = useState([]);
  const [lowStockProducts, setLowStockProducts] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [showNewProducts, setShowNewProducts] = useState(false);
  const [showLowStock, setShowLowStock] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState('');
  const [quantityToAdd, setQuantityToAdd] = useState(0);

  useEffect(() => {
    if (showNewProducts) {
      axios.get('http://localhost:3004/product/new-products')
        .then((response) => setNewProducts(response.data))
        .catch((error) => console.error('Lỗi khi tải sản phẩm mới:', error.response ? error.response.data : error.message));
    }
  }, [showNewProducts]);

  useEffect(() => {
    if (showLowStock) {
      axios.get('http://localhost:3004/product/low-stock-products')
        .then((response) => setLowStockProducts(response.data))
        .catch((error) => console.error('Lỗi khi tải sản phẩm tồn kho:', error.response ? error.response.data : error.message));
    }
  }, [showLowStock]);

  useEffect(() => {
    fetchAllProducts();
  }, []);

  const fetchAllProducts = () => {
    axios.get('http://localhost:3004/product/get')
      .then((response) => {
        if (Array.isArray(response.data)) {
          setAllProducts(response.data);
        } else {
          console.error('Dữ liệu không phải là mảng:', response.data);
        }
      })
      .catch((error) => console.error('Lỗi khi tải tất cả sản phẩm:', error.response ? error.response.data : error.message));
  };

  const handleAddProductQuantity = () => {
    if (quantityToAdd <= 0) {
      setError('Số lượng phải lớn hơn 0.');
      return;
    }
  
    axios.post('http://localhost:3004/product/add-quantity', {
      productId: selectedProductId,
      quantity: quantityToAdd,
    })
      .then((response) => {
        fetchAllProducts(); // Cập nhật danh sách sản phẩm sau khi thêm số lượng
        setSelectedProductId('');
        setQuantityToAdd(0);
        setError(''); 
      })
      .catch((error) => console.error('Lỗi khi thêm số lượng sản phẩm:', error.response ? error.response.data : error.message));
  };
  

  const handleCancel = () => {
    setSelectedProductId('');
    setQuantityToAdd(0);
  };

  return (
    <>
      <div className="bg-amber-400 h-14 w-full flex items-center justify-between px-4">
        {/* <img src="emart.png" alt="Emart" className="w-36 h-8" /> */}
        <div>
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded mr-2"
            onClick={() => setShowNewProducts(!showNewProducts)}
          >
            {showNewProducts ? 'Ẩn sản phẩm mới' : 'Hiển thị sản phẩm mới'}
          </button>
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded"
            onClick={() => setShowLowStock(!showLowStock)}
          >
            {showLowStock ? 'Ẩn sản phẩm tồn kho' : 'Hiển thị sản phẩm tồn kho'}
          </button>
        </div>
      </div>

      {showNewProducts && (
        <div className="p-4">
          <h2 className="text-xl font-bold mb-4">Sản phẩm mới:</h2>
          {newProducts.length === 0 ? (
            <p>Không có sản phẩm mới nào.</p>
          ) : (
            <ul className="list-disc pl-6">
              {newProducts.map((product) => (
                <li key={product._id} className="mb-2">
                  {product.name}
                  {selectedProductId === product._id ? (
                    <div>
                      <input
                        type="number"
                        placeholder="Số lượng"
                        value={quantityToAdd}
                        onChange={(e) => setQuantityToAdd(Number(e.target.value))}
                        className="border p-2 mb-2 w-full"
                      />
                      <button
                        onClick={handleAddProductQuantity}
                        className="bg-green-600 text-white px-4 py-2 rounded mr-2"
                      >
                        Thêm số lượng
                      </button>
                      <button
                        onClick={handleCancel}
                        className="bg-red-600 text-white px-4 py-2 rounded"
                      >
                        Hủy
                      </button>
                    </div>
                  ) : (
                    <button
                      className="bg-green-600 text-white px-2 py-1 ml-2 rounded"
                      onClick={() => setSelectedProductId(product._id)}
                    >
                      Thêm vào kho
                    </button>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      {showLowStock && (
        <div className="p-4">
          <h2 className="text-xl font-bold mb-4">Sản phẩm tồn kho (số lượng dưới 10):</h2>
          {lowStockProducts.length === 0 ? (
            <p>Không có sản phẩm nào có số lượng dưới 10.</p>
          ) : (
            <ul className="list-disc pl-6">
              {lowStockProducts.map((item) => (
                <li key={item._id} className="mb-2">
                  {item.name} - Số lượng: {item.quantity}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      {selectedProductId && (
        <div className="p-4">
          <h2 className="text-xl font-bold mb-4">Thêm số lượng sản phẩm vào kho:</h2>
          <input
            type="number"
            placeholder="Số lượng"
            value={quantityToAdd}
            onChange={(e) => setQuantityToAdd(Number(e.target.value))}
            className="border p-2 mb-2 w-full"
          />
          <button
            onClick={handleAddProductQuantity}
            className="bg-green-600 text-white px-4 py-2 rounded"
          >
            Thêm số lượng
          </button>
        </div>
      )}

      <div className="p-4">
        <h2 className="text-xl font-bold mb-4">Danh sách tất cả sản phẩm:</h2>
        {Array.isArray(allProducts) && allProducts.length === 0 ? (
          <p>Không có sản phẩm nào.</p>
        ) : (
          Array.isArray(allProducts) && (
            <ul className="list-disc pl-6">
              {allProducts.map((product) => (
                <li key={product._id} className="mb-2">
                  {product.name} - Số lượng: {product.quantity}
                  <button
                    className="bg-yellow-600 text-white px-2 py-1 ml-2 rounded"
                    onClick={() => {
                      setSelectedProductId(product._id);
                      setQuantityToAdd(0);
                    }}
                  >
                    Thêm số lượng
                  </button>
                </li>
              ))}
            </ul>
          )
        )}
      </div>
    </>
  );
};

export default Kho;

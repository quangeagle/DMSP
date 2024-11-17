import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Ship2 = () => {
  const [orders, setOrders] = useState([]);
  const [invoices, setInvoices] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3004/ship/orders')
      .then(response => {
        setOrders(response.data);
      })
      .catch(error => {
        console.error('Error fetching orders:', error);
      });

    getInvoices();
  }, []);

  const getInvoices = () => {
    axios.get('http://localhost:3004/invoice')
      .then(response => {
        setInvoices(response.data);
      })
      .catch(error => {
        console.error('Error fetching invoices:', error);
      });
  };

  const handleCreateInvoice = (orderId) => {
    axios.post('http://localhost:3004/invoice/create', { orderId })
      .then(response => {
        if (response.data && response.data.invoice) {
          console.log('Invoice created successfully');
          getInvoices(); // Cập nhật danh sách hóa đơn sau khi tạo mới
        } else {
          console.error('Invalid invoice data received');
        }
      })
      .catch(error => {
        console.error('Error creating invoice:', error);
      });
  };

  return (
    <div>
      <h1 className=' font-bold text-3xl mx-auto flex justify-center pt-10'>Danh sách đơn hàng</h1>
      <table className="min-w-full bg-white border border-gray-300 text-center">
  <thead className="bg-gray-100">
    <tr>
      <th className="px-4 py-2 border">Mã đơn hàng</th>
      <th className="px-4 py-2 border">Ngày lập</th>
      <th className="px-4 py-2 border">Khách hàng</th>
      <th className="px-4 py-2 border">Tổng tiền</th>
      <th className="px-4 py-2 border">Hành động</th>
    </tr>
  </thead>
  <tbody>
    {orders.map(order => (
      <tr key={order._id} className="border-t">
        <td className="px-4 py-2">{order._id}</td>
        <td className="px-4 py-2">{new Date(order.createdAt).toLocaleDateString()}</td>
        <td className="px-4 py-2">{order.name}</td>
        <td className="px-4 py-2">
          {order.orderItems.reduce((sum, item) => sum + item.quantity * item.productId.price, 0).toLocaleString()}₫
        </td>
        <td className="px-4 py-2">
          <button
            onClick={() => handleCreateInvoice(order._id)}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Xuất hóa đơn
          </button>
        </td>
      </tr>
    ))}
  </tbody>
</table>


      <h2  className=' font-bold text-3xl mx-auto flex justify-center pt-10'>Danh sách hóa đơn</h2>
      <table className="min-w-full bg-white border border-gray-300 text-center">
  <thead className="bg-gray-100">
    <tr >
      <th className="px-4 py-2 border">ID Khách hàng</th>
      <th className="px-4 py-2 border">Mã đơn hàng</th>
      <th className="px-4 py-2 border">Ngày</th>
      <th className="px-4 py-2 border">Tên sản phẩm</th>
      <th className="px-4 py-2 border">Số lượng</th>
      <th className="px-4 py-2 border">Giá</th>
      <th className="px-4 py-2 border">Tổng tiền</th>
    </tr>
  </thead>
  <tbody>
    {invoices.length > 0 ? (
      invoices.map(invoice =>
        Array.isArray(invoice.items) && invoice.items.length > 0 ? (
          invoice.items.map((item, index) => (
            <tr key={`${invoice._id}-${item.productId}-${index}`} className="border-t">
              <td className="px-4 py-2">{invoice.customerId ? invoice.customerId._id : 'N/A'}</td>
              <td className="px-4 py-2">{invoice.orderId ? invoice.orderId._id : 'N/A'}</td>
              <td className="px-4 py-2">{new Date(invoice.date).toLocaleDateString()}</td>
              <td className="px-4 py-2">{item.productName}</td>
              <td className="px-4 py-2">{item.quantity}</td>
              <td className="px-4 py-2">{item.price.toLocaleString()}₫</td>
              <td className="px-4 py-2">{invoice.totalAmount.toLocaleString()}₫</td>
            </tr>
          ))
        ) : (
          <tr key={`no-items-${invoice._id}`} className="border-t">
            <td colSpan="7" className="px-4 py-2 text-gray-500">Không có sản phẩm nào</td>
          </tr>
        )
      )
    ) : (
      <tr>
        <td colSpan="7" className="px-4 py-2 text-gray-500">Không có hóa đơn nào</td>
      </tr>
    )}
  </tbody>
</table>

    </div>
  );
};

export default Ship2;

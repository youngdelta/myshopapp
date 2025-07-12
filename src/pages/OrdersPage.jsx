import React, { useState, useEffect } from 'react';
import { fetchOrders, cancelOrder } from '../api';
import * as XLSX from 'xlsx'; // xlsx 라이브러리 임포트
import { saveAs } from 'file-saver'; // file-saver 라이브러리 임포트

function OrdersPage({ showAlert }) {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    try {
      const data = await fetchOrders();
      setOrders(data);
    } catch (error) {
      console.error('Fetch orders error:', error);
      showAlert('Failed to load orders.', 'danger');
    }
  };

  const handleCancelOrder = async (orderId) => {
    try {
      await cancelOrder(orderId);
      showAlert('Order cancelled!', 'success');
      // UI 즉시 업데이트: 해당 주문의 상태를 CANCEL로 변경
      setOrders(prevOrders =>
        prevOrders.map(order =>
          order.id === orderId ? { ...order, status: 'CANCEL' } : order
        )
      );
    } catch (error) {
      console.error('Cancel order error:', error);
      showAlert('Failed to cancel order.', 'danger');
    }
  };

  const handleExportExcel = () => {
    if (orders.length === 0) {
      showAlert('No orders to export.', 'info');
      return;
    }

    // Excel로 내보낼 데이터 준비
    const dataToExport = orders.map(order => ({
      'Order ID': order.id,
      'Member ID': order.memberId,
      'Product ID': order.productId,
      'Count': order.count,
      'Status': order.status,
    }));

    const worksheet = XLSX.utils.json_to_sheet(dataToExport);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Orders');

    // Excel 파일 생성 및 다운로드
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const data = new Blob([excelBuffer], { type: 'application/octet-stream' });
    saveAs(data, 'orders.xlsx');
    showAlert('Orders exported to Excel!', 'success');
  };

  return (
    <div className="container">
      <h1 className="my-4">Orders</h1>
      <div className="mb-3">
        <button className="btn btn-success" onClick={handleExportExcel}>Export to Excel</button>
      </div>
      {orders.length === 0 ? (
        <div className="alert alert-info" role="alert">
          No orders found.
        </div>
      ) : (
        <ul className="list-group">
          {orders.map((order) => (
            <li key={order.id} className="list-group-item d-flex justify-content-between align-items-center">
              <div>
                <h5>Order ID: {order.id}</h5>
                <p className="mb-0">Member ID: {order.memberId}, Product ID: {order.productId}, Count: {order.count}</p>
                <p className="mb-0">Status: <strong>{order.status}</strong></p> {/* 주문 상태 표시 */}
              </div>
              {order.status !== 'CANCEL' && ( // CANCEL 상태가 아니면 버튼 표시
                <button className="btn btn-danger btn-sm" onClick={() => handleCancelOrder(order.id)}>Cancel Order</button>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default OrdersPage;
import React, { useState, useEffect } from 'react';
import { fetchCart, removeCartItem, clearCart, createOrder } from '../api';
import axios from 'axios'; // axios 임포트

function CartPage({ showAlert }) {
  const [cart, setCart] = useState(null);
  const [memberId, setMemberId] = useState(1); // For simplicity, assume memberId 1

  useEffect(() => {
    loadCart();
  }, []);

  const loadCart = async () => {
    try {
      const data = await fetchCart(memberId);
      setCart(data);
    } catch (error) {
      console.error('Fetch cart error:', error);
      showAlert('Failed to load cart.', 'danger');
    }
  };

  const handleRemoveItem = async (cartItemId) => {
    try {
      await removeCartItem(cartItemId);
      showAlert('Item removed from cart!', 'success');
      loadCart();
    } catch (error) {
      console.error('Remove item error:', error);
      showAlert('Failed to remove item from cart.', 'danger');
    }
  };

  const handleClearCart = async () => {
    try {
      await clearCart(memberId);
      showAlert('Cart cleared!', 'success');
      loadCart();
    } catch (error) {
      console.error('Clear cart error:', error);
      showAlert('Failed to clear cart.', 'danger');
    }
  };

  const handleCreateOrder = async () => {
    if (cart && cart.cartItems.length > 0) {
      try {
        // For simplicity, create an order for each item in the cart
        for (const item of cart.cartItems) {
          await createOrder({ memberId: memberId, productId: item.productId, count: item.count });
        }
        await clearCart(memberId); // Clear cart after ordering
        showAlert('Order placed successfully!', 'success');
        loadCart();
      } catch (error) {
        console.error('Place order error:', error);
        showAlert('Failed to place order.', 'danger');
      }
    } else {
      showAlert('Cart is empty!', 'info');
    }
  };

  const handleExportExcel = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/cart/${memberId}/export-excel`, {
        responseType: 'blob', // 바이너리 데이터로 응답 받기
      });

      const blob = new Blob([response.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'cart.xlsx';
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
      showAlert('Cart exported to Excel!', 'success');
    } catch (error) {
      console.error('Export Excel error:', error);
      // 백엔드에서 전달된 에러 메시지를 표시
      if (error.response && error.response.data) {
        const reader = new FileReader();
        reader.onload = function() {
          showAlert(`Failed to export cart to Excel: ${reader.result}`, 'danger');
        };
        reader.readAsText(error.response.data);
      } else {
        showAlert('Failed to export cart to Excel. Check console for details.', 'danger');
      }
    }
  };

  if (!cart) return <div className="container">Loading cart...</div>;

  return (
    <div className="container">
      <h1 className="my-4">Shopping Cart</h1>
      <div className="mb-3">
        <button className="btn btn-info" onClick={handleExportExcel}>Export to Excel</button>
      </div>
      {cart.cartItems.length === 0 ? (
        <div className="alert alert-info" role="alert">
          Your cart is empty.
        </div>
      ) : (
        <>
          <ul className="list-group mb-3">
            {cart.cartItems.map((item) => (
              <li key={item.cartItemId} className="list-group-item d-flex justify-content-between align-items-center">
                <div>
                  <h5>{item.productName}</h5>
                  <p className="mb-0">Price: ${item.price} x {item.count}</p>
                </div>
                <button className="btn btn-danger btn-sm" onClick={() => handleRemoveItem(item.cartItemId)}>Remove</button>
              </li>
            ))}
          </ul>
          <div className="d-flex justify-content-between">
            <button className="btn btn-warning me-2" onClick={handleClearCart}>Clear Cart</button>
            <button className="btn btn-success" onClick={handleCreateOrder}>Place Order</button>
          </div>
        </>
      )}
    </div>
  );
}

export default CartPage;
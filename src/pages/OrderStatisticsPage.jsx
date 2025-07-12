import React, { useState, useEffect } from 'react';
import { fetchOrderStatistics } from '../api';

function OrderStatisticsPage({ showAlert }) {
  const [statistics, setStatistics] = useState([]);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  useEffect(() => {
    // 초기 로드 시 기본값 설정 (예: 지난 7일)
    const today = new Date();
    const sevenDaysAgo = new Date(today);
    sevenDaysAgo.setDate(today.getDate() - 7);

    setStartDate(sevenDaysAgo.toISOString().split('T')[0]);
    setEndDate(today.toISOString().split('T')[0]);
  }, []);

  useEffect(() => {
    if (startDate && endDate) {
      loadStatistics();
    }
  }, [startDate, endDate]);

  const loadStatistics = async () => {
    try {
      const data = await fetchOrderStatistics(startDate, endDate);
      setStatistics(data);
    } catch (error) {
      console.error('Fetch order statistics error:', error);
      showAlert('Failed to load order statistics.', 'danger');
    }
  };

  return (
    <div className="container">
      <h1 className="my-4">Order Statistics</h1>
      <div className="card mb-4">
        <div className="card-header">Filter by Date</div>
        <div className="card-body">
          <div className="row g-3 align-items-center">
            <div className="col-auto">
              <label htmlFor="startDate" className="col-form-label">Start Date:</label>
            </div>
            <div className="col-auto">
              <input type="date" id="startDate" className="form-control" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
            </div>
            <div className="col-auto">
              <label htmlFor="endDate" className="col-form-label">End Date:</label>
            </div>
            <div className="col-auto">
              <input type="date" id="endDate" className="form-control" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
            </div>
            <div className="col-auto">
              <button className="btn btn-primary" onClick={loadStatistics}>Apply Filter</button>
            </div>
          </div>
        </div>
      </div>

      {statistics.length === 0 ? (
        <div className="alert alert-info" role="alert">
          No statistics found for the selected date range.
        </div>
      ) : (
        <div className="table-responsive">
          <table className="table table-striped table-bordered">
            <thead>
              <tr>
                <th>Date</th>
                <th>Total Orders</th>
                <th>Total Cancellations</th>
                <th>Total Revenue</th>
              </tr>
            </thead>
            <tbody>
              {statistics.map((stat, index) => (
                <tr key={index}>
                  <td>{stat.orderDate}</td>
                  <td>{stat.totalOrders}</td>
                  <td>{stat.totalCancellations}</td>
                  <td>${stat.totalRevenue.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default OrderStatisticsPage;

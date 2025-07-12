import React, { useState, useEffect } from 'react';
import { fetchBatchExecutions } from '../api';

function BatchDashboardPage({ showAlert }) {
  const [executions, setExecutions] = useState([]);

  useEffect(() => {
    loadExecutions();
  }, []);

  const loadExecutions = async () => {
    try {
      const data = await fetchBatchExecutions();
      setExecutions(data);
    } catch (error) {
      console.error('Fetch batch executions error:', error);
      showAlert('Failed to load batch executions.', 'danger');
    }
  };

  return (
    <div className="container">
      <h1 className="my-4">Batch Dashboard</h1>
      <button className="btn btn-primary mb-3" onClick={loadExecutions}>Refresh</button>

      {executions.length === 0 ? (
        <div className="alert alert-info" role="alert">
          No batch job executions found.
        </div>
      ) : (
        <div className="table-responsive">
          <table className="table table-striped table-bordered">
            <thead>
              <tr>
                <th>ID</th>
                <th>Job Name</th>
                <th>Start Time</th>
                <th>End Time</th>
                <th>Status</th>
                <th>Exit Code</th>
                <th>Exit Message</th>
              </tr>
            </thead>
            <tbody>
              {executions.map((exec) => (
                <tr key={exec.id}>
                  <td>{exec.id}</td>
                  <td>{exec.jobName}</td>
                  <td>{exec.startTime ? new Date(exec.startTime).toLocaleString() : 'N/A'}</td>
                  <td>{exec.endTime ? new Date(exec.endTime).toLocaleString() : 'N/A'}</td>
                  <td>{exec.status}</td>
                  <td>{exec.exitCode}</td>
                  <td>{exec.exitMessage}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default BatchDashboardPage;

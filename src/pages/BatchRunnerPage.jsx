import React, { useState } from 'react';
import { runBatchJob } from '../api';

function BatchRunnerPage({ showAlert }) {
	const [productBatchStatus, setProductBatchStatus] = useState('');
	const [orderBatchStatus, setOrderBatchStatus] = useState('');

	const handleRunBatch = async (jobName) => {
		// const param = { jobName };
		try {
			const response = await runBatchJob(jobName);
			showAlert(`${jobName} started: ${response}`, 'success');
			if (jobName === 'productJob') {
				setProductBatchStatus('Running...');
			} else if (jobName === 'orderJob') {
				setOrderBatchStatus('Running...');
			}
		} catch (error) {
			console.error(`Error running ${jobName}:`, error);
			showAlert(`Failed to start ${jobName}.`, 'danger');
			if (jobName === 'productJob') {
				setProductBatchStatus('Failed');
			} else if (jobName === 'orderJob') {
				setOrderBatchStatus('Failed');
			}
		}
	};

	return (
		<div className="container">
			<h1 className="my-4">Batch Runner</h1>

			<div className="card mb-4">
				<div className="card-header">Product Batch Job</div>
				<div className="card-body">
					<p>This batch job reads and logs all product information.</p>
					<button
						className="btn btn-primary me-2"
						onClick={() => handleRunBatch('productJob')}
					>
						Run Product Batch
					</button>
					{productBatchStatus && (
						<span className="ms-2">Status: {productBatchStatus}</span>
					)}
				</div>
			</div>

			<div className="card">
				<div className="card-header">Order Batch Job</div>
				<div className="card-body">
					<p>This batch job reads and logs all order information.</p>
					<button
						className="btn btn-primary me-2"
						onClick={() => handleRunBatch('orderJob')}
					>
						Run Order Batch
					</button>
					{orderBatchStatus && (
						<span className="ms-2">Status: {orderBatchStatus}</span>
					)}
				</div>
			</div>
		</div>
	);
}

export default BatchRunnerPage;

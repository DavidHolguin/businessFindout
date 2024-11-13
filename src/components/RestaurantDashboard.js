import React, { useState, useEffect } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LabelList
} from 'recharts';

// Sample data
const orderData = [
  { month: 'Jan', orders: 450, sales: 80000 },
  { month: 'Feb', orders: 520, sales: 90000 },
  { month: 'Mar', orders: 480, sales: 85000 },
  { month: 'Apr', orders: 560, sales: 95000 },
  { month: 'May', orders: 510, sales: 92000 },
  { month: 'Jun', orders: 590, sales: 100000 },
];

const invoiceData = [
  { month: 'Jan', invoices: 320, revenue: 75000 },
  { month: 'Feb', invoices: 380, revenue: 82000 },
  { month: 'Mar', invoices: 350, revenue: 78000 },
  { month: 'Apr', invoices: 420, revenue: 88000 },
  { month: 'May', invoices: 390, revenue: 85000 },
  { month: 'Jun', invoices: 450, revenue: 92000 },
];

const productData = [
  { product: 'Pizza', sales: 12000, inventory: 250 },
  { product: 'Burger', sales: 10000, inventory: 180 },
  { product: 'Salad', sales: 8000, inventory: 120 },
  { product: 'Pasta', sales: 9000, inventory: 160 },
  { product: 'Dessert', sales: 7000, inventory: 90 },
];

const AnimatedLineChart = () => {
  const [data, setData] = useState(orderData);
  const [activeMetric, setActiveMetric] = useState('orders');

  useEffect(() => {
    const interval = setInterval(() => {
      setData((prevData) => {
        const newData = [...prevData];
        newData.shift();
        newData.push({
          month: newData[newData.length - 1].month === 'Jun' ? 'Jan' : String.fromCharCode(newData[newData.length - 1].month.charCodeAt(0) + 1),
          [activeMetric === 'orders' ? 'orders' : 'sales']: Math.floor(Math.random() * 200) + 400,
          [activeMetric === 'orders' ? 'sales' : 'orders']: Math.floor(Math.random() * 20000) + 70000,
        });
        return newData;
      });
    }, 2000);

    return () => clearInterval(interval);
  }, [activeMetric]);

  const handleMetricChange = (metric) => {
    setActiveMetric(metric);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
      <div className="flex items-center mb-4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 mr-2 text-primary"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
          />
        </svg>
        <h3 className="text-lg font-medium">Orders and Sales</h3>
      </div>
      <div className="flex justify-end mb-4">
        <button
          className={`px-4 py-2 rounded-lg ${activeMetric === 'orders' ? 'bg-primary text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200'}`}
          onClick={() => handleMetricChange('orders')}
        >
          Orders
        </button>
        <button
          className={`ml-2 px-4 py-2 rounded-lg ${activeMetric === 'sales' ? 'bg-primary text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200'}`}
          onClick={() => handleMetricChange('sales')}
        >
          Sales
        </button>
      </div>
      <div className="h-80">
        <ResponsiveContainer>
          <LineChart data={data}>
            <XAxis dataKey="month" />
            <YAxis type="number" domain={['dataMin', 'dataMax']} />
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey={activeMetric}
              stroke={activeMetric === 'orders' ? '#09fdfd' : '#08e0e0'}
            >
              <LabelList dataKey={activeMetric} position="top" />
            </Line>
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

const AnimatedProductGrid = () => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
      <div className="flex items-center mb-4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 mr-2 text-primary"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3"
          />
        </svg>
        <h3 className="text-lg font-medium">Products</h3>
      </div>
      <div className="grid grid-cols-2 gap-4">
        {productData.map((product) => (
          <div
            key={product.product}
            className="bg-gray-100 dark:bg-gray-700 rounded-lg p-4 animate-fadeIn"
          >
            <h4 className="text-lg font-medium">{product.product}</h4>
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-2 text-primary"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span>{product.sales.toLocaleString()}</span>
              </div>
              <div className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-2 text-primary"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3"
                  />
                </svg>
                <span>{product.inventory}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const RestaurantDashboard = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-8 px-4">
      <AnimatedLineChart />
      <AnimatedProductGrid />
    </div>
  );
};

export default RestaurantDashboard;
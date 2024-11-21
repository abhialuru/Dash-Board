 import React, { useEffect, useState } from 'react';
 import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

import { db } from '../../firebase.config';


import { collection, getDocs } from 'firebase/firestore';

 ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);


function FinanceChart() {

    const [chartData, setChartData] = useState(null);

    useEffect(()=>{

      async  function  getFinance() {

    const getIncomeData = await getDocs(collection(db, 'incometrans'));
    const income = getIncomeData.docs.map(doc => (  doc.data() ))
    const getExpenseData = await getDocs(collection(db, 'expensetrans'));
    const expense = getExpenseData.docs.map(doc => (  doc.data() ))

    const preparedData = chartjsPrepareData(income, expense);
    setChartData(preparedData); 
}

 getFinance()

},[])


function chartjsPrepareData(expense, income) {

     const groupByDate = (data) => {
      return data.reduce((acc, item) => {
        const date = new Date(item.date).toISOString().slice(0, 7); // YYYY-MM format
        acc[date] = (acc[date] || 0) + item.amount;
        return acc;
      }, {});
    }


    const groupedExpenses = groupByDate(expense);
    const groupedIncome = groupByDate(income);
 
    const labels = [
        ...new Set([...Object.keys(groupedExpenses), ...Object.keys(groupedIncome)]),
      ].sort();

      const expenseData = labels.map(month => groupedExpenses[month] || 0);
      const incomeData = labels.map(month => groupedIncome[month] || 0);


      return {
        labels,
        datasets: [
          {
            label: 'Expenses',
            data: expenseData,
            fill: false,
            borderColor: '#FF5733',
            tension: 0.1,
          },
          {
            label: 'Income',
            data: incomeData,
            fill: false,
            borderColor: '#42A5F5',
            tension: 0.1,
          },
        ],
      };
    }


if (!chartData) {
    return <div>Loading chart data...</div>;
  }

   const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            return `${tooltipItem.dataset.label}: $${tooltipItem.raw}`;
          },
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Month',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Amount ($)',
        },
        beginAtZero: true,
      },
    },
  };

  return (
    <div style={{ width: '100%', height: '350px',   paddingLeft: '30px' }}>
      <h2>Finance Overview</h2>
      <Line data={chartData} options={options} />
    </div>
  );

}


export default FinanceChart;
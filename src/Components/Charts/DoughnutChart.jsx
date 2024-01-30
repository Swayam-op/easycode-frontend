import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import {Chart, ArcElement} from 'chart.js'
Chart.register(ArcElement);

const DoughnutChart = () => {
  const chartData = {
    labels: ['Label 1', 'Label 2'],
    datasets: [
      {
        data: [30, 70],
        backgroundColor: ['#fca311', '#252422'],
        // borderWidth: 1, // Width of the doughnut chart border
        borderColor: '#302c2c', // Border color
      },
    ],
  };

  const chartOptions = {
    cutout: '80%', // Adjust the cutout percentage to control the width of the doughnut hole
    maintainAspectRatio: false, // Ensure the chart maintains its aspect ratio
    plugins: {
      colors: {
        forceOverride: true
      }
    },
    animation: {
      duration: 0, // Set animation duration to zero milliseconds
    }, // Disable fading animation
  };

  return (
    <div className='w-full flex justify-center box-border'>
    <div className='w-2/3  relative'>
    <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-light-1 text-xl font-semibold'>284 <span className='block text-xs text-light-2'>Solved</span></div>
      <Doughnut data={chartData} options={chartOptions} />
    </div>
    </div>
  );
};

export default DoughnutChart;

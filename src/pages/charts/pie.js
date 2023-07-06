import React from 'react';
import { Pie, Doughnut, Bar } from 'react-chartjs-2';
import { nairaFormatAlt } from '../../utils/helpers';

const PieChart = ({data, chartType}) => {
    // Sample data for 30 departments


    const options = {
        tooltips: {
            callbacks: {
                label: function (tooltipItem, data) {
                    const label = data.labels[tooltipItem.index];
                    const value = data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index];
                    
                    // return `${label}: ${nairaFormatAlt(value)}`;
                    return `${label}`;
                },
            },
            
        },
        plugins: {
            animation: {
                animateRotate: true,
                animateScale: true,
            },
        },
        legend: {
            display: chartType == 2 ? false : true,
        }
    };
   


    // Generate 100 random color codes
    return (
        <div>
            {/* <h2>Departments Pie Chart</h2> */}
            {chartType == 1 ? <Doughnut data={data} options={options} /> : null}
            {chartType == 2 ? <Bar data={data} options={options} /> : null}
            {chartType == 3 ? <Pie data={data} options={options} /> : null}
        </div>
    );
};

export default PieChart;

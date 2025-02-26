import { Bar, Pie } from "react-chartjs-2";

const ChartComponent = ({ chartData, type }) => {
  return (
    <div className="chart-container">
        {
            getChart(type, chartData)
        }
    </div>
  );
}

const getChart = (type, chartData) => {
    switch(type['type']) {
        case 'pie':
            return <Pie data={chartData} />;
        case 'bar':
            return <Bar data={chartData} options={
              {
                layout: {
                  minWidth: '340px',
                  height: '100%'
                }
              }
            } />;
        default: return 'default';
    }
}
    
export default ChartComponent;
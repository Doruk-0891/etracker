import React, {useContext, useState, useEffect} from "react";
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import { ExpensesContext } from "../../context/context";
import { CATEGORY } from "../../constants/constant";
import ChartComponent from "./Chart";

Chart.register(CategoryScale);

const Graph = (type) => {
    const {expenses} = useContext(ExpensesContext);
    const {expensesList} = expenses;
    const [chartData, setChartData] = useState({
        labels: CATEGORY, 
        datasets: [
          {
            indexAxis: 'y',
            label: "Expenses: ",
            data: expensesList.reduce((dataSet, expense) => {
              const category = expense.category.toLowerCase();
              if (category === 'food') {
                dataSet[0] += expense.price;
              } else if (category === 'entertainment') {
                dataSet[1] += expense.price;
              } else if (category === 'travel') {
                dataSet[2] += expense.price;
              } else {
                dataSet[3] += expense.price;
              }
              return dataSet;
            }, [...Array(CATEGORY.length)].fill(0)),
          }
        ]
      });

      useEffect(() => {
        const updatedData = expensesList.reduce((dataSet, expense) => {
          const category = expense.category.toLowerCase();
          if (category === 'food') {
            dataSet[0] += expense.price;
          } else if (category === 'entertainment') {
            dataSet[1] += expense.price;
          } else if (category === 'travel') {
            dataSet[2] += expense.price;
          } else {
            dataSet[3] += expense.price;
          }
          return dataSet;
        }, [...Array(CATEGORY.length)].fill(0));
        setChartData({
          labels: CATEGORY, 
          datasets: [
            {
              indexAxis: 'y',
              label: "Expenses: ",
              data: updatedData,
            }
          ]
        });
      }, [expenses]);
    return (
        <div>
            <ChartComponent chartData={chartData} type={type} />
        </div>
    );
}


export default Graph;
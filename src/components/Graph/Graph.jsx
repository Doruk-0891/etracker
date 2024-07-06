import React, {useContext, useState} from "react";
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
            data: expensesList.map((expense) => expense.price),
          }
        ]
      });
    return (
        <div>
            <ChartComponent chartData={chartData} type={type} />
        </div>
    );
}


export default Graph;
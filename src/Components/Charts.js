import React from "react";
import { Doughnut } from "react-chartjs-2";
import "./css/charts.css";

class Charts extends React.Component {
  render() {
    const data = {
      labels: this.props.labels,
      datasets: [
        {
          label: this.props.title,
          data: this.props.values,
          backgroundColor: [
            "#B276B2",
            "#5DA5DA",
            "#FAA43A",
            "#60BD68",
            "#F17CB0",
            "#B2912F"
          ],
          hoverBackgroundColor: [
            "#B276B2",
            "#5DA5DA",
            "#FAA43A",
            "#60BD68",
            "#F17CB0",
            "#B2912F"
          ]
        }
      ]
    };
    return (
      <Doughnut
        data={data}
        width={100}
        height={42}
        options={{ title: { display: true, text: this.props.title } }}
      />
    );
  }
}

export default Charts;

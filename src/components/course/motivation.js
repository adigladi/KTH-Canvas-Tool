import React, { Component } from "react";
import { Line } from "react-chartjs-2";
import groups from "./groupdata";

export default class Motivation extends Component {
  getPointColor = groupData => {
    let colorData = [];
    const colors = {
      red: "rgb(255, 65, 54)",
      orange: "rgb(255, 133, 27)",
      aqua: "rgb(127, 219, 255)",
      blue: "rgb(0, 116, 217)",
      green: "rgb(46, 204, 64)"
    };

    groupData.forEach(weekData => {
      colorData.push(
        weekData === "Very Unmotivated"
          ? colors.red
          : weekData === "Slightly Unmotivated"
          ? colors.orange
          : weekData === "Neutral"
          ? colors.aqua
          : weekData === "Motivated"
          ? colors.blue
          : weekData === "Very Motivated"
          ? colors.green
          : ""
      );
    });

    return colorData;
  };
  render() {
    var data = {
      xLabels: ["45", "46", "47", "48", "49", "50", "51", "52"],
      yLabels: [
        "Very Unmotivated",
        "Slightly Unmotivated",
        "Neutral",
        "Motivated",
        "Very Motivated"
      ],
      datasets: [
        {
          data: groups[this.props.group].motivation,
          borderColor: this.props.color,
          pointBackgroundColor: this.getPointColor(
            groups[this.props.group].motivation
          ),
          pointRadius: 5,
          fill: false
        }
      ]
    };

    var options = {
      title: {
        display: true,
        text: "Group motivation"
      },
      legend: {
        display: false
      },
      scales: {
        xAxes: [
          {
            display: true,
            scaleLabel: {
              display: true,
              labelString: "Week"
            },
            gridLines: {
              display: false
            }
          }
        ],
        yAxes: [
          {
            type: "category",
            position: "left",
            display: true,
            ticks: {
              reverse: true
            },
            gridLines: {
              display: true
            }
          }
        ]
      }
    };
    return (
      <div>
        <Line data={data} options={options} />
      </div>
    );
  }
}

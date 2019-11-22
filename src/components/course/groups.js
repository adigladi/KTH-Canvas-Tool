import React, { Component } from "react";
import { Radar } from "react-chartjs-2";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import students from "./students";

export default class GroupManagement extends Component {
  constructor(props) {
    super(props);
    this.state = {
      week: 49,
      data: []
    };
  }

  componentDidMount() {
    this.setState({ data: this.getGroupData() });
  }

  onSliderChange = value => {
    this.setState({
      week: value
    });
  };

  getGroupData = () => {
    var dataset = [];
    var groupID = ["A", "B", "C", "D"];
    var colors = [
      "54, 162, 235",
      "255, 206, 86",
      "75, 192, 192",
      "153, 102, 255"
    ];

    var groups = [];
    groupID.forEach(id =>
      groups.push({ name: "Group " + id, weekData: this.getGroupWeeks(id) })
    );
    groups.forEach((group, i) => {
      dataset.push({
        label: group.name,
        data: group.weekData[this.state.week],
        backgroundColor: "rgba(" + colors[i] + ", 0.2)",
        borderColor: "rgba(" + colors[i] + ", 1)",
        borderWidth: 2,
        lineTension: 0.1,
        fill: true
      });
    });
    dataset.push({
      label: "Recommended amount of hours",
      data: [10, 10, 10, 10, 10, 10],
      pointRadius: 0,
      backgroundColor: "rgba(255, 99, 132, 0.2)",
      borderColor: "rgba(255, 99, 132, 0.2)",
      borderDash: [5, 3],
      borderWidth: 2,
      lineTension: 0.4,
      fill: "origin"
    });
    return dataset;
  };

  getGroupWeeks = group => {
    var weeks = {
      45: [0, 0, 0, 0, 0, 0],
      46: [0, 0, 0, 0, 0, 0],
      47: [0, 0, 0, 0, 0, 0],
      48: [0, 0, 0, 0, 0, 0],
      49: [0, 0, 0, 0, 0, 0]
    };

    students.forEach(student => {
      if (student.group === group) {
        for (let week in student.weekData) {
          let hourList = student.weekData[week];
          for (var i = 0; i < student.weekData[week].length; i++) {
            weeks[week][i] += hourList[i];
          }
        }
      }
    });
    for (let week in weeks) {
      for (var i = 0; i < weeks[week].length; i++)
        weeks[week][i] = Math.round((weeks[week][i] / 6) * 10) / 10;
    }
    return weeks;
  };

  test = e => {
    console.log(e);
  };

  render() {
    var dataset = this.getGroupData();

    var data = {
      labels: [
        "Field Studies",
        "Personas & Scenarios",
        "Design & Prototyping",
        "Evaluation",
        "Design Critique",
        "Presentation"
      ],
      datasets: dataset
    };

    var options = {
      scale: {
        ticks: {
          beginAtZero: true,
          min: 0,
          max: 20
        }
      }
    };

    const weeks = {
      45: 45,
      46: 46,
      47: 47,
      48: 48,
      49: 49
    };
    return (
      <div>
        <Radar data={data} options={options} getElementAtEvent={this.test} />
        <div className="weekSlider">
          <p>Week: </p>
          <Slider
            min={45}
            max={49}
            marks={weeks}
            step={1}
            included={false}
            defaultValue={this.state.week}
            onChange={this.onSliderChange}
          />
        </div>
      </div>
    );
  }
}

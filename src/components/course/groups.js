import React, { Component } from "react";
import { Radar } from "react-chartjs-2";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import students from "./students";
import "../styles/groups.scss";
import CourseMenu from "./menu";
import CourseHeader from "./header";

export default class GroupManagement extends Component {
  constructor(props) {
    super(props);
    this.state = {
      week: 49,
      group: "",
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

  getColor = (index, alpha) => {
    const colors = [
      "54, 162, 235",
      "255, 206, 86",
      "75, 192, 192",
      "153, 102, 255",
      "255, 99, 132"
    ];
    index = Number.isInteger(index) ? index : index.charCodeAt(0) - 65;
    alpha = !alpha ? 1 : alpha;
    return "rgba(" + colors[index] + ", " + alpha + ")";
  };

  getGroupData = () => {
    var dataset = [];
    var groupID = ["A", "B", "C", "D"];

    var groups = [];
    groupID.forEach(id =>
      groups.push({ name: "Group " + id, weekData: this.getGroupWeeks(id) })
    );
    groups.forEach((group, i) => {
      dataset.push({
        label: group.name,
        data: group.weekData[this.state.week],
        backgroundColor: this.getColor(i, 0.2),
        borderColor: this.getColor(i, 1),
        borderWidth: 2,
        lineTension: 0.1,
        fill: true
      });
    });
    dataset.push({
      label: "Recommended amount of hours",
      data: [10, 10, 10, 10, 10, 10],
      pointRadius: 0,
      backgroundColor: this.getColor(4, 0.2),
      borderColor: this.getColor(4, 0.2),
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

  getMemberData = group => {
    var dataset = [];
    var memberData = [];

    students.forEach(student => {
      if (student.group === group) {
        var hours = 0;
        student.weekData[this.state.week].forEach(part => (hours += part));
        memberData.push(hours);
      }
    });
    dataset.push({
      label: "Recommended amount of hours",
      data: [10, 10, 10, 10, 10],
      pointRadius: 0,
      backgroundColor: this.getColor(4, 0.2),
      borderColor: this.getColor(4, 0.2),
      borderDash: [5, 3],
      borderWidth: 2,
      lineTension: 0.4,
      fill: false
    });

    dataset.push({
      label: this.state.group,
      data: memberData,
      backgroundColor: this.getColor(group, 0.2),
      borderColor: this.getColor(group),
      borderWidth: 2,
      lineTension: 0.1,
      fill: false
    });
    return dataset;
  };

  setActiveGroup = group => {
    var activeGroup = group.target.id !== "all" ? group.target.innerHTML : "";
    this.setState({
      group: activeGroup
    });
  };

  getLabels = () => {
    var groupLabels = [
      "Field Studies",
      "Personas & Scenarios",
      "Design & Prototyping",
      "Evaluation",
      "Design Critique",
      "Presentation"
    ];
    var memberLabels = [];

    if (this.state.group === "") {
      return groupLabels;
    } else {
      students.forEach(student => {
        if (student.group === this.state.group.slice(-1)) {
          memberLabels.push(student.name);
        }
      });
      return memberLabels;
    }
  };

  render() {
    var dataset =
      this.state.group === ""
        ? this.getGroupData()
        : this.getMemberData(this.state.group.slice(-1));

    var data = {
      labels: this.getLabels(),
      datasets: dataset
    };

    var options = {
      scale: {
        ticks: {
          beginAtZero: true,
          min: 0
          // max: 20
        }
      }
      /*       legend: {
        onClick: function(evt, item) {
          console.log("legend onClick", evt, item);
        }
      } */
    };

    const weeks = {
      45: 45,
      46: 46,
      47: 47,
      48: 48,
      49: 49
    };
    return (
      <div id="wrapper" className="ic-Layout-wrapper">
        <CourseHeader />
        <div className="ic-Layout-columns">
          <CourseMenu active="groups" />
          <div className="groupContainer">
            <div id="" className="chartContainer">
              <Radar data={data} options={options} />
            </div>
            <div className="groupList" onClick={this.setActiveGroup}>
              <ul>
                <li
                  id="all"
                  className={this.state.group === "" ? "active" : ""}
                  style={{ color: "rgb(0, 107, 199)" }}
                >
                  All groups
                </li>
                <li
                  className={this.state.group === "Group A" ? "active" : ""}
                  style={{ color: this.getColor(0) }}
                >
                  Group A
                </li>
                <li
                  className={this.state.group === "Group B" ? "active" : ""}
                  style={{ color: this.getColor(1) }}
                >
                  Group B
                </li>
                <li
                  className={this.state.group === "Group C" ? "active" : ""}
                  style={{ color: this.getColor(2) }}
                >
                  Group C
                </li>
                <li
                  className={this.state.group === "Group D" ? "active" : ""}
                  style={{ color: this.getColor(3) }}
                >
                  Group D
                </li>
              </ul>
            </div>
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
        </div>
      </div>
    );
  }
}

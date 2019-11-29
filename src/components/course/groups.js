import React, { Component } from "react";
import { Radar } from "react-chartjs-2";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import students from "./students";
import "../styles/groups.scss";
import CourseMenu from "./menu";
import CourseHeader from "./header";
import Joyride from "react-joyride";
import Satisfaction from "./satisfaction";
import Motivation from "./motivation";

export default class GroupManagement extends Component {
  constructor(props) {
    super(props);
    this.state = {
      week: 52,
      group: "",
      color: "",
      data: []
    };
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
      "255, 159, 64",
      "252, 217, 193",
      "231, 104, 104",
      "190, 243, 180",
      "255, 207, 159",
      "165, 223, 223",
      "255, 99, 132",
      "100, 100, 100"
    ];
    index = Number.isInteger(index) ? index : index.charCodeAt(0) - 65;
    alpha = !alpha ? 1 : alpha;
    return "rgba(" + colors[index] + ", " + alpha + ")";
  };

  getGroupData = () => {
    var dataset = [];
    var groupID = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];

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
        fill: false
      });
    });
    return dataset;
  };

  getGroupWeeks = group => {
    var weeks = {
      45: [0, 0, 0, 0, 0, 0],
      46: [0, 0, 0, 0, 0, 0],
      47: [0, 0, 0, 0, 0, 0],
      48: [0, 0, 0, 0, 0, 0],
      49: [0, 0, 0, 0, 0, 0],
      50: [0, 0, 0, 0, 0, 0],
      51: [0, 0, 0, 0, 0, 0],
      52: [0, 0, 0, 0, 0, 0]
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
    var peerData = [];

    students.forEach(student => {
      if (student.group === group) {
        var hours = 0;
        student.weekData[this.state.week].forEach(part => (hours += part));
        memberData.push(hours);
        peerData.push(student.peerData[this.state.week]);
      }
    });
    dataset.push({
      label: "Recommended",
      data: [20, 20, 20, 20, 20],
      pointRadius: 0,
      backgroundColor: this.getColor(10, 0.2),
      borderColor: this.getColor(10, 0.2),
      borderDash: [5, 3],
      borderWidth: 2,
      lineTension: 0.4,
      fill: true
    });

    dataset.push({
      label: this.state.group,
      data: peerData,
      backgroundColor: this.getColor(group, 0.2),
      borderColor: this.getColor(group),
      borderWidth: 2,
      lineTension: 0.1,
      fill: false
    });

    dataset.push({
      label: "Peer-reviewed hours",
      data: memberData,
      backgroundColor: this.getColor(11, 0.2),
      borderColor: this.getColor(11, 0.4),
      borderDash: [5, 3],
      borderWidth: 2,
      lineTension: 0.1,
      fill: false
    });
    return dataset;
  };

  setActiveGroup = group => {
    if (group.target.tagName === "LI") {
      var activeGroup = group.target.id !== "all" ? group.target.innerHTML : "";
      this.setState({
        group: activeGroup,
        color: this.getColor(activeGroup.slice(-1))
      });
    }
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
    };

    const weeks = {
      45: 45,
      46: 46,
      47: 47,
      48: 48,
      49: 49,
      50: 50,
      51: 51,
      52: 52
    };

    var steps = [
      {
        target: ".groupContainer",
        content:
          "This is a tool designed to help teachers evaluate group projects."
      },
      {
        target: ".chartContainer",
        content:
          "This radar chart shows the average of hours worked in different course parts, in all groups. Press the group title to filter out the selected group."
      },
      {
        target: ".weekSlider",
        content: "Use this slider to show data from a specific week."
      },
      {
        target: ".groupList",
        content:
          "Here you can select to view a specific group, to see the work hours of all group members."
      }
    ];

    return (
      <div id="wrapper" className="ic-Layout-wrapper">
        <Joyride steps={steps} continuous={true} />
        <CourseHeader />
        <div className="ic-Layout-columns">
          <CourseMenu active="groups" />
          <div className="groupContainer">
            <div className="groupList" onClick={this.setActiveGroup}>
              <p>Group data: </p>
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
                <li
                  className={this.state.group === "Group E" ? "active" : ""}
                  style={{ color: this.getColor(4) }}
                >
                  Group E
                </li>
                <li
                  className={this.state.group === "Group F" ? "active" : ""}
                  style={{ color: this.getColor(5) }}
                >
                  Group F
                </li>
                <li
                  className={this.state.group === "Group G" ? "active" : ""}
                  style={{ color: this.getColor(6) }}
                >
                  Group G
                </li>
                <li
                  className={this.state.group === "Group H" ? "active" : ""}
                  style={{ color: this.getColor(7) }}
                >
                  Group H
                </li>
                <li
                  className={this.state.group === "Group I" ? "active" : ""}
                  style={{ color: this.getColor(8) }}
                >
                  Group I
                </li>
                <li
                  className={this.state.group === "Group J" ? "active" : ""}
                  style={{ color: this.getColor(9) }}
                >
                  Group J
                </li>
              </ul>
            </div>
            <div id="" className="chartContainer">
              <div className="groupChartContainer">
                {this.state.group !== "" && (
                  <Satisfaction
                    group={this.state.group}
                    color={this.state.color}
                  />
                )}
                {this.state.group !== "" && (
                  <Motivation
                    group={this.state.group}
                    color={this.state.color}
                  />
                )}
              </div>
              <div className="radarContainer">
                <Radar data={data} options={options} />
              </div>
            </div>
            <div className="weekSlider">
              <p>Week: </p>
              <Slider
                min={45}
                max={52}
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

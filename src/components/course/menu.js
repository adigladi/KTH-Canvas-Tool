import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class CourseMenu extends Component {
  render() {
    return (
      <div
        id="left-side"
        className="ic-app-course-menu list-view-a11y-left-menu-flag"
        style={{ display: "block" }}
      >
        <nav role="navigation" aria-label="Courses Navigation Menu">
          <ul id="section-tabs">
            <li className="section">
              <Link to="/" tabIndex="0" className="active">
                Home
              </Link>
            </li>

            <li className="section">
              <Link to="/" tabIndex="0">
                Announcements
              </Link>
            </li>
            <li className="section">
              <Link to="/" tabIndex="0">
                Assignments
              </Link>
            </li>

            <li className="section">
              <Link to="/" tabIndex="0">
                Discussions
              </Link>
            </li>

            <li className="section">
              <Link to="/" tabIndex="0">
                Grades
              </Link>
            </li>

            <li className="section">
              <Link to="/" tabIndex="0">
                People
              </Link>
            </li>

            <li className="section">
              <Link to="/" tabIndex="0">
                Syllabus
              </Link>
            </li>

            <li className="section">
              <Link to="/" tabIndex="0">
                Modules
              </Link>
            </li>

            <li className="section">
              <Link to="/" tabIndex="0">
                Collaborations
              </Link>
            </li>

            <li className="section">
              <Link to="/" tabIndex="0">
                Media Gallery
              </Link>
            </li>

            <li className="section">
              <Link to="/" tabIndex="0">
                Video Recording
              </Link>
            </li>

            <li className="section">
              <Link to="/groups" tabIndex="0">
                Group Management
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    );
  }
}

import React, { Component } from "react";

export default class CourseHeader extends Component {
  render() {
    return (
      <div className="ic-app-nav-toggle-and-crumbs no-print">
        <button
          type="button"
          id="courseMenuToggle"
          className="Button Button--link ic-app-course-nav-toggle"
          aria-live="polite"
          aria-label="Hide Courses Navigation Menu"
          title="Hide Courses Navigation Menu"
        >
          <i className="icon-hamburger" aria-hidden="true"></i>
        </button>
        <div className="ic-app-crumbs">
          <nav id="breadcrumbs" role="navigation" aria-label="breadcrumbs">
            <ul>
              <li className="home">
                <a href="/">
                  <span className="ellipsible">
                    <i className="icon-home" title="My Dashboard">
                      <span className="screenreader-only">My Dashboard</span>
                    </i>
                  </span>
                </a>
              </li>
              <li id="crumb_course_3080">
                <a href="https://kth.instructure.com/courses/3080">
                  <span className="ellipsible">DH2620</span>
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    );
  }
}

import React, { Component } from "react";

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
              <a
                href="/courses/3080"
                title="Home"
                aria-current="page"
                className="home active"
                tabIndex="0"
              >
                Home
              </a>
            </li>
            <li className="section">
              <a
                href="/courses/3080/announcements"
                title="Announcements"
                className="announcements"
                tabIndex="0"
              >
                Announcements
              </a>
            </li>
            <li className="section">
              <a
                href="/courses/3080/assignments"
                title="Assignments"
                className="assignments"
                tabIndex="0"
              >
                Assignments
              </a>
            </li>
            <li className="section">
              <a
                href="/courses/3080/discussion_topics"
                title="Discussions"
                className="discussions"
                tabIndex="0"
              >
                Discussions
              </a>
            </li>
            <li className="section">
              <a
                href="/courses/3080/grades"
                title="Grades"
                className="grades"
                tabIndex="0"
              >
                Grades<b className="nav-badge">1</b>
              </a>
            </li>
            <li className="section">
              <a
                href="/courses/3080/users"
                title="People"
                className="people"
                tabIndex="0"
              >
                People
              </a>
            </li>
            <li className="section">
              <a
                href="/courses/3080/assignments/syllabus"
                title="Syllabus"
                className="syllabus"
                tabIndex="0"
              >
                Syllabus
              </a>
            </li>
            <li className="section">
              <a
                href="/courses/3080/modules"
                title="Modules"
                className="modules"
                tabIndex="0"
              >
                Modules
              </a>
            </li>
            <li className="section">
              <a
                href="/courses/3080/collaborations"
                title="Collaborations"
                className="collaborations"
                tabIndex="0"
              >
                Collaborations
              </a>
            </li>
            <li className="section">
              <a
                href="/courses/3080/external_tools/788"
                title="Media Gallery"
                className="context_external_tool_788"
                tabIndex="0"
              >
                Media Gallery
              </a>
            </li>
            <li className="section">
              <a
                href="/courses/3080/external_tools/789"
                title="Video Recording"
                className="context_external_tool_789"
                tabIndex="0"
              >
                Video Recording
              </a>
            </li>
          </ul>
        </nav>
      </div>
    );
  }
}

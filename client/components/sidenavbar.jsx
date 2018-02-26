import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

@connect((store) => {
  return {
    auth: store.auth,
  };
})

export default class Navbar extends React.Component {
  staffMenu() {
    return (
      <ul className="nav nav-pills flex-column sidebar-nav">
        <li className="nav-item"><Link className="nav-link" to="/dashboard"><em className="fa fa-dashboard"></em> Dashboard</Link></li>
        <li className="nav-item"><Link className="nav-link" to="/registration"><em className="fa fa-registered"></em> Role</Link></li>
        <li className="nav-item"><Link className="nav-link" to="/lessonnote"><em className="fa fa-list"></em> Lesson Note</Link></li>
        <li className="nav-item"><Link className="nav-link" to="/assessments"><em className="fa fa-tasks"></em> Assessments </Link></li>
        <li className="nav-item"><Link className="nav-link" to="/spreadsheet"><em className="fa fa-table"></em> Spreadsheet</Link></li>
        <li className="nav-item"><Link className="nav-link" to="/report"><em className="fa fa-table"></em> Reports</Link></li>
        <li className="nav-item"><Link className="nav-link" to="/chart"><em className="fa fa-bar-chart"></em> Chart</Link></li>
        <li className="nav-item"><Link className="nav-link" to="/library"><em className="fa fa-book"></em> Library</Link></li>
        <li className="nav-item"><Link className="nav-link" to="/test-area"><em className="fa fa-edit"></em> Test Area</Link></li>
        <li className="nav-item"><Link className="nav-link" to="/settings"><em className="fa fa-gear"></em> Settings</Link></li>
      </ul>
    );
  }
  studentMenu() {
    return (
      <ul className="nav nav-pills flex-column sidebar-nav">
        <li className="nav-item"><Link className="nav-link" to="/studentdashboard"><em className="fa fa-dashboard"></em> Dashboard <span className="sr-only">(current)</span></Link></li>
        <li className="nav-item"><Link className="nav-link" to="/studentnote"><em className="fa fa-clone"></em> Note</Link></li>
        <li className="nav-item"><Link className="nav-link" to="/studentassessments"><em className="fa fa-tasks"></em> Assessments </Link></li>
        <li className="nav-item"><Link className="nav-link" to="/studentlibrary"><em className="fa fa-book"></em> Library</Link></li>
        <li className="nav-item"><Link className="nav-link" to="/studenttestarea"><em className="fa fa-edit"></em> Test Area</Link></li>
      </ul>
    );
  }
  render() {
    const { isStudent } = this.props.auth;
    return (
      <nav className="sidebar col-xs-12 col-sm-4 col-lg-3 col-xl-2 bg-faded sidebar-style-1">
      <h1 className="site-title"><Link to="/"><em className="fa fa-home"></em> Yeshua High School</Link></h1>
      
      <Link to="/#menu-toggle" className="btn btn-default" id="menu-toggle"><em className="fa fa-bars"></em></Link>
      { isStudent ? this.studentMenu() : this.staffMenu() }      
      <Link to="/#" className="logout-button"><em className="fa fa-power-off"></em> Signout</Link>
    </nav>
    );
  }
}
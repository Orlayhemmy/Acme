import React from 'react';
import { Link } from 'react-router-dom';

export default class Navbar extends React.Component {
  render() {
    return (
      <nav className="sidebar col-xs-12 col-sm-4 col-lg-3 col-xl-2 bg-faded sidebar-style-1">
      <h1 className="site-title"><Link to="/index"><em className="fa fa-home"></em> Yeshua High School</Link></h1>
      
      <Link to="/#menu-toggle" className="btn btn-default" id="menu-toggle"><em className="fa fa-bars"></em></Link>
      
      <ul className="nav nav-pills flex-column sidebar-nav">
        <li className="nav-item"><Link className="nav-link active" to="/dashboard"><em className="fa fa-dashboard"></em> Dashboard <span className="sr-only">(current)</span></Link></li>
        <li className="nav-item"><Link className="nav-link" to="/registration"><em className="fa fa-registered"></em> Role</Link></li>
        <li className="nav-item"><Link className="nav-link" to="/lessonnote"><em className="fa fa-list"></em> Lesson Note</Link></li>
        <li className="nav-item"><Link className="nav-link" to="/assessments"><em className="fa fa-tasks"></em> Assessments </Link></li>
        <li className="nav-item"><Link className="nav-link" to="/spreadsheet"><em className="fa fa-table"></em> Spreadsheet</Link></li>
        <li className="nav-item"><Link className="nav-link" to="/report"><em className="fa fa-reply"></em> Reports</Link></li>
        <li className="nav-item"><Link className="nav-link" to="/chart"><em className="fa fa-bar-chart"></em> Chart</Link></li>
        <li className="nav-item"><Link className="nav-link" to="/library"><em className="fa fa-book"></em> Library</Link></li>
        <li className="nav-item"><Link className="nav-link" to="/test-area"><em className="fa fa-edit"></em> Test Area</Link></li>
      </ul>
      
      <Link to="/#" className="logout-button"><em className="fa fa-power-off"></em> Signout</Link>
    </nav>
    );
  }
}
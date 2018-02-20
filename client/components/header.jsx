import React from 'react';
import { Link } from 'react-router-dom';

export default class Header extends React.Component {
  render() {
    return (
      <header className="page-header row justify-center">
        <div className="col-md-6 col-lg-8" >
          <h1 className="float-left text-center text-md-left">{this.props.header}</h1>
        </div>
        <div className="dropdown user-dropdown col-md-6 col-lg-4 text-center text-md-right"><Link className="btn btn-stripped dropdown-toggle" to="#" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          <img src="/images/profile-pic.jpg" alt="profile photo" className="circle float-left profile-photo" width="50" height="auto"/> 
          <div className="username mt-1">
            <h4 className="mb-1">Username</h4>
            <h6>Teacher</h6>
          </div>
          </Link>
          <div className="dropdown-menu dropdown-menu-right dropmr" aria-labelledby="dropdownMenuLink"><Link className="dropdown-item" to="#"><em className="fa fa-user-circle mr-1"></em> View Profile</Link>
            <Link className="dropdown-item" to="#"><em className="fa fa-sliders mr-1"></em> Preferences</Link>
            <Link className="dropdown-item" to="#"><em className="fa fa-power-off mr-1"></em> Logout</Link></div>
        </div>
        <div className="clear"></div>
      </header>
    );
  }
}
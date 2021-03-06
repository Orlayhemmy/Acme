import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Navbar from './sidenavbar';
import Header from './header';
import Footer from './footer';
import { getAllActivities } from '../actions/activityActions';
import { getTeacherClasses } from '../actions/classActions';

@connect((store) =>  {
  return {
    auth: store.auth,
    activity: store.activity,
  };
})
export default class Dashboard extends React.Component {
  componentWillMount() {
    this.props.dispatch(getAllActivities());
    this.props.dispatch(getTeacherClasses());
  }
  render() {
    const { activities } = this.props.activity;

    const notifications = _.map(activities, (activity) => {
      let data = activity.createdAt;
      let creationDate = new Date(data.replace(/-/g,'/').replace('Z','').replace('T',' '));
      let locale = "en-us";
      let month = creationDate.toLocaleString(locale, { month: "short" });
      let day = creationDate.getDate();

      return (
        <div class="article">
          <div class="col-xs-12">
            <div class="row">
              <div class="col-2 date">
                <div class="large">{day}</div>
                
                <div class="text-muted">{month}</div>
              </div>
              
              <div class="col-10">
                <h4><a href="#">{activity.title}</a></h4>
                <p>{activity.description}</p>
              </div>
            </div>
          </div>
          <div class="clear"></div>
        </div>
      );
    });
    return (
      <div class="row">
        <Navbar />
        <main class="col-xs-12 col-sm-8 offset-sm-4 col-lg-9 offset-lg-3 col-xl-10 offset-xl-2 pt-3 pl-4">
          <Header header="Dashboard"/>
          <section class="row">
            <div class="col-sm-12">
              <section class="row">
                <div class="col-md-12 col-lg-8">								
                  <div class="card mb-4">
                    <div class="card-block">
                      <h3 class="card-title">Notifications</h3>
                                          
                      <h6 class="card-subtitle mb-2 text-muted">What's New</h6>
                      
                      <div class="divider"></div>
                      
                      <div class="articles-container">
                        {notifications}
                      </div>
                    </div>
                  </div>
                </div>
                
                <div class="col-md-12 col-lg-4">
                  <div class="card mb-4">
                    <div class="card-block">										
                      <h3 class="card-title">School Calendar</h3>
                      <h6 class="card-subtitle mb-2 text-muted">What's coming up</h6>
                      <ul class="timeline">
                        <li>
                          <div class="timeline-badge info"><em>05 May</em></div>
                          
                          <div class="timeline-panel">
                            <div class="timeline-heading">
                              <h5 class="timeline-title mt-2">Cultural Day</h5>
                            </div>
                            
                            <div class="timeline-body">
                              <p>A day for display of different Nigerian cultures by students</p>
                            </div>
                          </div>
                        </li>
                        <li>
                          <div class="timeline-badge primary"><em>17 May</em></div>
                          
                          <div class="timeline-panel">
                            <div class="timeline-heading">
                              <h5 class="timeline-title mt-2">Sport</h5>
                            </div>
                            
                            <div class="timeline-body">
                              <p>7th Annual interhouse sport</p>
                            </div>
                          </div>
                        </li>
                        <li>
                          <div class="timeline-badge warning"><em>07 Jun</em></div>
                          
                          <div class="timeline-panel">
                            <div class="timeline-heading">
                              <h5 class="timeline-title mt-2">Competition</h5>
                            </div>
                            
                            <div class="timeline-body">
                              <p>Association of private schools in Nigeria, Mathematics competition</p>
                            </div>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </section>
          <Footer />
        </main>
      </div>
    );
  }
}
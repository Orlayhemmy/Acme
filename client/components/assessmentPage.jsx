import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from './sidenavbar';
import Header from './header';
import Footer from './footer';
import Feedback from './AssessmentContent/feedback';
import Assessment from './AssessmentContent/assessment';

export default class LessonNote extends React.Component {
  constructor() {
    super();
    this.state = {
      assessmentHidden: false,
      feedbackHidden: true,
    }
  }
  toggleDiv() { 
    this.setState({
      assessmentHidden: !this.state.assessmentHidden,
      feedbackHidden: !this.state.feedbackHidden,
    });
  }
  render() {
    let contentToggler = (
      <div className="col-lg-12 mb-12">
        <div className="card text">
          <div className="card-header">
            <ul className="nav nav-tabs card-header-tabs">
              <li className="nav-item"><span className="nav-link active" onClick={this.toggleDiv.bind(this)}>Assessment</span></li>
              <li className="nav-item"><span className="nav-link" onClick={this.toggleDiv.bind(this)}>Feedback</span></li>
            </ul>
          </div>
          {!this.state.assessmentHidden && <Assessment />}
          {!this.state.feedbackHidden && <Feedback />}
        </div>
      </div>
    );
    return (
      <div className="row">
        <Navbar />
        <main class="col-xs-12 col-sm-8 offset-sm-4 col-lg-9 offset-lg-3 col-xl-10 offset-xl-2 pt-3 pl-4">
          <Header header="Assessment"/>
          <section className="row">
            {contentToggler}		
          </section>
          <Footer />
        </main>
      </div>
    );
  }
}
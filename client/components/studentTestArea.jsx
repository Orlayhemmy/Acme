import React from 'react';
import { connect } from 'react-redux';
import isEmpty from 'lodash/isEmpty';
import Navbar from './sidenavbar';
import Header from './header';
import Footer from './footer';
import { getClassTests, getTest } from '../actions/testActions';
import { getTestQuestions } from '../actions/questionActions';

@connect((store) => {
  return {
    auth: store.auth,
    test: store.test,
    term: store.term,
  };
})

export default class StudentTestArea extends React.Component {
  // constructor() {
  //   super();
  //   this.state = {
  //     weekId: '',
  //   }
  //   this.updateArchive = this.updateArchive.bind(this);
  //   this.onClick = this.onClick.bind(this);
  // }
  
  onClick(e) {
    this.props.dispatch(getTest(e.target.id));
    window.open('/testintro', 'window', 'toolbar=no, menubar=no, resizable=yes');
  }
  // updateArchive(e) {
  //   this.props.dispatch(getStudentWeekNotes(e.target.value));
  // }
  componentWillMount() {
    this.props.dispatch(getClassTests(this.props.term.id.value))
  }
  render() {
    let content;
    const { tests } = this.props.test;
    if (isEmpty(tests)) {
      content = (
        <div className="col-lg-12 mb-4 mt-4 text-center">
          <div className="notice">
            <h2><b>No Test Uploaded</b></h2>
          </div>
        </div>  
      );
    } else {
      content = _.map(tests, (test) => {
        return (
          <div class="col-lg-12 mb-4" key={test.testId}>
            
              <div class="card-block">
                <span id={test.testId}  onClick={this.onClick.bind(this)}>
                  {test.title}: {test.Subject.subjectname}
                </span>
              </div>
          </div>
        );
      });
    }
   
    return (
      <div className="row">
        <Navbar />
        <main class="col-xs-12 col-sm-8 offset-sm-4 col-lg-9 offset-lg-3 col-xl-10 offset-xl-2 pt-3 pl-4">
          <Header header="Test"/>
          <section className="row">
            <div class="col-sm-12">
              <section class="row">
                <div class="col-md-12 col-lg-12">								
                  <div class="card mb-4">
                    <div class="card-block">                
                      <section className="row">
                        {content}
                      </section>
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
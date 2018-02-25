import React from 'react';
import { connect } from 'react-redux';
import Navbar from './sidenavbar';
import Header from './header';
import Footer from './footer';
import Container from './containerStudentPage';
import { getWeekNotes } from '../actions/noteActions';

@connect((store) => {
  return {
    auth: store.auth,
    note: store.note,
    week: store.week,
  };
})

export default class LessonNote extends React.Component {
  constructor() {
    super();
    this.state = {
 
    }
  }
  componentWillMount() {
    this.props.dispatch(getWeekNotes(this.props.week.id.value))
  }
  render() {
    const { notes } = this.props.note;
    const content = _.map(notes, (note) => {
      <div class="col-lg-4 mb-4">
        <div class="card card-inverse card-primary">
          <div class="card-header">{note.Subject.subjectname}</div>
          <div class="card-block">
            <p><b>{note.topic}</b>
            <br/>{note.preview}</p>
          </div>
        </div>
      </div>
    })
    return (
      <div className="row">
        <Navbar />
        <main class="col-xs-12 col-sm-8 offset-sm-4 col-lg-9 offset-lg-3 col-xl-10 offset-xl-2 pt-3 pl-4">
          <Header header="Lesson Note"/>
          <section className="row">
            <div class="col-sm-12">
              <section class="row">
                <div class="col-md-12 col-lg-12">								
                  <div class="card mb-4">
                    <div class="card-block">
                      <h3 class="card-title">Notes</h3>
                      <h6 class="card-subtitle mb-2 text-muted">Class Notes</h6>
                      <div class="divider"></div>
                      <div class="col-lg-2">
                        <div class="form-group">
                          <select id="weekId" class="form-control">
                            <option>Current Week</option>
                          </select>
                        </div>
                      </div>
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
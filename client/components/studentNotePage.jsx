import React from 'react';
import { connect } from 'react-redux';
import isEmpty from 'lodash/isEmpty';
import Navbar from './sidenavbar';
import Header from './header';
import Footer from './footer';
import Container from './containerStudentPage';
import { getStudentWeekNotes, getStudentNote } from '../actions/noteActions';

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
      weekId: '',
    }
    this.updateArchive = this.updateArchive.bind(this);
    this.onClick = this.onClick.bind(this);
  }
  
  onClick(e) {
    this.props.dispatch(getStudentNote(e.target.id));
    window.open('/studentviewnote', 'window', 'toolbar=no, menubar=no, resizable=yes');
  }
  updateArchive(e) {
    this.props.dispatch(getStudentWeekNotes(e.target.value));
  }
  componentWillMount() {
    this.props.dispatch(getStudentWeekNotes(this.props.week.id.value))
  }
  render() {
    const { weekId } = this.state;
    let content;
    const { notes } = this.props.note;
    if (isEmpty(notes)) {
      content = (
        <div className="col-lg-12 mb-4 mt-4 text-center">
          <div className="notice">
            <h2><b>No Lesson Note Uploaded</b></h2>
          </div>
        </div>  
      );
    } else {
      content = _.map(notes, (note) => {
        return (
          <div class="col-lg-4 mb-4" key={note.noteId}>
            <div class="card card-inverse card-primary">
              <div class="card-header">{note.Subject.subjectname} <em className="fa fa-eye float-right" onClick={this.onClick} id={note.noteId}></em>
              </div>
              <div class="card-block">
                <p><b>{note.topic}</b>
                <br/>{note.preview}</p>
              </div>
            </div>
          </div>
        );
      });
    }
   
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
                          <select id="weekId" onChange={this.updateArchive} class="form-control">
                            <option value={this.props.week.id.value}>Current Week</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                            <option value="6">6</option>
                            <option value="7">7</option>
                            <option value="8">8</option>
                            <option value="9">9</option>
                            <option value="10">10</option>
                            <option value="11">11</option>
                            <option value="12">12</option>
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
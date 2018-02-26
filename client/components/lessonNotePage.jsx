import React from 'react';
import Navbar from './sidenavbar';
import Header from './header';
import Footer from './footer';
import MainNote from './LessonNoteContent/mainLessonNote';
import OtherNotes from './LessonNoteContent/otherLessonNotes';

export default class LessonNote extends React.Component {
  constructor() {
    super();
    this.state = {
      mainnoteHidden: false,
      othernotesHidden: true,
    }
  }
  toggleDiv() {
    this.setState({
      mainnoteHidden: !this.state.mainnoteHidden,
      othernotesHidden: !this.state.othernotesHidden,
    });
  }
  render() {
    let contentToggler = (
      <div className="col-lg-12 mb-12">
        <div className="card">
          <div className="card-header">
            <ul className="nav nav-tabs card-header-tabs">
              <li className="nav-item"><span className="nav-link active" onClick={this.toggleDiv.bind(this)}>Lesson Note</span></li>
              <li className="nav-item"><span className="nav-link" onClick={this.toggleDiv.bind(this)}>Preview Other Notes</span></li>
            </ul>
          </div>
          {!this.state.mainnoteHidden && <MainNote />}
          {!this.state.othernotesHidden && <OtherNotes />}
        </div>
      </div>
    );
    return (
      <div className="row">
        <Navbar note='nav-link active'/>
        <main class="col-xs-12 col-sm-8 offset-sm-4 col-lg-9 offset-lg-3 col-xl-10 offset-xl-2 pt-3 pl-4">
          <Header header="Lesson Note"/>
          <section className="row">
            {contentToggler}		
          </section>
          <Footer />
        </main>
      </div>
    );
  }
}
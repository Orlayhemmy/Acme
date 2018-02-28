import React from 'react';
import { connect } from 'react-redux';
import Header from './header';
import Footer from './footer';

@connect((store) => {
  return {
    auth: store.auth,
    note:store.note,
  };
})

export default class ViewNote extends React.Component {
  render() {
    const { note } = this.props.note;
    return (
      <div class="row">			
        <main class="col-xs-12 col-sm-12 col-lg-12 col-xl-12 pl-4">
          <Header header={note.subjectname}/>
          <section class="row">
            <div class="col-sm-12 col-md-8">
              <div class="card mb-6">	
                <div class="card-block">
                  <h3>{note.topic}</h3>
                  <br/>
                  {note.content}
                </div>					
              </div>
            </div> 
          </section>
          <Footer />
        </main>
      </div>
    );
  }
}
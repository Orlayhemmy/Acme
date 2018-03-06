import React from 'react';
import { connect } from 'react-redux';
import isEmpty from 'lodash/isEmpty';
import Header from './header';
import { modifyNote, getNote } from '../actions/noteActions';

@connect((store) => {
  return {
    auth: store.auth,
    note: store.note,
  };
})

export default class Note extends React.Component {
  constructor() {
    super();
    this.state = {
      remarks: '',
    }
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({
      [e.target.id]: e.target.value,
    });
  }

  onSubmit(e) {
    e.preventDefault();
    this.props.dispatch(modifyNote(this.props.note.note.id, this.state));
  }
  componentDidUpdate() {
    if (this.props.note.status === 200) {
      alert(this.props.note.message);
    }    
  }
  render() {
    const { note } = this.props.note;
    const { remark} = this.state;
    return (
      <div class="row">			
        <main class="col-xs-12 col-sm-12 col-lg-12 col-xl-12 pl-4">
          <Header header="Lesson Note"/>
          <section class="row">
					<div class="col-sm-12 col-md-8">
						<div class="card mb-6">	
							<div class="card-block">
                <table class="table table-striped">
                  <tbody>
                    <tr>
                      <th>Session</th>
                      
                      <td>Plotting of Graph</td>
                                                
                      <th>Term</th>
                      <td>{note.termId}</td>
                    </tr>
                    
                    <tr>
                      <th>Week</th>
                      
                      <td>{note.weekId}</td>
                      
                      <th>Class</th>
                      <td>{note.classname}</td>
                    </tr>
                    <tr>
                      <th>Duration</th>
                      <td>
                        {duration}
                      </td>
                    </tr>
                  </tbody>
                </table>
                <h5>Topic</h5>
                <h6>{topic}</h6>
                <h5>Scope</h5>
                <h6>{scope}</h6>
                <h5>Questions</h5>
                <h6>{questions}</h6>
                <h5>Reference</h5>
                <h6>{reference}</h6>
                <h5>Materials</h5>
                <h6>{materials}</h6>
                <h5>Objectives</h5>
                <h6>{objectives}</h6>
                <h5>Entry Behaviours</h5>
                <h6>{behaviour}</h6>
                <h5>Strategies</h5>
                <h6>{strategies}</h6>
                <h5>Content</h5>
                <h6>{content}</h6>
                <h5>Activity</h5>
                <h6>{activity}</h6>
                <h5>Assessment</h5>
                <h6>{assessment}</h6>							
							</div>					
						</div>
						
					</div>
				</section>
        </main>
      </div>
    );
  }
}
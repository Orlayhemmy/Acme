import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import isEmpty from 'lodash/isEmpty';
import Header from './header';
import Footer from './footer';
import { modifyFeedback } from '../actions/feedbackActions';

@connect((store) => {
  return {
    auth: store.auth,
    assignment:store.assignment,
    feedback: store.feedback,
  };
})

export default class ViewFeedback extends React.Component {
  constructor() {
    super();
    this.state = {
      score: '',
      comment: '',
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
        this.state.fullname = this.props.auth.user.fullname;
        this.state.assignmentTopic = this.props.assignment.assignment.topic;
        this.state.subjectId = this.props.assignment.assignment.subjectId,
        this.props.dispatch(modifyFeedback(this.props.feedback.feedback.id, this.state));
  }

  render() {
    const { score, comment } = this.state;
    const { feedback } = this.props.feedback;
    const { assignment } = this.props.assignment;
    let assignmentContent;
      assignmentContent = (
        <div class="card-block">
          
          <h3>{assignment.topic}</h3>
          <br/>
          <h6>Question</h6>
          <p>{assignment.content}</p>

          <h6>Response</h6>
          <p>{feedback.content}</p>
        </div>
      );

    return (
      <div class="row">			
        <main class="col-xs-12 col-sm-12 col-lg-12 col-xl-12 pl-4">
          <Header header={assignment.subjectname}/>
          <section class="row">
            <div class="col-sm-12 col-md-8">
              <div class="card mb-6">	
                {assignmentContent}	
                				
              </div>
            </div> 
          </section>
          <div id="comment" className="comment">
            <form class="form-horizontal" onSubmit={this.onSubmit}>
              <div class="form-group">
                <div class="col-12 no-padding">
                  <input placeholder="score" type="text" className="form-control" id="score"/>
                </div>
              </div>
              <div class="form-group">
                <div class="col-12 no-padding">
                  <textarea placeholder="comment" id="comment" class="form-control" onChange={this.onChange}></textarea>
                </div>
              </div>
              <div class="form-group">
                <div class="col-12 widget-right no-padding">
                  <input type="submit" class="btn btn-primary btn-md float-right" value="Submit"/>
                </div>
              </div>
            </form>
          </div>
          <Footer />
        </main>
      </div>
    );
  }
}
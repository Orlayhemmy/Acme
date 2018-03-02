import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import isEmpty from 'lodash/isEmpty';
import Header from './header';
import Footer from './footer';
import { writeFeedbackValidate } from '../shared/feedbackValidation';
import { createFeedback, modifyFeedback } from '../actions/feedbackActions';

@connect((store) => {
  return {
    auth: store.auth,
    assignment:store.assignment,
    feedback: store.feedback,
  };
})

export default class ViewAssignment extends React.Component {
  constructor() {
    super();
    this.state = {
      content: '',
      error: '',
    }
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.isValid = this.isValid.bind(this);
    this.onClick = this.onClick.bind(this);
    this.onSave = this.onSave.bind(this);
  }
  onChange(e) {
    this.setState({
      [e.target.id]: e.target.value,
    });
  }
  isValid() {    
    const { isValid, error } = writeFeedbackValidate(this.state);
    if (!isValid) {
      this.setState({ error });
    }
    return isValid;  
  }
  onSubmit(e) {
    e.preventDefault();
    if (confirm("Are you sure you want to upload your response")) {
      if (this.isValid()) {
        this.state.upload = true;
        this.state.fullname = this.props.auth.user.fullname;
        this.state.assignmentTopic = this.props.assignment.assignment.topic;
        this.state.subjectId = this.props.assignment.assignment.subjectId,
        this.state.studentId = this.props.auth.user.id;
        this.props.dispatch(modifyFeedback(this.props.feedback.feedback.id, this.state));
       }
    }
  }
  onSave() {
    this.state.assignmentTopic = this.props.assignment.assignment.topic;
    this.props.dispatch(modifyFeedback(this.props.feedback.feedback.id, this.state));
  }
  onClick() {
    this.state.assignmentId = this.props.assignment.assignment.id;
    this.props.dispatch(createFeedback(this.state));
    let solutionDiv = document.getElementById('solution');
    solutionDiv.hidden = false;
  }
  componentDidMount() {
    const { feedback } = this.props.feedback;
    this.setState({
      content: feedback.content || '',
    });
    if (isEmpty(this.props.feedback.feedback)) {
      let solutionDiv = document.getElementById('solution');
      solutionDiv.hidden = true;
    }
  }
  render() {
    if (this.props.feedback.status === 200) {
      alert(this.props.feedback.message);
      <Redirect to="/studentassignment" />
    }
    let reply;
    if (isEmpty(this.props.feedback.feedback)) {
      reply = (
        <em className="fa fa-reply" onClick={this.onClick}> Reply</em>
      );
    }
    const { content, error } = this.state;
    const { assignment } = this.props.assignment;
    let assignmentContent;
    if (this.props.feedback.feedback.upload) {
      assignmentContent = (
        <div className="card-block">
          <div className="notice text-center">
            <h2>Your response has been recorded</h2>
          </div>
        </div>
      )
    } else {
      assignmentContent = (
        <div class="card-block">
          <h3>{assignment.topic}</h3>
          <br/>
          <p>{assignment.content}</p>
          {reply}
          <div id="solution">
            <form class="form-horizontal" onSubmit={this.onSubmit}>
              <div className="help-block">{error.content}</div>
                <div class="form-group">
                  <label class="col-12 control-label no-padding" for="name">Your Response</label> 
                  <div class="col-12 no-padding">
                    <textarea id="content" class="form-control" onChange={this.onChange} value={content}></textarea>
                  </div>
              </div>
              <div class="form-group">
                <div class="col-12 widget-right no-padding">
                  <input type="submit" class="btn btn-primary btn-md float-right" value="Upload"/>
                </div>
          
                <div class="col-12 widget-left no-padding">
                  <input onClick={this.onSave} type="button" class="btn btn-primary btn-md float-left" value="Save" />
                </div>
              </div>
            </form>
          </div>
        </div>
      )
    }
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
          <Footer />
        </main>
      </div>
    );
  }
}
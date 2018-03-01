import React from 'react';
import { connect } from 'react-redux';
import Header from './header';
import Footer from './footer';
import { writeFeedbackValidate } from '../shared/feedbackValidation';

@connect((store) => {
  return {
    auth: store.auth,
    assignment:store.assignment,
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
    if (this.isValid()) {
      this.state.upload = true;
      // this.props.dispatch(modifyFeedback(this.props.note.note.id, this.state));
     }
  }
  onClick() {
    this.props.dispatch(createFeedback(this.props.assignment.assignment.id));
  }
  render() {
    const { content, error } = this.state;
    const { assignment } = this.props.assignment;
    return (
      <div class="row">			
        <main class="col-xs-12 col-sm-12 col-lg-12 col-xl-12 pl-4">
          <Header header={assignment.subjectname}/>
          <section class="row">
            <div class="col-sm-12 col-md-8">
              <div class="card mb-6">	
                <div class="card-block">
                  <h3>{assignment.topic}</h3>
                  <br/>
                  <p>{assignment.content}</p>
                  <em className="fa fa-reply" onClick={this.onClick}> Reply</em>
                  <form class="form-horizontal" onSubmit={this.onSubmit}>
                    <div className="help-block">{error.content}</div>
                      <div class="form-group">
                        <label class="col-12 control-label no-padding" for="name">Your Response</label> 
                        <div class="col-12 no-padding">
                          <textarea id="content" class="form-control" onChange={this.onChange} value={content}></textarea>
                        </div>
                    </div>
                  </form>
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
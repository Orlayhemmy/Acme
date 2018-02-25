import React from 'react';
import { connect } from 'react-redux';
import Header from './header';
import { writeAssignmentValidate } from '../shared/assignmentValidation';
import { getAssignment, modifyAssignment } from '../actions/assignmentActions';

@connect((store) => {
  return {
    auth: store.auth,
    assignment: store.assignment,
  };
})

export default class assignment extends React.Component {
  constructor() {
    super();
    this.state = {
      content: '',
      topic: '',
      errors: {},
    }
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.isValid = this.isValid.bind(this);
    this.onClick = this.onClick.bind(this);
  }
  componentWillMount() {
    this.props.dispatch(getAssignment(this.props.assignment.id.id));
  }
  onChange(e) {
    this.setState({
      [e.target.id]: e.target.value,
    });
  }
  isValid() {    
    const { isValid, errors } = writeAssignmentValidate(this.state);
    if (!isValid) {
      this.setState({ errors });
    }
    return isValid;  
  }
  onSubmit(e) {
    e.preventDefault();
    if (this.isValid()) {
      this.state.upload = 'true';
      this.props.dispatch(modifyAssignment(this.props.assignment.id.id, this.state));
     }
  }
  onClick() {
    this.props.dispatch(modifyAssignment(this.props.assignment.id.id, this.state));
  }
  render() {
    const { assignment } =  this.props.assignment;
    const { topic, content, errors} = this.state;
    return (
      <div class="row">			
        <main class="col-xs-12 col-sm-12 col-lg-12 col-xl-12 pl-4">
          <Header header="Write Lesson Note"/>
          <section class="row">
					<div class="col-sm-12 col-md-8">
						<div class="card mb-6">	
							<div class="card-block">
                <form class="form-horizontal" onSubmit={this.onSubmit}>
                  <fieldset>
                    <table class="table table-striped">
                      <tbody>
                        <tr>
                          <th>Session</th>
                          
                          <td>Plotting of Graph</td>
                                                    
                          <th>Term</th>
                          <td>{assignment.termId}</td>
                        </tr>
                        
                        <tr>
                          <th>Week</th>
                          
                          <td>{assignment.weekId}</td>
                          
                          <th>Class</th>
                          <td>{assignment.Class.classname}</td>
                        </tr>
                      </tbody>
                    </table>
                    <div className="help-block">{errors.topic}</div>
                    <div class="form-group">
                      <label class="col-12 control-label no-padding" for="name">Topic</label> 
                      <div class="col-12 no-padding">
                        <textarea id="topic" class="form-control" onChange={this.onChange}></textarea>
                      </div>
                    </div>
                    
                    <div className="help-block">{errors.content}</div>
                    <div class="form-group">
                      <label class="col-12 control-label no-padding" for="name">Content</label>
                      
                      <div class="col-12 no-padding">
                        <textarea id="content" onChange={this.onChange} class="ckeditor"></textarea>
                      </div>
                    </div>                    
                    
                    <div class="form-group">
                      <div class="col-12 widget-right no-padding">
                        <input type="submit" class="btn btn-primary btn-md float-right" value="Upload"/>
                      </div>
                
                      <div class="col-12 widget-left no-padding">
                        <input type="button" id="saveNote" onClick={this.onClick} class="btn btn-primary btn-md float-left" value="Save" />
                      </div>
                    </div>
                  </fieldset>
                </form>
							
							</div>					
						</div>
						
					</div>
				</section>
        </main>
      </div>
    );
  }
}
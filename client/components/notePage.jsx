import React from 'react';
import { connect } from 'react-redux';
import Header from './header';
import { writeNoteValidate } from '../shared/noteValidation';
import { createNote, modifyNote, getNote } from '../actions/noteActions';

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
      duration: '',
      topic: '',
      scope: '',
      questions: '',
      reference: '',
      materials: '',
      objectives: '',
      behaviours: '',
      strategies: '',
      content: '',
      activity: '',
      assessment: '',
      errors: {},
    }
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.isValid = this.isValid.bind(this);
    this.onClick = this.onClick.bind(this);
  }
  componentWillMount() {
    this.props.dispatch(getNote(this.props.note.id.id));
  }
  onChange(e) {
    this.setState({
      [e.target.id]: e.target.value,
    });
  }
  isValid() {    

    const { isValid, errors } = writeNoteValidate(this.state);
    if (!isValid) {
      this.setState({ errors });
    }
    return isValid;  
  }
  onSubmit(e) {
    e.preventDefault();

    if (this.isValid()) {
      this.state.upload = 'true';
      this.props.dispatch(modifyNote(this.props.note.id.id, this.state));
     }
  }
  onClick() {
    this.props.dispatch(modifyNote(this.props.note.id.id, this.state));
  }
  render() {
    const { duration, objectives, activity, materials, behaviours, content, assessment,
    scope, topic, questions, reference, strategies, errors} = this.state;
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
                          <td></td>
                        </tr>
                        
                        <tr>
                          <th>Week</th>
                          
                          <td></td>
                          
                          <th>Class</th>
                          <td></td>
                        </tr>
                        <tr>
                          <th>Duration</th>
                          <td>
                            <div className="help-block">{errors.duration}</div>
                            <input type="text" class="form-control" onChange={this.onChange} id="duration"/>
                          </td>
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
                    
                    <div className="help-block">{errors.scope}</div>
                    <div class="form-group">
                      <label class="col-12 control-label no-padding" for="name">Definition of purpose and scope of topic</label>
                      
                      <div class="col-12 no-padding">
                        <textarea id="scope" class="form-control" onChange={this.onChange}></textarea>
                      </div>
                    </div>
                    
                    <div className="help-block">{errors.questions}</div>
                    <div class="form-group">
                      <label class="col-12 control-label no-padding" for="name">Questions</label>
                      
                      <div class="col-12 no-padding">
                        <textarea id="questions" class="form-control" onChange={this.onChange}></textarea>
                      </div>
                    </div>
                    
                    <div className="help-block">{errors.reference}</div>
                    <div class="form-group">
                      <label class="col-12 control-label no-padding" for="name">Reference Books/Resources</label>
                      
                      <div class="col-12 no-padding">
                        <textarea id="reference" class="form-control" onChange={this.onChange}></textarea>
                      </div>
                    </div>
                    
                    <div className="help-block">{errors.materials}</div>
                    <div class="form-group">
                      <label class="col-12 control-label no-padding" for="name">Instructional Materials</label>
                      
                      <div class="col-12 no-padding">
                        <textarea id="materials" class="form-control" onChange={this.onChange}></textarea>
                      </div>
                    </div>
                    
                    <div className="help-block">{errors.objectives}</div>
                    <div class="form-group">
                      <label class="col-12 control-label no-padding" for="name">Behavioural objectives</label>
                      
                      <div class="col-12 no-padding">
                        <textarea id="objectives" class="form-control" onChange={this.onChange}></textarea>
                      </div>
                    </div>
                    
                    <div className="help-block">{errors.behaviour}</div>
                    <div class="form-group">
                      <label class="col-12 control-label no-padding" for="name">Entry behaviour</label>
                      
                      <div class="col-12 no-padding">
                        <textarea id="behaviours" class="form-control" onChange={this.onChange}></textarea>
                      </div>
                    </div>
                    
                    <div className="help-block">{errors.strategies}</div>
                    <div class="form-group">
                      <label class="col-12 control-label no-padding" for="name">Teaching strategies</label>
                      
                      <div class="col-12 no-padding">
                        <textarea id="strategies" class="form-control" onChange={this.onChange}></textarea>
                      </div>
                    </div>
                    
                    <div className="help-block">{errors.content}</div>
                    <div class="form-group">
                      <label class="col-12 control-label no-padding" for="name">Content</label>
                      
                      <div class="col-12 no-padding">
                        <textarea id="content" onChange={this.onChange} class="ckeditor"></textarea>
                      </div>
                    </div>
                    
                    <div className="help-block">{errors.activity}</div>
                    <div class="form-group">
                      <label class="col-12 control-label no-padding" for="name">Class activity</label>
                      
                      <div class="col-12 no-padding">
                        <textarea id="activity" class="form-control" onChange={this.onChange}></textarea>
                      </div>
                    </div>
                    
                    <div className="help-block">{errors.assessment}</div>
                    <div class="form-group">
                      <label class="col-12 control-label no-padding" for="name">Assessment</label>
                      
                      <div class="col-12 no-padding">
                        <textarea id="assessment" class="form-control" onChange={this.onChange}></textarea>
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
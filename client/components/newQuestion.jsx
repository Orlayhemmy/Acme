import React from 'react';
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import Header from './header';
import Footer from './footer';
import { addQuestionValidate } from '../shared/questionValidation';
import { createQuestion } from '../actions/questionActions';

@connect((store) => {
  return {
    auth: store.auth,
    test: store.test,
    question: store.question,
  };
})

export default class NewQuestion extends React.Component {
  constructor() {
    super();
    this.state = {
      content: '',
      opt_a: '',
      opt_b: '',
      opt_c: '',
      opt_d: '',
      answer: '',
      point: '',
      errors: {},
    }
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.isValid = this.isValid.bind(this);
    // this.updateContent = this.updateContent.bind(this);
  }
  onChange(e) {
    this.setState({
      [e.target.id]: e.target.value,
    });
  }
  isValid() {   
    const { isValid, errors } = addQuestionValidate(this.state);
    if (!isValid) {
      this.setState({ errors });
    }
    return isValid;  
  }
  onSubmit(e) {
    e.preventDefault();
    if (this.isValid()) {
      this.state.testId = this.props.test.test.id;
      this.props.dispatch(createQuestion(this.state));
     }
     <Redirect to="/addquestion" />
  }
  render() {
    const { content, opt_a, opt_b, opt_c, opt_d, answer, point, errors } = this.state;
    return (
      <div class="row">			
        <main class="col-xs-12 col-sm-12 col-lg-12 col-xl-12 pl-4">
          <Header header="Add/Edit Question"/>
          <section class="row">
					<div class="col-sm-12 col-md-8">
						<div class="card mb-6">	
							<div class="card-block">
                <form class="form-horizontal" onSubmit={this.onSubmit}>
                  <fieldset>
                                    
                    <div class="form-group">
                      <label class="col-12 control-label no-padding" for="name">Question</label>
                      <div className="help-block">{errors.content}</div>
                      <div class="col-12 no-padding">
                        <textarea id="content" class="form-control" onChange={this.onChange} name="ckeditor"></textarea>
                      </div>
                    </div>
                    <div class="form-group">
                      <label class="col-12 control-label no-padding" for="name">Point</label>
                      <div className="help-block">{errors.point}</div>
                      <div class="col-2 no-padding">
                        <input type="text" id="point" class="form-control" onChange={this.onChange}/>
                      </div>
                    </div>
                    <label class="col-lg-12 control-label no-padding" for="name">Options</label>
                    <div className="help-block">{errors.answer}</div>
                    <div class="form-group">
                      <label class="control-label no-padding" for="name">A</label>
                      <div className="help-block">{errors.opt_a}</div>
                      <div class="form-check-inline col-lg-6">
                        <input type="text" id="opt_a" class="form-control" onChange={this.onChange}/>
                      </div>
                      <input type="radio" name="answer" id="answer" onChange={this.onChange} value="a" />
                    </div>
                    <div class="form-group">
                      <label class="control-label no-padding" for="name">B</label>
                      <div className="help-block">{errors.opt_b}</div>
                      <div class="form-check-inline col-lg-6">
                        <input type="text" id="opt_b" class="form-control" onChange={this.onChange}/>
                      </div>
                      <input type="radio" name="answer" id="answer" onChange={this.onChange} value="b" />
                    </div>
                    <div class="form-group">
                      <label class="control-label no-padding" for="name">C</label>
                      <div className="help-block">{errors.opt_c}</div>
                      <div class="form-check-inline col-lg-6">
                        <input type="text" id="opt_c" class="form-control" onChange={this.onChange}/>
                      </div>
                      <input type="radio" name="answer" id="answer" onChange={this.onChange} value="c" />
                    </div>
                    <div class="form-group">
                      <label class="control-label no-padding" for="name">D</label>
                      <div className="help-block">{errors.opt_d}</div>
                      <div class="form-check-inline col-lg-6">
                        <input type="text" id="opt_d" class="form-control" onChange={this.onChange}/>
                      </div>
                      <input type="radio" name="answer" id="answer" onChange={this.onChange} value="d" />
                    </div>
                    <div class="form-group">
                      <div class="widget-right no-padding">
                        <input id="next" type="submit" class="btn btn-primary btn-md float-right" value="Next" />
                      </div>
                    </div>
                    <div class="form-group">
                      <div class="widget-left no-padding">
                        <input id="finish" type="submit" class="btn btn-primary btn-md float-left" value="Finish" />
                      </div>
                    </div>
                  </fieldset>
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
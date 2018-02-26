import React from 'react';
import { connect } from 'react-redux';
import Header from './header';
import { writeTestValidate, modifyTestValidate } from '../shared/testValidation';
import { createTest, modifyTest, getTest } from '../actions/testActions';

@connect((store) => {
  return {
    auth: store.auth,
    test: store.test,
  };
})

export default class Test extends React.Component {
  constructor() {
    super();
    this.state = {
      duration: '',
      title: '',
      intro: '',
      errors: {},
    }
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.isValid = this.isValid.bind(this);
    this.updateContent = this.updateContent.bind(this);
  }
  componentWillMount() {
    this.props.dispatch(getTest(this.props.test.id.id));
  }
  onChange(e) {
    this.setState({
      [e.target.id]: e.target.value,
    });
    if (e.target.id === 'content') {
      console.log('content')
      let timer= setInterval(this.updateContent(), 100);
    }
    // if (e.target.id === 'content') {
    //   let newContent = e.ckeditor.getData();
    //   this.setState({
    //     content: newContent,
    //   });
    // }
  }
  updateContent() {
    let newContent =  CKEDITOR.replace('ckeditor');      
    this.setState({
      content: newContent.getData(),
    });
  }
  isValid() {    
    const { isValid, errors } = modifyTestValidate(this.state);
    if (!isValid) {
      this.setState({ errors });
    }
    return isValid;  
  }
  onSubmit(e) {
    e.preventDefault();
    if (this.isValid()) {
      this.props.dispatch(modifyTest(this.props.test.id.id, this.state));
     }
  }

  render() {
    const { test } = this.props.test;
    const { duration, intro, title, errors } = this.state;
    return (
      <div class="row">			
        <main class="col-xs-12 col-sm-12 col-lg-12 col-xl-12 pl-4">
          <Header header="Test Introduction"/>
          <section class="row">
					<div class="col-sm-12 col-md-8">
						<div class="card mb-6">	
							<div class="card-block">
                <form class="form-horizontal" onSubmit={this.onSubmit}>
                  <fieldset>
                    <div className="help-block">{errors.title}</div>
                    <div class="form-group">
                      <label class="col-12 control-label no-padding" for="name">Topic</label> 
                      <div class="col-12 no-padding">
                        <textarea id="title" class="form-control" onChange={this.onChange}></textarea>
                      </div>
                    </div>
                    
                    <div className="help-block">{errors.intro}</div>
                    <div class="form-group">
                      <label class="col-12 control-label no-padding" for="name">Introduction</label>
                      
                      <div class="col-12 no-padding">
                        <textarea id="intro" class="form-control" onChange={this.onChange}>{test.intro}</textarea>
                      </div>
                    </div>
                    
                    <div className="help-block">{errors.duration}</div>
                    <div class="form-group">
                      <label class="col-12 control-label no-padding" for="name">Duration</label>
                      
                      <div class="col-12 no-padding">
                        <input type="text" id="duration" class="form-control" onChange={this.onChange} value={test.duration}/>
                      </div>
                    </div>

                    <div class="form-group">
                      <div class="col-12 widget-right no-padding">
                        <input type="submit" class="btn btn-primary btn-md float-right" value="Next" />
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
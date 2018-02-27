import React from 'react';
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import Header from './header';
import Footer from './footer';
// mport { writeTestValidate, modifyTestValidate } from '../shared/testValidation';
import { getTestQuestions } from '../actions/questionActions';

@connect((store) => {
  return {
    auth: store.auth,
    test: store.test,
    question: store.question,
  };
})

export default class Questions extends React.Component {
  // constructor() {
  //   super();
  //   this.state = {
  //     duration: '',
  //     title: '',
  //     intro: '',
  //     errors: {},
  //   }
  //   this.onChange = this.onChange.bind(this);
  //   this.onSubmit = this.onSubmit.bind(this);
  //   this.isValid = this.isValid.bind(this);
  //   this.updateContent = this.updateContent.bind(this);
  // }
  
  onChange(e) {
    this.setState({
      [e.target.id]: e.target.value,
    });
    // if (e.target.id === 'content') {
    //   console.log('content')
    //   let timer= setInterval(this.updateContent(), 100);
    // }
    // if (e.target.id === 'content') {
    //   let newContent = e.ckeditor.getData();
    //   this.setState({
    //     content: newContent,
    //   });
    // }
  }
  // updateContent() {
  //   let newContent =  CKEDITOR.replace('ckeditor');      
  //   this.setState({
  //     content: newContent.getData(),
  //   });
  // }
  // isValid() {    
  //   const { isValid, errors } = modifyTestValidate(this.state);
  //   if (!isValid) {
  //     this.setState({ errors });
  //   }
  //   return isValid;  
  // }
  // onSubmit(e) {
  //   e.preventDefault();
  //   if (this.isValid()) {
  //     this.props.dispatch(modifyTest(this.props.test.test.id, this.state));
  //    }
  // }
  componentWillMount() {
    this.props.dispatch(getTestQuestions(this.props.test.testId));
  }

  render() {
    const { questions } = this.props.question;
    const headerTitle = this.props.test.test.title + ' Questions';
    const Questions = _.map(questions, (question) => {
      <tr>
        <td></td>
        <td>{question.content}</td>
        <td>{question.createdAt}</td>
        <td>{question.point}</td>
        <td><em className="fa fa-eye"></em></td>
        <td><em className="fa fa-pencil"></em></td>
        <td><em className="fa fa-trash"></em></td>
      </tr>
    });
    return (
      <div class="row">			
        <main class="col-xs-12 col-sm-12 col-lg-12 col-xl-12 pl-4">
          <Header header={headerTitle}/>
          <section class="row">
					<div class="col-sm-12 col-md-8">
						<div class="card mb-6">	
							<div class="card-block">
                <h3 class="mt-4 mb-4">Questions</h3>
                <table class="table table-striped">
                  <thead>
                    <tr>
                      <th>S/N</th>
                      
                      <th>Questions</th>
                      <th>Point</th>
                      <th>Date added</th>
                      <th>Preview</th>
                      <th>Edit</th>
                      <th>Delete</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Questions}
                  </tbody>
                </table>
                <Link to="/addquestion"><p>Add new question</p></Link>
                {/* <form class="form-horizontal" onSubmit={this.onSubmit}>
                  <fieldset>
                    <div className="help-block">{errors.title}</div>
                    <div class="form-group">
                      <label class="col-12 control-label no-padding" for="name">Title</label> 
                      <div class="col-12 no-padding">
                        <textarea id="title" class="form-control" onChange={this.onChange} value={title}></textarea>
                      </div>
                    </div>
                    
                    <div className="help-block">{errors.intro}</div>
                    <div class="form-group">
                      <label class="col-12 control-label no-padding" for="name">Introduction</label>
                      
                      <div class="col-12 no-padding">
                        <textarea id="intro" class="form-control" onChange={this.onChange} value ={intro}></textarea>
                      </div>
                    </div>
                    
                    

                    <div class="form-group">
                      <div class="col-12 widget-right no-padding">
                        <input type="submit" class="btn btn-primary btn-md float-right" value="Next" />
                      </div>
                    </div>
                  </fieldset>
                </form> */}
							
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
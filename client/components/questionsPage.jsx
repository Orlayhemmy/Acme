import React from 'react';
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import Header from './header';
import Footer from './footer';
import Popup from './popup';
import { getTestQuestions, getQuestion } from '../actions/questionActions';

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
  onClick(e) {
    this.props.dispatch(getQuestion(e.target.id));
  }
  componentWillMount() {
    this.props.dispatch(getTestQuestions(this.props.test.test.id));
  }

  render() {
    const { questions, question } = this.props.question;
    
    const headerTitle = this.props.test.test.title + ' Questions';
    const Questions = _.map(questions, (question) => {
      let data = question.createdAt;
      let creationDate = data.replace(/-/g,'/').replace('Z','').replace('T',' ');
      return (
        <tr key={question.questionId}>
          <td></td>
          <td class="text-left">{question.content}</td>
          <td>{question.point}</td>
          <td>{creationDate}</td>
          <td><span data-toggle="modal" data-target="#popup"><em onClick={this.onClick.bind(this)} id={question.questionId} className="fa fa-eye"></em></span></td>
          <td><Link to="/editquestion"><em onClick={this.onClick.bind(this)} id={question.questionId} className="fa fa-edit"></em></Link></td>
          <td><em className="fa fa-trash"></em></td>
        </tr>
      ) 
    });
    const popupContent = (
      <div>
        <p><h4>{question.content}</h4></p>
        <p>A. {question.opt_a}</p>
        <p>B. {question.opt_b}</p>
        <p>C. {question.opt_c}</p>
        <p>D. {question.opt_d}</p>
        <p> The right option is <b>{question.answer}</b></p>
      </div>
    );
    return (
      <div class="row">			
        <main class="col-xs-12 col-sm-12 col-lg-12 col-xl-12 pl-4">
          <Header header={headerTitle}/>
          <section class="row">
					<div class="col-sm-12 col-md-12">
						<div class="card mb-6">	
							<div class="card-block">
                <h3 class="mt-4 mb-4">Questions</h3>
                <table class="table table-striped text-center">
                  <thead>
                    <tr>
                      <th>S/N</th>
                      
                      <th class="text-left">Questions</th>
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
							</div>					
						</div>
						
					</div>
          <Popup content={popupContent}/>
				</section>
        <Footer />
        </main>
      </div>
    );
  }
}
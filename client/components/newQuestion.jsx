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
import React from 'react';
import { connect } from 'react-redux';
import CarouselIndicator from './carouselIndicator';
import CarouselLeftArrow from './carouselLeftArrow';
import CarouselRightArrow from './carouselRightArrow';
import CarouselSlide from './carouselSlide';
import Header from './header';
import Footer from './footer';
import { sendTestFeedback } from '../actions/feedbackActions';

@connect((store) => {
  return {
    auth: store.auth,
    question: store.question.question,
    test: store.test,
  };
})

export default class Carousel extends React.Component {
  constructor(props) {
    super(props);

    this.goToSlide = this.goToSlide.bind(this);
    this.goToPrevSlide = this.goToPrevSlide.bind(this);
    this.goToNextSlide = this.goToNextSlide.bind(this);
    this.onChange = this.onChange.bind(this);
    // this.isValid = this.isValid.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      activeIndex: 0
    };
  }

  onSubmit(e) {
    e.preventDefault();
    const { content } = this.props.question;
    let correctAnswer = [];
    let studentAnswer = [];
    let counter = 0;
    Object.entries(content).forEach((entry) => {
      correctAnswer.push(entry[1].answer);
    });
    Object.entries(this.state).forEach((entry) => {
      if (entry[0] != 'activeIndex') {
        studentAnswer.push(entry[1]);
      }
    });
    for (let i=0; i<correctAnswer.length; i++) {
      if (studentAnswer[i] == correctAnswer[i]) {
        counter++;
      }
    }
    this.props.dispatch(sendTestFeedback(counter));
  }
  onChange(e) {
    this.setState({
      [e.target.id]: e.target.value,
    });
  }

  goToSlide(e, index) {
    this.setState({
      activeIndex: index
    });
  }

  goToPrevSlide(e) {
    e.preventDefault();

    let index = this.state.activeIndex;
    let { content } = this.props.question;
    let slidesLength = content.length;

  if (index < 1) {
      index = slidesLength;
    }

    --index;

    this.setState({
      activeIndex: index
    });
  }

  goToNextSlide(e) {
    e.preventDefault();

    let index = this.state.activeIndex;
    let { content } = this.props.question;
    let slidesLength = content.length - 1;

    if (index === slidesLength) {
      index = -1;
    }

    ++index;

    this.setState({
      activeIndex: index
    });
  }


  render() {
    
    const { activeIndex } = this.state;
    const { content } = this.props.question;
    const { test } = this.props.test;
    const contentList = content.map((slide, index) => {
      const choiceId = `choice${index}`;
      const answerId = `answer${index}`;
     
      return (
        <li
          className={
            index == activeIndex
              ? "carousel__slide carousel__slide--active"
              : "carousel__slide"
          }>
          <h6 class="card-subtitle mb-2 text-muted">Question {index + 1}</h6>
          <div class="divider"></div>

          <p className="carousel-slide__content">{slide.content}</p>          
          <table>
            <tbody className="text-left">
              <tr>
                <td>
                  <div class="form-check-inline col-lg-6">
                    <input type="radio" name={index} id={choiceId} onChange={this.onChange} value="a" />
                    
                  </div>
                </td>
                <td>
                  <div class="form-check-inline col-lg-6">
                    <label class="control-label no-padding" for="name">A</label>
                  </div>
                </td>
                <td>
                  <strong className="carousel-slide__author"> {slide.opt_a}</strong>
                </td>
              </tr>
              <tr>
                <td>
                  <div class="form-check-inline col-lg-6">
                    <input type="radio" name={index} id={choiceId} onChange={this.onChange} value="b" />
                  </div>
                </td>
                <td>
                  <div class="form-check-inline col-lg-6">
                    <label class="control-label no-padding" for="name">B</label>
                  </div>
                </td>
                <td>
                  <strong className="carousel-slide__author"> {slide.opt_b}</strong>
                </td>
              </tr>
              <tr>
                <td>
                  <div class="form-check-inline col-lg-6">
                    <input type="radio" name={index} id={choiceId} onChange={this.onChange} value="c" />
                  </div>
                </td>
                <td>
                  <div class="form-check-inline col-lg-6">
                    <label class="control-label no-padding" for="name">C</label>
                  </div>
                </td>
                <td>
                  <strong className="carousel-slide__author"> {slide.opt_c}</strong>
                </td>
              </tr>
              <tr>
                <td>
                  <div class="form-check-inline col-lg-6">
                    <input type="radio" name={index} id={choiceId} onChange={this.onChange} value="d" />
                  </div>
                </td>
                <td>
                  <div class="form-check-inline col-lg-6">
                    <label class="control-label no-padding" for="name">D</label>
                  </div>
                </td>
                <td>
                  <strong className="carousel-slide__author"> {slide.opt_d}</strong>
                </td>
              </tr>
            </tbody>
          </table>
        </li>
      );
    });
    return (
      <div className="carousel-container" id="carousel">
        <Header header={test.title} />
        <div className="carousel">
          <CarouselLeftArrow onClick={e => this.goToPrevSlide(e)} />

          <ul className="carousel__slides">
            {contentList}
          </ul>
          <div class="form-group">
            <div class="col-12 widget-right no-padding">
              <input onClick={this.onSubmit} type="submit" class="btn btn-primary btn-md float-right" value="Submit" />
            </div>
          </div>
          <CarouselRightArrow onClick={e => this.goToNextSlide(e)} />
          
          <ul className="carousel__indicators">
            {content.map((slide, index) =>
              <CarouselIndicator
                key={index}
                index={index}
                activeIndex={this.state.activeIndex}
                onClick={e => this.goToSlide(e, index)}
              />
            )}
          </ul>

        </div>
        <Footer />
      </div>
    );
  }
}

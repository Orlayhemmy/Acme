import React from 'react';
import AnswerIndicator from './answerIndicator'

export default class CarouselSlide extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
    this.onChange = this.onChange.bind(this);
    // this.isValid = this.isValid.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  onSubmit(e) {
    e.preventDefault();
    console.log(this.state)
  }
  onChange(e) {
    this.setState({
      [e.target.id]: e.target.value,
    });
  }
  render() {
    const answerId = `answer${this.props.index}`;
    return (
      <li
        className={
          this.props.index == this.props.activeIndex
            ? "carousel__slide carousel__slide--active"
            : "carousel__slide"
        }>
        <h6 class="card-subtitle mb-2 text-muted">Question {this.props.index + 1}</h6>
        <div class="divider"></div>
        <p className="carousel-slide__content">{this.props.slide.content}</p>

        <table>
          <tbody className="text-left">
            <tr>
              <td>
                <div class="form-check-inline col-lg-6">
                  <input type="radio" name={this.props.index} id={answerId} onChange={this.onChange} value="a" />
                </div>
              </td>
              <td>
                <div class="form-check-inline col-lg-6">
                  <label class="control-label no-padding" for="name">A</label>
                </div>
              </td>
              <td>
                <strong className="carousel-slide__author"> {this.props.slide.opt_a}</strong>
              </td>
            </tr>
            <tr>
              <td>
                <div class="form-check-inline col-lg-6">
                  <input type="radio" name={this.props.index} id={answerId} onChange={this.onChange} value="b" />
                </div>
              </td>
              <td>
                <div class="form-check-inline col-lg-6">
                  <label class="control-label no-padding" for="name">B</label>
                </div>
              </td>
              <td>
                <strong className="carousel-slide__author"> {this.props.slide.opt_b}</strong>
              </td>
            </tr>
            <tr>
              <td>
                <div class="form-check-inline col-lg-6">
                  <input type="radio" name={this.props.index} id={answerId} onChange={this.onChange} value="c" />
                </div>
              </td>
              <td>
                <div class="form-check-inline col-lg-6">
                  <label class="control-label no-padding" for="name">C</label>
                </div>
              </td>
              <td>
                <strong className="carousel-slide__author"> {this.props.slide.opt_c}</strong>
              </td>
            </tr>
            <tr>
              <td>
                <div class="form-check-inline col-lg-6">
                  <input type="radio" name={this.props.index} id={answerId} onChange={this.onChange} value="d" />
                </div>
              </td>
              <td>
                <div class="form-check-inline col-lg-6">
                  <label class="control-label no-padding" for="name">D</label>
                </div>
              </td>
              <td>
                <strong className="carousel-slide__author"> {this.props.slide.opt_d}</strong>
              </td>
            </tr>
          </tbody>
        </table>
        <div class="form-group">
          <div class="col-12 widget-right no-padding">
            <input onClick={this.onSubmit} type="submit" class="btn btn-primary btn-md float-right" value="Submit" />
          </div>
        </div>
        {" "}
          <small className="carousel-slide__source">
            
          </small>
        {/* <AnswerIndicator answerStat={this.state} /> */}
      </li>
    );
  }
}

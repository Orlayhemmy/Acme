import React from 'react';


export default class CarouselIndicator extends React.Component {
  render() {
    let answerStatus;
    if (!this.props.answerStat) {
      answerStatus = (
        <em className="fa fa-spinner text-red"></em>
      );
    }
    return (
     
        <li>
          <a
            className={
              this.props.index == this.props.activeIndex
                ? "carousel__indicator carousel__indicator--active"
                : `carousel__indicator ${this.props.indicatorColor}`
            }
            onClick={this.props.onClick}>
            <li className="carousel-indicator_list">
              {this.props.index + 1}
            </li>
          </a>
           
        </li>
        
      
    );
  }
}

import React from 'react';

export default class AnswerIndicator extends React.Component {
  render() {
    let answerStatus;
    if (!this.props.answerStat) {
      answerStatus = (
        <em className="fa fa-spinner text-red"></em>
      );
    }
    return (
     
        {answerStatus}
        
      
    );
  }
}

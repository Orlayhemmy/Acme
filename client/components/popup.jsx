import React from 'react';
import { connect } from 'react-redux';

@connect((store) => {
  return {
    auth: store.auth,
    question: store.question,
  };
})
export default class PopUp extends React.Component {
  render() {
    const { question } = this.props.question;
    
    return (
      <div className="modal hide" id="popup">
        <div className="modal-dialog">
          <div className="modal-content">
            <div class="col-sm-12 col-md-12">
              
                <div class="card-block mt-4 mb-4 pt-4">
                  <p><h4>{question.content}</h4></p>
                  <p>A. {question.opt_a}</p>
                  <p>B. {question.opt_b}</p>
                  <p>C. {question.opt_c}</p>
                  <p>D. {question.opt_d}</p>
                  <p> The right option is <b>{question.answer}</b> </p>
                </div>
            
            </div>
          </div>
        </div>
      </div>
    );
  }
}
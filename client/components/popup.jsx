import React from 'react';

export default class PopUp extends React.Component {
  render() {    
    return (
      <div className="modal hide" id="popup">
        <div className="modal-dialog">
          <div className="modal-content">
            <div class="col-sm-12 col-md-12">
              
                <div class="card-block mt-4 mb-4 pt-4">
                  {this.props.content}
                </div>
            
            </div>
          </div>
        </div>
      </div>
    );
  }
}
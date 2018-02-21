import React from 'react';

export default class AtomContainer extends React.Component {
  render() {
    const divSpecs = `card-block ${this.props.background}`;
    return (
      <div className="col-sm-12 col-md-6">
        <div className="card mb-4">	
          <div className={divSpecs}>
            <section className="row">
              <div className="col-12 mb-2">
                {this.props.content}
              </div>
            </section>
          </div>					
        </div>
      </div>
    );
  }
}
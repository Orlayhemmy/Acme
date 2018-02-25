import React from 'react';

export default class Container extends React.Component {
  render() {
    return (
      <section class="row">
        <div class="col-sm-12">
          <section class="row">
            <div class="col-md-12 col-lg-12">								
              <div class="card mb-4">
                <div class="card-block">
                  <h3 class="card-title">Notes</h3>
                  <h6 class="card-subtitle mb-2 text-muted">Class Notes</h6>
                  <div class="divider"></div>
                  {this.props.content}
                </div>
              </div>
            </div>
          </section>
        </div>
      </section>
    );
  }
}
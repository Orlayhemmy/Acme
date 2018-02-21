import React from 'react';
import AtomContainer from './atomContainer';

export default class ContentContainer extends React.Component {
  render() {
    return (
      <section className="row">
        <AtomContainer content={this.props.contentFirst} />
        <AtomContainer content={this.props.contentSecond} background={this.props.background}/>
      </section>
    );
  }
}
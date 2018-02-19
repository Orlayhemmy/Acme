import React from 'react';
import { Link } from 'react-router-dom';

export default class Footer extends React.Component {
  render() {
    return (
      <section className="row">
        <div className="col-12 mt-4 mb-1 text-center"><Link to="https://www.zitbase.com" className="footer">zitbase</Link></div>
      </section>
    );
  }
}
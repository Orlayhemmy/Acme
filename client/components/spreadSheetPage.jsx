import React from 'react';
import AtomContainer from './atomContainer';
import Navbar from './sidenavbar';
import Header from './header';
import Footer from './footer';

export default class SpreadSheet extends React.Component {
  render() {
    return (
      <div className="row">
        <Navbar />
        <main class="col-xs-12 col-sm-8 offset-sm-4 col-lg-9 offset-lg-3 col-xl-10 offset-xl-2 pt-3 pl-4">
          <Header />
          <section className="row">
            <AtomContainer />		
          </section>
          <Footer />
        </main>
      </div>
    );
  }
}
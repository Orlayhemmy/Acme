import React from 'react';
import Navbar from './sidenavbar';
import Header from './header';
import Footer from './footer';
import ContentContainer from './contentContainer';

export default class Dashboard extends React.Component {
  render() {
    return (
      <div class="row">
        <Navbar />
        <main class="col-xs-12 col-sm-8 offset-sm-4 col-lg-9 offset-lg-3 col-xl-10 offset-xl-2 pt-3 pl-4">
          <Header />
          <ContentContainer />
          <Footer />
        </main>
      </div>
    );
  }
}
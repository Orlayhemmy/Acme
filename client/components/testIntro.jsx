import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Header from './header';
import Footer from './footer';



@connect((store) => {
  return {
    auth: store.auth,
    test: store.test,
  };
})

export default class TestIntro extends React.Component {

  render() {
    const { test } = this.props.test;
    return (
      <div class="row">			
        <main class="col-xs-12 col-sm-12 col-lg-12 col-xl-12 pl-4">
          <Header header="Test Introduction"/>
          <section class="row">
            <div class="col-sm-12 col-md-8">
              <div class="card mb-6">	
                <div class="card-block">
                      <div class="col-12 widget-right no-padding">
                        <Link to="/test"><input type="button" class="btn btn-primary btn-md float-right" value="Next" /></Link>
                      </div>
                
                </div>					
              </div>
              
            </div>
				</section>
        <Footer />
        </main>
      </div>
    );
  }
}
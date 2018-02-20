import React from 'react';
import AtomContainer from './atomContainer';
import Navbar from './sidenavbar';
import Header from './header';
import Footer from './footer';

export default class SpreadSheet extends React.Component {
  render() {
    const content = (
      <form class="form-horizontal" action="" method="post">
        <h3 class="mt-4 mb-4 text-center"><em class="fa fa-table"></em> Form Report Sheet</h3>
        <fieldset>
          <div class="form-group">
            <label class="col-12 control-label no-padding" for="name">Class</label>
            <div class="col-12 no-padding">
              <select id="class" class="form-control">
                <option value="0">Select Class</option>
              </select>
            </div>
          </div>
          <div class="form-group">
            <label class="col-12 control-label no-padding" for="name">Type</label>
            <div class="col-12 no-padding">
              <select id="type" class="form-control">
                <option value="0">Select Type</option>
              </select>
            </div>
          </div>
          <div class="form-group">
            <div class="col-12 widget-right no-padding">
              <input id="view-sheet" type="button" class="btn btn-primary btn-md float-right" value="Submit" />
            </div>
          </div>
        </fieldset>
      </form>
    );
    return (
      <div className="row">
        <Navbar />
        <main class="col-xs-12 col-sm-8 offset-sm-4 col-lg-9 offset-lg-3 col-xl-10 offset-xl-2 pt-3 pl-4">
          <Header header="Report Sheet"/>
          <section className="row">
            <AtomContainer content={content}/>		
          </section>
          <Footer />
        </main>
      </div>
    );
  }
}
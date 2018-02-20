import React from 'react';
import Navbar from './sidenavbar';
import Header from './header';
import Footer from './footer';
import ContentContainer from './contentContainer';

export default class Dashboard extends React.Component {
  render() {
    const addBook = (
      <form class="form-horizontal" action="" method="post">
        <h3 class="mt-4 mb-4 text-center"><em class="fa fa-plus-circle"></em> Add Book</h3>
        <fieldset>
          <div class="form-group">
            <label class="col-12 control-label no-padding" for="name">Subject</label>
            <div class="col-12 no-padding">
              <select id="subject" class="form-control">
                <option value="0">Select Subject</option>
              </select>
            </div>
          </div>
          <div class="form-group">
            <label class="col-12 control-label no-padding" for="name">Class</label>
            <div class="col-12 no-padding">
              <select id="class" class="form-control">
                <option value="0">Select Class</option>
              </select>
            </div>
          </div>
          <div class="form-group">
            <label class="col-12 control-label no-padding" for="name">Title</label>
            <div class="col-12 no-padding">
              <input type="text" class="form-control" id="title"/>
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

    const bookHistory = ( 
      <div className="table-responsive">
        <h3 className="mt-4 mb-4 text-center"><em class="fa fa-book"></em> Books Archive</h3>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>S/N</th>
              
              <th>Book</th>
              
              <th>Delete</th>
            </tr>
          </thead>
          
          <tbody>
            <tr>
              <td>0001</td>
              
              <td>Algebra Demistyfied by Aaron Morgan</td>
                                        
              <td><i className="fa fa-trash"></i></td>
            </tr>
            
            <tr>
              <td>0002</td>
              
              <td>Understanding Mathematics for secondary schools</td>
              
              <td><i className="fa fa-trash"></i></td>
            </tr>
            
            <tr>
              <td>0003</td>
              
              <td>Basic Mathematics by A.A. Gildart, O.M. Longman</td>
              
              <td><i className="fa fa-trash"></i></td>
            </tr>
          </tbody>
        </table>
      </div>  
    );

    return (
      <div class="row">
        <Navbar />
        <main class="col-xs-12 col-sm-8 offset-sm-4 col-lg-9 offset-lg-3 col-xl-10 offset-xl-2 pt-3 pl-4">
          <Header header="Library"/>
          <ContentContainer contentFirst={addBook} contentSecond={bookHistory}/>
          <Footer />
        </main>
      </div>
    );
  }
}
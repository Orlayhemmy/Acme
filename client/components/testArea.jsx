import React from 'react';
import Navbar from './sidenavbar';
import Header from './header';
import Footer from './footer';
import ContentContainer from './contentContainer';

export default class Dashboard extends React.Component {
  render() {
    const newTest = (
      <form class="form-horizontal" action="" method="post">
        <h3 class="mt-4 mb-4 text-center"><em class="fa fa-plus-circle"></em> Add test</h3>
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
            <div class="col-12 widget-right no-padding">
              <input id="view-sheet" type="button" class="btn btn-primary btn-md float-right" value="Submit" />
            </div>
          </div>
        </fieldset>
      </form>
    );

    const archive = ( 
      <div className="table-responsive">
        <h3 className="mt-4 mb-4 text-center"><em class="fa fa-edit"></em> Tests Archive</h3>
        <table class="table table-striped">
          <thead>
            <tr>
              <th>S/N</th>
              
              <th>Title</th>
              
              <th>Class</th>
              
              <th>Questions</th>
              <th>Status</th>
              
              <th>Delete</th>
            </tr>
          </thead>
          
          <tbody class="text-center">
            <tr>
              <td>1</td>
              
              <td>Welcome test</td>
                                        
              <td>Grade 9</td>
              
              <td><a href="questions.html"><em class="fa fa-eye"></em></a></td>
              <td><em class="fa fa-upload"></em></td>
              <td><i class="fa fa-recycle"></i></td>
            </tr>
            
            <tr>
              <td>2</td>
              
              <td>Factorization</td>
              
              <td>Grade 7</td>
              <td><em class="fa fa-eye"></em></td>
              <td><em class="fa fa-upload"></em></td>
              <td><i class="fa fa-recycle"></i></td>
            </tr>
            
            <tr>
              <td>3</td>
              
              <td>Equations</td>
              
              <td>Grade 8</td>
              <td><em class="fa fa-eye"></em></td>
              <td><em class="fa fa-upload"></em></td>
              
              <td><i class="fa fa-recycle"></i></td>
            </tr>
          </tbody>
        </table>
      </div>  
    );
    return (
      <div className="row">
        <Navbar />
        <main className="col-xs-12 col-sm-8 offset-sm-4 col-lg-9 offset-lg-3 col-xl-10 offset-xl-2 pt-3 pl-4">
          <Header header="Test Area"/>
          <ContentContainer contentFirst={newTest} contentSecond={archive}/>
          <Footer />
        </main>
      </div>
    );
  }
}
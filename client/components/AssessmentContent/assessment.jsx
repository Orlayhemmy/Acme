import React from 'react';
import ContentContainer from '../contentContainer';

export default class Assessment extends React.Component {
  render() {
    const assessment = (
      <form class="form-horizontal" action="" method="post">
        <h3 class="mt-4 mb-4"><em class="fa fa-plus-circle"></em> Add Note</h3>
        <fieldset>
          <div class="form-group">
            <label class="col-12 control-label no-padding" for="name">Week</label>
            <div class="col-12 no-padding">
              <select id="subject" class="form-control">
                <option value="0">Select Week</option>
              </select>
            </div>
          </div>
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
        <h3 className="mt-4 mb-4"><em class="fa fa-tasks"></em> Assessment Archive</h3>
        <table class="table table-striped">
          <thead>
            <tr>
              <th>S/N</th>
              
              <th>Topic</th>
              
              <th>Class</th>
              
              <th>Remove/Delete</th>
            </tr>
          </thead>
          
          <tbody>
            <tr>
              <td>1</td>
              
              <td>Plotting of Graph</td>
                                        
              <td>Grade 9</td>
              <td><i class="fa fa-recycle"></i></td>
            </tr>
            
            <tr>
              <td>2</td>
              
              <td>Factorization</td>
              
              <td>Grade 7</td>
              <td><i class="fa fa-recycle"></i></td>
            </tr>
            
            <tr>
              <td>3</td>
              
              <td>Equations</td>
              
              <td>Grade 8</td>
              
              <td><i class="fa fa-recycle"></i></td>
            </tr>
          </tbody>
        </table>
      </div>  
    );
    return (
      <div className="card-block">
        <ContentContainer contentFirst={assessment} contentSecond={archive}/>
      </div>
    );
  }
}
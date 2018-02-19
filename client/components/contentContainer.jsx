import React from 'react';
import AtomContainer from './atomContainer';

export default class ContentContainer extends React.Component {
  render() {
    return (
      <section className="row">
        <div className="col-sm-12 col-md-6">
          <div className="card mb-4">	
            <div className="card-block">
              <section className="row">
                <div className="col-12 mb-2">
                  <h3 className="mt-4 mb-4">Add A Book To Library</h3>
                  <form className="form-horizontal" action="" method="post">
                    <fieldset>
                      
                      
                      <div className="form-group">
                        <label className="col-12 control-label no-padding" for="name">Subject</label>
                        
                        <div className="col-12 no-padding">
                          <select id="subject" className="form-control">
                            <option value="0">Select Subject</option>
                          </select>
                        </div>
                      </div>
                    
                      
                      <div className="form-group">
                        <label className="col-12 control-label no-padding" for="name">Title</label>
                        
                      
                        <div className="col-12 no-padding">
                          <input type="text" className="form-control" id="title"/>
                        </div>
                      </div>
                                              
                      
                      <div className="form-group">
                        <div className="col-12 widget-right no-padding">
                          <button type="submit" className="btn btn-primary btn-md float-right">Submit</button>
                        </div>
                      </div>
                    </fieldset>
                  </form>
                </div>
              </section>
            </div>					
          </div>
        </div>
        <div className="col-sm-12 col-md-6">
          <div className="card mb-4">	
            <div className="card-block color-green">
              <section className="row">
                <div className="col-12 mb-2">
                  <h3 className="mt-4 mb-4">Books</h3>
                  <div className="table-responsive">
                        <table className="table table-striped">
                          <thead>
                            <tr>
                              <th>Order #</th>
                              
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
                </div>
              </section>
            </div>					
          </div>
        </div>
      </section>
    );
  }
}
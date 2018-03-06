import React from 'react';
import Header from './header';
import Footer from './footer';

export default class ViewSheet extends React.Component {
  render() {
    return (
      <div class="row">			
        <main class="col-xs-12 col-sm-12 col-lg-12 col-xl-12 pl-4">
          <Header header=""/>
          <section class="row">
					<div class="col-sm-12 col-md-12">
						<div class="card mb-6">	
							<div class="card-block">
                <table class="table table-striped">
                  <tbody>
                    <tr>
                      <th>Session</th>
                      
                      <td>Plotting of Graph</td>
                                                
                      <th>Term</th>
                      <td>{note.termId}</td>
                    </tr>
                  </tbody>
                </table>
                <table class="table table-striped">
                  <thead>
                    <tr>
                      <th>Fullname</th>
                      <th>CA1</th>                         
                      <th>CA2</th>
                      <th>CA3</th>
                      <th>Exam</th>
                      <th>Total</th>
                      <th>Grade</th>
                      <th>Pos</th>
                      <th>%</th>
                      <th>Comment</th>
                    </tr>
                  </thead>
                  <tbody>
                  <tr>
                      <td>Fullname</td>
                      <td>CA1</td>                         
                      <td>CA2</td>
                      <td>CA3</td>
                      <td>Exam</td>
                      <td>Total</td>
                      <td>Grade</td>
                      <td>Pos</td>
                      <td>%</td>
                      <td>Comment</td>
                    </tr>
                  </tbody>
                </table>						
							</div>					
						</div>	
					</div>
				</section>
        </main>
      </div>
    );
  }
}
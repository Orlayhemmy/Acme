import React from 'react';
import { connect } from 'react-redux';
import Navbar from './sidenavbar';
import Header from './header';
import Footer from './footer';
import ContentContainer from './contentContainer';
import { getTeacherClasses } from '../actions/classActions';
import { createTestValidate } from '../shared/testValidation';

@connect((store) => {
  return {
    auth: store.auth,
    classes: store.classes.classes,
  };
})

export default class Dashboard extends React.Component {
  constructor() {
    super();
    this.state = {
      classId: '',
      weekId: '',
      errors: {},
      classHistory: '',
      topic: '',
    }
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.isValid = this.isValid.bind(this);
    this.updateArchive = this.updateArchive.bind(this);
  }
  updateArchive(id) {
    this.props.dispatch(getWeekAssignments(id));
  }
  componentWillMount() {
    this.props.dispatch(getTeacherClasses(this.props.auth.user.id));
    // this.props.dispatch(getCBT(this.props.week.id.value))
  }
  onChange(e) {
    this.setState({
      [e.target.id]: e.target.value,
    });
    if (e.target.id == 'classHistory') {
      this.updateArchive(e.target.value);
    }
  }
  
  isValid() {
    this.state.termId = this.props.term.id.value;
    this.state.staffId = this.props.auth.user.id;
    const { isValid, errors } = createTestValidate(this.state);
    if (!isValid) {
      this.setState({ errors });
    }
    return isValid;  
  }
  onSubmit(e) {
    e.preventDefault();
    if (this.isValid()) {
      this.props.dispatch(createTest(this.state));
      // this.props.dispatch(getCBT(this.props.week.id.value));
      window.open('/assignment', 'window', 'toolbar=no, menubar=no, resizable=yes');
    }
  }
  render() {
    const { errors, topic, classId, classHistory } = this.state;
    const subjectClasses = _.map(this.props.classes, (subjectclass) => {
      return (
        <option key={subjectclass.id} value={subjectclass.classId}>{subjectclass.Class.classname}</option>
      );      
    });
    const newTest = (
      <form class="form-horizontal" onSubmit={this.onSubmit}>
        <h3 class="mt-4 mb-4 text-center"><em class="fa fa-plus-circle"></em> Add test</h3>
        <fieldset>
          <div class="form-group">
            <label class="col-12 control-label no-padding" for="name">Class</label>
            <div class="col-12 no-padding">
              <select id="classId" class="form-control">
                <option>Select Class</option>
                {subjectClasses}
              </select>
            </div>
          </div>
          <div className="help-block">{errors.topic}</div>
            <div class="form-group">
              <label class="col-12 control-label no-padding" for="name">Title</label>  
              <div class="col-12 no-padding">
                <input  type="text" id="topic" class="form-control" onChange={this.onChange}/>
              </div>
            </div>
          <div class="form-group">
            <div class="col-12 widget-right no-padding">
              <input type="submit" class="btn btn-primary btn-md float-right" value="Submit" />
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
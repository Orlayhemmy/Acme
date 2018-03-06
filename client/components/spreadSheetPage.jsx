import React from 'react';
import { connect } from 'react-redux';
import AtomContainer from './atomContainer';
import Navbar from './sidenavbar';
import Header from './header';
import Footer from './footer';
import { viewSheetValidate } from '../shared/viewSheetValidation';

@connect((store) => {
  return {
    auth: store.auth,
    classes: store.classes.teacherclasses,
    term: store.term,
  };
})

export default class SpreadSheet extends React.Component {
  constructor() {
    super();
    this.state = {
      errors: {},
      classId: '',
      typeId: '',
    }
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.isValid = this.isValid.bind(this);
  }
  onChange(e) {
    this.setState({
      [e.target.id]: e.target.value,
    });
  }
  isValid() {
    this.state.termId = this.props.term.id.value;
    const { isValid, errors } = viewSheetValidate(this.state);
    if (!isValid) {
      this.setState({ errors });
    }
    return isValid;  
  }
  onSubmit(e) {
    e.preventDefault();
    if (this.isValid()) {
      this.props.dispatch(createNote(this.state, this.props.week.id.value));
      window.open('/note', 'window', 'toolbar=no, menubar=no, resizable=yes');
    }
  }
  render() {
    const { typeId, classId, errors } = this.state;
    const subjectClasses = _.map(this.props.classes, (subjectclass) => {
      return (
        <option key={subjectclass.id} value={subjectclass.classId}>{subjectclass.Class.classname}</option>
      );      
    });
    const content = (
      <form class="form-horizontal" onSubmit={this.onSubmit}>
        <h3 class="mt-4 mb-4 text-center"><em class="fa fa-table"></em> Subject SpreadSheet</h3>
        <fieldset>
          <div className="help-block">{errors.classId}</div>                 
          <div class="form-group">
            <label class="col-12 control-label no-padding" for="name">Class</label>
            <div class="col-12 no-padding">
              <select id="classId" class="form-control" onChange={this.onChange}>
                <option value="">Select Class</option>
                {subjectClasses}
              </select>
            </div>
          </div>
          <div className="help-block">{errors.typeId}</div>
          <div class="form-group">
            <label class="col-12 control-label no-padding" for="name">Type</label>
            <div class="col-12 no-padding">
              <select id="typeId" class="form-control" onChange={this.onChange}>
                <option value="">Select Type</option>
                <option value="1">Half</option>
                <option value="2">Full</option>
              </select>
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
    return (
      <div className="row">
        <Navbar />
        <main class="col-xs-12 col-sm-8 offset-sm-4 col-lg-9 offset-lg-3 col-xl-10 offset-xl-2 pt-3 pl-4">
          <Header header="Spreadsheet"/>
          <section className="row">
            <AtomContainer content={content}/>		
          </section>
          <Footer />
        </main>
      </div>
    );
  }
}
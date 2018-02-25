import React from 'react';
import { connect } from 'react-redux';
import Navbar from './sidenavbar';
import Header from './header';
import Footer from './footer';
import AtomContainer from './atomContainer';
import { setCurrentValidate } from '../shared/settingsValidate';
import { setTerm } from '../actions/termActions';
import { setWeek } from '../actions/weekActions';

@connect((store) => {
  return {
    auth: store.auth,
    week: store.week,
    term: store.term,
  };
})

export default class Settings extends React.Component {
  constructor() {
    super();
    this.state = {
      termId: '',
      weekId: '',
      errors: {},
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
    const { isValid, errors } = setCurrentValidate(this.state);
    if (!isValid) {
      this.setState({ errors });
    }
    return isValid;
  }
  onSubmit(e) {
    e.preventDefault();
    if (this.isValid()) {
      if (this.state.termId !== '') {
        this.props.dispatch(setTerm(this.state.termId));
      }
      if (this.state.weekId !== '') {
        this.props.dispatch(setWeek(this.state.weekId));
      }
    }
  }
  componentDidUpdate() {
    if (this.props.week.status == 200) {
      alert(this.props.week.message);
    }
    if (this.props.term.status == 200) {
      alert(this.props.term.message);
    }
  }
  render() {
    const { weekId, termId, errors } = this.state;
    const content = (
      <form class="form-horizontal" onSubmit={this.onSubmit}>
        <h3 class="mt-4 mb-4 text-center"><em class="fa fa-gear"></em> Settings</h3>
        <fieldset>
          <div className="help-block">{errors.termId}</div>
          <div class="form-group">
            <label class="col-12 control-label no-padding" for="name">Term</label>
            <div class="col-12 no-padding">
              <select id="termId" class="form-control" onChange={this.onChange}>
                <option>Select Current Term</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
              </select>
            </div>
          </div>
          <div className="help-block">{errors.weekId}</div>
          <div class="form-group">
            <label class="col-12 control-label no-padding" for="name">Week</label>
            <div class="col-12 no-padding">
              <select id="weekId" class="form-control" onChange={this.onChange}>
                <option>Select Current Week</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
                <option value="11">11</option>
                <option value="12">12</option>
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
    )
    return (
      <div className="row">
        <Navbar />
        <main class="col-xs-12 col-sm-8 offset-sm-4 col-lg-9 offset-lg-3 col-xl-10 offset-xl-2 pt-3 pl-4">
          <Header header="Settings"/>
          <section className="row">
            <AtomContainer content={content}/>		
          </section>
          <Footer />
        </main>
      </div>
    );
  }
}
import React from 'react';
import Footer from './footer';
import loginInputValidate from '../shared/uservalidation';

export default class Homepage extends React.Component {
  constructor() {
    super();
    this.state = {
      loginId: '',
      loginPassword: '',
      errors : {},
      serverError: '',
    }

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.isValid = this.isValid.bind(this);
  }
  onSubmit(e) {
    e.preventDefault();
    console.log(this.state)
    if (this.isValid()) {
      console.log('true')
    }
  }

  onChange(e) {
    this.setState({
      [e.target.id]: e.target.value
    });
  }

  isValid() {
    const { errors, isValid } = loginInputValidate(this.state);
    if (!isValid) {
      this.setState({ errors });
    }
    return isValid;
  }

  render() {
    const { loginId, loginPassword, errors, serverError } = this.state;
    return (
      <div className="row">	
        <main className="col-xs-12 col-sm-8 col-lg-12 col-xl-12 pt-3 pl-4">	
          <section className="row">
            <div className="col-sm-12 col-lg-4 col-md-4 m-auto">
              <section className="row">
                <div className="col-12 mb-2">
                  <div className="card mb-4">
                    <div className="card-block">	
                      <form className="form-horizontal" onSubmit={this.onSubmit}>
                        <h3 className="mt-4 mb-4 text-center"><em className="fa fa-plus-circle"></em> Sign In</h3>
                        <span className="help-block">{serverError}</span>
                        <fieldset>
                          <span className="help-block">{errors.loginId}</span>
                          <div className="form-group">
                            <div className="input-group">
                              <span className="input-group-addon">
                                <i className="fa fa-user"></i>
                              </span>
                              <input type="text" className="form-control" id="loginId" onChange={this.onChange}/>
                            </div>
                          </div>
                          <span className="help-block">{errors.loginPassword}</span>
                          <div className="form-group">
                            <div className="input-group">
                              <span className="input-group-addon">
                                <i className="fa fa-key"></i>
                              </span>
                              <input type="text" className="form-control" id="loginPassword" onChange={this.onChange}/>
                            </div>
                          </div>
                          <div className="form-group">
                            <div className="col-12 widget-right no-padding">
                              <input id="login" type="submit" className="btn btn-primary w-100" value="Submit" />
                            </div>
                          </div>
                        </fieldset>
                      </form>
                    </div>
                  </div>								
                </div>						
              </section>	
            </div>
          </section>
          <Footer />
        </main>
      </div>
    );
  }
}
import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from'react-router-dom';
import isEmpty from 'lodash/isEmpty';
import Footer from './footer';
import Header from './header';
import Navbar from './sidenavbar';
import { getClasses, createSubjectClasses, getTeacherClasses, deleteTeacherClasses } from '../actions/classActions';
import { getSubjects } from '../actions/subjectActions';
import { getStaffs, modifyUser } from '../actions/authActions';



@connect((store) => {
  return {
    auth: store.auth,
    classes: store.classes,
    subject:  store.subject,
  }
})

export default class Homepage extends React.Component {
  constructor() {
    super();
    this.state = {
      tutor: '',
      hod: '',
      matron: '',
      principal: '',
      vice: '',
      teacher: '',
      manager: '',
      subject: '',
      classTutoring: '',
      subjectHod: '',
      subjectClasses: '',
    }
    this.showDiv = this.showDiv.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.updateSubClasses = this.updateSubClasses.bind(this);
    this.onRemove = this.onRemove.bind(this);
    this.updateClassTutor = this.updateClassTutor.bind(this);
    this.updateHOD = this.updateHOD.bind(this);
    this.updateSubject = this.updateSubject.bind(this);
  }

  componentWillMount() {
    this.props.dispatch(getClasses());
    this.props.dispatch(getTeacherClasses());
    this.props.dispatch(getSubjects());
    this.props.dispatch(getStaffs());
  }
  onSubmit(e) {
    
  }
  onRemove(e) {
    e.preventDefault();
    if (confirm("Are you sure you want to remove this class")) {
      this.props.dispatch(deleteTeacherClasses(e.target.id));
    }
  }
  
  onChange(e) {
    this.setState({
      [e.target.id]: e.target.value
    });
    if (e.target.id === 'subjectClasses') {
      if (!isEmpty(e.target.value)) {
        this.updateSubClasses(e.target.value);
      }
    }
    if (e.target.id === 'classTutoring') {
      if (!isEmpty(e.target.value)) {
        this.updateClassTutor(e.target.value);
      }
    }
    if (e.target.id === 'subjectHod') {
      if (!isEmpty(e.target.value)) {
        this.updateHOD(e.target.value);
      }
    }
    if (e.target.id === 'subject') {
      if (!isEmpty(e.target.value)) {
        this.updateSubject(e.target.value);
      }
    }
  }
  updateSubClasses(id) {
    this.props.dispatch(createSubjectClasses(id));
  }
  updateClassTutor(id) {
    const data = {
      classId: id,
    }
    this.props.dispatch(modifyUser(data));
  }
  updateHOD(id) {
    const data = {
      HOD: id,
    }
    this.props.dispatch(modifyUser(data));
  }
  updateSubject(id) {
    const data = {
      subjectId: id,
    }
    this.props.dispatch(modifyUser(data));
  }
  showDiv(e) {
    let div = document.getElementById(e.target.nextSibling.value);
    div.hidden = !div.hidden;
    this.onChange(e)
  }
  render() {
    const { tutor, hod, matron, principal, vice, teacher, manager, subject, classTutoring, subjectHod, subjectClasses } = this.state;
    const { subjects } = this.props.subject;
    const { classes } = this.props.classes;
    const { teacherclasses } = this.props.classes;
    const { staffs } = this.props.auth;

    const classList = _.map(classes, (listClass) => {
      return (
        <option key={listClass.classId} value={listClass.classId}>{listClass.classname}</option>
      )
    });
    const subjectList = _.map(subjects, (subject) => {
      return (
        <option key={subject.subjectId} value={subject.subjectId}>{subject.subjectname}</option>
      )
    });
    const staffList = _.map(staffs, (staff) => {
      return (
        <option key={staff.id} value={staff.id}>{staff.firstname} {staff.lastname}</option>
      )
    });
    const subTeachList = _.map(teacherclasses, (teacherClass) => {
      return (
        <div className="form-group" key={teacherClass.classId}>
          <button className="btn btn-success" onClick={(e) => e.preventDefault() }>
            {teacherClass.Class.classname} 
            <i className="fa fa-remove" id={teacherClass.id}  onClick={this.onRemove}></i>
          </button>
        </div>
      )
    });

    return (
      <div className="row">
      <Navbar />
      <main class="col-xs-12 col-sm-12 offset-sm-4 col-lg-9 offset-lg-3 col-xl-10 offset-xl-2 pt-3 pl-4">
        <Header header="Role"/>
        <section class="row">
          <div class="col-sm-12">
            <section class="row">
              <div class="col-md-12 col-lg-12">								
                <div class="card mb-4">
                  <div class="card-block">
                    <h3 class="card-title">Roles And Duties</h3>
                                        
                    <h6 class="card-subtitle mb-2 text-muted">Classes, Subjects and Reports</h6>
                    
                    <div class="divider"></div>
                    <form className="form-horizontal">
                      <span className="help-block"></span>
                      <fieldset>
                      <h6 class="card-subtitle mb-2 text-muted">Tick the option which applies to you</h6>
                        <span className="help-block"></span>
                  
                          <div class="form-check-inline ">
                            <input type="checkbox" id="tutor" onChange={this.showDiv}/>
                            <input type="text" value="classHandle" hidden/>
                            <label class="control-label no-padding" for="name"> Form Tutor</label>
                          </div>
                        
                      
                          <div class="form-check-inline ">
                            <input type="checkbox" id="hod" />
                            <label class="control-label no-padding" for="name"> HOD</label>
                          </div>
                      
                        
                          <div class="form-check-inline ">
                            <input type="checkbox" id="matron"/>
                            <label class="control-label no-padding" for="name"> Matron</label>
                          </div>
                        
                        
                          <div class="form-check-inline ">
                            <input type="checkbox" id="principal"/>
                            <label class="control-label no-padding" for="name"> Principal</label>
                          </div>
                        
                          <div class="form-check-inline ">
                            <input type="checkbox" id="teacher" onChange={this.showDiv}/>
                            <input type="text" value="subjectHandle" hidden/>
                            <label class="control-label no-padding" for="name"> Subject Teacher</label>
                          </div>
                        
                          <div class="form-check-inline ">
                            <input type="checkbox" id="manager"/>
                            <label class="control-label no-padding" for="name"> System Manager</label>
                          </div>
                        
                          <div class="form-check-inline ">
                            <input type="checkbox" id="vice"/>
                            <label class="control-label no-padding" for="name"> Vice Principal</label>
                          </div>
                  
                        {/* <div class="col-12 widget-left no-padding">
                          <input id="student" onClick={this.onSubmit} type="button" class="btn btn-primary btn-md float-left" value="Student" />
                        </div> */}
                        <div id="classHandle" hidden>
                          <h6 class="card-subtitle text-muted">Select the class you are tutoring</h6>
                          <div class="divider"></div>
                          <div class="form-group mt-2 mb-2">
                            <label class="control-label no-padding" for="name"> Class Tutoring</label>
                            <div class="col-12 no-padding">
                              <select id="classTutoring" class="form-control" onChange={this.onChange}>
                                <option value="">Select Class</option>
                                {classList}
                              </select>
                            </div>
                          </div>
                        </div>


                        <div class="card mt-2" id="subjectHandle" hidden>
                          <h6 class="card-subtitle text-muted">Select the subject taught, classes and head of department</h6>
                          <div class="divider"></div>
                          <div class="form-group ">
                            <label class="control-label no-padding" for="name">Head of Department</label>
                            <div class="col-12 no-padding">
                              <select id="subjectHod" class="form-control" onChange={this.onChange}>
                              <option value="">Select HOD</option>
                              {staffList}
                            </select>
                            </div>
                          </div>
                          <div class="form-check-inline ">
                            <label class="control-label no-padding" for="name"> Subject</label>
                            <div class="col-3 no-padding">
                              <select id="subject" class="form-control" onChange={this.onChange}>
                                <option value="">Select Subject</option>
                                {subjectList}
                              </select>
                            </div>
                            <label class="control-label no-padding" for="name">Class</label>
                            <div class="col-3 no-padding">
                              <select id="subjectClasses" class="form-control" onChange={this.onChange}>
                              <option value="">Select Class</option>
                              {classList}
                            </select>
                            </div>
                          </div>
                          {subTeachList}
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
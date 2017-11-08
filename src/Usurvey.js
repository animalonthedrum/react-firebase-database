import React, { Component } from 'react';
let firebase = require('firebase');
let uuid = require('uuid');

var config = {
    apiKey: "AIzaSyBPDyFIPMxt8TDHhzKLZU9pxn3SC8euwJ8",
    authDomain: "u-survey-d2a2a.firebaseapp.com",
    databaseURL: "https://u-survey-d2a2a.firebaseio.com",
    projectId: "u-survey-d2a2a",
    storageBucket: "u-survey-d2a2a.appspot.com",
    messagingSenderId: "375914050623"
  };
  firebase.initializeApp(config);

export default class Usurvey extends Component {
nameSubmit(event){
  let studentName = this.refs.name.value
  this.setState({studentName: studentName}, function(){
    console.log(this.state);
  });
}
answerSelected(event){
let answers =this.state.answers;
if(event.target.name==='answer1'){
  answers.answer1 = event.target.value;
}else if(event.target.name==='answer2'){
  answers.answer2=event.target.value;
}else if(event.target.name==='answer3'){
  answers.answer3=event.target.value;
}

this.setState({answers:answers}), function(){
  console.log(this.state);
}
}
questionSubmit(){
  firebase.database().ref('uSurvey/' + this.state.uid).set({studentName:this.state.studentName,
answers:this.state.answers
  });
  this.setState({isSubmitted:true});
}
constructor(props){
  super(props);

  this.state = {
    uid: uuid.v1(),
    studentName: '',
    answers: {
      answer1: '',
      answer2: '',
      answer3: ''
    },
    isSubmitted: false
  };
  this.nameSubmit = this.nameSubmit.bind(this);
  this.answerSelected = this.answerSelected.bind(this);
  this.questionSubmit = this.questionSubmit.bind(this);
}

render(){
var studentName;
var questions;

if (this.state.studentName === '' && this.state.isSubmitted === false){
  studentName = <div>
<h1>What is your name?</h1>
<form onSubmit={this.nameSubmit}>
  <label htmlFor='studentsName'>Name </label>
  <input className='inName' type='text' name='studentsName' placeholder='Enter your name' ref='name'></input>
</form>
</div>;
questions = '';
} else if (this.state.studentName !== '' && this.state.isSubmitted === false){
  studentName = <h1>Welcome to U-Survey, {this.state.studentName}</h1>;
    questions = <div>
      <h2>Please answer these questions: </h2>
      <form onSubmit={this.questionSubmit}>
        <div className='card'>
          <label htmlFor='answer1'>What kind of courses do you like the most?</label> <br />
          <input type='radio' name='answer1' value='Technology' onChange={this.answerSelected} />Technology
          <input type='radio' name='answer1' value='Design' onChange={this.answerSelected} />Design
          <input type='radio' name='answer1' value='Marketing' onChange={this.answerSelected} />Marketing
        </div>
        <div className='card'>
          <label htmlFor='answer1'>Purpose of class?</label> <br />
          <input type='radio' name='answer2' value='Student' onChange={this.answerSelected} />Student
          <input type='radio' name='answer2' value='Job' onChange={this.answerSelected} />Job
          <input type='radio' name='answer2' value='Hobby' onChange={this.answerSelected} />Hobby
        </div>
        <div className='card'>
          <label htmlFor='answer1'>Is online learning helpful?</label> <br />
          <input type='radio' name='answer3' value='Yes' onChange={this.answerSelected} />Yes
          <input type='radio' name='answer3' value='No' onChange={this.answerSelected} />No
          <input type='radio' name='answer3' value='Maybe' onChange={this.answerSelected} />Maybe
        </div>
        <input className='feedback-button' type='submit' value='submit'/>
      </form>
    </div>;
} else if(this.state.isSubmitted ===true){
  studentName= <h1>Thanks {this.state.studentName}</h1>
}
    return(
      <div>
{studentName}
--------------------
{questions}
      </div>
    );
  }
}

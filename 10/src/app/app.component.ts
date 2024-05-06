import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

//angulars have two approches - Template-driven and Reactive
//Template-driven -> simple but less options
//Reactive-> more complex but you have all contoll voer the form

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  @ViewChild('form') signupForm: NgForm;
  deafultQuestion = 'pet';
  answer: string;
  genders = ['male', 'female'];
  subbmited = false;
  user = {
    username: '',
    email: '',
    secret: '',
    questionAnswer: '',
    gender: '',
  };

  suggestUserName() {
    const suggestedName = 'Superuser';
    this.signupForm.form.patchValue({ userData: { username: suggestedName } });
  }

  // onSubmit(form: NgForm) {
  //   console.log(form.value);
  // }

  onSubmit() {
    console.log(this.signupForm.value);
    this.user.username = this.signupForm.value.userData.username;
    this.user.email = this.signupForm.value.userData.email;
    this.user.secret = this.signupForm.value.secret;
    this.user.questionAnswer = this.signupForm.value.questionAnswer;
    this.user.gender = this.signupForm.value.gender;

    this.signupForm.reset();
    this.subbmited = true;
  }
}

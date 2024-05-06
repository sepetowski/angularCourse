import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

interface User {
  username: FormControl<string>;
  email: FormControl<string>;
  gender: FormControl<string>;
  hobbies: FormArray<FormControl<string>>;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  signupForm: FormGroup<User>;
  genders = ['male', 'female'];
  private forbiddenUsernames = ['Chris', 'Anna'];

  get controls() {
    return (this.signupForm.get('hobbies') as FormArray).controls;
  }

  ngOnInit() {
    this.signupForm = new FormGroup({
      username: new FormControl('', [
        Validators.required,
        this.forbiddenNames.bind(this),
      ]),
      email: new FormControl(
        '',
        [Validators.required, Validators.email],
        this.forbiddenEmails
      ),
      gender: new FormControl('male'),
      hobbies: new FormArray([]),
    });
    //value changes
    // this.signupForm.valueChanges.subscribe((value) => console.log(value));
    //status changes
    this.signupForm.statusChanges.subscribe((status) => console.log(status));
  }

  onAddHobby() {
    const control = new FormControl('', Validators.required);
    const formArry = this.signupForm.get('hobbies') as FormArray;

    formArry.push(control);
  }

  onSubmit() {
    console.log(this.signupForm.value);
  }

  //validator
  private forbiddenNames(control: FormControl): { [s: string]: boolean } {
    if (
      this.forbiddenUsernames.find((usernames) => usernames === control.value)
    )
      return { nameIsForbidden: true };

    return null;
  }

  private forbiddenEmails(control: FormControl) {
    const promise = new Promise((resolve, reject) => {
      setTimeout(() => {
        if (control.value === 'test@test.com')
          resolve({ emailIsForbidden: true });
        else resolve(null);
      }, 1500);
    });
    return promise;
  }
}

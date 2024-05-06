import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css'],
})
export class TaskComponent implements OnInit {
  subscriptions = ['Basic', 'Advanced', 'Pro'];
  @ViewChild('form') form: NgForm;
  constructor() {}

  ngOnInit(): void {}

  onSubmit() {
    console.log(this.form.value);
  }
}

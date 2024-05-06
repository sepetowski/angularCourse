import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

interface Project {
  projectName: FormControl<string>;
  email: FormControl<string>;
  status: FormControl<string>;
}

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css'],
})
export class TaskComponent implements OnInit {
  form: FormGroup<Project>;
  status = ['Stable', 'Critical', 'Finished'];

  constructor() {}

  ngOnInit(): void {
    this.form = new FormGroup({
      projectName: new FormControl(
        '',
        [Validators.required, this.validateProjectName],
        this.asyncValidteProjectName
      ),
      email: new FormControl('', [Validators.required, Validators.email]),
      status: new FormControl(this.status[2]),
    });
  }

  private validateProjectName(control: FormControl): { [s: string]: boolean } {
    return control.value === 'Test' ? { wrongPojectName: true } : null;
  }

  private asyncValidteProjectName(control: FormControl) {
    const promise = new Promise((resolve, reject) => {
      setTimeout(() => {
        if (control.value === 'Test2') resolve({ wrongPojectName: true });
        else resolve(null);
      }, 1000);
    });
    return promise;
  }

  onSubmit() {
    console.log(this.form.value);
  }
}

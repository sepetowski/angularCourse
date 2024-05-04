import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit {
  user: { id: number; name: string };
  findUser = false;

  constructor(
    private route: ActivatedRoute,
    private usersService: UsersService
  ) {}

  private showUser(id: number) {
    const users = this.usersService.users;
    const user = users.find((user) => user.id === id);
    if (user) {
      this.findUser = true;
      this.user = user;
    } else this.findUser = false;
  }

  ngOnInit() {
    // const id = this.route.snapshot.params['id'];
    // this.showUser(Number(id));

    //observable
    this.route.params.subscribe((params) => {
      this.showUser(Number(params['id']));
    });
  }
}

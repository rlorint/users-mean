import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

import { User } from '../user';
@Component({
  selector: 'app-adduser',
  templateUrl: './adduser.component.html',
  styleUrls: ['./adduser.component.css']
})
export class AddUserComponent implements OnInit {

  userToAdd: User = new User();
  constructor(private userService: UserService, private location: Location, private router: Router) { }

  addUser():void {
    this.userService.addUser(this.userToAdd).subscribe(resp => {
      console.log(resp);
      this.router.navigate(['']);
    });
  }

  cancelAddingUser(): void {
    this.router.navigate(['']);
  }

  ngOnInit() {
  }

}

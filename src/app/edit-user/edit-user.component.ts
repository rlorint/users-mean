import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

import { UserService } from '../user.service';
import { User } from '../user';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {
  userToEdit: User;

  constructor(private userService: UserService, private route: ActivatedRoute, private router: Router, private location: Location) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.getUserById(id);
  }


  getUserById(id: string): void {
    this.userService.getUserById(id).subscribe(userToEdit => this.userToEdit = userToEdit);
  }

  editUser(): void {
    this.userService.editUser(this.userToEdit).subscribe(resp => {
      console.log(resp);
    });
    this.router.navigate(['']);
  }

  cancelEditingUser(): void {
    this.router.navigate(['']);
  }


}

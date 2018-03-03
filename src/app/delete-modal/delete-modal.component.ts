import { Component, EventEmitter, OnInit, Input, Output } from '@angular/core';
import { Router } from '@angular/router';

import { User } from '../user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-delete-modal',
  templateUrl: './delete-modal.component.html',
  styleUrls: ['./delete-modal.component.css']
})
export class DeleteModalComponent implements OnInit {
  @Input() userToDelete: User;
  @Output() onDeleted = new EventEmitter<boolean>();
  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
  }

  deleteUser(): void {
    this.userService.deleteUser(this.userToDelete).subscribe(resp => {
      console.log(resp);
      this.onDeleted.emit(true);
    });
  }


}

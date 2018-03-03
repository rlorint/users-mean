import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { User } from '../user';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  users: User[];
  userToDelete: User;
  selectedSearchField: string;
  textToSearch: string;
  asc: boolean = false;

  constructor(private userService: UserService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.selectedSearchField = params.searchField;
      this.textToSearch = params.searchValue;
      this.reloadData();
    });
  }

  reloadData() {
    if (this.selectedSearchField && this.textToSearch) {
      this.search();
    } else {
      this.selectedSearchField = "Please select a field";
      this.getUsers();
    }
  }

  onDeleted() {
    this.reloadData();
  }

  getUsers(): void {
    this.userService.getUsers(true).subscribe(users => this.users = users);
  }

  delete(user: User): void {
    this.userToDelete = user;
  }

  goToSearch() {
    this.router.navigate('', { queryParams: { searchField: this.selectedSearchField, searchValue: this.textToSearch } });
  }

  search(): void {
    this.userService.search(this.textToSearch, this.selectedSearchField).subscribe(users => this.users = users);
  }

  order(field: string, order: string): void {
    this.asc = !this.asc;
    this.userService.orderDesc(field, order).subscribe(users => this.users = users);
  }

}

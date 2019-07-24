import { Component, OnInit,ViewChild } from '@angular/core';
import { UserService } from '../user.service';
import { FormGroup, FormControl } from '@angular/forms';
import {MatSort} from '@angular/material/sort';
import { FormBuilder, Validators } from '@angular/forms';
import { userNameValidator, generalValidator } from '../userNameValidation';
import { MatDialog } from '@angular/material';
import { ManageUserComponent } from '../manage-user/manage-user.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  constructor(private fb: FormBuilder, private _userService: UserService, public dialog: MatDialog) { }

  displayedColumns: string[] = ['name', 'age', 'address', 'edit', 'delete'];
  public users = [];
  public user;
  public selectedTab ;

  public dialogResult;

  /*userForm = new FormGroup({
    name: new FormControl(''),
    age: new FormControl(''),
    address: new FormControl('')
  });*/
  /*userFormUpdate = new FormGroup({
    id: new FormControl(''),
    name: new FormControl(''),
    age: new FormControl(''),
    address: new FormControl('')
  });*/

  ngOnInit() {
    console.log('test');
    this._userService.getUsers().subscribe(results => {this.users = results});
  }
  /*showUserDetais(user) {
    console.log(user);
    this._userService.getUserById(user._id).subscribe(result => this.user = result);
  }*/
  deleteUser(user){
    console.log(user);
    var res = confirm("Are you Sure, you want to delete the User?");
    console.log(res);
    if(res){
      this._userService.deleteUserById(user._id).subscribe(result => {
        //this.user = result;
        this._userService.getUsers().subscribe(results => this.users = results);
      });      
    }
  }
  openDialogForAdd(){
    let dialogRef = this.dialog.open(ManageUserComponent, {width:"500px", data:{submitButton:"Create User", header:'Add User'}});    
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog closed: ${result}`);
      this.dialogResult = result;
      this._userService.getUsers().subscribe(results => this.users = results);
    });
  }
  openDialogForEdit(user){
    let dialogRef = this.dialog.open(ManageUserComponent, {width:"500px", data:{submitButton:"Update User" ,header:'Update User', user: user}});
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog closed: ${result}`);
      this.dialogResult = result;
      this._userService.getUsers().subscribe(results => this.users = results);
    });
  }
}
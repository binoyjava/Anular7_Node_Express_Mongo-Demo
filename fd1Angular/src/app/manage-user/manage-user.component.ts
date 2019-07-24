import { Component, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { Inject } from '@angular/core';
import { UserService } from '../user.service';
import { FormGroup, FormControl } from '@angular/forms';
import { MatSort } from '@angular/material/sort';
import { FormBuilder, Validators } from '@angular/forms';
import { userNameValidator, generalValidator } from '../userNameValidation';
import { MatDialog, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-manage-user',
  templateUrl: './manage-user.component.html',
  styleUrls: ['./manage-user.component.css']
})
export class ManageUserComponent implements OnInit {

  constructor( @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private _userService: UserService,
    public dialog: MatDialog,
    public thisDialogRef: MatDialogRef<ManageUserComponent>) { }
  displayedColumns: string[] = ['name', 'age', 'address', 'edit', 'delete'];
  public users = [];
  public user;
  public selectedTab;

  userForm = this.fb.group({
    id: [],
    name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(10), generalValidator(/admin/)]],
    age: [0, [Validators.required, Validators.max(100), Validators.min(0)]],
    address: ['', [Validators.maxLength(20)]]
  });

  ngOnInit() {
    console.log(this.data.header);
    if (this.data.user != undefined) {
      console.log(this.data.user);
      this.userForm.controls.id.setValue(this.data.user._id);
      this.userForm.controls.name.setValue(this.data.user.name);
      this.userForm.controls.age.setValue(this.data.user.age);
      this.userForm.controls.address.setValue(this.data.user.address);
    }
  }
  onSubmit() {
    console.warn("id ->" + this.userForm.controls.id.value);
    if (this.userForm.controls.id.value != null) {
      console.warn("for Update");
      this._userService.updateUser(this.userForm.value).subscribe(res => {
        this._userService.getUsers().subscribe(results => this.users = results);
      });
    } else {
      console.warn("for Add");
      this._userService.addUser(this.userForm.value).subscribe(res => {
        this._userService.getUsers().subscribe(results => this.users = results);
        this.userForm.controls.name.setValue('');
        this.userForm.controls.age.setValue('');
        this.userForm.controls.address.setValue('');
      })
    }
    this.thisDialogRef.close("add");
  }
  cancel() {
    this.thisDialogRef.close("cancel");
  }
}

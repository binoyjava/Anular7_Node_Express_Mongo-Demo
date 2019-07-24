import { Component, OnInit,ViewChild } from '@angular/core';
import { UserService } from '../user.service';
import { FormGroup, FormControl } from '@angular/forms';
import {MatSort} from '@angular/material/sort';
import { FormBuilder, Validators } from '@angular/forms';
import { userNameValidator, generalValidator } from '../userNameValidation';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
 
  ngOnInit() {
  }
 
}
import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

type LoginForm = {
  login: FormControl<string>;
  password: FormControl<string>;
};

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  protected loginForm!: FormGroup<LoginForm>

  public loginFailed: boolean = false

  constructor(
    private authsvr: AuthService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.nonNullable.group({
      login: ['John Doe', Validators.required],
      password: ['1234', Validators.required],
    });
  }

  onSubmit(): void {
    if (
      this.authsvr.login(
        this.loginForm.value.login ?? '',
        this.loginForm.value.password ?? ''
      )
    ) {
        this.loginFailed = false;
        this.router.navigate(['/']);
    } else {
        console.log('login failed')
        this.loginFailed = true
    }
  }
}

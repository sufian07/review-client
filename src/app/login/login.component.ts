import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { AlertService } from '../services/alert.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;

  constructor(
      private formBuilder: FormBuilder,
      private route: ActivatedRoute,
      private router: Router,
      private authenticationService: AuthService,
      private alertService: AlertService) {}

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
        firstName: ['', Validators.required],
        lastName: ['', Validators.required]
    });
  }
  get form() { return this.loginForm.controls; }
  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
        return;
    }

    this.loading = true;
    this.authenticationService.login(this.form.firstName.value, this.form.lastName.value)
        .pipe(first())
        .subscribe(
            data => {
                this.loading = false;
                this.router.navigate(['/dashboard']);
            },
            error => {
                this.alertService.error(error);
                this.loading = false;
            });
  }

}

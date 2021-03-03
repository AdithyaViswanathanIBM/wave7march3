import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../services/authentication.service';
import { RouterService } from '../services/router.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  submitMessage: string;
  constructor(private authService: AuthenticationService, private router: RouterService) {
  }

  username = new FormControl('', Validators.required);
  password = new FormControl('', [Validators.required, Validators.minLength(6)]);

  loginForm = new FormGroup({
    username: this.username,
    password: this.password
  });

  loginSubmit() {

    this.authService.authenticateUser(this.loginForm.value)
      .subscribe(
        data => {
          console.log(data);
          this.authService.setBearerToken(data['token']);
          this.router.routeToDashboard();
        },
        err => {
          if (err.error) {
            this.submitMessage = err.error.message;
          } else {
            this.submitMessage = err.message;
          }

        }

      );
  }
}

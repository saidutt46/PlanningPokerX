import { Component, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { LoginResponseModel, UserLoginModel } from '@models';
import { AuthenticationService, NOTIFICATION_SERV_TOKEN, NotificationService } from '@services';
import { catchError, throwError } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm = this.fb.group({
    userName: ['', [Validators.required, Validators.minLength(4)]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });
  hide = false;

  constructor(
    private dialog: MatDialog,
    private fb: FormBuilder,
    @Inject(NOTIFICATION_SERV_TOKEN) private notifier: NotificationService,
    private dialogRef: MatDialogRef<LoginComponent>,
    private authService: AuthenticationService
  ) { }

  ngOnInit(): void {
  }

  close() {
    this.dialog.closeAll();
  }

  save() {
    const model = new UserLoginModel();
    model.userName = this.loginForm.get('userName')!.value as string;
    model.password = this.loginForm.get('password')!.value as string;
    this.authService.login(model).pipe(
      catchError(err => {
          console.warn(err.error);
          console.log('Handling error locally and rethrowing it...', );
          return throwError(err);
      })
  )
  .subscribe({
        next: (v) => this.postLogin(v),
        error: (e) => this.notifier.errorNotification(e.error),
        complete: () => this.postLoginComplete()
      });
  }

  postLogin(x: LoginResponseModel) {
    console.warn(x);
    localStorage.setItem('token', x.token);
    localStorage.setItem('expiration', x.expiration.toString());
    localStorage.setItem('userName', x.userProfile.userName);
    localStorage.setItem('userId', x.userProfile.id);
    this.dialogRef.close();
  }

  postLoginComplete() {
    this.notifier.successNotification(`Welcome ${localStorage.getItem('userName')}!`);
    this.authService.userAuthentificatedStatus(true);
  }

}

import { Component, Inject, KeyValueDiffers } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AuthBaseResponse, UserRegistrationModel } from '@models';
import { AuthenticationService, NOTIFICATION_SERV_TOKEN, NotificationService } from '@services';
import { catchError, throwError } from 'rxjs';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {
  registerForm = this.fb.group({
    userName: ['', [Validators.required, Validators.minLength(4)]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });
  hide = false;

  constructor(
    private fb: FormBuilder,
    private dialog: MatDialog,
    private authService: AuthenticationService,
    @Inject(NOTIFICATION_SERV_TOKEN) public notifier: NotificationService
  ) { }

  ngOnInit(): void {
  }

  saveUser(): void {
    const model = new UserRegistrationModel();
    model.userName = this.registerForm.get('userName')!.value as string;
    model.password = this.registerForm.get('password')!.value as string;
    console.warn(model);
    this.authService.registerUser(model).pipe(
      catchError(err => {
          console.log('Handling error locally and rethrowing it...', );
          this.notifier.errorNotification(err.error.message);
          return throwError(err);
      })
  )
  .subscribe({
        next: (v) => this.postRegistration(v),
        error: (e) => this.notifier.errorNotification(e.error.message),
        complete: () => console.info('Registration complete') 
      });
  }

  close() {
    this.dialog.closeAll();
  }

  postRegistration(x: AuthBaseResponse) {
    this.dialog.closeAll();
    this.notifier.successNotification(x.message);
  }
}

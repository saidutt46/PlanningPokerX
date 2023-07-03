import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LoginComponent, RegistrationComponent } from '@components';
import { AuthenticationService } from '@services';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent {
  constructor(
    private dialog: MatDialog,
    private authService: AuthenticationService
  ) { }

  ngOnInit(): void {
    this.isUserAuthenticated();
  }

  public isUserAuthenticated(): boolean {
    return this.authService.isAuthenticated();
  }

  userLogin() {
    this.dialog.open(LoginComponent, {
      width: '30%',
      height: 'auto',
      panelClass: 'custom-dialog'
    });
  }

  userRegister() {
    this.dialog.open(RegistrationComponent, {
      width: '30%',
      height: 'auto',
      panelClass: 'custom-dialog'
    });
  }

  userLogout() {  
    this.authService.logout();
  }
}

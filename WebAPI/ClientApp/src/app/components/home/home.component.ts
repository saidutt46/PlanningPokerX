import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CreateGameComponent } from '../create-game/create-game.component';
import { GamehubService } from '@services';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  actionCardList = [
    'Sign Up',
    'Create an Instant Room',
    'Invite Others',
    'Start estimation stories',
    `Well don't forget to play Poker`
  ];

  constructor(
    private router: Router,
    private dialog: MatDialog,
    private gameHubService: GamehubService
  ) { }

  ngOnInit(): void {
  }

  createNewRoom() {
    this.dialog.open(CreateGameComponent, {
      width: '30%',
      height: 'auto',
      panelClass: 'custom-dialog'
    });
  }

  joinSession() {
    this.gameHubService.addParticipant('45002fd0-f8dc-43f8-03f4-08db7dc6f3cf');
  }
}

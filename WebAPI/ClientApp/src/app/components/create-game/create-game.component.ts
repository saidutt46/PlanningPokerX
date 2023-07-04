import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { BaseDtoResponse, CreateGame, GameSession } from '@models';
import { GameSessionService, NOTIFICATION_SERV_TOKEN, NotificationService } from '@services';
import { catchError, throwError } from 'rxjs';

@Component({
  selector: 'app-create-game',
  templateUrl: './create-game.component.html',
  styleUrls: ['./create-game.component.css']
})
export class CreateGameComponent implements OnInit {
  loading = false;
  createGameForm = this.fb.group({
    gameName: ['', [Validators.required, Validators.minLength(2)]]
  });

  constructor(
    private router: Router,
    public fb: FormBuilder,
    @Inject(NOTIFICATION_SERV_TOKEN) public notifier: NotificationService,
    private dialogRef: MatDialogRef<CreateGameComponent>,
    private gameSessionService: GameSessionService
  ) { }

  ngOnInit(): void {
    this.loading = this.createGameForm ? true : false; 
  }

  saveGame(): void {
    const model = new CreateGame();
    model.gameName = this.createGameForm.get('gameName')!.value as string;
    model.spectator = false;
    model.applicationUserId = localStorage.getItem('userId') as string;
    model.connectionId = localStorage.getItem('connectionId') as string;
    this.gameSessionService.createGame(model).pipe(
      catchError(err => {
          console.warn(err.error);
          console.log('Handling error locally and rethrowing it...', );
          return throwError(err);
      })).subscribe({
        next: (v: BaseDtoResponse<GameSession>) => this.postGameCreation(v),
        error: (e: BaseDtoResponse<GameSession>) => this.notifier.errorNotification(e.error),
        complete: () => console.warn('Game creation completed')
      });
  }

  postGameCreation(x: BaseDtoResponse<GameSession>) { 
    console.warn(x);
    this.dialogRef.close();
    this.router.navigateByUrl(`game/${x.payload.id}`);
  }

  close() {
    this.dialogRef.close(); 
  }
}

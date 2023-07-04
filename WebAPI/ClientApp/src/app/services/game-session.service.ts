import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

import { BaseDtoResponse, CreateGame, GameSession } from '@models';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GameSessionService {
  private apiUrl = `${environment.API_BASE_URL}/api/gamesession`;

  constructor(private http: HttpClient) { }

  public createGame(model: CreateGame): Observable<BaseDtoResponse<GameSession>> {
    return this.http.post<BaseDtoResponse<GameSession>>(`${this.apiUrl}`, model);
  }

  public getGameById(id: string): Observable<BaseDtoResponse<GameSession>> {
    return this.http.get<BaseDtoResponse<GameSession>>(`${this.apiUrl}/${id}`);
  }

  public deleteGame(id: string): Observable<BaseDtoResponse<GameSession>> {
    return this.http.delete<BaseDtoResponse<GameSession>>(`${this.apiUrl}/${id}`);
  }

  //list games
  public listGames(): Observable<BaseDtoResponse<GameSession[]>> {
    return this.http.get<BaseDtoResponse<GameSession[]>>(`${this.apiUrl}`);
  }
  
}

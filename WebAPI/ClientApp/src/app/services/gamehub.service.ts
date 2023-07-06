import { Inject, Injectable } from '@angular/core';
import { HubConnection, HubConnectionBuilder, LogLevel } from '@microsoft/signalr';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { NOTIFICATION_SERV_TOKEN, NotificationService } from './notification.service';

@Injectable({
  providedIn: 'root'
})
export class GamehubService {
  private hubConnection!: HubConnection;
  private apiUrl = `${environment.API_BASE_URL}`;
  constructor(
    @Inject(NOTIFICATION_SERV_TOKEN) private notifier: NotificationService

  ) { }

  public async initiateSignalR(): Promise<void> {
    try {
      this.hubConnection = new HubConnectionBuilder()
      .withUrl(`${this.apiUrl}/gamehub`, { accessTokenFactory: () => localStorage.getItem('token') as string })
      .withAutomaticReconnect()
      .configureLogging(LogLevel.Information)
      .build();

      await this.hubConnection.start();
      this.registerHandlers();
      console.log(`SignalR connection success! connectionId: ${this.hubConnection.connectionId}`);
    }
    catch(err) {
      console.error('SignalR Connection Error: ', err);
    }
  }


  private registerHandlers() {
    this.hubConnection.onreconnected(() => {
      console.log('SignalR reconnected');
    })
    this.hubConnection.onclose(() => {
      console.log('SignalR connection closed');
      this.onDisconnected(); // Trigger onDisconnected method when the connection is closed
    });

    this.hubConnection.on('ConnectionIdReceived', (message: string) => {
      console.log('Received ConnectionId for User: ', message);
      // Handle the received message
      localStorage.setItem('connectionId', message);
    });

    this.hubConnection.on('PlayerJoined', (message: string) => {
      console.log('Participant added: ', message);
      if (localStorage.getItem('userName') !== message) {
        this.notifier.successNotification(`New player Joined: ${message}`);
      }
      // Handle the received message
    });

    this.hubConnection.on('PlayerLeft', (message: string) => {
      console.log('Participant left: ', message);
      if (localStorage.getItem('userName') !== message) {
        this.notifier.errorNotification(`Player Left: ${message}`);
      }
      // Handle the received message
    });

    // Other event handlers can be added here
  }

  public addParticipant(gameId: string) {
    this.hubConnection.invoke('JoinGame', gameId)
        .then((response) => {
          console.log('Participant added:', response);
        })
        .catch((error) => {
          console.error('Error adding participant:', error);
        });
  }

  private onDisconnected() {
    // Perform any necessary actions when the SignalR connection is closed
    // For example, clear data, display a message, etc.
    localStorage.removeItem('connectionId');
  }

}

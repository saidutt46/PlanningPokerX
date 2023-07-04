export class GameSession {
    id!: string;
    gameName!: string;
    sessionCreatorId!: string;
    created!: Date;
    modified!: Date;
}

export class CreateGame {
    applicationUserId!: string;
    connectionId!: string;
    gameName!: string;
    spectator!: boolean;
}

export enum VotingSystemTypes {
    Fibonacci = 0,
    TShirt = 1
}

export class OwnerSettingsType {
    key!: string;
    value!: any;
}
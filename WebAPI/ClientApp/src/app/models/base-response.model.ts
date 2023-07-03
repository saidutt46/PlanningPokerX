export class BaseDtoListResponse<T> {
    payload: T[] = [];
    messageDateTime!: Date;
    error!: string;
    success: boolean = false;
  }
  
  export class BaseDtoResponse<T> {
    payload!: T;
    messageDateTime!: Date;
    error!: string;
    success: boolean = false;
  }
  
  export class AuthBaseResponse {
    success: boolean = false;
    status!: string;
    message!: string;
    errors: string[] = [];
  }
import { UserProfileModel } from "./user.model";

export class UserRegistrationModel {
    userName!: string;
    password!: string;
}

export class UserLoginModel {
    userName!: string;
    password!: string;
}

export class LoginResponseModel {
    token!: string;
    expiration!: Date;
    userProfile: UserProfileModel = new UserProfileModel;
}
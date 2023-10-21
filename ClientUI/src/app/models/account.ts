export interface RegisterRequest {
    email: string;
    userName: string;
    password: string;
    passwordConfirmation: string;
}

export interface LoginRequest {
    email: string;
    password: string;
}

export interface AccountResponse {
    userName: string;
    token: string;
}

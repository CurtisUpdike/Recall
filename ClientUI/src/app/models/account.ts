export interface RegisterRequest {
    email: string;
    username: string;
    password: string;
    passwordConfirmation: string;
}

export interface LoginRequest {
    email: string;
    password: string;
}

export interface User {
    username: string;
    token: string;
}

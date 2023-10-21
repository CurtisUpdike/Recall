import axios, { AxiosError, AxiosResponse } from "axios";
import {
    AccountResponse,
    LoginRequest,
    RegisterRequest,
} from "../models/account";

axios.defaults.baseURL = "http://localhost:5000/api";

axios.interceptors.response.use(simulateNetworkLatency, handleResponseError);

async function simulateNetworkLatency(response: AxiosResponse) {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return response;
}

function handleResponseError(error: AxiosError) {
    switch (error.status) {
        case 400:
            console.log("unspecified error");
            break;
        case 401:
            console.log("unauthorized");
            break;
        case 403:
            console.log("forbidden");
            break;
        case 404:
            console.log("not found");
            break;
        case 500:
            console.log("server error");
            break;
    }
}

const response = <T>(response: AxiosResponse<T>) => response.data;

const requests = {
    get: <T>(url: string) => axios.get<T>(url).then(response),
    post: <T>(url: string, body: {}) => axios.post<T>(url, body).then(response),
    put: <T>(url: string, body: {}) => axios.put<T>(url, body).then(response),
    delete: <T>(url: string) => axios.delete<T>(url).then(response),
};

const Account = {
    register: (request: RegisterRequest) =>
        requests.post<AccountResponse>("/register", request),
    login: (request: LoginRequest) =>
        requests.post<AccountResponse>("/login", request),
};

const agent = {
    Account,
};

export default agent;

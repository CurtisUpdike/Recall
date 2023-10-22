import axios, { AxiosError, AxiosResponse } from "axios";
import { User, LoginRequest, RegisterRequest } from "../models/account";
import { store } from "../stores/store";

axios.defaults.baseURL = "http://localhost:5000/api";

axios.interceptors.request.use((config) => {
    const token = store.commonStore.token;
    if (token && config.headers)
        config.headers.Authorization = `Bearer ${token}`;
    return config;
});

axios.interceptors.response.use(simulateNetworkLatency, handleResponseError);

async function simulateNetworkLatency(response: AxiosResponse) {
    await new Promise((resolve) => setTimeout(resolve, 5000));
    return response;
}

function handleResponseError(error: AxiosError) {
    const { data, status } = error.response as AxiosResponse;

    switch (status) {
        case 400:
            if (data.errors) {
                const modelStateErrors = [];
                for (const key in data.errors)
                    if (data.errors[key])
                        modelStateErrors.push(data.errors[key]);
                throw modelStateErrors.flat();
            } else {
                console.log("unspecified error");
            }
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
        requests.post<User>("/account/register", request),
    login: (request: LoginRequest) =>
        requests.post<User>("/account/login", request),
    currentUser: () => requests.get<User>("/account"),
};

const agent = {
    Account,
};

export default agent;

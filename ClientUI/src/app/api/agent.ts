import axios, { AxiosError, AxiosResponse } from "axios";
import { User, LoginRequest, RegisterRequest } from "../models/account";
import { store } from "../stores/store";
import { router } from "../router/routes";
import { toast } from "../common/toast/toaster";

axios.defaults.baseURL = "http://localhost:5000/api";

axios.interceptors.request.use((config) => {
    const token = store.commonStore.token;
    if (token && config.headers)
        config.headers.Authorization = `Bearer ${token}`;
    return config;
});

axios.interceptors.response.use(simulateNetworkLatency, handleResponseError);

async function simulateNetworkLatency(response: AxiosResponse) {
    await new Promise((resolve) => setTimeout(resolve, 1000));
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
            } else if (data) {
                toast.error(data);
            } else {
                router.navigate("/not-found");
            }
            break;
        case 401:
            toast.error("Unauthorized");
            break;
        case 403:
            toast.error("Forbidden");
            break;
        case 404:
            router.navigate("/not-found");
            break;
        case 500:
            store.commonStore.setServerError(data);
            router.navigate("/server-error");
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

const Decks = {
    all: () => requests.get<Deck[]>("/decks"),
    create: (deck: DeckRequest) => requests.post<Deck>("/decks", deck),
    update: (deck: Deck) => requests.put<Deck>(`/decks/${deck.id}`, deck),
    delete: (deck: Deck) => requests.delete<void>(`/decks/${deck.id}`),
};

const agent = {
    Account,
    Decks,
};

export default agent;

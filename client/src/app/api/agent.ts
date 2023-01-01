import axios, { AxiosError, AxiosResponse } from "axios";
import { toast } from "react-toastify";
import { history } from "../..";
import { PaginatedResponse } from "../models/pagination";
import { store } from "../store/configureStore";

const sleep = () => new Promise(resolve => setTimeout(resolve, 500));

axios.defaults.baseURL = 'http://localhost:5207/api/';
axios.defaults.withCredentials = true;

const responseBody = (response: AxiosResponse) => response.data;

axios.interceptors.request.use(config => {
    const token = store.getState().account.user?.token;
    // if (token) config.headers!.Authorization = `Bearer ${token}`;
    if (token) axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    return config;
})

axios.interceptors.response.use(async response => {
    await sleep();
    const pagination = response.headers["pagination"]; //lowercase only
    if (pagination) {
        response.data = new PaginatedResponse(response.data, JSON.parse(pagination));
        return response;
    }
    return response;
}, (error: AxiosError) => {
    console.log("Error caught by Axios Interceptors");
    const { data, status } = error.response as any;
    switch (status) {
        case 400:
            if (data.errors) {
                const modelStateErrors: string[] = [];
                for (const key in data.errors) {
                    if (data.errors[key]) {
                        modelStateErrors.push(data.errors[key])
                    }
                }
                throw modelStateErrors.flat();
            }
            toast.error(data.title);
            break;
        case 401:
            toast.error(data.title);
            history.push({
                pathname: "/account/login",
                // state:{error:data}
            });
            return;
        case 403:
            toast.error(data.title);
            history.push({
                pathname: "/account/login",
                // state:{error:data}
            });
            return;
        case 404:
            toast.error(data.title);
            break;
        case 500:
            history.push({
                pathname: "/server-error",
                // state:{error:data}
            });
            toast.error(data.title);
            break;
        default:
            break;
    }
    return Promise.reject(error);
})

const requests = {
    get: (url: string, params?: URLSearchParams) => axios.get(url, { params }).then(responseBody),
    post: (url: string, body: {}) => axios.post(url, body).then(responseBody),
    put: (url: string, body: {}) => axios.put(url, body).then(responseBody),
    delete: (url: string) => axios.delete(url).then(responseBody),
    postForm: (url: string, data: FormData) => axios.post(url, data, {
        headers: { "Content-type": "application/json" }
    }).then(responseBody),
    putForm: (url: string, data: FormData) => axios.put(url, data, {
        headers: { "Content-type": "application/json" }
    }).then(responseBody),
}

const Admin = {
    createStudent: (product: any) => requests.postForm("Students", createFormData(product)),
    updateStudent: (product: any) => requests.putForm("Students", createFormData(product)),
    deleteStudent: (id: number) => requests.delete(`Students/${id}`),
    createCourse: (product: any) => requests.postForm("Courses", createFormData(product)),
    updateCourse: (product: any) => requests.putForm("Courses", createFormData(product)),
    deleteCourse: (id: number) => requests.delete(`Courses/${id}`),
    createCourseMatch: (product: any) => requests.postForm("CourseMatches", createFormData(product)),
    updateCourseMatch: (product: any) => requests.putForm("CourseMatches", createFormData(product)),
    deleteCourseMatch: (id: number) => requests.delete(`CourseMatches/${id}`),
}

function createFormData(item: any) {
    let formData = new FormData();
    for (const key in item) {
        formData.append(key, item[key])
    }
    return formData;
}

const Student = {
    list: (params: URLSearchParams) => requests.get('students', params),
    details: (id: number) => requests.get(`students/${id}`),
}

const Course = {
    list: (params: URLSearchParams) => requests.get('courses', params),
    details: (id: number) => requests.get(`courses/${id}`),
}

const CourseMatch = {
    list: (params: URLSearchParams) => requests.get('courseMatches', params),
    details: (id: number) => requests.get(`courseMatches/${id}`),
}

const TestErrors = {
    get400Error: () => requests.get('buggy/bad-request'),
    get401Error: () => requests.get('account/login'),
    get403Error: () => requests.get('account/login'),
    get404Error: () => requests.get('buggy/not-found'),
    get500Error: () => requests.get('buggy/server-error'),
    getValidationError: () => requests.get('buggy/validation-error'),
}

const Account = {
    login: (values: any) => requests.post('account/login', values),
    register: (values: any) => requests.post('account/register', values),
    currentUser: () => requests.get('account/currentUser'),
}

const agent = {
    Student,
    Course,
    CourseMatch,
    Admin,
    TestErrors,
    Account
}

export default agent;
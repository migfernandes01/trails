import axios, { AxiosRequestConfig } from 'axios';
import { FormData } from '../components/Auth/Auth';
import { ISearch } from '../redux/actions/trails';

// interface to describe a Trail (that we get back when we fetch trails)
export interface Trail {
    _id?: number;
    title: string;
    description: string;
    authorId?: string;
    author: string;
    tags: string[];
    selectedFile: string;
    likes?: string[];
    createdAt?: Date
};

// create instance of API
const API = axios.create({ baseURL: 'http://localhost:5000' });

// assign auth bearer token to req headers if user is logged in
API.interceptors.request.use((req: AxiosRequestConfig): AxiosRequestConfig => {
    // get profile from localstorage
    const localStorageProfile = localStorage.getItem('profile');
    // if profile exists in local storage
    if(localStorageProfile) {
        // create bearer token in request headers
        req.headers.authorization = `Bearer ${JSON.parse(localStorageProfile).token}`
    }
    // return request
    return req;
})

// function to make a GET request (returns array of type Trail)(with url)
export const fetchTrails = (page: number | string) => API.get<Trail[]>(`/trails?page=${page}`);

// function to make a GET request (returns Trail)(with url)
export const fetchTrail = (id: string) => API.get<Trail>(`/trails/${id}`);

// function to make a GET request (returns array of type Trail)(with url)
export const fetchTrailsBySearch = (searchQuery: ISearch) => API.get<Trail[]>(`/trails/search?search=${searchQuery.search || 'none'}&tags=${searchQuery.tags}`)

// function to make a POST request with url and a new Trail
export const createTrail = (newTrail: Trail) => API.post('/trails', newTrail);

// function to make a PATCH to (/trails/:id) request with an updated Trail
export const updateTrail = (id: any, trail: Trail) => API.patch(`/trails/${id}`, trail);

// function to make a DELETE to (/trails/:id)
export const deleteTrail = (id: number) => API.delete(`/trails/${id}`);

// function to make a PATCH to (/trails/:id/likeTrail)
export const likeTrail = (id: number) => API.patch(`/trails/${id}/likeTrail`);


// function to make a POST to (/users/signin)
export const signin = (formData: FormData) => API.post('/user/signin', formData);

// function to make a POST to (/users/signup)
export const signup = (formData: FormData) => API.post('/user/signup', formData);
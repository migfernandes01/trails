import axios from 'axios';

// interface to describe a Trail (that we get vack when we fetch trails)
export interface Trail {
    _id?: number;
    title: string;
    description: string;
    author: string;
    tags: string[];
    selectedFile: string;
    likeCount?: number;
    createdAt?: Date
}

// api url
const url = 'http://localhost:5000/trails';

// function to make a GET request (returns array of type Trail)(with url)
export const fetchTrails = () => axios.get<Trail[]>(url);

// function to make a POST request with url and a new Trail
export const createTrail = (newTrail: Trail) => axios.post(url, newTrail);

// function to make a PATCH to (/trails/:id) request with an updated Trail
export const updateTrail = (id: any, trail: Trail) => axios.patch(`${url}/${id}`, trail);
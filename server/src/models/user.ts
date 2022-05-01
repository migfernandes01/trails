import mongoose from "mongoose";

// new User interface to describe Schema to be created
export interface User {
    id: string;
    name: string;
    email: string;
    password: string;
}

// create new Schema using the interface User
const userSchema = new mongoose.Schema<User>({
    id: { type: String },
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
});

// create and export a new model, using the User interface and User Schema
export const User = mongoose.model<User>('User', userSchema);
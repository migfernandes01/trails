import mongoose from "mongoose";

// new Trail interface to describe Schema to be created
interface Trail {
    title: string;
    description: string;
    author: string;
    authorId: string;
    tags: string[];
    selectedFile: string;
    likes: string[];
    createdAt: Date;
    comments: string[]
}

// create new Schema using the interface trail
const trailSchema = new mongoose.Schema<Trail>({
    title: String,
    description: String,
    author: String,
    authorId: String,
    tags: [String],
    selectedFile: String,
    likes: {
        type: [String],
        default: []
    },
    createdAt: {
        type: Date,
        default: new Date(),
    },
    comments: {
        type: [String],
        default: []
    }
});

// create and export a new model, using the Trail interface and trail Schema
export const Trail = mongoose.model<Trail>('Trail', trailSchema);
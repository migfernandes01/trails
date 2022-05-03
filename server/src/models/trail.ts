import mongoose from "mongoose";

// new Trail interface to describe Schema to be created
interface Trail {
    title: string;
    description: string;
    author: string;
    tags: string[];
    selectedFile: string;
    likes: string[];
    createdAt: Date;
}

// create new Schema using the interface trail
const trailSchema = new mongoose.Schema<Trail>({
    title: String,
    description: String,
    author: String,
    tags: [String],
    selectedFile: String,
    likes: {
        type: [String],
        default: []
    },
    createdAt: {
        type: Date,
        default: new Date(),
    }
});

// create and export a new model, using the Trail interface and trail Schema
export const Trail = mongoose.model<Trail>('Trail', trailSchema);
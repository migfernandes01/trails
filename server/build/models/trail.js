import mongoose from "mongoose";
// create new Schema using the interface trail
const trailSchema = new mongoose.Schema({
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
    }
});
// create and export a new model, using the Trail interface and trail Schema
export const Trail = mongoose.model('Trail', trailSchema);

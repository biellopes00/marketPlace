import { UploadResponse } from 'imagekit/dist/libs/interfaces/UploadResponse';
import { Model, model, models, Schema } from 'mongoose'

export type Ad = {
    title: string;
    price: number;
    category: string;
    description: string;
    contact: string;
    files: UploadResponse[];
    location: {
        lat: number;
        lng: number;
    },
    userEmail: string;
};

const adSchema = new Schema<Ad>({
    title: String,
    price: Number,
    category: String,
    description: String,
    contact: String,
    files: [Object],
    location: Object,
    userEmail: { type: String, required: true },
}, {
    timestamps: true
})

export const AdModel = (models?.Ad) as Model<Ad> || model('Ad', adSchema) 
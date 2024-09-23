import { faCar, faHome, faMobile, faTShirt } from "@fortawesome/free-solid-svg-icons";
import mongoose from "mongoose";

export async function connect() {
    return mongoose.connect(process.env.MONGODB_URL as string)
}

export const categories = [
    { key: 'cars', label: 'Cars', icon: faCar },
    { key: 'electronics', label: 'Electronics', icon: faMobile },
    { key: 'clothes', label: 'Clothes', icon: faTShirt },
    { key: 'properties', label: 'Properties', icon: faHome },

]

export const defaultRadius = 50 * 1000;

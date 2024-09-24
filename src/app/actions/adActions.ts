'use server'

import { AdModel } from "@/models/Ad";
import mongoose from "mongoose";
import { getServerSession } from "next-auth";
import { authOption } from "../api/auth/[...nextauth]/route";
import { revalidatePath } from "next/cache";

async function connect() {
    return mongoose.connect(process.env.MONGODB_URL as string)

}

export async function createAd(formData: FormData) {
    const { files, location, ...data } = Object.fromEntries(formData);
    await connect();
    const session = await getServerSession(authOption)
    const newAdData = {
        ...data,
        files: JSON.parse(files as string),
        location: JSON.parse(location as string),
        userEmail: session?.user?.email
    }

    const newAdDoc = await AdModel.create(newAdData)
    return JSON.parse(JSON.stringify(newAdDoc));
}

export async function updateAd(formData: FormData) {
    const { _id, files, location, ...data } = Object.fromEntries(formData);
    await connect();
    const session = await getServerSession(authOption)
    const adDoc = await AdModel.findById(_id);
    if (!adDoc || adDoc?.userEmail !== session?.user?.email) {
        return;
    }
    const adData = {
        ...data,
        files: JSON.parse(files as string),
        location: JSON.parse(location as string),
    }

    const newAdDoc = await AdModel.findByIdAndUpdate(_id, adData);
    revalidatePath(`/ad` + _id)
    return JSON.parse(JSON.stringify(newAdDoc));
}
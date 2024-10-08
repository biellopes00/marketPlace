'use server'

import { getServerSession } from "next-auth"
import { authOption } from "../api/auth/[...nextauth]/route"
import { connect } from "@/libs/helpers";
import { AdModel } from "@/models/Ad";
import AdItem from "@/components/AdItem";

export default async function MyAdsPage() {
    const session = await getServerSession(authOption);
    const email = session?.user?.email;
    if (!email) {
        return 'no email found'
    }
    await connect();
    const adsDocs = await AdModel.find({ userEmail: email })
    return (
        <div className="container my-8 mx-auto">
            <h1 className="text-2xl bold mb-4">Your ads</h1>
            <div className="grid grid-cols-4 gap-x-2 gap-y-4">
                {adsDocs?.map(ad => (
                    <AdItem ad={ad} key={ad.id} />
                ))}
            </div>
        </div>
    )
}
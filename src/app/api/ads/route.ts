import { createAd } from "@/app/actions/adActions";
import { connect } from "@/libs/helpers";
import { AdModel } from "@/models/Ad";

export async function GET() {
    await connect();
    const adDocs = await AdModel.find({}, null, { sort: { createAd: -1 } });
    return Response.json(adDocs)
}
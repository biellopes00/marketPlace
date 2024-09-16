import { createAd } from "@/app/actions/adActions";
import { connect } from "@/libs/helpers";
import { Ad, AdModel } from "@/models/Ad";
import { FilterQuery } from "mongoose";

export async function GET(req: Request, res: Response) {
    await connect();
    const { searchParams } = new URL(req.url)

    const phrase = searchParams.get('phrase');

    const filter: FilterQuery<Ad> = {};
    if (phrase) {
        filter.title = { $regex: '.*' + phrase + '.*', $options: 'i' };
    }
    const adDocs = await AdModel.find(filter, null, { sort: { createAd: -1 } });
    return Response.json(adDocs)
}
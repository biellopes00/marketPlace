import { createAd } from "@/app/actions/adActions";
import { connect } from "@/libs/helpers";
import { Ad, AdModel } from "@/models/Ad";
import { FilterQuery } from "mongoose";

export async function GET(req: Request, res: Response) {
    await connect();
    const { searchParams } = new URL(req.url)

    const phrase = searchParams.get('phrase');
    const category = searchParams.get('category');
    const min = searchParams.get('min');
    const max = searchParams.get('max');

    const filter: FilterQuery<Ad> = {};
    if (phrase) {
        filter.title = { $regex: '.*' + phrase + '.*', $options: 'i' };
    }
    if (category) {
        filter.category = category;
    }




    if (min && !max) filter.price = { $gte: min }
    if (max && !min) filter.price = { $lte: max }
    if (min && max) filter.price = { $gte: min, $lte: max }


    const adDocs = await AdModel.find(filter, null, { sort: { createAd: -1 } });
    return Response.json(adDocs)
}
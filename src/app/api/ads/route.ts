import { connect } from "@/libs/helpers";
import { Ad, AdModel } from "@/models/Ad";
import { FilterQuery, PipelineStage } from "mongoose";

export async function GET(req: Request, res: Response) {
    await connect();
    const { searchParams } = new URL(req.url)

    const phrase = searchParams.get('phrase');
    const category = searchParams.get('category');
    const min = searchParams.get('min');
    const max = searchParams.get('max');
    const radius = searchParams.get('radius');
    const center = searchParams.get('center');

    const filter: FilterQuery<Ad> = {};
    const aggregationSteps: PipelineStage[] = []

    if (phrase) {
        filter.title = { $regex: '.*' + phrase + '.*', $options: 'i' };
    }
    if (category) {
        filter.category = category;
    }




    if (min && !max) filter.price = { $gte: min }
    if (max && !min) filter.price = { $lte: max }
    if (min && max) filter.price = { $gte: min, $lte: max }
    if (radius && center) {
        const coords = center.split('-')
        aggregationSteps.push(
            {
                $geoNear: {
                    near: { type: 'Point', coordinates: [parseFloat(coords[0]), parseFloat(coords[1])] },
                    distanceField: 'distance',
                    maxDistance: parseFloat(radius),
                    spherical: true
                },
            }
        );

    }

    aggregationSteps.push({
        $match: filter,
    });
    aggregationSteps.push({
        $sort: { createdAt: -1 }
    })

    const adDocs = await AdModel.aggregate(aggregationSteps)
    return Response.json(adDocs)
}
'use client'
import Link from "next/link";
import UploadThumbnail from "./UploadThumbnail";
import { Ad } from "@/models/Ad";
import { formatMoney } from "@/libs/helpers";

export default function AdItem({ad}:{ad:Ad}){
    return(
        <div className="min-h-24 flex flex-col justify-start">
              {ad.files?.length > 0 && (
                <div className="rounded-md overflow-hidden relative">
                  <UploadThumbnail onClick={() => { }} file={ad.files[0]} />
                  <Link href={`/ad/${ad._id}`} className="absolute inset-0"></Link>
                </div>
              )}
              <div>
                <p className="mt-1 font-bold">{formatMoney(ad.price)}</p>
                <Link href={`/ad/${ad._id}`}>{ad.title}</Link>
              </div>
            </div>
    )
}
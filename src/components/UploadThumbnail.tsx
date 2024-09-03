/* eslint-disable @next/next/no-img-element */
import { UploadResponse } from "imagekit/dist/libs/interfaces";

export default function UploadThumbnail({ file }: { file: UploadResponse }) {
    if (file.fileType === 'image') {
        return (
            // eslint-disable-next-line react/jsx-no-comment-textnodes
            <a href={file.url} target="_blank">
                <img src={file.url + '?tr=w-100,h-100,fo-auto'} alt="thumbnail" />
            </a>

        )
    }
    return (
        <div>{file.url} &raqup;</div>
    )
}
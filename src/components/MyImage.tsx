'use client'
import Image, { ImageProps } from "next/image";

type LoaderProps = {
    src: string;
    height?: number;
    width: number;
    quality?: number | undefined;
    aiCrop?: boolean;
}

const imagekitLoader = ({ src, width, height, quality, aiCrop }: LoaderProps) => {
    if (src[0] === "/") src = src.slice(1);
    const params = [`w-${width}`];
    if (quality) {
        params.push(`q-${quality}`)
    }
    if (height && aiCrop) {
        params.push(`h-${height}`)
    }
    if (aiCrop) {
        params.push('fo-auto')
    }
    const paramsString = params.join(",");
    var urlEndpoint = process.env.NEXT_PUBLIC_IK_PUBLIC_ENDPOINT as string;
    if (urlEndpoint[urlEndpoint.length - 1] === "/") urlEndpoint = urlEndpoint.substring(0)
    return `${urlEndpoint}/${src}?tr=${paramsString}`
}

type MyImageProps = ImageProps & {
    aiCrop?: boolean;
    height?: number;
    width: number;
}

const MyImage = ({ width, height, aiCrop, ...props }: MyImageProps) => {
    return (
        // eslint-disable-next-line jsx-a11y/alt-text
        <Image
            loader={args => imagekitLoader({
                ...args,
                height,
                aiCrop,
                width
            })}
            width={width}
            height={height}
            {...props}
        />
    )
}
export default MyImage;
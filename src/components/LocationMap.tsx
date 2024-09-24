'use client'
import { createRef, HTMLAttributes, useEffect } from "react"
import { Location } from "./LocationPicker";
import { Loader } from "@googlemaps/js-api-loader";


type Props = HTMLAttributes<HTMLDivElement> & {
    location: Location
}
export default function LocationMap({ location, ...divProps }: Props) {
    const mapsDivRef = createRef<HTMLDivElement>();


    useEffect(() => {
        loadMap()
    }, [])

    async function loadMap() {
        const loader = new Loader({
            apiKey: process.env.NEXT_PUBLIC_MAPS_KEY as string
        });
        const { Map } = await loader.importLibrary('maps')
        const { AdvancedMarkerElement } = await loader.importLibrary('marker')
        const map = new Map(mapsDivRef.current as HTMLDivElement, {
            mapId: 'map',
            center: location,
            zoom: 7,
            mapTypeControl: false,
            streetViewControl: false,
            zoomControl: true,
        });
        new AdvancedMarkerElement({
            map,
            position: location,
        })
    }

    return (
        <>
            <div {...divProps} ref={mapsDivRef}></div>
        </>
    )
}
'use client';
import AdTextInput from "@/components/AdTextInputs";
import LocationPicker, { Location } from "@/components/LocationPicker";
import UploadArea from "@/components/UploadArea";
import { faLocationCrosshairs } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { UploadResponse } from "imagekit/dist/libs/interfaces";
import { useState } from "react";
import { createAd } from "../actions/adActions";
import SubmitButton from "@/components/SubmitButton";
import { redirect } from "next/navigation";


const locationDefault = {
    lat: 59.432226005726896,
    lng: 18.057839558207103
}

export default function NewAdPage() {
    const [files, setFiles] = useState<UploadResponse[]>([]);
    const [location, setLocation] = useState<Location>(locationDefault);
    const [gpsCoords, setGpsCoords] = useState<Location | null>(null);


    function handleFindMyPositionClick() {
        navigator.geolocation.getCurrentPosition(ev => {
            const location = { lat: ev.coords.latitude, lng: ev.coords.longitude }
            setLocation(location)
            setGpsCoords(location)
        });
    }

    async function handleSubmit(formData: FormData) {
        formData.set('location', JSON.stringify(location));
        formData.set('files', JSON.stringify(files));
        const result = await createAd(formData);
        redirect('/ad/'+result._id)
    }

    return (
        <form
            action={handleSubmit}
            className="max-w-xl mx-auto grid grid-cols-2 gap-12">
            <div className="grow pt-8">
                <UploadArea
                    files={files}
                    setFiles={setFiles}
                />
                <div className="mt-8">
                    <div className="flex justify-between items-center mb-1">
                        <label className="mt-0 mb-0">Where</label>
                        <div>
                            <button
                                type="button"
                                onClick={handleFindMyPositionClick}
                                className="flex items-center gap-1  py-1 justify-center rounded">

                                <FontAwesomeIcon icon={faLocationCrosshairs} />
                            </button>
                        </div>

                    </div>

                    <div className="border bg-gray-100  rounded overflow-hidden text-gray-400 text-center">
                        <LocationPicker
                            gpsCoords={gpsCoords}
                            defaultLocation={locationDefault}
                            onChange={location => setLocation(location)}
                        />
                    </div>
                </div>
            </div>

            <div className="grow pt-2">
                <AdTextInput />
                <SubmitButton>Publish</SubmitButton>
            </div>
        </form>
    )
}
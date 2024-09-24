'use client'
import { UploadResponse } from "imagekit/dist/libs/interfaces";
import { useState } from "react";
import UploadArea from "./UploadArea";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import LocationPicker, { Location } from "./LocationPicker";
import AdTextInput, { AdTexts } from "./AdTextInputs";
import SubmitButton from "./SubmitButton";
import { faLocationCrosshairs } from "@fortawesome/free-solid-svg-icons";
import { redirect } from "next/navigation";
import { createAd, updateAd } from "@/app/actions/adActions";


type Props = {
    id?: string | null;
    defaultFiles?: UploadResponse[];
    defaultLocation: Location;
    defaultTexts?: AdTexts;
}

export default function AdForm({
    id = null,
    defaultFiles = [],
    defaultLocation,
    defaultTexts = {}
}: Props) {
    const [files, setFiles] = useState<UploadResponse[]>(defaultFiles);
    const [location, setLocation] = useState<Location>(defaultLocation);
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
        if (id) {
            formData.set('_id', id)
        }
        const result = id
            ? await updateAd(formData)
            : await createAd(formData);
        redirect('/ad/' + result._id)
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
                            defaultLocation={defaultLocation}
                            onChange={location => setLocation(location)}
                        />
                    </div>
                </div>
            </div>

            <div className="grow pt-2">
                <AdTextInput defaultValues={defaultTexts} />
                <SubmitButton>{id ? 'save' : 'publish'}</SubmitButton>
            </div>
        </form>
    )
}
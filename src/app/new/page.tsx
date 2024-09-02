import Uploader from "@/components/Uploader"
import { faImage, faLocationCrosshairs, faPhotoFilm, faPlus } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
export default function NewAdPage() {
    return (
        <form action="" className="max-w-xl mx-auto flex gap-12">

            <div className="grow pt-8">
                <div className="bg-gray-100 p-4 rounded">
                    <h2 className="text-center text-xs text-gray-400 uppercase font-bold">
                        Add photos of your products:
                    </h2>
                    <div className="flex flex-col">
                        <FontAwesomeIcon icon={faImage} className="h-24 text-gray-300" />
                        <button className="mt-2 border border-blue-600 text-blue-600 px-4 py-2 rounded inline-flex gap-1 items-center justify-center">
                            <FontAwesomeIcon icon={faPlus} />
                           <Uploader />
                        </button>
                    </div>
                </div>
                <div className="mt-4">
                    <label htmlFor="">Where is it located?</label>
                    <button className="w-full flex items-center gap-1 py-1 justify-center border border-blue-600 text-blue-600 rounded">
                        <FontAwesomeIcon icon={faLocationCrosshairs} />
                        <span>Share current location</span>
                    </button>
                    <div className="mt-2 bg-gray-100 p-4 min-h-12 rounded text-gray-400 text-center">
                        google maps here
                    </div>
                </div>
            </div>

            <div className="grow pt-2">
                <label htmlFor="titleIn">Title</label>
                <input id="titleIn" type="text" placeholder="title" />

                <label htmlFor="priceInput">Price</label>
                <input id="priceInput" type="number" placeholder="price" />

                <label htmlFor="categoryIn">Category</label>
                <select name="" id="categoryIn">
                    <option selected disabled value="">Select a category</option>
                    <option value="">Cars</option>
                    <option value="">Eletronics</option>
                    <option value="">Properties</option>
                </select>

                <label htmlFor="descriptionIn">Description</label>
                <textarea name="" id="descriptionIn" placeholder="description">
                </textarea>

                <label htmlFor="contactIn">Contact information</label>
                <textarea name="" id="contactIn" placeholder="mobile"></textarea>
                <button className="bg-blue-600 text-white px-4 py-2 rounded mt-2">
                    Publish
                </button>
            </div>
        </form>
    )
}
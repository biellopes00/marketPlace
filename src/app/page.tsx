'use client'
import AdItem from "@/components/AdItem";
import { categories } from "@/libs/helpers";
import { Ad } from "@/models/Ad";
import { faStore } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useRef, useState } from "react";

export default function Home() {
  const [ads, setAds] = useState<Ad[]>([]);
  const formRef = useRef<HTMLFormElement | null>(null)

  useEffect(() => {
    fetchAds();
  }, [])


  function fetchAds(params?: URLSearchParams) {
    const url = `/api/ads?${params?.toString() || ''}`;

    fetch(url).then(response => {
      response.json().then(adDocs => {
        setAds(adDocs);
      })
    })
  }

  function handleSearch(formData: FormData) {
    const params = new URLSearchParams()
    formData && formData.forEach((value, key) => {
      if (typeof value === 'string') {
        params.set(key, value)
      }
    })

    fetchAds(params);
  }


  return (
    <div className="flex w-full">
      <form
        ref={formRef}
        action={handleSearch}
        className="bg-white grow w-1/4 p-4 border-r flex flex-col gap-3">
        <input name="phrase" type="text" placeholder="Search Marketplace" />
        <div className="flex flex-col gap-0">
          <label
            onClick={() => { }}
            className="radio-btn group">
            <input onClick={() => formRef.current?.requestSubmit()} className="hidden" type="radio" name="category" value="" defaultChecked />
            <span className="icon">
              <FontAwesomeIcon icon={faStore} />
            </span>
            All categories
          </label>
          {categories.map(({ key, label, icon }) => (
            // eslint-disable-next-line react/jsx-key
            <label
              onClick={() => { }}
              className="radio-btn group">
              <span className="icon">
                <FontAwesomeIcon icon={icon} />
              </span>
              <input onClick={() => formRef.current?.requestSubmit()} className="hidden" type="radio" name="category" value={key} />
              {label}
            </label>
          ))}
        </div>
      </form>
      <div className="p-4 grow bg-gray-100 w-3/4">
        <h2 className="font-bold mt-2 mb-4">Latest products</h2>
        <div className="grid md:grid-cols-4 gap-x-4 gap-y-6">
          {ads.map(ad => (
            <AdItem ad={ad} key={ad._id} />
          ))}
        </div>

      </div>
    </div>
  );
}

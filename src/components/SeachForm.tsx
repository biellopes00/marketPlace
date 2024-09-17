import { useRef } from "react";
import LabelRadioButton from "./LabelRadioButton";
import SubmitButton from "./SubmitButton";
import { faStore } from "@fortawesome/free-solid-svg-icons";
import { categories } from "@/libs/helpers";


type Props = {
    action: (data: FormData) => void;
};

export default function SearchForm({ action }: Props) {


    const formRef = useRef<HTMLFormElement | null>(null)
    return (
        <form
            ref={formRef}
            action={action}
            className="bg-white grow w-1/4 p-4 border-r flex flex-col gap-3">
            <input name="phrase" type="text" placeholder="Search Marketplace" />
            <div className="flex flex-col gap-0">
                <LabelRadioButton
                    name={'category'}
                    value={''}
                    icon={faStore}
                    onClick={() => formRef.current?.requestSubmit()}
                    label={"All categories"}
                    defaultChecked={true}
                />
                {categories.map(({ key: categoryKey, label, icon }) => (
                    // eslint-disable-next-line react/jsx-key
                    <LabelRadioButton
                        name={'category'}
                        value={categoryKey}
                        icon={icon}
                        onClick={() => formRef.current?.requestSubmit()}
                        label={label}
                    />
                ))}
            </div>
            <div className="">
                <label htmlFor="">Filter by price</label>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <input name="min" type="number" placeholder="min" />
                    </div>
                    <div>
                        <input name="max" type="number" placeholder="max" />
                    </div>
                </div>
                <SubmitButton>Search</SubmitButton>

            </div>
        </form>
    )
}
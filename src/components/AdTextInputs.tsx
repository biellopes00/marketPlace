import { categories } from "@/libs/helpers";

export type AdTexts = {
    title?: string;
    price?: string|number;
    category?: string;
    description?: string;
    contact?: string;
}

type Props = {
    defaultValues: AdTexts;
}

export default function AdTextInput({ defaultValues }: Props) {
    return (
        <>
            <label htmlFor="titleIn">Title</label>
            <input
                name="title"
                id="titleIn"
                type="text"
                placeholder="title"
                defaultValue={defaultValues.title}
            />

            <label htmlFor="priceInput">Price</label>
            <input
                name="price"
                id="priceInput"
                type="number"
                placeholder="price"
                defaultValue={defaultValues.price}
            />

            <label htmlFor="categoryIn">Category</label>
            <select name="category" id="categoryIn" defaultValue={defaultValues.category}>
                <option disabled value="0">Select a category</option>
                {categories.map(({ key: categoryKey, label: categoryLabel }) => (
                    
                    <option value={categoryKey} key={categoryKey}>{categoryLabel}</option>
                ))}
            </select>

            <label htmlFor="descriptionIn">Description</label>
            <textarea
                name="description"
                id="descriptionIn"
                placeholder="description"
                defaultValue={defaultValues.description}></textarea>

            <label htmlFor="contactIn">Contact information</label>
            <textarea
                name="contact"
                id="contactIn"
                placeholder="mobile"
                defaultValue={defaultValues.contact}></textarea>
        </>
    )
}
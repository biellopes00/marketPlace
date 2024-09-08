export default function AdTextInput(){
    return(
        <>
            <label htmlFor="titleIn">Title</label>
                <input id="titleIn" type="text" placeholder="title" />

                <label htmlFor="priceInput">Price</label>
                <input id="priceInput" type="number" placeholder="price" />

                <label htmlFor="categoryIn">Category</label>
                <select name="" id="categoryIn" defaultValue="0">
                    <option disabled value="0">Select a category</option>
                    <option value="">Cars</option>
                    <option value="">Eletronics</option>
                    <option value="">Properties</option>
                </select>

                <label htmlFor="descriptionIn">Description</label>
                <textarea name="" id="descriptionIn" placeholder="description">
                </textarea>

                <label htmlFor="contactIn">Contact information</label>
                <textarea name="" id="contactIn" placeholder="mobile"></textarea>
        </>
    )
}
export default function AdTextInput(){
    return(
        <>
            <label htmlFor="titleIn">Title</label>
                <input  name="title" id="titleIn" type="text" placeholder="title" />

                <label htmlFor="priceInput">Price</label>
                <input name="price" id="priceInput" type="number" placeholder="price" />

                <label htmlFor="categoryIn">Category</label>
                <select name="category" id="categoryIn" defaultValue="0">
                    <option disabled value="0">Select a category</option>
                    <option value="cars">Cars</option>
                    <option value="electronics">Eletronics</option>
                    <option value="properties">Properties</option>
                </select>

                <label htmlFor="descriptionIn">Description</label>
                <textarea name="description" id="descriptionIn" placeholder="description">
                </textarea>

                <label htmlFor="contactIn">Contact information</label>
                <textarea name="contact" id="contactIn" placeholder="mobile"></textarea>
        </>
    )
}
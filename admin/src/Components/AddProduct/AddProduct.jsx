import React, { useState } from 'react'
import './AddProduct.css'
import upload_area from '../../assets/upload_area.svg'

export const AddProduct = () => {

    const [image,setImage] = useState(false);
    const [productDetails,setProductDetails] = useState({
        name:"",
        image:"",
        tag:"OFERTA DO DIA",
        new_price:"",
        old_price:"",
    });

    const imageHandler = (e) => {
        setImage(e.target.files[0]);
    }

    const ChangeHandler = (e) => {
        setProductDetails({...productDetails,[e.target.name]:e.target.value});
    }

    const Add_Product = async () => {
        console.log(productDetails);
        let responseData;
        let product = productDetails;

        let formData = new FormData();
        formData.append('product',image);

        await fetch('http://localhost:4000/upload',{
            method:'POST',
            headers:{
                Accept:'application/json',
            },
            body:formData,
        }).then((resp)=>resp.json()).then((data)=>{responseData=data})

        if(responseData.success){
            product.image = responseData.image_url;
            console.log(product);
            await fetch('http://localhost:4000/addproduct',{
                method:'POST',
                headers:{
                    Accept:'application/json',
                    'Content-Type':'application/json',
                },
                body:JSON.stringify(product),
            }).then((resp)=>resp.json()).then((data)=>{
                data.success?alert("Produto Adicionado"):alert("Failed")
            })
        }
    }

  return (
    <div className='add-product'>
        <div className="addproduct-itemfield">
            <p>Título do Produto</p>
            <input value={productDetails.name} onChange={ChangeHandler} type="text" name='name' placeholder='Digite Aqui'/>
        </div>
        <div className="addproduct-price">
            <div className="addproduct-itemfield">
                <p>Preço</p>
                <input value={productDetails.old_price} onChange={ChangeHandler} type="text" name='old_price' placeholder='Digite Aqui'/>
            </div>
            <div className="addproduct-itemfield">
                <p>Preço de Oferta</p>
                <input value={productDetails.new_price} onChange={ChangeHandler} type="text" name='new_price' placeholder='Digite Aqui'/>
            </div>
        </div>
        <div className="addproduct-itemfield">
                <p>Escolha a TAG</p>
                <select value={productDetails.tag} onChange={ChangeHandler} name="tag" className='add-product-selector'>
                    <option value="OFERTA DO DIA">Oferta do dia</option>
                    <option value="GAMES">Games</option>
                </select>
        </div>
        <div className="addproduct-itemfield">
            <label htmlFor="file-input">
                <img src={image?URL.createObjectURL(image):upload_area} className='addproduct-thumbnail-img' alt="" />
            </label>
            <input onClick={imageHandler} type="file" name='image' id='file-input' hidden/>
        </div>
        <button onClick={()=>{Add_Product()}} className='addproduct-btn'>ADICIONAR</button>
    </div>
  )
}

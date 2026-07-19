import React, { useState } from 'react'
import { assets } from '../assets/assets'
import axios from 'axios'

import { backendUrl } from '../App'
import { toast } from 'react-toastify'

const Add = ({ token }) => {


  const [image1, setImage1] = useState(false);
  const [image2, setImage2] = useState(false);
  const [image3, setImage3] = useState(false);
  const [image4, setImage4] = useState(false);

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Men');
  const [subCategory, setSubCategory] = useState('Topwear');
  const [price, setPrice] = useState('');
  const [sizes, setSizes] = useState([]);
  const [bestSeller, setBestSeller] = useState(false);


  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();

      formData.append('name', name);
      formData.append('description', description);
      formData.append('category', category);
      formData.append('subCategory', subCategory);
      formData.append('price', price);
      formData.append('sizes', JSON.stringify(sizes));
      formData.append('bestSeller', bestSeller);

      image1 && formData.append('image1', image1);
      image2 && formData.append('image2', image2);
      image3 && formData.append('image3', image3);
      image4 && formData.append('image4', image4);

      const response = await axios.post(`${backendUrl}/api/product/add`, formData, { headers: { token } })
      if(response.data.success){
        toast.success(response.data.message);
        setName('');
        setDescription('');
        setCategory('Men');
        setSubCategory('Topwear');
        setPrice('');
        setSizes([]);
        setBestSeller(false);
        setImage1(false);
        setImage2(false);
        setImage3(false);
        setImage4(false);
      }else{
        toast.error(response.data.message);
      }

    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message || "An error occurred while adding the product");

    }


  }




  return (
    <form onSubmit={onSubmitHandler} className='w-full flex flex-col gap-6 items-start max-w-3xl' >
      <div>
        <p className='mb-3 text-sm font-medium text-ink-700'>Upload Image</p>
        <div className='flex gap-3'>
          {[
            { id: 'image1', state: image1, setter: setImage1 },
            { id: 'image2', state: image2, setter: setImage2 },
            { id: 'image3', state: image3, setter: setImage3 },
            { id: 'image4', state: image4, setter: setImage4 },
          ].map(({ id, state, setter }) => (
            <label key={id} htmlFor={id} className='cursor-pointer'>
              <div className='w-24 h-24 rounded-xl border border-dashed border-ink-300 bg-ink-50 overflow-hidden flex items-center justify-center hover:border-brand-400 transition-colors'>
                <img className='w-full h-full object-cover' src={!state ? assets.upload_area : URL.createObjectURL(state)} alt="" />
              </div>
              <input onChange={(e) => setter(e.target.files[0])} type="file" id={id} hidden />
            </label>
          ))}
        </div>
      </div>

      <div className='w-full' >
        <p className='mb-2 text-sm font-medium text-ink-700' >Product Name</p>
        <input value={name} onChange={(e) => setName(e.target.value)} className='field max-w-[500px]' type="text" placeholder='Type here' required />
      </div>


      <div className='w-full' >
        <p className='mb-2 text-sm font-medium text-ink-700' >Product Description</p>
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} className='field max-w-[500px] min-h-[120px] resize-y' placeholder='Type here' required />
      </div>

      <div className='flex flex-col sm:flex-row gap-4 w-full sm:gap-8' >
        <div className='flex-1 sm:flex-none sm:w-48'>
          <p className='mb-2 text-sm font-medium text-ink-700' >Product Category</p>
          <select value={category} onChange={(e) => setCategory(e.target.value)} className='field'>
            <option value="Men">Men</option>
            <option value="Women">Women</option>
            <option value="Kids">Kids</option>
          </select>
        </div>

        <div className='flex-1 sm:flex-none sm:w-48'>
          <p className='mb-2 text-sm font-medium text-ink-700' >Sub Category</p>
          <select value={subCategory} onChange={(e) => setSubCategory(e.target.value)} className='field'>
            <option value="Topwear">Topwear</option>
            <option value="Bottomwear">Bottomwear</option>
            <option value="Winterwear">Winterwear</option>
          </select>
        </div>

        <div className='flex-1 sm:flex-none sm:w-40'>
          <p className='mb-2 text-sm font-medium text-ink-700'>Product Price</p>
          <input value={price} onChange={(e) => setPrice(e.target.value)} className='field' type="number" placeholder='Price' required />
        </div>
      </div>

      <div>
        <p className='mb-3 text-sm font-medium text-ink-700'>Product Sizes</p>
        <div className='flex gap-3'>
          {['S', 'M', 'L', 'XL', 'XXL'].map((s) => (
            <div key={s} onClick={() => setSizes(prev => prev.includes(s) ? prev.filter(size => size !== s) : [...prev, s])}>
              <p className={`${sizes.includes(s) ? 'bg-brand-600 text-white' : 'bg-ink-100 text-ink-600'} px-4 py-2 cursor-pointer rounded-lg transition-colors font-medium`}>{s}</p>
            </div>
          ))}
        </div>
      </div>

      <div className='flex gap-3 mt-1 items-center'>
        <input onChange={() => setBestSeller(prev => !prev)} checked={bestSeller} type="checkbox" id='bestSeller' className='accent-brand-600 w-4 h-4' />
        <label htmlFor="bestSeller" className='cursor-pointer text-ink-700'>Mark as Best Seller</label>
      </div>

      <button className='btn-primary mt-2' type="submit">ADD PRODUCT</button>

    </form>
  )
}

export default Add

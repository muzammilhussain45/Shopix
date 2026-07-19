import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { backendUrl, currency } from '../App'
import { toast } from 'react-toastify'
import { Trash2, Package } from 'lucide-react'

const List = ({ token }) => {

  const [list, setList] = useState([]);


  const fetchList = async () => {
    try {
      const reponse = await axios.get(`${backendUrl}/api/product/list`)

      if (reponse.data.success) {
        setList(reponse.data.products);
      } else {
        toast.error(reponse.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message || "An error occurred while fetching the product list");
    }
  }


  const removeProduct = async (id) => {
    try {
      const response = await axios.post(`${backendUrl}/api/product/remove`, { id }, { headers: { token } })
      if (response.data.success) {
        toast.success(response.data.message);
        fetchList();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message || "An error occurred while removing the product");
    }
  }

  useEffect(() => {
    fetchList();
  }, [])


  return (
    <div className='card p-5 sm:p-6'>
      <div className='flex items-center justify-between mb-5'>
        <p className='text-lg font-semibold text-ink-900'>All Products List</p>
        <span className='chip'>{list.length} items</span>
      </div>
      <div className='flex flex-col gap-2'>
        {/* List Table Title */}
        <div className='hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-3 px-4 rounded-lg bg-ink-50 text-sm font-medium text-ink-500'>
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b className='text-center'>Action</b>
        </div>

        {/* Product List  */}
        {list.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="w-14 h-14 mb-4 flex items-center justify-center rounded-full bg-ink-50 text-ink-400">
              <Package className="w-6 h-6" />
            </div>
            <p className="text-ink-800 font-medium">No products yet</p>
            <p className="text-sm text-ink-500 mt-1">Add your first product to get started.</p>
          </div>
        ) : (
          list.map((item, index) => (
            <div className='grid grid-cols-[1fr_3fr_1fr] md:grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center gap-2 py-3 px-4 border border-ink-200 rounded-lg text-sm hover:border-brand-300 hover:bg-brand-50/40 transition-colors' key={index}>
              <img className='w-12 h-12 object-cover rounded-md' src={item.image[0]} alt="" />
              <p className="text-ink-800">{item.name}</p>
              <p className="text-ink-500">{item.category}</p>
              <p className="text-ink-800 font-medium">{currency}{item.price}</p>
              <div className="text-right md:text-center">
                <button onClick={() => removeProduct(item._id)} aria-label="Remove product" className="inline-flex items-center justify-center w-8 h-8 rounded-md text-ink-400 hover:text-red-500 hover:bg-red-50 transition-colors">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default List

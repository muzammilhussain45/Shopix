import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { backendUrl, currency } from '../App'
import { toast } from 'react-toastify';
import { Package } from 'lucide-react';

const Orders = ({ token }) => {

  const [orders, setOrders] = useState([]);

  const fetchAllOrders = async () => {
    if (!token) {
      return null;
    }

    try {
      const response = await axios.post(backendUrl + '/api/order/list', {}, { headers: { token } })
      if (response.data.success) {
        setOrders(response.data.orders)
      }
      else {
        console.log(response.data);
        toast.error(response.data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  const statusHandler = async (event, orderId) => {
    try {
      const response = await axios.post(backendUrl + '/api/order/status', { orderId, status: event.target.value }, { headers: { token } })
      if (response.data.success) {
        await fetchAllOrders();
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message)
    }
  }

  useEffect(() => {
    fetchAllOrders();
  }, [token]);

  return (
    <div className='card p-5 sm:p-6'>
      <h3 className='mb-5 text-lg font-semibold text-ink-900'>Order Page</h3>
      <div className='flex flex-col gap-3'>
        {
          orders.map((order, index) => (
            <div className='grid grid-cols-1 sm:grid-cols-[0.5fr_2fr_1fr] lg:grid-cols-[0.5fr_2fr_1fr_1fr_1fr] gap-3 items-start border border-ink-200 rounded-xl p-5 md:p-8 text-xs sm:text-sm text-ink-700 hover:border-brand-300 transition-colors' key={index}>
              <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-brand-50 text-brand-600">
                <Package className="w-6 h-6" />
              </div>
              <div>
                <div>
                  {
                    order.items.map((item, i) => (
                      <p className='py-0.5' key={i}>
                        {item.name} * {item.quantity} <span className="text-ink-400">({item.size})</span>
                      </p>
                    ))
                  }
                </div>
                <p className='mt-3 mb-2 font-medium text-ink-900'>{order.address.firstName + " " + order.address.lastName}</p>

                <div className="text-ink-500">
                  <p>{order.address.street + ", "}</p>
                  <p>{order.address.city + ", " + order.address.state + ", " + order.address.country + ", " + order.address.zipcode}</p>
                </div>
                <p className="text-ink-500">{order.address.phone}</p>
              </div>
              <div>
                <p className='text-sm sm:text-[15px]'>Items: {order.items.length}</p>
                <p className='mt-3'>Method: {order.paymentMethod}</p>
                <p>Payment: <span className={order.payment ? 'text-green-600' : 'text-amber-600'}>{order.payment ? 'Done' : "Pending"}</span></p>
                <p>Date: {new Date(order.date).toLocaleString()}</p>
              </div>
              <p className='text-sm sm:text-[15px] font-semibold text-ink-900'>{currency}{order.amount}</p>
              <select onChange={(e) => statusHandler(e, order._id)} className='field font-semibold' value={order.status} >
                <option value="Order Placed">Order Placed</option>
                <option value="Packing">Packing</option>
                <option value="Shipped">Shipped</option>
                <option value="Out for Delivery">Out for Delivery</option>
                <option value="Delivered">Delivered</option>
              </select>
            </div>
          ))
        }
        {orders.length === 0 && (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="w-14 h-14 mb-4 flex items-center justify-center rounded-full bg-ink-50 text-ink-400">
              <Package className="w-6 h-6" />
            </div>
            <p className="text-ink-800 font-medium">No orders yet</p>
            <p className="text-sm text-ink-500 mt-1">New orders will appear here.</p>
          </div>
        )}
      </div>

    </div>
  )
}

export default Orders

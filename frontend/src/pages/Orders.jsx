import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import axios from "axios";
import { Package } from "lucide-react";
import { useNavigate } from "react-router-dom";


const Orders = () => {
  const {backendUrl, token, currency} = useContext(ShopContext);
  const navigate = useNavigate();


  const [orderData, setOrderData] = useState([]);

  const loadOrderData = async() => {
    try {
      if(!token){
        return null;
      }

      const response = await axios.post(`${backendUrl}/api/order/userorders`, {},{headers:{token}});
      
      if(response.data.success){
        let allordersItem = [];
        response.data.orders.map((order)=>{
          order.items.map((item)=>{
            item['status'] = order.status;
            item['payment'] = order.payment;
            item['paymentMethod'] = order.paymentMethod;
            item['date'] = order.date;
            allordersItem.push(item);
          })

        })
       
        
        setOrderData(allordersItem.reverse());
        
      }
      

      
    } catch (error) {
      console.log(error);
    }
  }


  useEffect(()=>{
    loadOrderData();
  },[token])



  return (
    <div className='pt-6'>

      <div className='text-2xl'>
        <Title text1={"YOUR"} text2={"ORDERS"} />
      </div>

      <div>
        {orderData.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-16 h-16 mb-4 flex items-center justify-center rounded-full bg-ink-50 text-ink-400">
              <Package className="w-7 h-7" />
            </div>
            <p className="text-ink-800 font-medium">No orders yet</p>
            <p className="text-sm text-ink-500 mt-1 mb-6">When you place an order, it will show up here.</p>
            <button onClick={() => navigate('/collection')} className="btn-primary">Start Shopping</button>
          </div>
        ) : (
          orderData.map((item,index)=>(
            <div key={index} className='py-5 border-b border-ink-200 text-ink-700 flex flex-col md:flex-row md:items-center md:justify-between gap-4'>
              <div className='flex items-start gap-5 text-sm'>
                <img src={item.image[0]} alt="" className='w-16 sm:w-20 rounded-lg border border-ink-200' />

                <div>
                  <p className="sm:text-base font-medium text-ink-900">
                    {item.name}
                  </p>
                  <div className='flex items-center gap-3 mt-2 text-sm text-ink-600'>
                    <p className="font-medium text-ink-900">{currency}{item.price}</p>
                    <p>Qty: {item.quantity}</p>
                    <p>Size: {item.size}</p>
                  </div>

                  <p className='mt-2 text-ink-500'>Date: <span className='text-ink-400'>{new Date(item.date).toDateString()}</span></p>
                  <p className='mt-1 text-ink-500'>Payment: <span className='text-ink-400'>{item.paymentMethod}</span></p>
                </div>

              </div>

              <div className='md:w-1/2 flex items-center justify-between gap-4'>
                <div className="flex items-center gap-2">
                  <span className='min-w-2.5 h-2.5 rounded-full bg-green-500'></span>
                  <p className="text-sm md:text-base text-ink-700">{item.status}</p>
                </div>
                <button onClick={loadOrderData} className='border border-ink-300 px-4 py-2 text-sm font-medium rounded-lg hover:border-brand-500 hover:text-brand-600 transition-colors'>Track Order</button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Orders;
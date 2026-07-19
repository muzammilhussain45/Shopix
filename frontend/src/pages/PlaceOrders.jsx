import { useContext, useState } from "react";
import { assets } from "../assets/assets";
import CartTotal from "../components/CartTotal";
import Title from "../components/Title";
import { useNavigate } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import axios from "axios";
import { toast } from "react-toastify";



const PlaceOrders = () => {

  const [method, setMethod] = useState('cod');
  const { navigate, backendUrl, token, cartItems, setCartItems, getCartAmount, delivery_fee, products } = useContext(ShopContext)

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    street: '',
    city: '',
    state: '',
    zipcode: '',
    country: '',
    phone: '',
  })

  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      let orderItems = [];

      for (const items in cartItems) {
        for (const item in cartItems[items]) {
          if (cartItems[items][item] > 0) {
            const itemInfo = structuredClone(products.find(product => product._id === items));
            if (itemInfo) {
              itemInfo.size = item;
              itemInfo.quantity = cartItems[items][item];
              orderItems.push(itemInfo);

            }
          }
        }
      }

      let orderData = {
        address: formData,
        items: orderItems,
        amount: getCartAmount() + delivery_fee,
      }



      switch (method) {
        case 'cod':
          const reponse = await axios.post(`${backendUrl}/api/order/place`, orderData, {

            headers: {
              token
            }
          })
          console.log(reponse);

          if (reponse.data.success) {
            setCartItems({});
            navigate('/orders');
          } else {
            toast.error(reponse.data.message)
          }
          break;
        case 'stripe':
          console.log("inside stripe switch");
          
          const reponseStripe = await axios.post(`${backendUrl}/api/order/stripe`, orderData, {
            headers: {
              token
            }
          })
          console.log(reponseStripe);

          if (reponseStripe.data.success) {
            const { session_url } = reponseStripe.data;
            window.location.replace(session_url);
          }
          else {
            toast.error(reponseStripe.data.message)
          }
          break;
      }


    } catch (error) {
      console.log(error);
      toast.error("Error placing order");

    }
  }




  return (
    <form onSubmit={onSubmitHandler} className='flex justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t'>

      {/* Left side */}
      <div className='flex flex-col gap-4 w-full sm:max-w-[480px]'>
        <div className='text-xl sm:text-2xl my-3'>
          <Title text1={"CHECKOUT"} text2={"DETAILS"} />

        </div>

        <div className='flex gap-3'>
          <input required onChange={onChangeHandler} name='firstName' value={formData.firstName} className='field py-1.5 px-3.5' type="text" placeholder='First Name' />
          <input required onChange={onChangeHandler} name='lastName' value={formData.lastName} className='field py-1.5 px-3.5' type="text" placeholder='Last Name' />
        </div>
        <input required onChange={onChangeHandler} name='email' value={formData.email} className='field py-1.5 px-3.5' type="email" placeholder='Email Address' />
        <input required onChange={onChangeHandler} name='street' value={formData.street} className='field py-1.5 px-3.5' type="text" placeholder='Street Address' />

        <div className='flex gap-3'>
          <input required onChange={onChangeHandler} name='city' value={formData.city} className='field py-1.5 px-3.5' type="text" placeholder='City' />
          <input required onChange={onChangeHandler} name='state' value={formData.state} className='field py-1.5 px-3.5' type="text" placeholder='State' />
        </div>


        <div className='flex gap-3'>
          <input required onChange={onChangeHandler} name='zipcode' value={formData.zipcode} className='field py-1.5 px-3.5' type="number" placeholder='Zip Code' />
          <input required onChange={onChangeHandler} name='country' value={formData.country} className='field py-1.5 px-3.5' type="text" placeholder='Country' />
        </div>

        <input required onChange={onChangeHandler} name='phone' value={formData.phone} className='field py-1.5 px-3.5' type="number" placeholder='Phone Number' />
      </div>


      {/* Right side */}
      <div className='mt-8'>
        <div className='mt-8 min-w-80'>
          <CartTotal />
        </div>

        <div className='mt-12'>
          <Title text1={"PAYMENT"} text2={"METHOD"} />
          <div className='flex gap-3 flex-col lg:flex-row'>

            <div onClick={() => setMethod('stripe')} className={`flex items-center gap-3 border p-3 px-4 cursor-pointer rounded-lg transition-colors ${method === 'stripe' ? 'border-brand-500 bg-brand-50' : 'border-ink-300'}`}>
              <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'stripe' ? 'bg-brand-500 border-brand-500' : 'border-ink-400'}`}></p>
              <img className='h-5 mx-2' src={assets.stripe_logo} alt="Stripe" />
            </div>


            <div onClick={() => setMethod('cod')} className={`flex items-center gap-3 border p-3 px-4 cursor-pointer rounded-lg transition-colors ${method === 'cod' ? 'border-brand-500 bg-brand-50' : 'border-ink-300'}`}>
              <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'cod' ? 'bg-brand-500 border-brand-500' : 'border-ink-400'}`}></p>
              <p className='text-ink-600 text-sm font-medium mx-2'>CASH ON DELIVERY</p>
            </div>
          </div>

          <div className='w-full text-end mt-8'>
            <button type='submit' className='bg-brand-600 text-white py-3 px-16 text-sm font-medium rounded-lg hover:bg-brand-700 transition-colors'>PLACE ORDER</button>
          </div>
        </div>
      </div>

    </form>
  );
};

export default PlaceOrders;
import { useContext, useState, useEffect } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import CartTotal from "../components/CartTotal";
import { Trash2, ShoppingCart } from "lucide-react";

const Cart = () => {
  const { products, currency, cartItems, updateQuantity, navigate } = useContext(ShopContext);

  const [cartData, setCartData] = useState([]);

  useEffect(() => {
   if (products.length > 0) {
     const tempData = [];
    for (const items in cartItems) {
      for (const item in cartItems[items]) {
        if (cartItems[items][item] > 0) {
          tempData.push({
            _id: items,
            size: item,
            quantity: cartItems[items][item],
          });
        }
      }
    }
    setCartData(tempData);
   }
  }, [cartItems,products]);

  return (
    <div className="pt-14">
      <div className="text-2xl mb-6">
        <Title text1={"YOUR"} text2={"CART"} />
      </div>

      <div>
        {cartData.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-16 h-16 mb-4 flex items-center justify-center rounded-full bg-ink-50 text-ink-400">
              <ShoppingCart className="w-7 h-7" />
            </div>
            <p className="text-ink-800 font-medium">Your cart is empty</p>
            <p className="text-sm text-ink-500 mt-1 mb-6">Looks like you haven't added anything yet.</p>
            <button onClick={() => navigate('/collection')} className="btn-primary">Browse Collection</button>
          </div>
        ) : (
          cartData.map((item) => {
            const productData = products.find(
              (product) => product._id == item._id
            );
            return (
              <div
                key={`${item._id}-${item.size}`}
                className="py-4 border-b border-ink-200 text-ink-700 grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4"
              >
                <div className="flex items-start gap-6">
                  <img
                    src={productData?.image?.[0]}
                    className="w-16 sm:w-20 rounded-lg border border-ink-200"
                    alt=""
                  />
                  <div>
                    <p className="text-xs sm:text-lg font-medium text-ink-900">
                      {productData?.name}
                    </p>

                    <div className='flex items-center gap-5 mt-2'>
                      <p className="text-ink-900">{currency}{productData.price}</p>
                      <p className="px-2 sm:px-3 sm:py-1 border border-ink-200 bg-ink-50 rounded-md text-sm">{item.size}</p>
                    </div>
                  </div>
                </div>
                <input
                  onChange={(e) => e.target.value === '' || e.target.value === '0' ? null : updateQuantity(item._id, item.size, Number(e.target.value))}
                  className='border border-ink-300 rounded-md max-w-16 sm:max-w-20 px-2 py-1.5'
                  type="number"
                  min={1}
                  defaultValue={item.quantity}
                />
                <button
                  onClick={() => updateQuantity(item._id, item.size, 0)}
                  aria-label="Remove item"
                  className="text-ink-400 hover:text-red-500 transition-colors justify-self-end mr-2"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            );
          })
        )}
      </div>

      <div className='flex justify-end my-16'>
        <div className='w-full sm:w-[450px]'>
          <CartTotal/>

          <div className='w-full text-end mt-6'>
            <button onClick={() => navigate('/place-order')} className='bg-brand-600 text-white px-8 py-3 text-sm font-medium rounded-lg hover:bg-brand-700 transition-colors'>PROCEED TO CHECKOUT</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
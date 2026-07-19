import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import RelatedProduct from "../components/RelatedProduct";
import { Star, Truck, RefreshCw, ShieldCheck } from "lucide-react";


const Product = () => {
  const { productId } = useParams();
  const { products, currency, addToCart } = useContext(ShopContext);
  const [productData, setProductData] = useState(null);
  const [image, setImage] = useState('');
  const [size, setSize] = useState('');

  useEffect(() => {
    window.scrollTo(0, 0);

    const matchedProduct = products.find(item => item._id == productId);

    if (matchedProduct) {
      setProductData(matchedProduct);
      setImage(matchedProduct.image[0]);
      setSize('');
    } else {
      setProductData(null);
      setImage('');
      setSize('');
    }
  }, [productId, products])


  return productData ? (
    <div className='pt-10'>
      {/* Product Data */}
      <div className='flex gap-12 flex-col sm:flex-row'>
        {/* Product Image */}
        <div className='flex-1 flex flex-col-reverse gap-3 sm:flex-row'>
          <div className='flex sm:flex-col overflow-x-auto sm:overflow-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full gap-2'>
            {
              productData.image.map((item, index) => (
                <img src={item} key={index} className={`w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer rounded-md border-2 ${image === item ? 'border-brand-500' : 'border-transparent'}`} alt="" onClick={() => setImage(item)} />
              ))
            }
          </div>
          <div className='w-full sm:w-[80%]'>
            <img src={image} className='w-full h-auto rounded-xl' alt="" />
          </div>
        </div>

        {/* Product details */}
        <div className='flex-1'>
          <h1 className='text-3xl font-medium mt-2 text-ink-900'>{productData.name}</h1>
          <div className='flex items-center gap-1 mt-3 text-accent-400'>
            {[...Array(4)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
            <Star className="w-4 h-4 text-ink-300 fill-current" />
            <p className='pl-2 text-ink-500'>(122)</p>
          </div>
          {productData.bestSeller && (
            <span className="mt-3 inline-flex items-center gap-1 px-3 py-1 text-xs font-semibold rounded-full bg-accent-100 text-accent-700">
              ★ BESTSELLER
            </span>
          )}
          <p className='mt-5 text-3xl font-semibold text-brand-600'>{currency}{productData.price}</p>

          <p className='mt-5 text-ink-500 md:w-4/5 leading-relaxed'>{productData.description}</p>
          <div className='flex flex-col gap-4 my-8'>
            <p className='font-medium text-ink-800'>Select Size</p>
            <div className='flex gap-2 flex-wrap'>
              {
                productData.sizes.map((item, index) => (
                  <button onClick={() => setSize(item)} key={index} className={`border py-2 px-5 rounded-lg bg-ink-50 transition-colors ${item == size ? 'border-brand-500 bg-brand-50 text-brand-700' : 'hover:border-ink-400'}`}>{item}</button>
                ))
              }
            </div>
          </div>
          <button onClick={() => addToCart(productData._id, size)} className='bg-brand-600 text-white py-3 px-10 text-sm font-medium rounded-lg hover:bg-brand-700 transition-colors'>ADD TO CART</button>
          <hr className='mt-8 sm:w-4/5 border-ink-100' />
          <div className="text-sm text-ink-500 mt-5 flex flex-col gap-2">
            <p className="flex items-center gap-2"><ShieldCheck className="w-4 h-4 text-brand-500" />100% original product</p>
            <p className="flex items-center gap-2"><Truck className="w-4 h-4 text-brand-500" />Cash on Delivery available on this product</p>
            <p className="flex items-center gap-2"><RefreshCw className="w-4 h-4 text-brand-500" />Easy return and exchange policy within 7 days</p>
          </div>
        </div>

      </div>

      {/* Description and Review Section */}
      <div className="mt-20">
        <div className="flex border-b border-ink-200">
          <b className="border border-b-0 border-ink-200 rounded-t-lg px-5 py-3 text-sm bg-brand-50 text-brand-700">Description</b>
          <p className="border border-b-0 border-ink-200 rounded-t-lg px-5 py-3 text-sm text-ink-500">Reviews (122)</p>
        </div>
        <div className='flex flex-col gap-4 border border-t-0 border-ink-200 rounded-b-lg px-6 py-6 text-sm text-ink-500'>
          <p>An e-commerce platform for buying and selling products online.</p>
          <p>It provides a convenient and secure way for businesses and individuals to conduct online transactions.</p>
        </div>
      </div>

      {/* Display related Products */}
      <RelatedProduct category={productData.category} subCategory={productData.subCategory} />

    </div>
  ) : <div className='opacity-0'></div>;
};

export default Product;
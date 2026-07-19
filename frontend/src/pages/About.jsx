import { assets } from "../assets/assets";
import Title from "../components/Title";
import NewsletterBox from "../components/NewsletterBox";


const About = () => {
  return (
    <div>
      <div className="text-2xl text-center pt-8">
        <Title text1={'ABOUT'} text2={"US"}/>
      </div>

      <div className="my-10 flex flex-col md:flex-row gap-12 items-center">
        <img className="w-full md:max-w-[450px] rounded-2xl object-cover" src={assets.about_img}/>
        <div className="flex flex-col justify-center gap-5 md:w-2/4">
         <p className="text-ink-600 leading-relaxed">Shopix is a leading online retailer offering a wide range of products at competitive prices. Our mission is to provide an exceptional shopping experience with fast delivery and outstanding customer service.</p>
         <p className="text-ink-600 leading-relaxed">Since our founding, we have been committed to delivering quality products and exceptional service to our customers.</p>
         <b className='text-ink-900 text-lg'>Our Mission</b>
         <p className="text-ink-600 leading-relaxed">Our mission is to be the most trusted and beloved shopping destination for our customers.</p>
        </div>

      </div>
      <div className='text-xl py-4'>
        <Title text1={'Why'} text2={"CHOOSE US"}/>
      </div>
      <div className="flex flex-col md:flex-row text-sm mb-20 gap-4">
        <div className='card card-hover border-ink-200 px-10 md:px-16 py-12 flex flex-col gap-4 flex-1'>
          <b className="text-ink-900">Quality Assurance</b>
          <p className='text-ink-600'>All our products undergo rigorous testing to ensure they meet the highest quality standards.</p>
        </div>

        <div className='card card-hover border-ink-200 px-10 md:px-16 py-12 flex flex-col gap-4 flex-1'>
          <b className="text-ink-900">Convenience</b>
          <p className='text-ink-600'>With our user-friendly interface and seamless shopping experience, we make it easy for you to find and purchase the products you love.</p>
        </div>


        <div className='card card-hover border-ink-200 px-10 md:px-16 py-12 flex flex-col gap-4 flex-1'>
          <b className="text-ink-900">Exceptional Customer Service</b>
          <p className='text-ink-600'>Our dedicated customer service team is always ready to assist you with any questions or concerns you may have.</p>
        </div>
      </div>

      <NewsletterBox/>

    </div>
  );
};

export default About;
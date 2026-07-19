import { assets } from "../assets/assets";
import NewsletterBox from "../components/NewsletterBox";
import Title from "../components/Title";


const Contact = () => {
  return (
    <div>
      <div className='text-center text-2xl pt-10'><Title text1={'CONTACT'} text2={'US'} />
      </div>

      <div className='my-10 flex flex-col md:flex-row gap-10 mb-28'>
        <img className='w-full md:max-w-[480px] rounded-2xl object-cover' src={assets.contact_img} alt="" />

        <div className='flex flex-col justify-center items-start gap-5'>
          <p className='font-semibold text-xl text-ink-800'>Our Store</p>
          <p className='text-ink-500'>123 Main Street, City, State 12345</p>
          <p className='text-ink-500'>Phone: (123) 456-7890 <br />Email: info@shopix.com</p>
          <p className='font-semibold text-xl text-ink-800 mt-2'>Careers at Shopix</p>
          <p className='text-ink-500'>Learn more about opportunities at Shopix.</p>
          <button className='border border-ink-800 px-8 py-3 text-sm rounded-lg hover:bg-brand-600 hover:border-brand-600 hover:text-white transition-colors mt-2'>Explore Jobs</button>
        </div>
      </div>

      <NewsletterBox />

    </div>
  );
};

export default Contact;
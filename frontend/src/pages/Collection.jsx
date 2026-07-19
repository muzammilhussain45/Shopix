import { useContext, useEffect, useState } from "react";
import { ShopContext } from '../context/ShopContext';
import { assets, products } from "../assets/assets";
import Title from '../components/Title'
import ProductItem from "../components/ProductItem";
import { Search } from "lucide-react";


const Collection = () => {

  const { products, search, showSearch } = useContext(ShopContext);
  const [showFilter, setShowFilter] = useState(false);
  const [filterProducts, setFilterProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [sortType, setSortType] = useState('relevant');


  const toggleCategory = (e) => {
    if (category.includes(e.target.value)) {
      setCategory(prev => prev.filter(item => item != e.target.value))
    }
    else {
      setCategory(prev => [...prev, e.target.value])
    }
  }


  const toggleSubCategory = (e) => {
    if (subCategory.includes(e.target.value)) {
      setSubCategory(prev => prev.filter(item => item != e.target.value))
    }
    else {
      setSubCategory(prev => [...prev, e.target.value])
    }
  }


  const applyFilter = () => {
    let productsCopy = products.slice();

    if (showSearch && search) {
      productsCopy = productsCopy.filter(item => item.name.toLowerCase().includes(search.toLowerCase()))
    }

    if (category.length > 0) {
      productsCopy = productsCopy.filter(item => category.includes(item.category))
    }


    if (subCategory.length > 0) {
      productsCopy = productsCopy.filter(item => subCategory.includes(item.subCategory))
    }

    setFilterProducts(productsCopy)
  }

  const sortProduct = () => {
    let filterProductCopy = filterProducts.slice();

    switch (sortType) {
      case 'low-high':
        setFilterProducts(filterProductCopy.sort((a, b) => (a.price - b.price)));
        break;

      case 'high-low':
        setFilterProducts(filterProductCopy.sort((a, b) => (b.price - a.price)));
        break;

      default:
        applyFilter();
        break;
    }
  }





  useEffect(() => {
    applyFilter()
  }, [category, subCategory, search, showSearch])


  useEffect(() => {
    sortProduct()
  }, [sortType])



  return (
    <div className="flex flex-col sm:flex-row gap-10 pt-10">
      {/* Filter options */}
      <div className="min-w-60">
        <p onClick={() => setShowFilter(!showFilter)} className="my-2 text-lg font-semibold flex items-center cursor-pointer gap-2 text-ink-800">FILTERS
          <img className={`h-3 sm:hidden transition-transform ${showFilter ? 'rotate-90' : ''}`} src={assets.dropdown_icon} alt="" />
        </p>

        {/* Category Filter */}
        <div className={`border border-ink-200 rounded-lg pl-5 py-4 mt-4 ${showFilter ? '' : 'hidden'} sm:block`} >
          <p className="mb-3 text-sm font-semibold text-ink-800">CATEGORIES</p>
          <div className="flex flex-col gap-2 text-sm text-ink-600">
            {['Men', 'Women', 'Kids'].map((cat) => (
              <label key={cat} className="flex gap-2 items-center cursor-pointer hover:text-brand-600">
                <input className="accent-brand-600 w-4 h-4" type="checkbox" value={cat} onChange={toggleCategory} />{cat}
              </label>
            ))}
          </div>
        </div>

        {/* SubCategory Filter */}
        <div className={`border border-ink-200 rounded-lg pl-5 py-4 my-4 ${showFilter ? '' : 'hidden'} sm:block`} >
          <p className="mb-3 text-sm font-semibold text-ink-800">TYPE</p>
          <div className="flex flex-col gap-2 text-sm text-ink-600">
            {['Topwear', 'Bottomwear', 'Winterwear'].map((sub) => (
              <label key={sub} className="flex gap-2 items-center cursor-pointer hover:text-brand-600">
                <input className="accent-brand-600 w-4 h-4" type="checkbox" value={sub} onChange={toggleSubCategory} />{sub}
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* Right Side */}
      <div className="flex-1">
        <div className="flex justify-between items-center mb-6">
          <div>
            <Title text1={'ALL'} text2={'COLLECTIONS'}></Title>
            <p className="text-sm text-ink-500 mt-1">{filterProducts.length} {filterProducts.length === 1 ? 'product' : 'products'}</p>
          </div>

          <select onChange={(e) => setSortType(e.target.value)} className="field w-auto cursor-pointer py-2">
            <option value="relevant">Sort by: Relevant</option>
            <option value="low-high">Sort by: Low to High</option>
            <option value="high-low">Sort by: High to Low</option>
          </select>
        </div>

        {filterProducts.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-16 h-16 mb-4 flex items-center justify-center rounded-full bg-ink-50 text-ink-400">
              <Search className="w-7 h-7" />
            </div>
            <p className="text-ink-800 font-medium">No products found</p>
            <p className="text-sm text-ink-500 mt-1">Try adjusting your filters or search.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6">
            {
              filterProducts.map((item, index) => (
                <ProductItem key={index} name={item.name} id={item._id} price={item.price} image={item.image} bestSeller={item.bestSeller} />
              ))
            }
          </div>
        )}
      </div>
    </div>
  );
};

export default Collection;
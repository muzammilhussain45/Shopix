import { Link, NavLink } from "react-router-dom";
import { useContext, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { Search, User, ShoppingCart, Menu, X } from "lucide-react";

const NavBar = () => {

  const [visible, setVisible] = useState(false);

  const { setShowSearch, getCartCount, navigate, token, setToken } = useContext(ShopContext)

  const logout = () => {
    navigate('/login');
    localStorage.removeItem('token');
    setToken('');

  }

  return (
    <div className="flex items-center justify-between py-5 font-medium border-b border-ink-100">
      <Link to="/" className="text-2xl font-semibold tracking-tight text-ink-900">
        Shop<span className="text-brand-600">ix</span>
      </Link>

      <ul className="hidden sm:flex gap-8 text-sm text-ink-500">
        {[
          { to: "/", label: "Home" },
          { to: "/collection", label: "Collection" },
          { to: "/about", label: "About" },
          { to: "/contact", label: "Contact" },
        ].map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `group relative py-1 transition-colors hover:text-brand-600 ${isActive ? "text-brand-600" : "text-ink-500"}`
            }
          >
            {({ isActive }) => (
              <>
                {item.label}
                <span
                  className={`absolute left-0 -bottom-[1px] h-[2px] bg-accent-400 transition-all duration-300 ${
                    isActive ? "w-full" : "w-0 group-hover:w-full"
                  }`}
                ></span>
              </>
            )}
          </NavLink>
        ))}
      </ul>

      <div className="flex items-center gap-3 text-ink-700">
        <button
          onClick={() => setShowSearch(true)}
          aria-label="Search"
          className="p-2 rounded-full hover:bg-brand-50 hover:text-brand-600 transition-colors"
        >
          <Search className="w-5 h-5" />
        </button>

        <div className="group relative">
          <button
            onClick={() => navigate('/login')}
            aria-label="Account"
            className="p-2 rounded-full hover:bg-brand-50 hover:text-brand-600 transition-colors"
          >
            <User className="w-5 h-5" />
          </button>
          {token && (
            <div className="group-hover:block hidden absolute right-0 pt-3 z-20">
              <div className="flex flex-col gap-1 w-40 py-3 px-4 bg-white border border-ink-100 rounded-xl shadow-pop text-ink-600">
                <p className="cursor-pointer hover:text-brand-600">My Profile</p>
                <p onClick={() => navigate('/orders')} className="cursor-pointer hover:text-brand-600">Orders</p>
                <p onClick={logout} className="cursor-pointer hover:text-brand-600">Logout</p>
              </div>
            </div>
          )}
        </div>

        <Link to="/cart" aria-label="Cart" className="relative p-2 rounded-full hover:bg-brand-50 hover:text-brand-600 transition-colors">
          <ShoppingCart className="w-5 h-5" />
          <span className="text-[10px] font-semibold text-ink-900 bg-accent-400 leading-4 rounded-full w-4 text-center aspect-square absolute right-0 top-0 border border-white">
            {getCartCount()}
          </span>
        </Link>

        <button
          onClick={() => setVisible(true)}
          aria-label="Menu"
          className="p-2 rounded-full hover:bg-brand-50 hover:text-brand-600 transition-colors sm:hidden"
        >
          <Menu className="w-5 h-5" />
        </button>
      </div>

      {/* Side menu for small screens */}
      <div
        className={`fixed top-0 right-0 bottom-0 z-50 overflow-hidden h-screen bg-white transition-all duration-300 ${visible ? "w-full" : "w-0"
          }`}
      >
        <div className="flex flex-col text-ink-700 h-full">
          <div onClick={() => setVisible(false)} className="flex items-center gap-4 p-4 cursor-pointer border-b border-ink-100">
            <X className="h-5 w-5" />
            <p>Close</p>
          </div>

          {[
            { to: "/", label: "Home" },
            { to: "/collection", label: "Collection" },
            { to: "/about", label: "About" },
            { to: "/contact", label: "Contact" },
          ].map((item) => (
            <NavLink
              key={item.to}
              onClick={() => setVisible(false)}
              className="py-3 pl-6 border-b border-ink-100 hover:bg-brand-50 hover:text-brand-600"
              to={item.to}
            >
              {item.label}
            </NavLink>
          ))}
        </div>
      </div>

    </div>
  );
};

export default NavBar;
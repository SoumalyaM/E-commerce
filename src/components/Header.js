import React, { useContext, useState, useEffect } from "react";
//sidebar context
import { SidebarContext } from "../contexts/SidebarContext";
//cart context
import { CartContext } from "../contexts/CartContext";
//import icon
import { BsBag } from "react-icons/bs";
import { MdLogout } from "react-icons/md";
//import Link
import { Link } from "react-router-dom";
//import logo
import Logo from "../img/logo.svg";
import { useAuth } from "../contexts/AuthContext";

const Header = () => {
  //header state
  const { user, logout } = useAuth();
  const [isActive, setIsActive] = useState(false);
  const { isOpen, setIsOpen } = useContext(SidebarContext);
  const { itemAmount } = useContext(CartContext);

  //event listener
  useEffect(() => {
    window.addEventListener("scroll", () => {
      window.scrollY > 700 ? setIsActive(true) : setIsActive(false);
    });
  });
  return (
    <header
      className={`${
        isActive ? "bg-[#F5E6E0] py-4 shadow-md" : "bg-none py-6"
      } fixed w-full z-10 transition-all`}
    >
      <div className="container mx-auto flex items-center justify-between h-full">
        {/*logo*/}
        <Link to={"/"}>
          <div>
            <img
              className="w-[40px] hover:scale-125 transition-all"
              src={Logo}
              alt=""
            />
          </div>
        </Link>
        <div className="flex relative">
          <div>
            <button
              className="cursor-pointer flex relative hover:scale-125 transition-all mr-16"
              onClick={logout}
            >
              <MdLogout className="text-3xl" />
            </button>
          </div>
          {/* cart */}
          <div
            onClick={() => setIsOpen(!isOpen)}
            className="cursor-pointer flex relative hover:scale-125 transition-all"
          >
            <BsBag className="text-2xl" />
            <div className="bg-red-500 absolute -right-2 -bottom-2 text-[12px] w-[18px] h-[18px] text-white rounded-full flex justify-center items-center">
              {itemAmount}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

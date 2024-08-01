import React, { useContext, useState } from "react";
import { IoMdArrowForward } from "react-icons/io";
import { FiTrash2 } from "react-icons/fi";
import CartItem from "../components/CartItem";
import { SidebarContext } from "../contexts/SidebarContext";
import { CartContext } from "../contexts/CartContext";
import CheckoutPage from "../components/CheckoutPage";

const Sidebar = () => {
  const { isOpen, handleClose } = useContext(SidebarContext);
  const { cart, clearCart, total, itemAmount } = useContext(CartContext);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const handleClick = () => {
    if (itemAmount > 0) {
      setIsCheckoutOpen(true);
    }
  };

  return (
    <div
      className={`${
        isOpen ? "right-0" : "-right-full"
      } w-full bg-white fixed top-0 h-full shadow-2xl md:w-[35vw] xl:max-w-[30vw] transition-all duration-300 z-20 px-4 lg:px-[35px]`}
    >
      <div className="flex items-center justify-between py-6 border-b">
        <div className="uppercase text-sm font-semibold">
          Shopping bag ({itemAmount})
        </div>
        <div
          onClick={handleClose}
          className="cursor-pointer w-8 h-8 flex justify-center items-center hover:scale-125 transition-all"
        >
          <IoMdArrowForward className="text-2xl" />
        </div>
      </div>
      <div className="flex flex-col gap-y-2 h-[450px] overflow-y-auto overflow-x-hidden border-b">
        {cart.map((item) => {
          return <CartItem item={item} key={item.id} />;
        })}
      </div>
      <div className="flex flex-col gap-y-3 py-4 mt-4">
        <div className="flex w-full justify-between items-center">
          <div className="uppercase font-semibold">
            <span className="mr-2">Total:</span>₹ {Math.floor(total)}
          </div>
          <div
            onClick={clearCart}
            className="cursor-pointer py-4 rounded-full text-red-500 w-12 h-12 flex justify-center items-center text-xl hover:scale-125 transition-all"
          >
            <FiTrash2 />
          </div>
        </div>
        <button
          onClick={handleClick}
          disabled={itemAmount <= 0}
          style={{
            opacity: itemAmount > 0 ? 1 : 0.5,
            cursor: itemAmount > 0 ? "pointer" : "not-allowed",
          }}
          className="relative inline-flex items-center px-12 py-3 overflow-hidden text-lg font-medium text-primary border-2 border-black rounded-full hover:text-white group hover:bg-gray-50"
        >
          <span className="absolute left-0 block w-full h-0 transition-all bg-primary opacity-100 group-hover:h-full top-1/2 group-hover:top-0 duration-400 ease"></span>
          <span className="absolute right-0 flex items-center justify-start w-10 h-10 duration-300 transform translate-x-full group-hover:translate-x-0 ease">
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              ></path>
            </svg>
          </span>
          <span className="relative">Checkout</span>
        </button>
      </div>
      {isCheckoutOpen && (
        <CheckoutPage onClose={() => setIsCheckoutOpen(false)} />
      )}
    </div>
  );
};

export default Sidebar;

import React, { useContext, useState } from "react";
import { CartContext } from "../contexts/CartContext";

const CheckoutPage = ({ onClose }) => {
  const { cart, total, itemAmount, clearCart } = useContext(CartContext);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const loadRazorpay = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.async = true;
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handlePayment = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const res = await loadRazorpay();

      if (!res) {
        throw new Error("Razorpay SDK failed to load. Are you online?");
      }

      const options = {
        key: process.env.REACT_APP_RAZORPAY_API_KEY,
        amount: Math.round(total * 100),
        currency: "INR",
        name: "E-Commerce",
        description: "Purchase from Your Store",
        handler: function (response) {
          clearCart();
          setIsSuccess(true);
          setTimeout(() => {
            onClose();
          }, 3000);
        },
        prefill: {
          name: formData.name,
          email: formData.email,
          contact: "",
        },
        notes: {
          address: formData.address,
        },
        theme: {
          color: "#F5E6E0",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.on("payment.failed", function (response) {
        setError(`Payment failed: ${response.error.description}`);
      });
      rzp.open();
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white w-full max-w-md p-6 rounded-lg shadow-xl text-center">
          <h2 className="text-2xl font-bold mb-4">Payment Successful!</h2>
          <p>Thank you for your purchase. Your cart has been cleared.</p>
          <p>This window will close automatically.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-[#F5E6E0] w-full max-w-md p-6 rounded-lg shadow-xl">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Checkout</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <span className="text-2xl">&times;</span>
          </button>
        </div>

        <div className="mb-4">
          <h3 className="font-semibold mb-2">Order Summary</h3>
          <div className="max-h-40 overflow-y-auto pr-2">
            <div className="space-y-2">
              {cart.map((item) => (
                <div key={item.id} className="flex justify-between">
                  <span className="text-sm">{item.title}</span>
                  <span className="text-sm">
                    ₹ {Math.floor(item.price * 83.73 * item.amount)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t pt-4 mb-4">
          <div className="flex justify-between font-bold">
            <span>Total ({itemAmount} items):</span>
            <span>₹{Math.floor(total)}</span>
          </div>
        </div>

        {error && (
          <div
            className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4"
            role="alert"
          >
            <strong className="font-bold">Error: </strong>
            <span className="block sm:inline">{error}</span>
          </div>
        )}

        <form onSubmit={handlePayment} className="space-y-4">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Full Name
            </label>
            <input
              type="text"
              id="name"
              value={formData.name}
              onChange={handleInputChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary"
              required
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={handleInputChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary"
              required
            />
          </div>
          <div>
            <label
              htmlFor="address"
              className="block text-sm font-medium text-gray-700"
            >
              Shipping Address
            </label>
            <textarea
              id="address"
              value={formData.address}
              onChange={handleInputChange}
              rows="3"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary"
              required
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full bg-primary text-white py-2 px-4 rounded-md hover:bg-primary-dark transition-colors disabled:opacity-50"
            disabled={isLoading}
          >
            {isLoading ? "Processing..." : "Place Order and Pay"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CheckoutPage;

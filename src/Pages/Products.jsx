import { useEffect, useState } from "react";
import {
  ShoppingCart,
  Heart,
  Star,
  Facebook,
  Instagram,
  Twitter,
} from "lucide-react";
import Navbar from "./Navbar";
import { useCart } from "../Context/CartContext"; // Import the cart context hook
import Footer from "../Components/Footer";

export default function EcommerceHomepage() {
  const [products, setProducts] = useState([]);
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [newArrivals, setNewArrivals] = useState([]);
  const [selectedColor, setSelectedColor] = useState({});
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState("");

  const { addToCart } = useCart(); // Get addToCart from context

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch(
          "https://www.greatfrontend.com/api/projects/challenges/e-commerce/products"
        );
        const data = await res.json();

        setProducts(data.data);
        setFeaturedProducts(data.data.slice(0, 16));
        setNewArrivals(data.data.slice(4, 7));
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  const handleSubscribe = () => {
    if (email) {
      alert(`Thank you for subscribing with: ${email}`);
      setEmail("");
    }
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    for (let i = 0; i < 5; i++) {
      stars.push(
        <Star
          key={i}
          className={
            i < fullStars
              ? "fill-yellow-400 text-yellow-400 w-4 h-4"
              : "text-gray-300 w-4 h-4"
          }
        />
      );
    }
    return stars;
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );

  return (
    <div className="bg-white">
      <Navbar />
      <div className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-3xl font-bold">All Products</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProducts.map((product) => (
              <div
                key={product.product_id}
                className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={
                      product.images[0]?.image_url || "/api/placeholder/300/300"
                    }
                    alt={product.name}
                    className="w-full h-64 object-cover transform hover:scale-105 transition duration-500"
                  />
                  <button className="absolute top-4 right-4 p-2 bg-white rounded-full shadow hover:bg-gray-100">
                    <Heart size={20} className="text-gray-600" />
                  </button>
                </div>
                <div className="p-4">
                  <div className="flex items-center mb-2">
                    {renderStars(4.5)}
                    <span className="text-sm ml-1 text-gray-600">(24)</span>
                  </div>
                  <h3 className="font-semibold text-lg mb-1 truncate">
                    {product.name}
                  </h3>
                  <p className="text-gray-600 text-sm mb-3 line-clamp-1">
                    {product.description}
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold">
                      ${product.inventory[0]?.list_price}
                    </span>
                    <button
                      onClick={() => addToCart(product, product.colors[0])} // Use context addToCart
                      className="bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700"
                    >
                      <ShoppingCart size={18} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Footer here */}
      <Footer />
    </div>
  );
}

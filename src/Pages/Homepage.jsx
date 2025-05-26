import { useEffect, useState } from "react";
import {
  ShoppingCart,
  Heart,
  Search,
  ChevronRight,
  ChevronLeft,
  Star,
  ArrowRight,
  Mail,
  Instagram,
  Facebook,
  Twitter,
} from "lucide-react";
import { Link } from "react-router-dom";
import Products from "./Products";
import { useCart } from "../Context/CartContext"; // Import the cart context hook
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";

export default function EcommerceHomepage() {
  const [products, setProducts] = useState([]);
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [newArrivals, setNewArrivals] = useState([]);
  const [selectedColor, setSelectedColor] = useState({});
  const [loading, setLoading] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);
  const { addToCart } = useCart(); // Get addToCart from context
  const [email, setEmail] = useState("");
  const [cart, setCart] = useState([]);
  const [heroSlides, setHeroSlides] = useState([]);
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();
  // const heroSlides = [
  //   {
  //     image:
  //       "https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg?auto=compress&cs=tinysrgb&h=350",
  //     title: "Summer Collection 2025",
  //     subtitle: "Discover the season's hottest styles",
  //     cta: "Shop Now",
  //   },
  //   {
  //     image: "/api/placeholder/1200/500",
  //     title: "New Arrivals",
  //     subtitle: "Be the first to wear our latest designs",
  //     cta: "Explore",
  //   },
  //   {
  //     image: "/api/placeholder/1200/500",
  //     title: "Special Offers",
  //     subtitle: "Up to 50% off on selected items",
  //     cta: "View Deals",
  //   },
  // ];

  // const categories = [
  //   {
  //     name: "Clothing",
  //     image:
  //       "https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg",
  //   },
  //   {
  //     name: "Shoes",
  //     image: "https://source.unsplash.com/300x300/?shoes,footwear",
  //   },
  //   {
  //     name: "Accessories",
  //     image: "https://fakestoreapi.com/img/51UDEzMJVpL._AC_UL640_QL65_ML3_.jpg",
  //   },
  //   {
  //     name: "Home Decor",
  //     image: "https://source.unsplash.com/300x300/?home-decor,interior",
  //   },
  // ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === heroSlides.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? heroSlides.length - 1 : prev - 1));
  };

  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(timer);
  }, [currentSlide]);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch(
          "https://www.greatfrontend.com/api/projects/challenges/e-commerce/products"
        );
        const data = await res.json();

        setProducts(data.data);

        // Select first 4 products for featured section
        setFeaturedProducts(data.data.slice(0, 4));

        // Select next 3 products for new arrivals section
        setNewArrivals(data.data.slice(4, 7));

        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  useEffect(() => {
    async function fetchHeroImages() {
      try {
        const res = await fetch(
          "https://api.unsplash.com/photos/random?query=fashion&count=3&client_id=lcBoEo7KjpL05rfMofRnb2apCGLgS21RYh_b7CiHw2k"
        );
        const data = await res.json();

        const slides = data.map((img, index) => ({
          image: img.urls.full,
          title:
            index === 0
              ? "Summer Collection 2025"
              : index === 1
              ? "New Arrivals"
              : "Special Offers",
          subtitle:
            index === 0
              ? "Discover the season's hottest styles"
              : index === 1
              ? "Be the first to wear our latest designs"
              : "Up to 50% off on selected items",
          cta:
            index === 0 ? "Shop Now" : index === 1 ? "Explore" : "View Deals",
        }));

        setHeroSlides(slides);
      } catch (err) {
        console.error("Unsplash API error:", err);
      }
    }

    fetchHeroImages();
  }, []);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    const categoryNames = ["Shoes", "Home Decor", "Clothes", "Acessories"];
    const fetchedCategories = await Promise.all(
      categoryNames.map(async (name) => {
        const res = await fetch(
          `https://api.unsplash.com/search/photos?query=${name}&client_id=lcBoEo7KjpL05rfMofRnb2apCGLgS21RYh_b7CiHw2k`
        );
        const data = await res.json();
        return {
          name,
          image: data.results[0]?.urls?.regular || "fallback.jpg",
        };
      })
    );
    setCategories(fetchedCategories);
  };

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
      if (i < fullStars) {
        stars.push(
          <Star key={i} className="fill-yellow-400 text-yellow-400 w-4 h-4" />
        );
      } else {
        stars.push(<Star key={i} className="text-gray-300 w-4 h-4" />);
      }
    }

    return stars;
  };

  const viewProductDetails = (productId) => {
    alert(`Viewing product details for ID: ${productId}`);
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );

  return (
    <div className="bg-white">
      {/* Header */}
      <Navbar />

      {/* Hero Carousel */}
      <div className="relative overflow-hidden">
        <div className="relative h-96 md:h-screen max-h-screen overflow-hidden">
          {heroSlides.map((slide, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                index === currentSlide ? "opacity-100" : "opacity-0"
              }`}
            >
              <div className="absolute inset-0 bg-black bg-opacity-40 z-10"></div>
              <img
                src={slide.image}
                alt={slide.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 flex flex-col justify-center items-center text-center text-white z-20 p-4">
                <h1 className="text-4xl md:text-6xl font-bold mb-4">
                  {slide.title}
                </h1>
                <p className="text-xl md:text-2xl mb-8">{slide.subtitle}</p>
                <button className="bg-white text-black px-8 py-3 rounded-md hover:bg-gray-200 transition font-semibold">
                  {slide.cta}
                </button>
              </div>
            </div>
          ))}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white p-2 rounded-full shadow-md hover:bg-gray-100"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white p-2 rounded-full shadow-md hover:bg-gray-100"
          >
            <ChevronRight size={24} />
          </button>
        </div>
      </div>

      {/* Categories Section */}
      <div className="max-w-7xl mx-auto py-16 px-4">
        <h2 className="text-3xl font-bold text-center mb-12">
          Shop by Category
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-lg cursor-pointer"
            >
              <div className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-40 transition duration-300 z-10"></div>
              <img
                src={category.image}
                alt={category.name}
                className="w-full h-64 object-cover transition duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 flex items-center justify-center z-20">
                <h3 className="text-white text-2xl font-bold">
                  {category.name}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Featured Products Section */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-3xl font-bold">Featured Products</h2>
            <button
              className="flex items-center text-blue-600 hover:text-blue-800"
              onClick={() => navigate("/products")}
            >
              View All <ArrowRight size={16} className="ml-2" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
                      onClick={() => addToCart(product, product.colors[0])}
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

      {/* Promotional Banner */}
      <div className="bg-blue-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between">
          <div className="md:w-1/2 mb-8 md:mb-0 text-center md:text-left">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Summer Sale Up To 50% Off
            </h2>
            <p className="mb-6 text-lg">
              Discover this season's latest trends with our new collection
            </p>
            <button
              className="bg-white text-blue-600 px-8 py-3 rounded-md font-semibold hover:bg-gray-100 transition"
              onClick={() => navigate("/products")}
            >
              Shop Now
            </button>
          </div>
          <div className="md:w-1/2 flex justify-center">
            <img
              src="/api/placeholder/500/300"
              alt="Summer Sale"
              className="rounded-lg shadow-lg"
            />
          </div>
        </div>
      </div>

      {/* New Arrivals Section */}
      <div className="max-w-7xl mx-auto py-16 px-4">
        <h2 className="text-3xl font-bold text-center mb-12">New Arrivals</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {newArrivals.map((product) => (
            <div
              key={product.product_id}
              className="group cursor-pointer"
              onClick={() => viewProductDetails(product.product_id)}
            >
              <div className="mb-4 overflow-hidden rounded-lg">
                <img
                  src={
                    product.images[0]?.image_url || "/api/placeholder/400/500"
                  }
                  alt={product.name}
                  className="w-full h-96 object-cover group-hover:scale-105 transition duration-500"
                />
              </div>
              <h3 className="font-semibold text-lg">{product.name}</h3>
              <p className="text-gray-600">
                ${product.inventory[0]?.list_price}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Social Proof */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            What Our Customers Say
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((item) => (
              <div key={item} className="bg-white p-6 rounded-lg shadow">
                <div className="flex items-center mb-4">{renderStars(5)}</div>
                <p className="text-gray-600 mb-4">
                  "I absolutely love the quality of the products. The delivery
                  was fast and the customer service was excellent."
                </p>
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full bg-gray-200 mr-4"></div>
                  <div>
                    <h4 className="font-semibold">Sarah Johnson</h4>
                    <p className="text-sm text-gray-500">Verified Customer</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Newsletter Subscription */}
      <div className="py-16 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Join Our Newsletter</h2>
          <p className="mb-8 max-w-2xl mx-auto">
            Subscribe to our newsletter and be the first to receive updates on
            new arrivals, special offers, and exclusive events.
          </p>
          <div className="flex flex-col md:flex-row max-w-lg mx-auto">
            <input
              type="email"
              placeholder="Your email address"
              className="flex-1 p-3 rounded-l-md md:rounded-r-none rounded-r-md mb-2 md:mb-0 text-black"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button
              onClick={handleSubscribe}
              className="bg-blue-600 text-white py-3 px-6 rounded-r-md md:rounded-l-none rounded-l-md hover:bg-blue-700 transition"
            >
              Subscribe
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-100 pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-16">
            <div>
              <h3 className="font-bold text-xl mb-4">LOGO</h3>
              <p className="text-gray-600 mb-4">
                Your ultimate destination for premium fashion and lifestyle
                products.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-600 hover:text-blue-600">
                  <Facebook size={20} />
                </a>
                <a href="#" className="text-gray-600 hover:text-blue-600">
                  <Instagram size={20} />
                </a>
                <a href="#" className="text-gray-600 hover:text-blue-600">
                  <Twitter size={20} />
                </a>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Shop</h4>
              <ul className="space-y-2">
                <li>
                  <Link
                    to={Products}
                    href="#"
                    className="text-gray-600 hover:text-blue-600"
                  >
                    All Products
                  </Link>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-blue-600">
                    New Arrivals
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-blue-600">
                    Featured
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-blue-600">
                    Discounts
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-600 hover:text-blue-600">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-blue-600">
                    Contact
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-blue-600">
                    Careers
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-blue-600">
                    Privacy Policy
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-600 hover:text-blue-600">
                    FAQs
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-blue-600">
                    Shipping
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-blue-600">
                    Returns
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-blue-600">
                    Size Guide
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-200 pt-8">
            <p className="text-gray-600 text-center">
              © 2025 E-commerce Store. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

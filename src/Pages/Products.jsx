import { useEffect, useState } from "react";
import { ShoppingCart, Heart, Star, Search, Filter, X } from "lucide-react";
import Navbar from "./Navbar";
import { useCart } from "../Context/CartContext";
import Footer from "../Components/Footer";

export default function EcommerceHomepage() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [newArrivals, setNewArrivals] = useState([]);
  const [selectedColor, setSelectedColor] = useState({});
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState("");

  // Filter and search states
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [priceRange, setPriceRange] = useState({ min: 0, max: 1000 });
  const [sortBy, setSortBy] = useState("name");
  const [showFilters, setShowFilters] = useState(false);

  const { addToCart } = useCart();

  // Categories for filtering
  const categories = ["All", "Men", "Women", "Children", "Accessories"];

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch("http://localhost:3000/products");
        const data = await res.json(); // already the array
        setProducts(data);
        setFilteredProducts(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);
  // Filter and search logic
  useEffect(() => {
    let filtered = [...products];

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(
        (product) =>
          product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Category filter
    if (selectedCategory !== "All") {
      filtered = filtered.filter((product) => {
        // Simple category matching - you might need to adjust based on your product data structure
        return (
          product.name.toLowerCase().includes(selectedCategory.toLowerCase()) ||
          product.description
            .toLowerCase()
            .includes(selectedCategory.toLowerCase())
        );
      });
    }

    // Price range filter
    filtered = filtered.filter((product) => {
      const price = parseFloat(product.price || 0);
      return price >= priceRange.min && price <= priceRange.max;
    });

    // Sort products
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "name":
          return a.name.localeCompare(b.name);
        case "price-low":
          return (
            parseFloat(a.inventory[0]?.list_price || 0) -
            parseFloat(b.inventory[0]?.list_price || 0)
          );
        case "price-high":
          return (
            parseFloat(b.inventory[0]?.list_price || 0) -
            parseFloat(a.inventory[0]?.list_price || 0)
          );
        case "rating":
          return 4.5 - 4.5; // Since all products have same rating in demo
        default:
          return 0;
      }
    });

    setFilteredProducts(filtered);
  }, [products, searchTerm, selectedCategory, priceRange, sortBy]);

  const handleSubscribe = () => {
    if (email) {
      alert(`Thank you for subscribing with: ${email}`);
      setEmail("");
    }
  };

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedCategory("All");
    setPriceRange({ min: 0, max: 1000 });
    setSortBy("name");
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
          {/* Header with search */}
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 gap-4">
            <h2 className="text-3xl font-bold">All Products</h2>

            {/* Search Bar */}
            <div className="relative w-full lg:w-96">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Filter Controls */}
          <div className="mb-6">
            <div className="flex flex-wrap items-center gap-4 mb-4">
              {/* Mobile Filter Toggle */}
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="lg:hidden flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                <Filter className="w-4 h-4" />
                Filters
              </button>

              {/* Desktop Category Filters */}
              <div className="hidden lg:flex items-center gap-2">
                <span className="text-sm font-medium text-gray-700 mr-2">
                  Category:
                </span>
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                      selectedCategory === category
                        ? "bg-blue-600 text-white"
                        : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>

              {/* Sort Dropdown */}
              <div className="flex items-center gap-2 ml-auto">
                <span className="text-sm font-medium text-gray-700">
                  Sort by:
                </span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="name">Name</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Rating</option>
                </select>
              </div>
            </div>

            {/* Mobile/Collapsible Filters */}
            <div className={`${showFilters ? "block" : "hidden"} lg:block`}>
              <div className="bg-white p-4 rounded-lg border border-gray-200 mb-4">
                <div className="flex flex-col lg:flex-row gap-6">
                  {/* Mobile Category Filter */}
                  <div className="lg:hidden">
                    <h3 className="font-medium text-gray-700 mb-2">Category</h3>
                    <div className="flex flex-wrap gap-2">
                      {categories.map((category) => (
                        <button
                          key={category}
                          onClick={() => setSelectedCategory(category)}
                          className={`px-3 py-1 rounded-full text-sm transition ${
                            selectedCategory === category
                              ? "bg-blue-600 text-white"
                              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                          }`}
                        >
                          {category}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Price Range Filter */}
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-700 mb-2">
                      Price Range
                    </h3>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-600">Min:</span>
                        <input
                          type="number"
                          value={priceRange.min}
                          onChange={(e) =>
                            setPriceRange({
                              ...priceRange,
                              min: parseInt(e.target.value) || 0,
                            })
                          }
                          className="w-20 px-2 py-1 border border-gray-300 rounded text-sm"
                          min="0"
                        />
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-600">Max:</span>
                        <input
                          type="number"
                          value={priceRange.max}
                          onChange={(e) =>
                            setPriceRange({
                              ...priceRange,
                              max: parseInt(e.target.value) || 1000,
                            })
                          }
                          className="w-20 px-2 py-1 border border-gray-300 rounded text-sm"
                          min="0"
                        />
                      </div>
                      <button
                        onClick={clearFilters}
                        className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                      >
                        Clear All
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Results Count */}
          <div className="mb-4">
            <p className="text-gray-600">
              Showing {filteredProducts.length} of {products.length} products
              {searchTerm && (
                <span className="ml-2 text-blue-600">for "{searchTerm}"</span>
              )}
            </p>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <div
                key={product.product_id}
                className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={product.image_url || "/api/placeholder/300/300"}
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
                    <span className="text-lg font-bold">${product.price}</span>
                    <button
                      onClick={() => addToCart(product)}
                      className="bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700"
                    >
                      <ShoppingCart size={18} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* No Results */}
          {filteredProducts.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <Search className="w-12 h-12 mx-auto mb-4" />
                <h3 className="text-xl font-medium text-gray-900 mb-2">
                  No products found
                </h3>
                <p className="text-gray-600">
                  Try adjusting your search or filter criteria to find what
                  you're looking for.
                </p>
              </div>
              <button
                onClick={clearFilters}
                className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Clear All Filters
              </button>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}

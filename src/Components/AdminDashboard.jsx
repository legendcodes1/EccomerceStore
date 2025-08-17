import React, { useState } from "react";
import { useEffect } from "react";
import {
  Trash2,
  Plus,
  Edit,
  CheckCircle,
  Package,
  Users,
  DollarSign,
  TrendingUp,
  Search,
  Filter,
  MoreVertical,
  Eye,
  ShoppingCart,
} from "lucide-react";

// Mock data (replace with API calls later)

const initialUsers = [
  {
    id: 1,
    name: "Alice Johnson",
    email: "alice@example.com",
    cart: 2,
    orders: 12,
    totalSpent: 580,
    status: "Active",
    joinDate: "2024-01-15",
  },
  {
    id: 2,
    name: "Bob Smith",
    email: "bob@example.com",
    cart: 1,
    orders: 8,
    totalSpent: 320,
    status: "Active",
    joinDate: "2024-02-20",
  },
];

export default function AdminDashboard() {
  const currentProducts = useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch("http://localhost:3000/products");
        const data = await res.json(); // already the array
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    }

    fetchProducts();
  }, []);
  const [products, setProducts] = useState([]);
  const [users, setUsers] = useState(initialUsers);
  const [activeTab, setActiveTab] = useState("overview");
  const [searchTerm, setSearchTerm] = useState("");
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    brand: "",
    stock: "",
    category: "",
    image: "",
  });
  const [editingProductId, setEditingProductId] = useState(null);
  const [showAddProduct, setShowAddProduct] = useState(false);

  // Handle product input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewProduct((prev) => ({ ...prev, [name]: value }));
  };

  // Add new product
  const handleAddProduct = () => {
    const nextId = products.length + 1;
    setProducts([
      ...products,
      {
        id: nextId,
        ...newProduct,
        price: Number(newProduct.price),
        stock: Number(newProduct.stock),
        status: "Active",
        sales: 0,
      },
    ]);
    setNewProduct({
      name: "",
      price: "",
      brand: "",
      stock: "",
      category: "",
      image: "",
    });
    setShowAddProduct(false);
  };

  // Delete product
  const handleDelete = (id) => {
    setProducts(products.filter((p) => p.id !== id));
  };

  // Edit product
  const handleEdit = (product) => {
    setEditingProductId(product.id);
    setNewProduct({
      name: product.name,
      price: product.price,
      brand: product.brand,
      stock: product.stock,
      category: product.category,
      image: product.image,
    });
    setShowAddProduct(true);
  };

  // Save edited product
  const handleSaveEdit = () => {
    setProducts(
      products.map((p) =>
        p.id === editingProductId
          ? {
              ...p,
              ...newProduct,
              price: Number(newProduct.price),
              stock: Number(newProduct.stock),
            }
          : p
      )
    );
    setEditingProductId(null);
    setNewProduct({
      name: "",
      price: "",
      brand: "",
      stock: "",
      category: "",
      image: "",
    });
    setShowAddProduct(false);
  };

  // Calculate stats
  const totalProducts = products.length;
  const totalUsers = users.length;
  const totalRevenue = products.reduce((sum, p) => sum + p.price * p.sales, 0);
  const lowStockProducts = products.filter((p) => p.stock < 20).length;

  const stats = [
    {
      title: "Total Revenue",
      value: `$${totalRevenue.toLocaleString()}`,
      change: "+12.5%",
      icon: DollarSign,
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      title: "Total Products",
      value: totalProducts,
      change: "+3",
      icon: Package,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      title: "Total Users",
      value: totalUsers,
      change: "+8.2%",
      icon: Users,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
    },
    {
      title: "Low Stock Items",
      value: lowStockProducts,
      change: "-2",
      icon: TrendingUp,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
    },
  ];

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.brand.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Admin Dashboard
              </h1>
              <p className="text-gray-600 mt-1">Manage your e-commerce store</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="px-6 py-6">
        {/* Navigation Tabs */}
        <div className="mb-8">
          <nav className="flex space-x-8">
            {["overview", "products", "users"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-2 px-1 border-b-2 font-medium text-sm capitalize transition-colors ${
                  activeTab === tab
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                {tab}
              </button>
            ))}
          </nav>
        </div>

        {/* Overview Tab */}
        {activeTab === "overview" && (
          <div>
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">
                        {stat.title}
                      </p>
                      <p className="text-2xl font-bold text-gray-900 mt-1">
                        {stat.value}
                      </p>
                      <p
                        className={`text-sm mt-1 ${
                          stat.change.startsWith("+")
                            ? "text-green-600"
                            : "text-red-600"
                        }`}
                      >
                        {stat.change} from last month
                      </p>
                    </div>
                    <div
                      className={`${stat.bgColor} ${stat.color} p-3 rounded-lg`}
                    >
                      <stat.icon className="w-6 h-6" />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="text-lg font-semibold mb-4">
                  Recently Added Products
                </h3>
                <div className="space-y-4">
                  {products.slice(0, 3).map((product) => (
                    <div
                      key={product.id}
                      className="flex items-center space-x-4"
                    >
                      <img
                        src={product.image_url}
                        alt={product.name}
                        className="w-12 h-12 rounded-lg object-cover"
                      />
                      <div className="flex-1">
                        <p className="font-medium text-gray-900">
                          {product.name}
                        </p>
                        <p className="text-sm text-gray-500">{product.brand}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">${product.price}</p>
                        <p className="text-sm text-gray-500">
                          {product.stock} in stock
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="text-lg font-semibold mb-4">Top Customers</h3>
                <div className="space-y-4">
                  {users.slice(0, 3).map((user) => (
                    <div
                      key={user.id}
                      className="flex items-center justify-between"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold">
                          {user.name.charAt(0)}
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">
                            {user.name}
                          </p>
                          <p className="text-sm text-gray-500">
                            {user.orders} orders
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">${user.totalSpent}</p>
                        <div className="flex items-center text-sm text-gray-500">
                          <ShoppingCart className="w-4 h-4 mr-1" />
                          {user.cart}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Products Tab */}
        {activeTab === "products" && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">
                Products Management
              </h2>
              <button
                onClick={() => setShowAddProduct(true)}
                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Product
              </button>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
              {products.map((product) => (
                <div
                  key={product.id}
                  className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden group"
                >
                  <div className="relative">
                    <img
                      src={product.image_url}
                      alt={product.name}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-200"
                    />
                    <div className="absolute top-2 right-2">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          product.stock > 10
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {product.stock > 10 ? "In Stock" : "Low Stock"}
                      </span>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900 mb-1">
                      {product.name}
                    </h3>
                    <p className="text-sm text-gray-500 mb-2">
                      {product.brand}
                    </p>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-lg font-bold text-gray-900">
                        ${product.price}
                      </span>
                      <span className="text-sm text-gray-500">
                        {product.stock} units
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                      <span>{product.sales} sold</span>
                      <span className="capitalize">{product.category}</span>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(product)}
                        className="flex-1 flex items-center justify-center gap-1 px-3 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors"
                      >
                        <Edit className="w-4 h-4" />
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(product.id)}
                        className="flex-1 flex items-center justify-center gap-1 px-3 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Add/Edit Product Modal */}
            {showAddProduct && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                  <div className="p-6 border-b">
                    <h3 className="text-xl font-semibold">
                      {editingProductId ? "Edit Product" : "Add New Product"}
                    </h3>
                  </div>
                  <div className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Product Name
                        </label>
                        <input
                          name="name"
                          value={newProduct.name}
                          onChange={handleChange}
                          placeholder="Enter product name"
                          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Price
                        </label>
                        <input
                          name="price"
                          value={newProduct.price}
                          onChange={handleChange}
                          placeholder="0.00"
                          type="number"
                          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Brand
                        </label>
                        <input
                          name="brand"
                          value={newProduct.brand}
                          onChange={handleChange}
                          placeholder="Enter brand name"
                          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Stock Quantity
                        </label>
                        <input
                          name="stock"
                          value={newProduct.stock}
                          onChange={handleChange}
                          placeholder="0"
                          type="number"
                          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Category
                        </label>
                        <select
                          name="category"
                          value={newProduct.category}
                          onChange={handleChange}
                          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                          <option value="">Select category</option>
                          <option value="Clothing">Clothing</option>
                          <option value="Accessories">Accessories</option>
                          <option value="Electronics">Electronics</option>
                          <option value="Home">Home</option>
                        </select>
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Image URL
                        </label>
                        <input
                          name="image"
                          value={newProduct.image}
                          onChange={handleChange}
                          placeholder="https://example.com/image.jpg"
                          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="p-6 border-t flex gap-3 justify-end">
                    <button
                      onClick={() => {
                        setShowAddProduct(false);
                        setEditingProductId(null);
                        setNewProduct({
                          name: "",
                          price: "",
                          brand: "",
                          stock: "",
                          category: "",
                          image: "",
                        });
                      }}
                      className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={
                        editingProductId ? handleSaveEdit : handleAddProduct
                      }
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      {editingProductId ? "Save Changes" : "Add Product"}
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Users Tab */}
        {activeTab === "users" && (
          <div>
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                Users Management
              </h2>
              <p className="text-gray-600">
                Manage your customers and their information
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Customer
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Orders
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Total Spent
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Cart Items
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Join Date
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {users.map((user) => (
                      <tr key={user.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="w-10 h-10 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold mr-4">
                              {user.name.charAt(0)}
                            </div>
                            <div>
                              <div className="text-sm font-medium text-gray-900">
                                {user.name}
                              </div>
                              <div className="text-sm text-gray-500">
                                {user.email}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {user.orders}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          ${user.totalSpent}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center text-sm text-gray-900">
                            <ShoppingCart className="w-4 h-4 mr-1" />
                            {user.cart}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                            {user.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {user.joinDate}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

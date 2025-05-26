import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useCart } from "../Context/CartContext.jsx";
export default function ProductDetails() {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [selectedColor, setSelectedColor] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProduct() {
      const res = await fetch(
        "https://www.greatfrontend.com/api/projects/challenges/e-commerce/products"
      );
      const data = await res.json();
      const found = data.data.find((p) => p.product_id === id);
      setProduct(found);
      setSelectedColor(found?.colors[0] || "");
      setLoading(false);
    }

    fetchProduct();
  }, [id]);

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (!product) return <p className="text-center mt-10">Product not found</p>;

  return (
    <div className="max-w-2xl mx-auto p-4">
      <img
        src={product.images[0]?.image_url}
        alt={product.name}
        className="w-full h-72 object-cover rounded-lg"
      />
      <h1 className="text-2xl font-bold mt-4">{product.name}</h1>
      <p className="text-gray-600 mt-2">{product.description}</p>
      <p className="text-lg font-semibold mt-2">
        ${product.inventory[0]?.list_price}
      </p>

      <select
        className="mt-4 p-2 border rounded"
        value={selectedColor}
        onChange={(e) => setSelectedColor(e.target.value)}
      >
        {product.colors.map((color) => (
          <option key={color}>{color}</option>
        ))}
      </select>

      <button
        onClick={() => addToCart(product, selectedColor)}
        className="mt-4 block w-full bg-black text-white py-2 rounded hover:bg-gray-800 transition"
      >
        Add to Cart
      </button>
    </div>
  );
}

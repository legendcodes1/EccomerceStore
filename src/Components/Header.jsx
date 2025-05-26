import { FaShoppingCart } from "react-icons/fa";

export default function Header() {
  return (
    <header className="flex justify-end items-center p-4">
      <FaShoppingCart className="text-black text-2xl" />
      <p className="ml-2">Cart</p>
    </header>
  );
}

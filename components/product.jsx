import { useContext } from "react";
import { ProductContext } from "./ProductsContext";

const Product = (props) => {
  const { _id: id, name, description, price, picture } = props;

  const { setSelectedProducts } = useContext(ProductContext);

  const addProduct = () => {
    setSelectedProducts((prev) => [...prev, id]);
  };

  return (
    <div className="w-64 mb-7">
      <div className="bg-blue-100 p-5 rounded-xl">
        <img src={picture} alt="iphone" />
      </div>
      <div className="mt-2">
        <h3 className="font-bold text-lg">{name}</h3>
      </div>
      <p className="mt-1 text-sm leading-4 text-gray-500">{description}</p>
      <div className="flex flex-row justify-between mt-1">
        <div className="text-2xl font-bold">{`$${price}`}</div>
        <button
          onClick={addProduct}
          className="bg-emerald-400 py-1 px-3 text-white rounded-xl"
        >
          add to cart
        </button>
      </div>
    </div>
  );
};

export default Product;

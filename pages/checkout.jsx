import React, { useContext, useEffect, useState } from "react";
import Layout from "../components/Layout";
import { ProductContext } from "../components/ProductsContext";

const Checkout = () => {
  const { selectedProducts } = useContext(ProductContext);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const uniqIds = [...new Set(selectedProducts)];
    fetch("/api/products?ids=" + uniqIds.join(","))
      .then((response) => response.json())
      .then((json) => setProducts(json));
  }, [selectedProducts]);
  return (
    <Layout>
      {!products.length && <div>you have no product in your shopping cart</div>}
      {products.length &&
        products.map((product) => (
          <div className="flex mb-5">
            <div className="bg-gray-100 p-3 rounded-xl shrink-0">
              <img className="w-24" src={product.picture} alt={product.name} />
            </div>
            <div className="pl-4">
              <h3 className="font-bold text-lg">{product.name}</h3>
              <p className="text-sm leading-4 text-gray-500">
                {product.description}
              </p>
            </div>
          </div>
        ))}
    </Layout>
  );
};

export default Checkout;

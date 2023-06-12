import React, { useCallback, useContext, useEffect, useState } from "react";
import Layout from "../components/Layout";
import { ProductContext } from "../components/ProductsContext";
import { useForm } from "react-hook-form";

const Checkout = () => {
  const { selectedProducts, setSelectedProducts } = useContext(ProductContext);
  const [products, setProducts] = useState([]);

  const { register, handleSubmit, setValue, watch } = useForm({
    defaultValues: {
      address: "",
      city: "",
      name: "",
      email: "",
      cart: [""],
    },
  });

  useEffect(() => {
    let uniqIds = [...new Set(selectedProducts)];
    const allSelectedProducts = selectedProducts.join(",");
    setValue("cart", allSelectedProducts);
    console.log(uniqIds);
    fetch("/api/products?ids=" + uniqIds.join(","))
      .then((response) => response.json())
      .then((json) => setProducts(json));
  }, [selectedProducts]);

  const addProduct = (id) => {
    setSelectedProducts((prev) => [...prev, id]);
  };

  const allSelectedProducts = selectedProducts.join(",");

  const productsWatch = watch("cart");

  const onSubmit = (data) => {
    setValue("cart.0", allSelectedProducts);
    console.log(data);
  };

  const reduceProduct = (id) => {
    const pos = selectedProducts.indexOf(id);

    if (pos !== -1) {
      setSelectedProducts((prev) => prev.filter((val, ind) => ind !== pos));
    }
  };

  let subTotal = 0;
  const delivery = 5;

  if (selectedProducts?.length > 0) {
    selectedProducts.forEach((id) => {
      const product = products.find((item) => id === item._id);
      //   console.log(product);
      //   console.log(products);

      let itemPrice = product?.price || 0;
      subTotal += itemPrice;
    });
  }

  const totalPrice = subTotal + delivery;

  return (
    <Layout>
      {!products.length && <div>you have no product in your shopping cart</div>}
      {products.length &&
        products.map((product) => {
          const amount = selectedProducts.filter(
            (id) => id === product._id
          ).length;
          if (amount === 0) return;
          return (
            <div key={product._id} className="flex mb-5">
              <div className="bg-gray-100 p-3 rounded-xl shrink-0">
                <img
                  className="w-24"
                  src={product.picture}
                  alt={product.name}
                />
              </div>
              <div className="pl-4">
                <h3 className="font-bold text-lg">{product.name}</h3>
                <p className="text-sm leading-4 text-gray-500">
                  {product.description}
                </p>
                <div className="flex justify-between mt-2	">
                  <div>${product.price}</div>
                  <div className="flex flex-row">
                    <button
                      onClick={() => reduceProduct(product._id)}
                      className="w-6 h-6 flex items-center justify-center  border border-emerald-500 px-2 rounded-full"
                    >
                      -
                    </button>
                    <div className="px-3">
                      {
                        selectedProducts.filter((id) => id === product._id)
                          .length
                      }
                    </div>
                    <button
                      onClick={() => addProduct(product._id)}
                      className="w-6 h-6 flex items-center justify-center  bg-emerald-500 px-2 rounded-full text-white"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}

      <form action="" method="post">
        <div className="flex flex-col gap-4">
          <input
            {...register("address")}
            className="bg-gray-100 w-full px-4 py-2 rounded-xl"
            type="text"
            placeholder="Enter street address"
          />
          <input
            {...register("city")}
            className="bg-gray-100 w-full px-4 py-2 rounded-xl"
            type="text"
            placeholder="Enter city "
          />
          <input
            {...register("name")}
            className="bg-gray-100 w-full px-4 py-2 rounded-xl"
            type="text"
            placeholder="Enter name "
          />
          <input
            {...register("email")}
            className="bg-gray-100 w-full px-4 py-2 rounded-xl"
            type="text"
            placeholder="Enter email "
          />
        </div>
        <div className="mt-5 flex flex-col gap-2">
          <div className="flex flex-row justify-between">
            <h3 className="font-bold text-gray-400">Subtotal: </h3>
            <h3 className="font-bold">$ {subTotal}</h3>
          </div>
          <div className="flex flex-row justify-between">
            <h3 className="font-bold text-gray-400">Delivery: </h3>
            <h3 className="font-bold">$ {delivery}</h3>
          </div>
          <div className="flex flex-row justify-between border-t-2 border-t-emerald-500 ">
            <h3 className="font-bold text-gray-400">Total: </h3>
            <h3 className="font-bold">$ {totalPrice}</h3>
          </div>
        </div>

        <button
          onClick={handleSubmit(onSubmit)}
          className="bg-emerald-500 w-full py-2 rounded-lg mt-4 text-white font-semibold shadow-emerald-900 shadow-md"
        >
          Pay ${totalPrice}
        </button>
      </form>
    </Layout>
  );
};

export default Checkout;

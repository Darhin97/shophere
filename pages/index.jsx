import { useEffect, useState } from "react";
import Product from "../components/product";
import { initMongoose } from "../lib/mongoose";
import { findAllProducts } from "./api/products";
import Footer from "../components/footer";
import Layout from "../components/Layout";

export default function Home({ products }) {
  const [search, setSearch] = useState("");

  const categoryNames = [
    ...new Set(products.map((product) => product.category)),
  ];

  if (search) {
    products = products.filter((product) =>
      product.name.toLowerCase().includes(search)
    );
  }

  return (
    <Layout>
      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        type="text"
        placeholder="search product here"
        className="w-full bg-gray-100 py-2 px-4 rounded-xl"
      />
      <div>
        {categoryNames.map((category) => (
          <div key={category}>
            {products.find((product) => product.category === category) && (
              <div>
                <h2 className="text-2xl capitalize my-4">{category}</h2>
                <div className="flex flex-row gap-5 -mx-5 overflow-x-scroll snap-x scrollbar-hide">
                  {products
                    .filter((prod) => prod.category === category)
                    .map((product) => (
                      <div key={product._id} className="px-5 snap-start">
                        <Product {...product} />
                      </div>
                    ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </Layout>
  );
}

export async function getServerSideProps() {
  await initMongoose();
  const products = await findAllProducts();
  return {
    props: {
      products: JSON.parse(JSON.stringify(products)),
    },
  };
}

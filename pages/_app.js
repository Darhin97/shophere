import { ProductContextProvider } from "../components/ProductsContext";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <ProductContextProvider>
      <Component {...pageProps} />
    </ProductContextProvider>
  );
}

export default MyApp;

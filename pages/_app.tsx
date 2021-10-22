import * as React from "react";
import { Provider } from "react-redux";
import Layout from "../components/Layout";
import { store } from "../stores";

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  );
}

export default MyApp;

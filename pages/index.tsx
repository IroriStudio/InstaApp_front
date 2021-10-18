import { Provider } from "react-redux";
import Layout from "../components/Layout";
import Main from "../components/templates/Main";

import { store } from "../stores";

const IndexPage = () => (
  <Provider store={store}>
    <Layout>
      <Main />
    </Layout>
  </Provider>
);

export default IndexPage;

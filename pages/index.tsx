import Link from "next/link";
import { Provider } from "react-redux";
import Layout from "../components/Layout";
import Core from "../features/core/Core";
import { store } from "../stores";
import styles from "./index.module.css";

const IndexPage = () => (
  <Provider store={store}>
    <div className={styles.app}>
      <Core />
    </div>
  </Provider>
);

export default IndexPage;

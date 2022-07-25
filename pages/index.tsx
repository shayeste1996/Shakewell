import type { NextPage } from "next";
import styles from "../styles/Home.module.css";
import useTranslation from "next-translate/useTranslation";

const Home: NextPage = () => {
  const { t } = useTranslation("common");
  return <div className={styles.container}>index page</div>;
};

export default Home;

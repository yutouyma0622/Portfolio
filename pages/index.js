import Head from "next/head";
import Image from "next/image";
import Entry from "../components/Entry"; //追加のentryコンポーメント
import styles from "../styles/Home.module.css";

export default function Home(props) {
  console.log(props);
  return (
    <div>
      <Head>
        <title>Portfolio</title>
        <meta name="description" content="" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header>
        <h1>Portfolio</h1>
      </header>

      <main>
        {/* 取得した記事分回してEntryコンポーネント表示する */}
        {props.entries.contents.map((entry) => {
          return <Entry entry={entry}></Entry>;
        })}
      </main>

      <footer>
        <p>
          <small>&copy; yuto062246</small>
        </p>
      </footer>
    </div>
  );
}

import { client } from "../utils/client";

export const getStaticProps = async () => {
  const [entries] = await Promise.all([
    client.get({
      endpoint: "entries",

      queries: {
        orders: "-publishedAt",

        offset: 0,

        limit: 10,

        // fields: 'id,title,categories,tags,publishedAt,image,description'
      },
    }),
  ]);

  return {
    props: {
      entries,
    },
  };
};
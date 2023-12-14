import { BlogList, Footer, Navbar } from "@/components";
import { getAllPublished } from "@/lib/notion";
import Head from "next/head";

export default function Home({ posts }) {
  if (!posts)
    return (
      <>
        <BlogSkelton />
      </>
    );

  return (
    <div className="">
      <Head>
        <title>Azar - Blogs 🚀</title>
        <meta name="description" content="Welcome to Azar Blogs" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <>
        <Navbar />
        <main className="2xl:px-24 p-8">
          <BlogList posts={posts} />
        </main>
        <Footer/>
      </>
    </div>
  );
}

export const getStaticProps = async () => {
  const data = await getAllPublished();
  return {
    props: {
      posts: data,
    },
    revalidate: 60,
  };
};

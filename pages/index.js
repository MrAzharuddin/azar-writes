import BlogCard from "@/components/blogCard";
import BlogCard2 from "@/components/blogCard2";
import { getAllPublished } from "@/lib/notion";
import Head from "next/head";

export default function Home({ posts }) {
  if (!posts) return <h1>No posts</h1>;

  return (
    <div className="">
      <Head>
        <title>Azar - Blogs 🚀</title>
        <meta name="description" content="Welcome to Azar Blogs" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="2xl:p-24 p-8">
        <h1>Blog</h1>
        <div className="flex justify-center items-stretch 2xl:gap-24 lg:gap-12 gap-8 flex-wrap" >
          {posts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
      </main>
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

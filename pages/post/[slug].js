import { getAllPublished, getSingleBlogPost } from "@/lib/notion";
import Head from "next/head";
import Link from "next/link";
import React from "react";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import remarkGfm from "remark-gfm";

function Post({ post }) {
  //   console.log(post.post);
  return (
    <>
      <Head>
        <title>{post.post.title}</title>
        <meta
          name={"description"}
          title={"description"}
          content={post.post.description}
        />
        <meta name={"og:title"} title={"og:title"} content={post.post.title} />
        <meta
          name={"og:description"}
          title={"og:description"}
          content={post.post.description}
        />
        <meta name={"og:image"} title={"og:image"} content={post.post.cover} />
      </Head>
      <section>
        <div>
          <div className="p-8">
            <Link href="/" className="flex items-center gap-4">
              <img src="/larrow.svg" className="w-6" />
              <span>
                <p>Back</p>
              </span>
            </Link>
          </div>
        </div>
        <article>
          <ReactMarkdown className="markdown" remarkPlugins={[remarkGfm]}>
            {post.markdown}
          </ReactMarkdown>
        </article>
      </section>
    </>
  );
}

export default Post;

export const getStaticPaths = async () => {
  const posts = await getAllPublished();
  const paths = posts.map(({ slug }) => ({ params: { slug } }));

  // console.log(paths);
  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps = async ({ params }) => {
  const post = await getSingleBlogPost(params.slug);
  // console.log(post);
  return {
    props: {
      post,
    },
    revalidate: 60,
  };
};

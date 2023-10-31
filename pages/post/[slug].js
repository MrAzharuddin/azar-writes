import codeHighlighter from "@/components/codeHighlighter";
import { getAllPublished, getSingleBlogPost } from "@/lib/notion";
import Head from "next/head";
import Link from "next/link";
import React from "react";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import readingTime from "reading-time";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";

const removeUndefinedAndConcat = (text) => {
  const contentWithoutUndefined = text.replace(/undefined/g, '');
  return contentWithoutUndefined.trim();
};

function Post({ post }) {
  console.log(post.post);
  const result = removeUndefinedAndConcat(post.markdown.parent);
  // console.log(result);
  // console.log(readingTime(post.markdown));
  let readtime = readingTime(post.markdown.parent)
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
        <article className="markdown">
          {/* Title */}
          <h1 className="font-black">{post.post.title}</h1>
          {/* Tags */}
          <div>
            <div className="p-8 flex justify-between items-center">
              {/* <Link href="/" className="flex items-center gap-2 no-underline">
                <img src="/larrow.svg" className="w-4" />
                <span>
                  <p className="no-underline">Back</p>
                </span>
              </Link> */}
              <div>
                <div>
                  <p>Author: Azar M</p>
                </div>
                <div className="flex items-center gap-2 divide-x-2 divide-black/60">
                  <p className="md:text-lg text-sm font-semibold">{post.post.created_time}</p>
                  <p className="md:text-base text-xs pl-2">{readtime.text}</p>
                </div>
              </div>
            </div>
          </div>
          <ReactMarkdown
            className="prose lg:prose-xl"
            components={{
              code: codeHighlighter,
            }}
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeRaw]}
          >
            {result}
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
  return {
    props: {
      post,
    },
    revalidate: 60,
  };
};

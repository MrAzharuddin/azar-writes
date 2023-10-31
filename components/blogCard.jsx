import Link from "next/link";
import React from "react";

function BlogCard({ post }) {
  let imageurl = post.cover.url ? (post.cover.url) : post.cover
  // console.log(post);
  return (
    <Link className="w-full pb-8 2xl:max-w-[25vw] lg:max-w-[35vw] sm:max-w-[55vw] rounded-2xl space-y-4 shadow-[0px_20px_20px_10px_#00000024]" href={`post/${post.slug}`}>
      <div>
        <img className="w-full object-cover h-80 rounded-t-2xl" src={imageurl} alt="" />
      </div>
      <div className="pt-4 px-12 space-y-2.5">
        <p className="text-cyan-700 font-semibold">{post.date}</p>
        <h1 className="font-bold text-2xl">{post.title}</h1>
        <p className="text-slate-500 font-semibold line-clamp-3">{post.description}</p>
      </div>
    </Link>
  );
}

export default BlogCard;

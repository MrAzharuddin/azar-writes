import Link from "next/link";
import React from "react";

function BlogCard({ post }) {
  let imageurl = post?.cover?.url ? post?.cover?.url : post?.cover;
  return (
    <div>
      <img
        className="relative z-10 object-cover w-full rounded-md h-96 shadow-xl"
        src={imageurl}
        alt=""
      />

      <div className="relative z-20 max-w-lg p-6 mx-auto -mt-20 bg-white rounded-md shadow dark:bg-gray-900">
        <Link
          href={`/post/${post.slug}`}
          className="font-semibold text-gray-800 hover:underline dark:text-white md:text-xl"
        >
          {post.title}
        </Link>

        <p className="mt-3 text-sm text-gray-500 dark:text-gray-300 md:text-sm  line-clamp-2">
          {post?.description}
        </p>

        <p className="mt-3 text-sm text-blue-500">{post.date}</p>
      </div>
    </div>
  );
}

export default BlogCard;

import { NotionToMarkdown } from "notion-to-md";

const { Client } = require("@notionhq/client");

const notion = new Client({
  auth: process.env.NOTION_ACCESS_TOKEN,
});

const n2m = new NotionToMarkdown({
  notionClient: notion,
});

export const getAllPublished = async () => {
  const posts = await notion.databases.query({
    database_id: process.env.NOTION_BLOG_DATABASE_ID,
    filter: {
      property: "Published",
      checkbox: {
        equals: true,
      },
    },
    sorts: [
      {
        property: "Updated",
        direction: "descending",
      },
    ],
  });

  const allPosts = posts.results;

  return allPosts.map((post) => {
    return getPageMetaData(post);
  });
};

export const getSingleBlogPost = async (slug) => {
  let post, markdown;
  const response = await notion.databases.query({
    database_id: process.env.NOTION_BLOG_DATABASE_ID,
    filter: {
      property: "Slug",
      formula: {
        string: {
          equals: slug, // slug
        },
      },
      // add option for tags in the future
    },
    sorts: [
      {
        property: "Updated",
        direction: "descending",
      },
    ],
  });

  if (!response.results[0]) {
    throw "No results available";
  }

  // grab page from notion
  const page = response.results[0];

  const mdBlocks = await n2m.pageToMarkdown(page.id);
  markdown = n2m.toMarkdownString(mdBlocks);
  post = getPageMetaData(page);

  return {
    post,
    markdown,
  };
};

const getPageMetaData = (post) => {
  let cover = post.cover;
//   console.log(cover);
  switch (cover.type) {
    case "file":
      cover = post.cover.file;
      break;
    case "external":
      cover = post.cover.external.url;
      break;
    default:
      // Add default cover image if you want...
      cover = "";
  }
  const getTags = (tags) => {
    const allTags = tags.map((tag) => {
      return tag.name;
    });

    return allTags;
  };

  return {
    id: post.id,
    cover: cover,
    title: post.properties.Name.title[0].plain_text,
    tags: getTags(post.properties.Tags.multi_select),
    description: post.properties.Description.rich_text[0].plain_text,
    date: getToday(post.properties.Updated.last_edited_time),
    slug: post.properties.Slug.formula.string,
  };
};

function getToday(datestring) {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  let date = new Date();

  if (datestring) {
    date = new Date(datestring);
  }

  const day = date.getDate();
  const month = months[date.getMonth()];
  const year = date.getFullYear();
  let today = `${month} ${day}, ${year}`;

  return today;
}

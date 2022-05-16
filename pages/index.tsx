import React from "react";
import { GetServerSideProps } from "next";
import Layout from "../components/Layout";
import Post, { PostProps } from "../components/Post";

//useSWR allows the use of SWR inside function components
import useSWR from "swr";

// pages/index.tsx
import prisma from "../lib/prisma";

export const getServerSideProps: GetServerSideProps = async () => {
  const feed = await prisma.post.findMany({
    where: { published: true },
    include: {
      author: {
        select: { name: true },
      },
    },
  });
  return { props: { feed } };
};

//Write a fetcher function to wrap the native fetch function and return the result of a call to url in json format
const fetcher = (url) => fetch(url).then((res) => res.json());

// export default function Index() {
//   //Set up SWR to run the fetcher function when calling "/api/staticdata"
//   //There are 3 possible states: (1) loading when data is null (2) ready when the data is returned (3) error when there was an error fetching the data
//   const { data, error } = useSWR("/api/staticdata", fetcher);

//   //Handle the error state
//   if (error) return <div>Failed to load</div>;
//   //Handle the loading state
//   if (!data) return <div>Loading...</div>;
//   //Handle the ready state and display the result contained in the data object mapped to the structure of the json file
//   return (
//     <div>
//       <h1>My Framework from file</h1>
//       <ul>
//         <li>Name: {data.record.name}</li>
//         <li>Language: {data.record.language}</li>
//       </ul>
//     </div>
//   );
// }

type Props = {
  feed: PostProps[];
};

const Blog: React.FC<Props> = (props) => {
  return (
    <Layout>
      <div className="page">
        <h1>Public Feed</h1>
        <main>
          {props.feed.map((post) => (
            <div key={post.id} className="post">
              <Post post={post} />
            </div>
          ))}
        </main>
      </div>
      <style jsx>{`
        .post {
          background: white;
          transition: box-shadow 0.1s ease-in;
        }

        .post:hover {
          box-shadow: 1px 1px 3px #aaa;
        }

        .post + .post {
          margin-top: 2rem;
        }
      `}</style>
    </Layout>
  );
};

export default Blog;

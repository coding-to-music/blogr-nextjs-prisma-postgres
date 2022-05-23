import React from "react";
import { GetServerSideProps } from "next";
import Layout from "../components/Layout";
import Street, { StreetProps } from "../components/Street";

// import prisma from "../lib/prisma";
import prisma2 from "../lib/prisma2";

export const getServerSideProps: GetServerSideProps = async () => {
  const feed = await prisma2.street.findMany({
    // where: { published: true },
    // include: {
    //   author: {
    //     select: { name: true },
    //   },
    // },
  });
  return { props: { feed } };
};

type Props = {
  feed: StreetProps[];
};

const Blog: React.FC<Props> = (props) => {
  return (
    <Layout>
      <div className="page">
        <h1>Street List</h1>
        <main>
          {props.feed.map((street) => (
            <div key={street.id} className="street">
              <Street street={street} />
            </div>
          ))}
        </main>
      </div>
      <style jsx>{`
        .street {
          background: white;
          transition: box-shadow 0.1s ease-in;
        }

        .street:hover {
          box-shadow: 1px 1px 3px #aaa;
        }

        .street + .street {
          margin-top: 2rem;
        }
      `}</style>
    </Layout>
  );
};

export default Blog;

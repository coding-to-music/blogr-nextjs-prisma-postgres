// pages/streets.tsx

import React from "react";
import { GetServerSideProps } from "next";
import { useSession, getSession } from "next-auth/react";
import prisma from "../lib/prisma";

//useSWR allows the use of SWR inside function components
import useSWR from "swr";
import Layout from "../components/Layout";
import Street, { StreetProps } from "../components/Street";

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session = await getSession({ req });
  if (!session) {
    res.statusCode = 403;
    return { props: { streets: [] } };
  }

  const streets = await prisma.street.findMany({
    // where: {
    //   author: { email: session.user.email },
    //   published: false,
    // },
    // include: {
    //   author: {
    //     select: { name: true },
    //   },
    // },
  });
  return {
    props: { streets },
  };
};

type Props = {
  streets: StreetProps[];
};

//Write a fetcher function to wrap the native fetch function and return the result of a call to url in json format
const fetcher = (url) => fetch(url).then((res) => res.json());

// export default function Index() {

const Streetdata: React.FC<Props> = (props) => {
  //Set up SWR to run the fetcher function when calling "/api/staticdata"
  //There are 3 possible states: (1) loading when data is null (2) ready when the data is returned (3) error when there was an error fetching the data
  const { data, error } = useSWR("/api/streetdata", fetcher);

  //Handle the error state
  if (error) return <div>Failed to load</div>;
  //Handle the loading state
  if (!data) return <div>Loading...</div>;
  //Handle the ready state and display the result contained in the data object mapped to the structure of the json file
  return (
    <Layout>
      <div className="page">
        <h1>Streetdata</h1>
        <main>
          {/* {props.streets.map((street) => (
            <div key={street.id} className="street">
              <Street street={street} />
            </div>
          ))} */}
        </main>
      </div>
      <div>
        <h1>JSON from streets.json file</h1>
        <ul>
          <li>name: {data.record.name}</li>
          <li>from: {data.record.from}</li>
          <li>to: {data.record.to}</li>
          <li>width: {data.record.width}</li>
          <li>length: {data.record.length}</li>
          <li>date: {data.record.date}</li>
          <li>non-city: {data.record.noncity}</li>
          <li>unnaccepted-length: {data.record.unnacceptedlength}</li>
        </ul>
      </div>

      <style jsx>{`
        .post {
          background: var(--geist-background);
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

export default Streetdata;

// <div className="page">
// <h1>Streetdata</h1>
// <main>
//   {props.drafts.map((post) => (
//     <div key={post.id} className="post">
//       <Post post={post} />
//      </div>
//   ))}
// </main>

// </div>

// Sample Data

// {
//   "record": {
//     "id": 8221,
//     "uid": "a15c1f1d-9e4e-4dc7-9c45-c04412fc5064",
//     "name": "Next.js",
//     "language": "JavaScript"
//   }
// }

// {
//   "name": "ABERDEEN AVE",
//   "from": "MT AUBURN",
//   "to": "HURON AVE",
//   "width": "100",
//   "length": "1280",
//   "date": "1895",
//   "non-city": " "
// },
// {
//   "name": "ABERDEEN CT",
//   "from": "ABERDEEN",
//   "to": "EASTERLY",
//   "width": "29.33",
//   "unnaccepted-length": "100",
//   "non-city": "X"
// },

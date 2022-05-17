import React from "react";
import Router from "next/router";
// import ReactMarkdown from "react-markdown";

export type StreetProps = {
  id: String;
  name: String;
  from: String;
  to: String;
  width: String;
  length: String;
  date: String;
  noncity: String;
  unnacceptedlength: String;
};

const Street: React.FC<{ street: StreetProps }> = ({ street }) => {
  //   const authorName = post.author ? post.author.name : "Unknown author";
  return (
    <div onClick={() => Router.push("/p/[id]", `/p/${street.id}`)}>
      <h2>{street.name}</h2>
      {/* <small>By {authorName}</small> */}
      {/* <ReactMarkdown children={street.content} /> */}
      <style jsx>{`
        div {
          color: inherit;
          padding: 2rem;
        }
      `}</style>
    </div>
  );
};

export default Street;

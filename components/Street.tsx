import React, { Key } from "react";
import Router from "next/router";
// import ReactMarkdown from "react-markdown";

// model Street {
//   id                Int       @id @default(autoincrement())
//   name              String?
//   from              String?
//   to                String?
//   width             String?
//   length            String?
//   date              String?
//   noncity           String?
//   unnacceptedlength String?
//   area              Int?      @default(0)
//   createdAt         DateTime  @default(now()) @map(name: "created_at")
//   updatedAt         DateTime  @default(now()) @map(name: "updated_at")
//   @@map(name: "street")
// }

// export type PostProps = {
//   id: string;
//   title: string;
//   author: {
//     name: string;
//     email: string;
//   } | null;
//   content: string;
//   published: boolean;
// };

export type StreetProps = {
  id: Key;
  name: String;
  from: String;
  to: String;
  width: String;
  length: String;
  date: String;
  noncity: String;
  unnacceptedlength: String;
  area: Number;
  createdAt: Date;
  updatedAt: Date;
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

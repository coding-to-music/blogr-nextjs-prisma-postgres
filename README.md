# blogr-nextjs-prisma-postgres

# 🚀 Javascript full-stack 🚀

https://github.com/coding-to-music/blogr-nextjs-prisma-postgres

https://blogr-nextjs-prisma-postgres.vercel.app

https://blogr-nextjs-prisma-postgres.vercel.app/api/auth

By Vercel NextJS Guide

https://vercel.com/guides/nextjs-prisma-postgres

## Environment Values

```java
DATABASE_URL: Copy this value directly from your .env file
GITHUB_ID: Set this to the Client ID of the GitHub OAuth app you just created
GITHUB_SECRET: Set this to the Client Secret of the GitHub OAuth app you just created
NEXTAUTH_URL: Set this to the Authorization Callback URL of the GitHub OAuth app you just created
```

## GitHub

```java
git init
git add .
git remote remove origin
git commit -m "first commit"
git branch -M main
git remote add origin git@github.com:coding-to-music/blogr-nextjs-prisma-postgres.git
git push -u origin main
vercel --prod --confirm
```

https://vercel.com/guides/nextjs-prisma-postgres

## Step 3. Install and generate Prisma Client

Before you can access your database from Next.js using Prisma, you first need to install Prisma Client in your app. You can install it via npm as follows:

```java
npm install @prisma/client
```

Install the Prisma Client package.

Because Prisma Client is tailored to your own schema, you need to update it every time your Prisma schema file is changing by running the following command:

```java
npx prisma generate
```

Regenerate your Prisma Schema.

Output

```java
Environment variables loaded from .env
Prisma schema loaded from prisma/schema.prisma

✔ Generated Prisma Client (3.14.0 | library) to ./node_modules/@prisma/client in 147ms
You can now start using Prisma Client in your code. Reference: https://pris.ly/d/client


import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

```

# Fullstack Authentication Example with Next.js and NextAuth.js

This is the starter project for the fullstack tutorial with Next.js and Prisma. You can find the final version of this project in the [`final`](https://github.com/prisma/blogr-nextjs-prisma/tree/final) branch of this repo.

# How to Build a Fullstack App with Next.js, Prisma, and PostgreSQL

Create a fullstack application with Next.js, Prisma, PostgreSQL, and deploy to Vercel.

- Prisma is a next-generation ORM that can be used to access a database in Node.js and TypeScript applications. In this guide, you'll learn how to implement a fullstack sample blogging application using the following technologies:
- Next.js as the React framework
- Next.js API routes for server-side API routes as the backend
- Prisma as the ORM for migrations and database access
- PostgreSQL as the database
- NextAuth.js for authentication via GitHub (OAuth)
- TypeScript as the programming language
- Vercel for deployment

You'll take advantage of the flexible rendering capabilities of Next.js by using Static-Site Generation (SSG) and Server-Side Rendering (SSR) where it makes sense. At the end, you will deploy the app to Vercel.

## Prerequisites

To successfully finish this guide, you'll need:

- Node.js
- A PostgreSQL Database (set up a free PostgreSQL database on Heroku)
- A GitHub Account (to create an OAuth app)
- A Vercel Account (to deploy the app)

## Step 1: Set up your Next.js starter project

Navigate into a directory of your choice and run the following command in your terminal to set up a new Next.js project:

```java
npx create-next-app --example https://github.com/prisma/blogr-nextjs-prisma/tree/main blogr-nextjs-prisma
```

- Create and download the starter project from the repo into a new folder.
  You can now navigate into the directory and launch the app:

```java
cd blogr-nextjs-prisma && npm run dev
```

Start the Next.js application at https://localhost:3000.
Here's what it looks like at the moment:

![image](https://github.com/coding-to-music/blogr-nextjs-prisma-postgres/blob/main/images/1.png?raw=true)

Current state of the application.

The app currently displays hardcoded data that's returned from getStaticProps in the index.ts file. Over the course of the next few sections, you'll change this so that the data is returned from an actual database.

## Step 2: Set up Prisma and connect your PostgreSQL database

For the purpose of this guide, you'll use a free PosgtreSQL database hosted on Heroku. Follow the steps in this guide to create one.

Alternatively, you can also use a local PostgreSQL database. However, once you reach the deployment step of this guide, you'll need a hosted database so that it can be accessed from the application when it's deployed on Vercel.

Next, you will set up Prisma and connect it to your PostgreSQL database. Start by installing the Prisma CLI via npm:

```java
npm install prisma --save-dev
```

- Install the Prisma CLI.

Now, you can use the Prisma CLI to bootstrap a basic Prisma setup using the following command:

```java
npx prisma init
```

Initialize Prisma inside your application.

This command does two things:

- Creates a new directory called prisma containing a schema.prisma file – the Prisma schema. This file will contain your database connection variable and your database schema
- Creates a .env in the root directory of the project: A dotenv file to define the database connection URL and other sensitive info as environment variables

Open the .env file and replace the dummy connection URL with the connection URL of your PostgreSQL database. For example, if your database is hosted on Heroku, the URL might look as follows:

```java
// .env
DATABASE_URL: Copy this value directly from your .env file
GITHUB_ID: Set this to the Client ID of the GitHub OAuth app you just created
GITHUB_SECRET: Set this to the Client Secret of the GitHub OAuth app you just created
NEXTAUTH_URL: Set this to the Authorization Callback URL of the GitHub OAuth app you just created
```

An example of your Database connection URL string.

```java
Note: If your database is hosted on Heroku, you can directly copy the connection URL when viewing the credentials of your database as described here.
```

## Step 3. Create your database schema with Prisma

In this step, you'll create the tables in your database using the Prisma CLI.

Add the following model definitions to your schema.prisma so that it looks like this:

```java
// schema.prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}

model Post {
  id        String     @default(cuid()) @id
  title     String
  content   String?
  published Boolean @default(false)
  author    User?   @relation(fields: [authorId], references: [id])
  authorId  String?
}

model User {
  id            String       @default(cuid()) @id
  name          String?
  email         String?   @unique
  createdAt     DateTime  @default(now()) @map(name: "created_at")
  updatedAt     DateTime  @updatedAt @map(name: "updated_at")
  posts         Post[]
  @@map(name: "users")
}
```

The Prisma schema.

- Note: You're occasionally using `@map`and `@@map`to map some field and model names to different column and table names in the underlying database. This is because NextAuth.js has some specialrequirements for calling things in your database a certain way.

This Prisma schema defines two models, each of which will map to a table in the underlying database: User and Post. Notice that there's also a relation (one-to-many) between the two models, via the author field on Post and the posts field on User.

To actually create the tables in your database, you now can use the following command of the Prisma CLI:

```java
npx prisma db push
```

Create the tables in your database based on your Prisma schema.

You should see the following output:

```java
Environment variables loaded from /Users/nikolasburk/Desktop/nextjs-guide/blogr-starter/.env
```

Prisma schema loaded from prisma/schema.prisma

```java
🚀 Your database is now in sync with your schema. Done in 2.10s
Output from pushing your Prisma schema to your database.
Congratulations, the tables have been created! Go ahead and add some initial dummy data using Prisma Studio. Run the following command:

npx prisma studio
```

Open Prisma Studio, a GUI for modifying your database.

Use Prisma Studio's interface to create a new User and Post record and connect them via their relation fields.

![image](https://github.com/coding-to-music/blogr-nextjs-prisma-postgres/blob/main/images/2.png?raw=true)

Create a new `User` record

![image](https://github.com/coding-to-music/blogr-nextjs-prisma-postgres/blob/main/images/3.png?raw=true)

Create a new `Post` record and connect it to the `User` record

## Step 3. Install and generate Prisma Client

Before you can access your database from Next.js using Prisma, you first need to install Prisma Client in your app. You can install it via npm as follows:

```java
npm install @prisma/client
```

Install the Prisma Client package.

Because Prisma Client is tailored to your own schema, you need to update it every time your Prisma schema file is changing by running the following command:

```java
npx prisma generate
```

Regenerate your Prisma Schema.

Output

```java
Environment variables loaded from .env
Prisma schema loaded from prisma/schema.prisma

✔ Generated Prisma Client (3.14.0 | library) to ./node_modules/@prisma/client in 147ms
You can now start using Prisma Client in your code. Reference: https://pris.ly/d/client


import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

```

You'll use a single PrismaClient instance that you can import into any file where it's needed. The instance will be created in a prisma.ts file inside the lib/ directory. Go ahead and create the missing directory and file:

```java
mkdir lib && touch lib/prisma.ts
```

Create a new folder for the Prisma library.

Now, add the following code to this file:

```java
// lib/prisma.ts
import { PrismaClient } from '@prisma/client';

let prisma: PrismaClient;

if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient();
} else {
  if (!global.prisma) {
    global.prisma = new PrismaClient();
  }
  prisma = global.prisma;
}

export default prisma;
```

Create a connection to your Prisma Client.

Now, whenever you need access to your database you can import the prisma instance into the file where it's needed.

## Step 4. Update the existing views to load data from the database

The blog post feed that's implemented in pages/index.tsx and the post detail view in pages/p/[id].tsx are currently returning hardcoded data. In this step, you'll adjust the implementation to return data from the database using Prisma Client.

Open pages/index.tsx and add the following code right below the existing import declarations:

```java
// pages/index.tsx
import prisma from '../lib/prisma';
```

Import your Prisma Client.

Your prisma instance will be your interface to the database when you want to read and write data in it. You can for example create a new User record by calling prisma.user.create() or retrieve all the Post records from the database with prisma.post.findMany(). For an overview of the full Prisma Client API, visit the Prisma docs.

Now you can replace the hardcoded feed object in getStaticProps inside index.tsx with a proper call to the database:

```java
// index.tsx
export const getStaticProps: GetStaticProps = async () => {
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
```

Find all published posts in your database.

The two things to note about the Prisma Client query:

- A where filter is specified to include only Post records where published is true
- The name of the author of the Post record is queried as well and will be included in the returned objects

Before running the app, head over the to the /pages/p/[id].tsx and adjust the implementation there as well to read the correct Post record from the database.

This page uses getServerSideProps (SSR) instead of getStaticProps (SSG). This is because the data is dynamic, it depends on the id of the Post that's requested in the URL. For example, the view on route /p/42 displays the Post where the id is 42.

Like before, you first need to import Prisma Client on the page:

```java
// pages/p/[id].tsx
import prisma from '../../lib/prisma';
```

Import your Prisma Client.

Now you can update the implementation of getServerSideProps to retrieve the proper post from the database and make it available to your frontend via the component's props:

```java
// pages/p/[id].tsx
export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const post = await prisma.post.findUnique({
    where: {
      id: String(params?.id),
    },
    include: {
      author: {
        select: { name: true },
      },
    },
  });
  return {
    props: post,
  };
};
```

Find a specific post based on the ID.
That's it! If your app is not running any more, you can restart it with the following command:

```java
npm run dev
```

Start your application at http://localhost:3000.

Otherwise, save the files and open the app at
http://localhost:3000

in your browser. The Post record will be displayed as follows:

![image](https://github.com/coding-to-music/blogr-nextjs-prisma-postgres/blob/main/images/4.png?raw=true)
Your newly published post.

You can also click on the post to navigate to its detail view.

## Step 5. Set up GitHub authentication with NextAuth

In this step, you will add GitHub authentication to the app. Once that functionality is available, you'll add more features to the app, such that authenticated users can create, publish and delete posts via the UI.

As a first step, go ahead and install the NextAuth.js library in your app:

```java
npm install next-auth@4 @next-auth/prisma-adapter
```

Install the NextAuth library and the NextAuth Prisma Adapter.

Next, you need to change your database schema to add the missing tables that are required by NextAuth.

To change your database schema, you can manually make changes to your Prisma schema and then run the prisma db push command again. Open schema.prisma and adjust the models in it to look as follows:

```java
// schema.prisma


model Post {
  id        String  @id @default(cuid())
  title     String
  content   String?
  published Boolean @default(false)
  author    User?   @relation(fields: [authorId], references: [id])
  authorId  String?
}

model Account {
  id                 String  @id @default(cuid())
  userId             String  @map("user_id")
  type               String
  provider           String
  providerAccountId  String  @map("provider_account_id")
  refresh_token      String?
  access_token       String?
  expires_at         Int?
  token_type         String?
  scope              String?
  id_token           String?
  session_state      String?
  oauth_token_secret String?
  oauth_token        String?

  user User @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@unique([provider, providerAccountId])
  @@map("accounts")
}

model Session {
  id           String   @id @default(cuid())
  sessionToken String   @unique @map("session_token")
  userId       String   @map("user_id")
  expires      DateTime
  user         User     @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@map("sessions")
}

model User {
  id            String    @id @default(cuid())
  name          String?
  email         String?   @unique
  emailVerified DateTime? @map("email_verified")
  image         String?
  createdAt     DateTime  @default(now()) @map(name: "created_at")
  updatedAt     DateTime  @updatedAt @map(name: "updated_at")
  posts         Post[]
  accounts      Account[]
  sessions      Session[]

  @@map(name: "users")
}

model VerificationToken {
  identifier String
  token      String   @unique
  expires    DateTime

  @@unique([identifier, token])
  @@map("verificationtokens")
}
```

Updated Prisma schema.

To learn more about these models, visit the NextAuth.js docs.

Now you can adjust your database schema by creating the actual tables in the database. Run the following command:

```java
npx prisma db push
```

Update the tables in your database based on your Prisma schema.

Since you're using GitHub authentication, you also need to create a new OAuth app on GitHub.

First, log into your GitHub account. Then, navigate to
Settings, then open to
Developer Settings, then switch to
OAuth Apps.

![image](https://github.com/coding-to-music/blogr-nextjs-prisma-postgres/blob/main/images/5.png?raw=true)
Create a new OAuth application inside GitHub.

Clicking on the Register a new application (or New OAuth App) button will redirect you to a registration form to fill out some information for your app. The Authorization callback URL should be the Next.js /api/auth route: http://localhost:3000/api/auth.
An important thing to note here is that the Authorization callback URL field only supports a single URL, unlike e.g. Auth0, which allows you to add additional callback URLs separated with a comma. This means if you want to deploy your app later with a production URL, you will need to set up a new GitHub OAuth app.

![image](https://github.com/coding-to-music/blogr-nextjs-prisma-postgres/blob/main/images/6.png?raw=true)

Ensure your Authorization callback URL is correct.

Click on the Register application button, and then you will be able to find your newly generated Client ID and Client Secret. Copy and paste this info into the .env file in the root directory as the GITHUB_ID and GITHUB_SECRET env vars. Also set the NEXTAUTH_URL to the same value of the Authorization callback URL thar you configured on GitHub: http://localhost:3000/api/auth

```
# .env

# GitHub OAuth

GITHUB_ID=6bafeb321963449bdf51
GITHUB_SECRET=509298c32faa283f28679ad6de6f86b2472e1bff
NEXTAUTH_URL=http://localhost:3000/api/auth
```

The completed .env file.

You will also need to persist a user's authentication state across the entire application. Make a quick change in your application's root file \_app.tsx and wrap your current root component with a SessionProvider from the next-auth/react package. Open the file and replace its current contents with the following code:

```java
// _app.tsx

import { SessionProvider } from 'next-auth/react';
import { AppProps } from 'next/app';

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <SessionProvider session={pageProps.session}>
      <Component {...pageProps} />
    </SessionProvider>
  );
};

export default App;
```

Wrap your application with the NextAuth SessionProvider.

## Step 5. Add Log In functionality

The login button and some other UI components will be added to the Header.tsx file. Open the file and paste the following code into it:

```ts
// Header.tsx
import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { signOut, useSession } from "next-auth/react";

const Header: React.FC = () => {
  const router = useRouter();
  const isActive: (pathname: string) => boolean = (pathname) =>
    router.pathname === pathname;

  const { data: session, status } = useSession();

  let left = (
    <div className="left">
      <Link href="/">
        <a className="bold" data-active={isActive("/")}>
          Feed
        </a>
      </Link>
      <style jsx>{`
        .bold {
          font-weight: bold;
        }

        a {
          text-decoration: none;
          color: var(--geist-foreground);
          display: inline-block;
        }

        .left a[data-active="true"] {
          color: gray;
        }

        a + a {
          margin-left: 1rem;
        }
      `}</style>
    </div>
  );

  let right = null;

  if (status === "loading") {
    left = (
      <div className="left">
        <Link href="/">
          <a className="bold" data-active={isActive("/")}>
            Feed
          </a>
        </Link>
        <style jsx>{`
          .bold {
            font-weight: bold;
          }

          a {
            text-decoration: none;
            color: var(--geist-foreground);
            display: inline-block;
          }

          .left a[data-active="true"] {
            color: gray;
          }

          a + a {
            margin-left: 1rem;
          }
        `}</style>
      </div>
    );
    right = (
      <div className="right">
        <p>Validating session ...</p>
        <style jsx>{`
          .right {
            margin-left: auto;
          }
        `}</style>
      </div>
    );
  }

  if (!session) {
    right = (
      <div className="right">
        <Link href="/api/auth/signin">
          <a data-active={isActive("/signup")}>Log in</a>
        </Link>
        <style jsx>{`
          a {
            text-decoration: none;
            color: var(--geist-foreground);
            display: inline-block;
          }

          a + a {
            margin-left: 1rem;
          }

          .right {
            margin-left: auto;
          }

          .right a {
            border: 1px solid var(--geist-foreground);
            padding: 0.5rem 1rem;
            border-radius: 3px;
          }
        `}</style>
      </div>
    );
  }

  if (session) {
    left = (
      <div className="left">
        <Link href="/">
          <a className="bold" data-active={isActive("/")}>
            Feed
          </a>
        </Link>
        <Link href="/drafts">
          <a data-active={isActive("/drafts")}>My drafts</a>
        </Link>
        <style jsx>{`
          .bold {
            font-weight: bold;
          }

          a {
            text-decoration: none;
            color: var(--geist-foreground);
            display: inline-block;
          }

          .left a[data-active="true"] {
            color: gray;
          }

          a + a {
            margin-left: 1rem;
          }
        `}</style>
      </div>
    );
    right = (
      <div className="right">
        <p>
          {session.user.name} ({session.user.email})
        </p>
        <Link href="/create">
          <button>
            <a>New post</a>
          </button>
        </Link>
        <button onClick={() => signOut()}>
          <a>Log out</a>
        </button>
        <style jsx>{`
          a {
            text-decoration: none;
            color: var(--geist-foreground);
            display: inline-block;
          }

          p {
            display: inline-block;
            font-size: 13px;
            padding-right: 1rem;
          }

          a + a {
            margin-left: 1rem;
          }

          .right {
            margin-left: auto;
          }

          .right a {
            border: 1px solid var(--geist-foreground);
            padding: 0.5rem 1rem;
            border-radius: 3px;
          }

          button {
            border: none;
          }
        `}</style>
      </div>
    );
  }

  return (
    <nav>
      {left}
      {right}
      <style jsx>{`
        nav {
          display: flex;
          padding: 2rem;
          align-items: center;
        }
      `}</style>
    </nav>
  );
};

export default Header;
```

Allow the user to log in through the Header.

Here's an overview of how the header is going to render:

- If no user is authenticated, a Log in button will be shown.
- If a user is authenticated, My drafts, New Post and Log out buttons will be shown.

You can already run the app to validate that this works by running npm run dev, you'll find that the Log in button is now shown. However, if you click it, it does navigate you to
http://localhost:3000/api/auth/signin
but Next.js is going to render a 404 page for you.

That's because NextAuth.js requires you to set up a specific route for authentication. You'll do that next.

Create a new directory and a new file in the pages/api directory:

```java
mkdir -p pages/api/auth && touch pages/api/auth/[...nextauth].ts
```

Create a new directory and API route.

In this new pages/api/auth/[...nextauth].ts file, you now need to add the following boilerplate to configure your NextAuth.js setup with your GitHub OAuth credentials and the Prisma adapter:

```java
// pages/api/auth/[...nextauth].ts

import { NextApiHandler } from 'next';
import NextAuth from 'next-auth';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import GitHubProvider from 'next-auth/providers/github';
import prisma from '../../../lib/prisma';

const authHandler: NextApiHandler = (req, res) => NextAuth(req, res, options);
export default authHandler;

const options = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ],
  adapter: PrismaAdapter(prisma),
  secret: process.env.SECRET,
};

```

Set up NextAuth, including the Prisma Adapter.

Once the code is added, you can navigate to
http://localhost:3000/api/auth/signin
again. This time, the Sign in with GitHub button is shown.

![image](https://github.com/coding-to-music/blogr-nextjs-prisma-postgres/blob/main/images/7.png?raw=true)

Sign in with GitHub using NextAuth.

If you click it, you're forwarded to GitHub, where you can authenticate with your GitHub credentials. Once the authentication is done, you'll be redirected back into the app.

Note: If you're seeing an error and could not be authenticated, stop the app and re-run it with npm run dev.

The header layout has now changed to display the buttons for authenticated users.

![image](https://github.com/coding-to-music/blogr-nextjs-prisma-postgres/blob/main/images/8.png?raw=true)

The Header displaying a log out button.

## Step 6. Add new post functionality

In this step, you'll implement a way for a user to create a new post. The user can use this feature by clicking the New post button once they're authenticated.
The button already forwards to the /create route, however, this currently leads to a 404 because that route is not implemented yet.

To fix that, create a new file in the pages directory that's called create.tsx:

```java
touch pages/create.tsx
```

Create a new file for creating posts.

Now, add the following code to the newly created file:

```java
// pages/create.tsx

import React, { useState } from 'react';
import Layout from '../components/Layout';
import Router from 'next/router';

const Draft: React.FC = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const submitData = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    // TODO
    // You will implement this next ...
  };

  return (
    <Layout>
      <div>
        <form onSubmit={submitData}>
          <h1>New Draft</h1>
          <input
            autoFocus
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
            type="text"
            value={title}
          />
          <textarea
            cols={50}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Content"
            rows={8}
            value={content}
          />
          <input disabled={!content || !title} type="submit" value="Create" />
          <a className="back" href="#" onClick={() => Router.push('/')}>
            or Cancel
          </a>
        </form>
      </div>
      <style jsx>{`
        .page {
          background: var(--geist-background);
          padding: 3rem;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        input[type='text'],
        textarea {
          width: 100%;
          padding: 0.5rem;
          margin: 0.5rem 0;
          border-radius: 0.25rem;
          border: 0.125rem solid rgba(0, 0, 0, 0.2);
        }

        input[type='submit'] {
          background: #ececec;
          border: 0;
          padding: 1rem 2rem;
        }

        .back {
          margin-left: 1rem;
        }
      `}</style>
    </Layout>
  );
};

export default Draft;

```

A new component to create posts.

This page is wrapped by the Layout component so that it still includes the Header and any other generic UI components.

It renders a simple form with several input fields. When submitted, the (right now empty) submitData function is called. In that function, you need to pass the data from the React component to an API route which can then handle the actual storage of the new post data in the database.

Here's how you can implement the function:

```java
// /pages/create.tsx

const submitData = async (e: React.SyntheticEvent) => {
  e.preventDefault();
  try {
    const body = { title, content };
    await fetch('/api/post', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    await Router.push('/drafts');
  } catch (error) {
    console.error(error);
  }
};
```

Call your API route to create a post.

In this code, you're using the title and content properties that are extracted from the component state using useState and submit them via an HTTP POST request to the api/post API route.

Afterwards, you're redirecting the user to the /drafts page so that they can immediately see their newly created draft. If you run the app, the /create route renders the following UI:

![image](https://github.com/coding-to-music/blogr-nextjs-prisma-postgres/blob/main/images/9.png?raw=true)

Create a new draft.

Note however that the implementation doesn't quite work yet because neither api/post nor the /drafts route exist so far. You'll implement these next.

First, let's make sure your backend can handle the POST request that's submitted by the user. Thanks to the Next.js API routes feature, you don't have to "leave your Next.js app" to implement such functionality but instead you can add it to your pages/api directory.

Create a new directory called post with a new file called index.ts:

```java
mkdir -p pages/api/post && touch pages/api/post/index.ts
```

Create a new API route to create a post.

Note: At this point, you could also have created a file called pages/api/post.ts` instead of taking the detour with an extra directory and an index.ts file. The reason why you're not doing it that way is because you'll need to add a dynamic route for HTTP DELETE requests at the api/post route later as well. In order to save some refactoring later, you're already structuring the files in the required way.

Now, add the following code to pages/api/post/index.ts:

```java
// POST /api/post
// Required fields in body: title
// Optional fields in body: content
export default async function handle(req, res) {
  const { title, content } = req.body;

  const session = await getSession({ req });
  const result = await prisma.post.create({
    data: {
      title: title,
      content: content,
      author: { connect: { email: session?.user?.email } },
    },
  });
  res.json(result);
}
```

Update the API route to modify the database using the Prisma Client.

This code implements the handler function for any requests coming in at the /api/post/ route. The implementation does the following: First it extracts the title and cotent from the body of the incoming HTTP POST request. After that, it checks whether the request is coming from an authenticated user with the getSession helper function from NextAuth.js. And finally, it uses Prisma Client to create a new Post record in the database.

You can now test this functionality by opening the app, making sure you're authenticated and create a new post with title and content:

![image](https://github.com/coding-to-music/blogr-nextjs-prisma-postgres/blob/main/images/10.png?raw=true)

Testing creating a new post via the API Route.

Once you click Create, the Post record will be added to the database. Note that the /drafts route that you're being redirected to right after the creation still renders a 404, that will be fixed soon. However, if you run Prisma Studio again with npx prisma studio, you'll see that the new Post record has been added to the database.

## Step 6. Add drafts functionality

In this step, you'll add a new page to the app that allows an authenticated user to view their current drafts.

This page can't be statically rendered because it depends on a user who is authenticated. Pages like this that get their data dynamically based on an authenticated users are a great use case for server-side rendering (SSR) via getServerSideProps.

First, create a new file in the pages directory and call it drafts.tsx:

```java
touch pages/drafts.tsx
```

Create a new page for your drafts.

Next, add the following code to that file:

```java
// pages/drafts.tsx

import React from 'react';
import { GetServerSideProps } from 'next';
import { useSession, getSession } from 'next-auth/react';
import Layout from '../components/Layout';
import Post, { PostProps } from '../components/Post';
import prisma from '../lib/prisma';

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session = await getSession({ req });
  if (!session) {
    res.statusCode = 403;
    return { props: { drafts: [] } };
  }

  const drafts = await prisma.post.findMany({
    where: {
      author: { email: session.user.email },
      published: false,
    },
    include: {
      author: {
        select: { name: true },
      },
    },
  });
  return {
    props: { drafts },
  };
};

type Props = {
  drafts: PostProps[];
};

const Drafts: React.FC<Props> = (props) => {
  const { data: session } = useSession();

  if (!session) {
    return (
      <Layout>
        <h1>My Drafts</h1>
        <div>You need to be authenticated to view this page.</div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="page">
        <h1>My Drafts</h1>
        <main>
          {props.drafts.map((post) => (
            <div key={post.id} className="post">
              <Post post={post} />
            </div>
          ))}
        </main>
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

export default Drafts;
```

Update the Draft page to show a list of drafts.

In this React component, you're rendering a list of "drafts" of the authenticated user. The drafts are retrieved from the database during server-side rendering, because the database query with Prisma Client is executed in getServerSideProps. The data is then made available to the React component via its props.

If you now navigate to the My drafts section of the app, you'll see the unpublished post that you created before:

![image](https://github.com/coding-to-music/blogr-nextjs-prisma-postgres/blob/main/images/11.png?raw=true)

Completed drafts page.

## Step 7. Add Publish functionality

To "move" the draft to the public feed view, you need to be able to "publish" it – that is, setting the published field of a Post record to true. This functionality will be implemented in the post detail view that currently lives in pages/p/[id].tsx.

The functionality will be implemented via an HTTP PUT request that'll be sent to a api/publish route in your "Next.js backend". Go ahead and implement that route first.

Create a new directory inside the pages/api directory called publish. Then create a new file called [id].ts in the new directory:

```java
mkdir -p pages/api/publish && touch pages/api/publish/[id].ts
```

Create a new API route to publish a post.

Now, add the following code to the newly created file:

```java
// pages/api/publish/[id].ts

import prisma from '../../../lib/prisma';

// PUT /api/publish/:id
export default async function handle(req, res) {
  const postId = req.query.id;
  const post = await prisma.post.update({
    where: { id: postId },
    data: { published: true },
  });
  res.json(post);
}

```

Update the API route to modify the database using the Prisma Client.

This is the implementation of an API route handler which retrieves the ID of a Post from the URL and then uses Prisma Client's update method to set the published field of the Post record to true.

Next, you'll implement the functionality on the frontend in the pages/p/[id].tsx file. Open up the file and replace its contents with the following:

```java
// pages/p/[id].tsx

import React from 'react';
import { GetServerSideProps } from 'next';
import ReactMarkdown from 'react-markdown';
import Router from 'next/router';
import Layout from '../../components/Layout';
import { PostProps } from '../../components/Post';
import { useSession } from 'next-auth/react';
import prisma from '../../lib/prisma';

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const post = await prisma.post.findUnique({
    where: {
      id: String(params?.id),
    },
    include: {
      author: {
        select: { name: true, email: true },
      },
    },
  });
  return {
    props: post,
  };
};

async function publishPost(id: string): Promise<void> {
  await fetch(`/api/publish/${id}`, {
    method: 'PUT',
  });
  await Router.push('/');
}

const Post: React.FC<PostProps> = (props) => {
  const { data: session, status } = useSession();
  if (status === 'loading') {
    return <div>Authenticating ...</div>;
  }
  const userHasValidSession = Boolean(session);
  const postBelongsToUser = session?.user?.email === props.author?.email;
  let title = props.title;
  if (!props.published) {
    title = `${title} (Draft)`;
  }

  return (
    <Layout>
      <div>
        <h2>{title}</h2>
        <p>By {props?.author?.name || 'Unknown author'}</p>
        <ReactMarkdown children={props.content} />
        {!props.published && userHasValidSession && postBelongsToUser && (
          <button onClick={() => publishPost(props.id)}>Publish</button>
        )}
      </div>
      <style jsx>{`
        .page {
          background: var(--geist-background);
          padding: 2rem;
        }

        .actions {
          margin-top: 2rem;
        }

        button {
          background: #ececec;
          border: 0;
          border-radius: 0.125rem;
          padding: 1rem 2rem;
        }

        button + button {
          margin-left: 1rem;
        }
      `}</style>
    </Layout>
  );
};

export default Post;

```

Update the Post component to handle publishing via the API Route.

This code adds the publishPost function to the React component which is responsible for sending the HTTP PUT request to the API route you just implemented. The render function of the component is also adjusted to check whether the user is authenticated, and if that's the case, it'll display the Publish button in the post detail view as well:

![image](https://github.com/coding-to-music/blogr-nextjs-prisma-postgres/blob/main/images/12.png?raw=true)

The publish button shown for a post.

If you click the button, you will be redirected to the public feed and the post will be displayed there!

Note: Once the app is deployed to production, the feed will only ever be updated when the entire app is redeployed! That's because you're using static site generation (SSG) via getStaticProps to retrieve the data for this view. If you want it to be updated "immediately", consider changing getStaticProps togetServerSideProps or using Incremental Static Regeneration.

## Step 8. Add Delete functionality

The last piece of functionality you'll implement in this guide is to enable users to delete existing Post records. You'll follow a similar approach as for the "publish" functionality by first implementing the API route handler on the backend, and then adjust your frontend to make use of the new route!

Create a new file in the pages/api/post directory and call it [id].ts:

```java
touch pages/api/post/[id].ts
```

Create a new API route to delete a post.

Now, add the following code to it:

```java
// pages/api/post/[id].ts

import prisma from '../../../lib/prisma';

// DELETE /api/post/:id
export default async function handle(req, res) {
  const postId = req.query.id;
  if (req.method === 'DELETE') {
    const post = await prisma.post.delete({
      where: { id: postId },
    });
    res.json(post);
  } else {
    throw new Error(
      `The HTTP ${req.method} method is not supported at this route.`,
    );
  }
}
```

Update the API route to modify the database using the Prisma Client.

This code handles HTTP DELETE requests that are coming in via the /api/post/:id URL. The route handler then retrieves the id of the Post record from the URL and uses Prisma Client to delete this record in the database.

To make use of this feature on the frontend, you again need to adjust the post detail view. Open pages/p/[id].tsx and insert the following function right below the publishPost function:

```java
// pages/p/[id].tsx

async function deletePost(id: string): Promise<void> {
  await fetch(`/api/post/${id}`, {
    method: 'DELETE',
  });
  Router.push('/');
}
```

Update the Post component to handle deleting via the API Route.

Now, you can follow a similar approach with the Delete button as you did with the Publish button and render it only if the user is authenticated. To achieve this, you can add this code directly in the return part of the Post component right below where the Publish button is rendered:

```java
// pages/p/[id].tsx
{
  !props.published && userHasValidSession && postBelongsToUser && (
    <button onClick={() => publishPost(props.id)}>Publish</button>
  );
}
{
  userHasValidSession && postBelongsToUser && (
    <button onClick={() => deletePost(props.id)}>Delete</button>
  );
}
```

Logic to determine whether to show the publish and delete buttons.

You can now try out the new functionality by creating a new draft, navigating to its detail view and then clicking the newly appearing Delete button:

![image](https://github.com/coding-to-music/blogr-nextjs-prisma-postgres/blob/main/images/13.png?raw=true)

The Delete button showing on the post page.

## Step 9. Deploy to Vercel

In this final step, you're going to deploy the app to Vercel from a GitHub repo.

Before you can deploy, you need to:

- Create another OAuth app on GitHub
- Create a new GitHub repo and push your project to it

  To start with the OAuth app, go back to step Step 5. Set up GitHub authentication with NextAuth and follow the steps to create another OAuth app via the GitHub UI.

  This time, the Authorization Callback URL needs to match the domain of your future Vercel deployment which will be based on the Vercel project name. As a Vercel project name, you will choose blogr-nextjs-prisma prepended with your first and lastname: FIRSTNAME-LASTNAME-blogr-nextjs-prisma. For example, if you're called "Jane Doe", your project name should be jane-doe-blogr-nextjs-prisma.

  Note: Prepending your first and last name is required to ensure the uniqueness of your deployment URL.

  The Authorization Callback URL must therefore be set to https://FIRSTNAME-LASTNAME-blogr-nextjs-prisma.vercel.app/api/auth. Once you created the application, adjust your .env file and set the Client ID as the GITHUB_ID env var and a Client secret as the GITHUB_SECRET env var. The NEXTAUTH_URL env var needs to be set to the same value as the Authorization Callback URL on GitHub: https://FIRSTNAME-LASTNAME-blogr-nextjs-prisma.vercel.app/api/auth.

![image](https://github.com/coding-to-music/blogr-nextjs-prisma-postgres/blob/main/images/14.png?raw=true)

Update the Authorization callback URL.

Next, create a new GitHub repository with the same name, e.g. jane-doe-blogr-nextjs-prisma. Now, copy the three terminal commands from the bottom section that says ...or push an existing repository from the command line, it should look similar to this:

```java
git remote add origin git@github.com:janedoe/jane-doe-blogr-nextjs-prisma.git
git branch -M main
git push -u origin main
```

Push to an existing repository.

You now should have your new repository ready at https://github.com/GITHUB_USERNAME/FIRSTNAME-LASTNAME-blogr-nextjs-prisma, e.g. https://github.com/janedoe/jane-doe-blogr-nextjs-prisma.
With the GitHub repo in place, you can now import it to Vercel in order to deploy the app:

Deploy with Vercel button

Now, provide the URL of your GitHub repo in the text field:

![image](https://github.com/coding-to-music/blogr-nextjs-prisma-postgres/blob/main/images/15.png?raw=true)

Import a git repository to Vercel.

Click Continue. The next screen requires you to set the environment variables for your production deployment:

![image](https://github.com/coding-to-music/blogr-nextjs-prisma-postgres/blob/main/images/16.png?raw=true)

Add environment variables to Vercel.

Here's what you need to provide:

- `DATABASE_URL`: Copy this value directly from your .env file
- `GITHUB_ID`: Set this to the Client ID of the GitHub OAuth app you just created
- `GITHUB_SECRET`: Set this to the Client Secret of the GitHub OAuth app you just created
- `NEXTAUTH_URL`: Set this to the Authorization Callback URL of the GitHub OAuth app you just created
  Once all environment variables are set, hit Deploy. Your app is now being deployed to Vercel. Once it's ready, Vercel will show you the following success screen:

![image](https://github.com/coding-to-music/blogr-nextjs-prisma-postgres/blob/main/images/17.png?raw=true)

Your application deployed to Vercel.

You can click the Visit button to view the deployed version of your fullstack app 🎉

## Conclusion

In this guide, you learned how to build and deploy a fullstack application using Next.js, Prisma, and PostgreSQL. If you ran into issue or have any questions about this guide, feel free to raise them on GitHub or drop them in the Prisma Slack.

# How to Load Data from a File in Next.js

https://vercel.com/guides/loading-static-file-nextjs-api-route

By the end of this tutorial, you will be able to display the contents of a static json file in your front-end by using `SWR` and `Next.js` API routes.

Static json files can be used to store data that does not change regularly, and is used by multiple pages. These files can be stored in your applications public folder, and loaded directly with a GET request. This approach can have security concerns however. A possible solution is to:

- Store your json files in a private folder inside your application
- Construct an API endpoint to load these files using the file system
- Connect to the API endpoint in your front-end and display the data

## Prerequisites

Before getting started, you should be able to:

- Deploy a Next.js app on Vercel

Familiar with

- Next.js
- API routes
- Install SWR in your project

## Set up the json data

Given a basic Next.js project created with npx create-next-app@latest or a new template on Vercel, let's create a folder called json at the root of the project, and inside it, create a file called data.json.

Begin by pasting the following content into the data.json file:

```java
{
  "record": {
    "id": 8221,
    "uid": "a15c1f1d-9e4e-4dc7-9c45-c04412fc5064",
    "name": "Next.js",
    "language": "JavaScript"
  }
}
```

## Add the API route

Next add a file called staticdata.js inside the pages/api folder. This will create a Serverless Function that will load the json data from the file, and return it as a response.

Now paste the following code in the staticdata.js file:

```java
import path from 'path';
import { promises as fs } from 'fs';

export default async function handler(req, res) {
  //Find the absolute path of the json directory
  const jsonDirectory = path.join(process.cwd(), 'json');
  //Read the json data file data.json
  const fileContents = await fs.readFile(jsonDirectory + '/data.json', 'utf8');
  //Return the content of the data file in json format
  res.status(200).json(fileContents);
}
```

Code reading the `/json/data.json` file and returning it's contents

## Display the data using SWR

Inside the index.js file, located in the pages folder, replace the content with the following code:

```java
//useSWR allows the use of SWR inside function components
import useSWR from 'swr';

//Write a fetcher function to wrap the native fetch function and return the result of a call to url in json format
const fetcher = (url) => fetch(url).then((res) => res.json());

export default function Index() {
  //Set up SWR to run the fetcher function when calling "/api/staticdata"
  //There are 3 possible states: (1) loading when data is null (2) ready when the data is returned (3) error when there was an error fetching the data
  const { data, error } = useSWR('/api/staticdata', fetcher);

  //Handle the error state
  if (error) return <div>Failed to load</div>;
  //Handle the loading state
  if (!data) return <div>Loading...</div>;
  //Handle the ready state and display the result contained in the data object mapped to the structure of the json file
  return (
    <div>
      <h1>My Framework from file</h1>
      <ul>
        <li>Name: {data.record.name}</li>
        <li>Language: {data.record.language}</li>
      </ul>
    </div>
  );
}
```

This code uses SWR to make a request to the API route /api/staticdata and display some of the content in the browser.

- Make sure you installed swr in your project using yarn add swr or npm install swr
- Run your application locally using npm run dev

When you browse to localhost:3000, you should see the same content as on this page. You can now deploy your application to Vercel to produce the same results.

That's it!

As reference:

- Repository for the source code used above
- Get started with SWR to take advantage of keeping your data fresh without having to write additional code
- Learn more about API routes in Next.js

## Move data file to here

How To Copy Files With Rsync Over SSH #275

https://github.com/coding-to-music/coding-to-music.github.io/issues/275

### Install rsync

```java
sudo apt-get install rsync
```

### example:

```java
rsync -avz -e "ssh -o StrictHostKeyChecking=no -o UserKnownHostsFile=/dev/null" --progress /root/bigfile.txt 198.222.333.111:/root/
```

### my changes

```java
rsync -avz -e "ssh -o StrictHostKeyChecking=no -o UserKnownHostsFile=/dev/null" --progress /home/tmc/ap/cambridge-streets/StreetsAndWays20170925.xlsx TomPod:/mnt/volume_nyc1_01/blogr-nextjs-prisma-postgres
```

# Next.js + Webpack Bundle Analyzer

https://github.com/vercel/next.js/tree/canary/packages/next-bundle-analyzer

and

https://bvgsoftware.com/blog/how-to-optimize-your-nextjs-production-build/

http://127.0.0.1:5500/.next/server/analyze/client.html

http://127.0.0.1:5500/.next/server/analyze/server.html

Use `webpack-bundle-analyzer` in your Next.js project

## Installation

```
npm install @next/bundle-analyzer
```

or

```
yarn add @next/bundle-analyzer
```

Note: if installing as a `devDependency` make sure to wrap the require in a `process.env` check as `next.config.js` is loaded during `next start` as well.

### Usage with environment variables

Create a next.config.js (and make sure you have next-bundle-analyzer set up)

```js
const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});
module.exports = withBundleAnalyzer({});
```

Or configuration as a function:

```js
module.exports = (phase, defaultConfig) => {
  return withBundleAnalyzer(defaultConfig);
};
```

Then you can run the command below:

```bash
# Analyze is done on build when env var is set
ANALYZE=true yarn build
```

When enabled two HTML files (client.html and server.html) will be outputted to `<distDir>/analyze/`. One will be for the server bundle, one for the browser bundle.

### Usage with next-compose-plugins

From version 2.0.0 of next-compose-plugins you need to call bundle-analyzer in this way to work

```js
const withPlugins = require("next-compose-plugins");
const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

module.exports = withPlugins([
  [withBundleAnalyzer],
  // your other plugins here
]);
```

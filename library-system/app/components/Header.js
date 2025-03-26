import React from "react";
import Head from "next/head";
import Link from "next/link";
import SignOutButton from "./SignOutButton";
import Welcome from "./Welcome";

const Header = () => {
  return (
    <>
      <Head>
        <title>Learner's Library</title>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
        />
      </Head>
      <header>
        <Welcome />
        <Link className="title_styling" href="/">
          Learner's Library
        </Link>
        <SignOutButton />
      </header>
    </>
  );
};

export default Header;

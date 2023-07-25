import React from "react";
import { Helmet } from "react-helmet";

const SEO = ({ title, description }) => {
  return (
    <Helmet>
      <title>Todo Application | {title}</title>
      <meta name="description" content={description} charSet="utf-8" />
    </Helmet>
  );
};

export default SEO;

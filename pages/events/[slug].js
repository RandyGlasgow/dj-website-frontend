import React from "react";
import { useRouter } from "next/router";
import Layout from "../../components/Layout";

const EventPage = () => {
  const router = useRouter();

  return (
    <Layout>
      <h1>Event Page</h1>
    </Layout>
  );
};

export default EventPage;

import Head from "next/head";
import Link from "next/link";
import styles from "@/styles/Home.module.css";
import Layout from "@/components/Layout";
import EventItem from "@/components/EventItem";
import { API_URL } from "@/config/index";

export default function EventsPage({ events }) {
  console.log(events);

  return (
    <Layout>
      <h1>Upcoming Events</h1>
      {events.length === 0 && <h3>No events to show</h3>}
      {events.map((evt) => (
        <EventItem key={evt.id} evt={evt} />
      ))}
    </Layout>
  );
}

// getting the data from the server
export async function getStaticProps() {
  const res = await fetch(`${API_URL}/events`);
  const events = await res.json();

  return {
    props: { events },
    // revalidating the data every 1s
    revalidate: 1,
  };
}

import Image from "next/image";
import Link from "next/link";
import { FaPencilAlt, FaTimes } from "react-icons/fa";
import dayjs from "dayjs";

import { API_URL } from "@/config/index";
import styles from "@/styles/Event.module.css";
import Layout from "@/components/Layout";

export default function EventPage({ evt }) {
  function deleteEvent(e) {
    console.log("delete");
  }

  return (
    <Layout>
      <div className={styles.event}>
        <div className={styles.controls}>
          <Link href={`/events/edit/${evt.id}`}>
            <a>
              <FaPencilAlt />
              Edit Event
            </a>
          </Link>
          <a className={styles.delete} onClick={deleteEvent}>
            <FaTimes />
            Delete
          </a>
        </div>
        <span>
          {dayjs(evt.date).format("MMM DD, YYYY")} at {evt.time}
        </span>
        <h1>{evt.name}</h1>
        {evt.image && (
          <div className={styles.image}>
            <Image
              src={evt.image.formats.large.url}
              width={960}
              height={600}
            ></Image>
          </div>
        )}
        <h3>Performers:</h3>
        <p>{evt.performers}</p>
        <h3>Description:</h3>
        <p>{evt.description}</p>
        <h3>Venue: {evt.name}</h3>
        <p>{evt.address}</p>

        <Link href="/events">
          <a className={styles.back}>Go Back</a>
        </Link>
      </div>
    </Layout>
  );
}

export async function getStaticPaths() {
  const res = await fetch(`${API_URL}/events`);
  const events = await res.json();

  const paths = events.map((evt) => ({
    params: { slug: evt.slug },
  }));
  return {
    paths,
    fallback: false,
  };
}

// getting the data from the server
export async function getStaticProps({ params: { slug } }) {
  const res = await fetch(`${API_URL}/events?slug=${slug}`);
  const events = await res.json();

  return {
    props: { evt: events[0] },
    // revalidating the data every 1s
    revalidate: 1,
  };
}

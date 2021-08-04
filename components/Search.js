import React, { useState } from "react";
import { useRouter } from "next/router";
import styles from "@/styles/Search.module.css";

export default function Search() {
  const [term, setTerm] = useState("");

  const router = useRouter();

  function handleSubmit(event) {
    event.preventDefault();
    router.push(`/events/search?term=${term}`);
    setTerm("");
  }

  return (
    <div className={styles.search}>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={term}
          onChange={(event) => setTerm(event.target.value)}
          placeholder="Search Events"
        />
      </form>
    </div>
  );
}

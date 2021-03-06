import { useRouter } from "next/router";
import { useState } from "react";
import Link from "next/link";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { API_URL } from "@/config/index";
import styles from "@/styles/Form.module.css";
import Layout from "@/components/Layout";

export default function AddEventPage() {
  const router = useRouter();

  const [values, setValues] = useState({
    name: "",
    performers: "",
    venue: "",
    address: "",
    date: "",
    time: "",
    description: "",
  });

  async function handleSubmit(event) {
    event.preventDefault();

    const hasEmptyFields = Object.values(values).some(
      (element) => element === ""
    );

    if (hasEmptyFields) {
      toast.error("Please fill in all fields");
    }
    const res = await fetch(`${API_URL}/events`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });

    if (!res.ok) {
      toast.error("Something went wrong");
    } else {
      const evt = await res.json();
      router.push(`/events/${evt.slug}`);
    }
  }

  function handleInputChange(event) {
    const { name, value } = event.target;

    setValues({ ...values, [name]: value });
  }

  return (
    <Layout title="Add Event">
      <Link href="/events">Go Back</Link>
      <h1>Add Event</h1>

      <ToastContainer />
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.grid}>
          <div>
            <label htmlFor="name">Event Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={values.name}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="performers">Performers</label>
            <input
              type="text"
              id="performers"
              name="performers"
              value={values.performers}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="venue">Venue</label>
            <input
              type="text"
              id="venue"
              name="venue"
              value={values.venue}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="address">Address</label>
            <input
              type="text"
              id="address"
              name="address"
              value={values.address}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="date">Date</label>
            <input
              type="date"
              id="date"
              name="date"
              value={values.date}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="time">Time</label>
            <input
              type="text"
              id="time"
              name="time"
              value={values.time}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div>
          <label htmlFor="description">Event Description</label>
          <textarea
            name="description"
            id="description"
            cols="30"
            rows="10"
            onChange={handleInputChange}
          />
        </div>
        <input type="submit" value="Add Event" className="btn" />
      </form>
    </Layout>
  );
}

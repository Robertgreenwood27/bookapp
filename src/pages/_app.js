import "@/styles/globals.css";
import Layout from "@/components/Layout";
import Navigation from "@/components/Navigation";
import { useState, useEffect } from "react";

export default function App({ Component, pageProps }) {
  const [chapters, setChapters] = useState([]);

  useEffect(() => {
    // Fetch chapters when the app loads
    fetch('/api/chapters')
      .then(response => response.json())
      .then(data => setChapters(data))
      .catch(error => console.error('Error fetching chapters:', error));
  }, []);

  return (
    <Layout>
      <Navigation chapters={chapters} />
      <Component {...pageProps} />
    </Layout>
  );
}
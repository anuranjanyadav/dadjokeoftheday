"use client";

import { useState, useEffect } from "react";

export default function Home() {
  const [joke, setJoke] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  const fetchJoke = async () => {
    setLoading(true);
    try {
      const res = await fetch("https://icanhazdadjoke.com/", {
        headers: {
          Accept: "application/json",
        },
      });
      const data = await res.json();
      setJoke(data.joke);
    } catch (error) {
      setJoke("Oops! Even the dad jokes are hiding right now. Try again!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJoke();
  }, []);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(joke);
    alert("Joke copied to clipboard! Go annoy your friends.");
  };

  return (
    <main>
      <div className="glass-card">
        <h1>Dad Joke</h1>
        <p className="subtitle">Daily dose of groans</p>

        <div className="joke-container">
          {loading ? (
            <div className="joke-text"><span className="loader"></span></div>
          ) : (
            <p className="joke-text">{joke}</p>
          )}
        </div>

        <div className="actions">
          <button className="btn" onClick={fetchJoke} disabled={loading}>
            New Joke
          </button>
          <button
            className="btn btn-secondary"
            onClick={copyToClipboard}
            disabled={loading}
          >
            Copy
          </button>
        </div>
      </div>
    </main>
  );
}

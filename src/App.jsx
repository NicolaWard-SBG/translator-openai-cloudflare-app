import React, { useState } from "react";
import "./App.css";

function App() {
  const [text, setText] = useState("");
  const [language, setLanguage] = useState("");
  const [translated, setTranslated] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleTranslate = async () => {
    setLoading(true);
    setError("");
    setTranslated("");

    try {
      const workerUrl =
        "https://translator-worker.openai-api-nw.workers.dev/api/translate";

      const response = await fetch(workerUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text, language }),
      });

      const data = await response.json();

      if (response.ok) {
        setTranslated(data.translated);
      } else {
        setError(data.error || "Translation failed.");
      }
    } catch (err) {
      setError("Network error: " + err.message);
    }

    setLoading(false);
  };

  return (
    <div className="app-container">
      <h1>Language Translator</h1>
      <p>Translate text into different languages using OpenAI's API.</p>
      <div className="globe-input-wrapper">
        <img src="globe_icon.png" alt="Globe" className="globe-logo" />
        <textarea
          className="input-box"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter text to translate"
          rows={4}
        />
      </div>
      <div className="radio-group">
        <label>
          <input
            type="radio"
            value="spanish"
            checked={language === "spanish"}
            onChange={() => setLanguage("spanish")}
          />
          Spanish
        </label>
        <label>
          <input
            type="radio"
            value="french"
            checked={language === "french"}
            onChange={() => setLanguage("french")}
          />
          French
        </label>
        <label>
          <input
            type="radio"
            value="italian"
            checked={language === "italian"}
            onChange={() => setLanguage("italian")}
          />
          Italian
        </label>
      </div>
      <button
        className="translate-btn"
        onClick={handleTranslate}
        disabled={loading || !text || !language}
      >
        {loading ? "Translating..." : "Translate"}
      </button>
      {error && (
        <div className="output" style={{ background: "#ffe6e6" }}>
          {error}
        </div>
      )}
      {translated && <div className="output">{translated}</div>}
    </div>
  );
}

export default App;

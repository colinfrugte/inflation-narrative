import { useState } from "react";
import { ChevronRightIcon } from "@heroicons/react/24/outline";

export function TextUpdaterNode() {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setText(evt.target.value);
  };

  const handleKeyDown = (evt: React.KeyboardEvent<HTMLInputElement>) => {
    if (evt.key === "Enter") {
      handleSubmit();
    }
  };

  const handleSubmit = async () => {
    if (!text.trim()) return;

    setLoading(true);

    try {
      const response = await fetch("https://your-api-url.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text }),
      });

      if (!response.ok) {
        throw new Error("Fehler beim Senden der Daten");
      }

      const data = await response.json();
      console.log("Antwort der API:", data);

      // Optional: Text zurücksetzen
      setText("");
    } catch (error) {
      console.error("API-Fehler:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <input
        id="text"
        name="text"
        value={text}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        className="nodrag border border-gray-300 rounded px-2 py-1 w-full"
      />
      <button
        onClick={handleSubmit}
        className="flex items-center justify-center bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-fit disabled:opacity-50"
        disabled={loading}
      >
        <ChevronRightIcon className="h-5 w-5" />
      </button>
    </div>
  );
}

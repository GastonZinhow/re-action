import { useState } from "react";
import { useEffect } from "react";

const History = () => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("reactionHistory")) || [];
    setHistory(stored);
  }, []);

  return (
    <>
      {history.length === 0 && <p>Sem histórico salvo ainda.</p>}
      {history.map((entry, idx) => (
        <div key={idx} className="p-4 border rounded my-2">
          <p className="font-semibold">
            Data: {new Date(entry.date).toLocaleString()}
          </p>
          <p>Tempos: {entry.times.join(" ms, ")} ms</p>
          <p>
            Média: <strong>{entry.average} ms</strong>
          </p>
        </div>
      ))}
      <button
        onClick={() => {
          localStorage.removeItem("reactionHistory");
          setHistory([]);
        }}
        className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
      >
        Limpar Histórico
      </button>
    </>
  );
};

export default History;

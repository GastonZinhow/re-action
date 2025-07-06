import { useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
} from "chart.js";

ChartJS.register(LineElement, PointElement, CategoryScale, LinearScale);

const MainPage = () => {
  const [started, setStarted] = useState(false);
  const [flashCount, setFlashCount] = useState(0);
  const [flashing, setFlashing] = useState(false);
  const [times, setTimes] = useState([]);
  const [startTime, setStartTime] = useState(null);
  const [showGraph, setShowGraph] = useState(false);

  const saveToHistory = (newEntry) => {
    const history = JSON.parse(localStorage.getItem("reactionHistory")) || [];
    history.push(newEntry);
    localStorage.setItem("reactionHistory", JSON.stringify(history));
  };

  const resetTest = () => {
    setStarted(false);
    setFlashCount(0);
    setFlashing(false);
    setTimes([]);
    setStartTime(null);
    setShowGraph(false);
  };

  const startTest = async () => {
    setStarted(true);
    const reactionTimes = [];

    for (let i = 0; i < 5; i++) {
      const delay = Math.random() * 2000 + 1000;
      await new Promise((res) => setTimeout(res, delay));

      setFlashing(true);
      await new Promise((resolve) => requestAnimationFrame(resolve));
      const start = performance.now();

      const result = await new Promise((resolve) => {
        const handleClick = () => {
          const reactionTime = performance.now() - start;
          window.removeEventListener("click", handleClick);
          resolve(reactionTime);
        };
        window.addEventListener("click", handleClick);
      });

      reactionTimes.push(result);
      setFlashing(false);
      setFlashCount((prev) => prev + 1);
    }

    setTimes(reactionTimes);
    setShowGraph(true);
    saveToHistory({
      date: new Date().toISOString(),
      times: reactionTimes.map((t) => Math.round(t)),
      average: Math.round(average(reactionTimes)),
    });
  };

  const average = (arr) => arr.reduce((a, b) => a + b, 0) / arr.length;

  return (
    <div
      className={`flex flex-col items-center mt-6 lg:mt-20 w-full h-screen ${
        flashing ? "bg-green-500" : "bg-red"
      }`}
    >
      {!started && (
        <>
          <h1 className="text-4xl sm:text-6xl lg:text-7xl text-center tracking-wide">
            Re Action!
          </h1>
          <h2 className="mt-4 text-lg text-gray-400">
            Teste seu tempo de reação e melhore conforme o tempo
          </h2>
          <button
            onClick={startTest}
            className="mt-6 bg-blue-600 text-white px-6 py-2 rounded-xl hover:bg-blue-700 transition"
          >
            Começar!
          </button>
        </>
      )}

      {showGraph && (
        <div className="mt-10 w-full max-w-2xl">
          <h3 className="text-xl font-semibold mb-4 text-center">
            Tempos de reação (ms)
          </h3>
          <Line
            data={{
              labels: times.map((_, i) => `#${i + 1}`),
              datasets: [
                {
                  label: "Tempo de reação (ms)",
                  data: times.map((t) => Math.round(t)),
                  borderColor: "rgba(59, 130, 246, 0.8)",
                  backgroundColor: "rgba(59, 130, 246, 0.2)",
                  fill: true,
                },
              ],
            }}
            options={{
              responsive: true,
              scales: {
                y: {
                  beginAtZero: true,
                  title: {
                    display: true,
                    text: "Milissegundos (ms)",
                  },
                },
              },
            }}
          />
          <p className="text-center mt-4 text-lg">
            Média: <strong>{average(times).toFixed(2)} ms</strong>
          </p>
          <button
            onClick={resetTest}
            className="mt-6 bg-green-600 text-white px-6 py-2 rounded-xl hover:bg-green-700 transition"
          >
            Tentar novamente
          </button>
        </div>
      )}
    </div>
  );
};

export default MainPage;

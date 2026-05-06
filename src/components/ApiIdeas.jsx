import { useEffect, useState } from "react";

function ApiIdeas() {
  const [ideas, setIdeas] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();
    let ignoreResult = false;

    async function loadIdeas() {
      try {
        setIsLoading(true);
        setError("");

        const response = await fetch(
          "https://jsonplaceholder.typicode.com/todos?_limit=5",
          { signal: controller.signal }
        );

        if (!response.ok) {
          throw new Error("Не удалось получить данные с API");
        }

        const data = await response.json();
        if (!ignoreResult) {
          setIdeas(data);
        }
      } catch (apiError) {
        if (!ignoreResult && apiError.name !== "AbortError") {
          setError(apiError.message);
        }
      } finally {
        if (!ignoreResult) {
          setIsLoading(false);
        }
      }
    }

    loadIdeas();

    return () => {
      ignoreResult = true;
      controller.abort();
    };
  }, []);

  return (
    <section className="api-panel">
      <div className="section-heading">
        <p className="section-kicker">Работа с API</p>
        <h2>Идеи из API</h2>
      </div>

      {isLoading && <p className="muted-text">Загрузка идей...</p>}
      {error && <p className="error-text">{error}</p>}

      {!isLoading && !error && (
        <ul className="api-list">
          {ideas.map((idea) => (
            <li key={idea.id}>{idea.title}</li>
          ))}
        </ul>
      )}
    </section>
  );
}

export default ApiIdeas;

export const categoryOptions = [
  "Учеба",
  "Здоровье",
  "Развитие",
  "Работа",
  "Личное",
];

export const frequencyOptions = [
  "Каждый день",
  "5 раз в неделю",
  "3 раза в неделю",
  "1 раз в неделю",
];

function HabitForm({
  title,
  category,
  frequency,
  onTitleChange,
  onCategoryChange,
  onFrequencyChange,
  onSubmit,
}) {
  return (
    <section>
      <div className="section-heading">
        <p className="section-kicker">Добавление элемента</p>
        <h2>Новая привычка</h2>
      </div>

      <form className="habit-form" onSubmit={onSubmit}>
        <label>
          Название
          <input
            type="text"
            placeholder="Например: Повторить useState"
            value={title}
            onChange={(event) => onTitleChange(event.target.value)}
          />
        </label>

        <label>
          Категория
          <select
            value={category}
            onChange={(event) => onCategoryChange(event.target.value)}
          >
            {categoryOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>

        <label>
          Частота
          <select
            value={frequency}
            onChange={(event) => onFrequencyChange(event.target.value)}
          >
            {frequencyOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>

        <button className="primary-button" type="submit">
          Добавить привычку
        </button>
      </form>
    </section>
  );
}

export default HabitForm;

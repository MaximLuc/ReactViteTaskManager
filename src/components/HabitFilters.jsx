function HabitFilters({
  search,
  statusFilter,
  onSearchChange,
  onStatusChange,
}) {
  return (
    <section className="filters">
      <div className="section-heading">
        <p className="section-kicker">Дополнительный функционал</p>
        <h2>Поиск и фильтрация</h2>
      </div>

      <label>
        Поиск
        <input
          type="text"
          placeholder="Искать по названию или категории"
          value={search}
          onChange={(event) => onSearchChange(event.target.value)}
        />
      </label>

      <div className="filter-buttons">
        <button
          type="button"
          className={statusFilter === "all" ? "filter-active" : ""}
          onClick={() => onStatusChange("all")}
        >
          Все
        </button>
        <button
          type="button"
          className={statusFilter === "active" ? "filter-active" : ""}
          onClick={() => onStatusChange("active")}
        >
          Активные
        </button>
        <button
          type="button"
          className={statusFilter === "done" ? "filter-active" : ""}
          onClick={() => onStatusChange("done")}
        >
          Выполненные
        </button>
      </div>
    </section>
  );
}

export default HabitFilters;

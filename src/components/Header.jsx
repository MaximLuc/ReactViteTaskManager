function Header({ total, completed, active }) {
  return (
    <header className="hero">
      <div>
        <p className="eyebrow">Индивидуальный мини-проект на React</p>
        <h1>Focus Flow</h1>
        <p className="hero-text">
          Трекер привычек и задач с добавлением, редактированием, удалением,
          поиском, фильтрацией, API-загрузкой и несколькими страницами.
        </p>
      </div>

      <div className="stats">
        <article className="stat-card">
          <span>Всего привычек</span>
          <strong>{total}</strong>
        </article>
        <article className="stat-card">
          <span>Выполнено</span>
          <strong>{completed}</strong>
        </article>
        <article className="stat-card">
          <span>Активно</span>
          <strong>{active}</strong>
        </article>
      </div>
    </header>
  );
}

export default Header;

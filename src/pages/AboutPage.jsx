function AboutPage({ total, completed, active }) {
  return (
    <section className="about-layout">
      <article className="panel">
        <div className="section-heading">
          <p className="section-kicker">Страница 2</p>
          <h2>О проекте</h2>
        </div>
        <p>
          Focus Flow помогает вести список привычек: добавлять новые элементы,
          менять их статус, редактировать текст, искать по названию и
          фильтровать по состоянию.
        </p>
        <p>
          Состояние привычек хранится в верхнем компоненте приложения и
          передается в дочерние компоненты через props. Поэтому счетчики,
          список и форма работают с одним общим источником данных.
        </p>
      </article>

      <article className="panel">
        <div className="section-heading">
          <p className="section-kicker">Общее состояние</p>
          <h2>Текущая статистика</h2>
        </div>
        <div className="summary-grid">
          <div>
            <span>Всего</span>
            <strong>{total}</strong>
          </div>
          <div>
            <span>Выполнено</span>
            <strong>{completed}</strong>
          </div>
          <div>
            <span>Активно</span>
            <strong>{active}</strong>
          </div>
        </div>
      </article>

      <article className="panel">
        <div className="section-heading">
          <p className="section-kicker">React concepts</p>
          <h2>Что реализовано</h2>
        </div>
        <ul className="feature-list">
          <li>useState управляет привычками, формой, фильтрами и темой.</li>
          <li>useEffect сохраняет данные в LocalStorage и загружает идеи с API.</li>
          <li>React Router переключает страницы «Привычки» и «О проекте».</li>
          <li>Props передают состояние и обработчики в компоненты списка.</li>
        </ul>
      </article>
    </section>
  );
}

export default AboutPage;

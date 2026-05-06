import { useEffect, useMemo, useState } from "react";
import { Navigate, NavLink, Route, Routes } from "react-router-dom";
import EmptyState from "./components/EmptyState.jsx";
import HabitFilters from "./components/HabitFilters.jsx";
import HabitForm from "./components/HabitForm.jsx";
import HabitList from "./components/HabitList.jsx";
import Header from "./components/Header.jsx";
import ApiIdeas from "./components/ApiIdeas.jsx";
import AboutPage from "./pages/AboutPage.jsx";

const HABITS_STORAGE_KEY = "focus-flow-habits";
const THEME_STORAGE_KEY = "focus-flow-theme";

const initialHabits = [
  {
    id: 1,
    title: "Сделать домашнее задание по React",
    category: "Учеба",
    frequency: "Каждый день",
    completed: false,
  },
  {
    id: 2,
    title: "Прочитать 20 страниц книги",
    category: "Развитие",
    frequency: "5 раз в неделю",
    completed: true,
  },
  {
    id: 3,
    title: "Прогулка без телефона",
    category: "Здоровье",
    frequency: "3 раза в неделю",
    completed: false,
  },
];

function getStoredHabits() {
  const storedHabits = localStorage.getItem(HABITS_STORAGE_KEY);

  if (!storedHabits) {
    return initialHabits;
  }

  try {
    const parsedHabits = JSON.parse(storedHabits);
    return Array.isArray(parsedHabits) ? parsedHabits : initialHabits;
  } catch {
    return initialHabits;
  }
}

function App() {
  const [habits, setHabits] = useState(getStoredHabits);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Учеба");
  const [frequency, setFrequency] = useState("Каждый день");
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [theme, setTheme] = useState(
    () => localStorage.getItem(THEME_STORAGE_KEY) || "light"
  );

  useEffect(() => {
    localStorage.setItem(HABITS_STORAGE_KEY, JSON.stringify(habits));
  }, [habits]);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  }, [theme]);

  const completedCount = habits.filter((habit) => habit.completed).length;
  const activeCount = habits.length - completedCount;

  const filteredHabits = useMemo(() => {
    return habits.filter((habit) => {
      const normalizedSearch = search.toLowerCase();
      const matchesSearch =
        habit.title.toLowerCase().includes(normalizedSearch) ||
        habit.category.toLowerCase().includes(normalizedSearch);

      const matchesStatus =
        statusFilter === "all" ||
        (statusFilter === "done" && habit.completed) ||
        (statusFilter === "active" && !habit.completed);

      return matchesSearch && matchesStatus;
    });
  }, [habits, search, statusFilter]);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!title.trim()) {
      return;
    }

    const newHabit = {
      id: Date.now(),
      title: title.trim(),
      category,
      frequency,
      completed: false,
    };

    setHabits((currentHabits) => [newHabit, ...currentHabits]);
    setTitle("");
    setCategory("Учеба");
    setFrequency("Каждый день");
  };

  const handleToggle = (id) => {
    setHabits((currentHabits) =>
      currentHabits.map((habit) =>
        habit.id === id ? { ...habit, completed: !habit.completed } : habit
      )
    );
  };

  const handleDelete = (id) => {
    setHabits((currentHabits) =>
      currentHabits.filter((habit) => habit.id !== id)
    );
  };

  const handleUpdate = (id, updatedHabit) => {
    setHabits((currentHabits) =>
      currentHabits.map((habit) =>
        habit.id === id ? { ...habit, ...updatedHabit } : habit
      )
    );
  };

  const toggleTheme = () => {
    setTheme((currentTheme) => (currentTheme === "light" ? "dark" : "light"));
  };

  return (
    <div className="app-shell">
      <main className="app">
        <Header
          total={habits.length}
          completed={completedCount}
          active={activeCount}
        />

        <nav className="top-nav" aria-label="Основная навигация">
          <div className="nav-links">
            <NavLink to="/habits">Привычки</NavLink>
            <NavLink to="/about">О проекте</NavLink>
          </div>
          <button className="theme-button" type="button" onClick={toggleTheme}>
            {theme === "light" ? "Темная тема" : "Светлая тема"}
          </button>
        </nav>

        <Routes>
          <Route path="/" element={<Navigate to="/habits" replace />} />
          <Route
            path="/habits"
            element={
              <section className="grid-layout">
                <div className="panel panel-form">
                  <HabitForm
                    title={title}
                    category={category}
                    frequency={frequency}
                    onTitleChange={setTitle}
                    onCategoryChange={setCategory}
                    onFrequencyChange={setFrequency}
                    onSubmit={handleSubmit}
                  />

                  <HabitFilters
                    search={search}
                    statusFilter={statusFilter}
                    onSearchChange={setSearch}
                    onStatusChange={setStatusFilter}
                  />

                  <ApiIdeas />
                </div>

                <section className="panel panel-list">
                  {filteredHabits.length > 0 ? (
                    <HabitList
                      habits={filteredHabits}
                      onToggle={handleToggle}
                      onDelete={handleDelete}
                      onUpdate={handleUpdate}
                    />
                  ) : (
                    <EmptyState />
                  )}
                </section>
              </section>
            }
          />
          <Route
            path="/about"
            element={
              <AboutPage
                total={habits.length}
                completed={completedCount}
                active={activeCount}
              />
            }
          />
          <Route path="*" element={<Navigate to="/habits" replace />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;

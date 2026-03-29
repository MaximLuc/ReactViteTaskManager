import { useMemo, useState } from "react";
import Header from "./components/Header.jsx";
import HabitForm from "./components/HabitForm.jsx";
import HabitFilters from "./components/HabitFilters.jsx";
import HabitList from "./components/HabitList.jsx";
import EmptyState from "./components/EmptyState.jsx";

const initialHabits = [
  {
    id: 1,
    title: "Сделать домашнее задание по React",
    category: "Учёба",
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

function App() {
  const [habits, setHabits] = useState(initialHabits);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Учёба");
  const [frequency, setFrequency] = useState("Каждый день");
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const completedCount = habits.filter((habit) => habit.completed).length;

  const filteredHabits = useMemo(() => {
    return habits.filter((habit) => {
      const matchesSearch =
        habit.title.toLowerCase().includes(search.toLowerCase()) ||
        habit.category.toLowerCase().includes(search.toLowerCase());

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
    setCategory("Учёба");
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

  return (
    <div className="app-shell">
      <div className="background-shape background-shape-left" />
      <div className="background-shape background-shape-right" />

      <main className="app">
        <Header total={habits.length} completed={completedCount} />

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
      </main>
    </div>
  );
}

export default App;

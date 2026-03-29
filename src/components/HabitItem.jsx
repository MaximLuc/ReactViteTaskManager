import { useState } from "react";

function HabitItem({ habit, onToggle, onDelete, onUpdate }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(habit.title);
  const [editedCategory, setEditedCategory] = useState(habit.category);
  const [editedFrequency, setEditedFrequency] = useState(habit.frequency);

  const saveChanges = () => {
    if (!editedTitle.trim()) {
      return;
    }

    onUpdate(habit.id, {
      title: editedTitle.trim(),
      category: editedCategory,
      frequency: editedFrequency,
    });
    setIsEditing(false);
  };

  const cancelChanges = () => {
    setEditedTitle(habit.title);
    setEditedCategory(habit.category);
    setEditedFrequency(habit.frequency);
    setIsEditing(false);
  };

  return (
    <article className={`habit-card ${habit.completed ? "habit-done" : ""}`}>
      <div className="habit-card-top">
        <span className="badge">{habit.category}</span>
        {habit.completed ? (
          <span className="status status-done">Выполнено</span>
        ) : (
          <span className="status">В процессе</span>
        )}
      </div>

      {isEditing ? (
        <div className="edit-panel">
          <input
            type="text"
            value={editedTitle}
            onChange={(event) => setEditedTitle(event.target.value)}
          />
          <input
            type="text"
            value={editedCategory}
            onChange={(event) => setEditedCategory(event.target.value)}
          />
          <input
            type="text"
            value={editedFrequency}
            onChange={(event) => setEditedFrequency(event.target.value)}
          />
        </div>
      ) : (
        <div className="habit-content">
          <h3>{habit.title}</h3>
          <p>Частота: {habit.frequency}</p>
        </div>
      )}

      <div className="habit-actions">
        <button type="button" onClick={() => onToggle(habit.id)}>
          {habit.completed ? "Отметить как активную" : "Отметить выполненной"}
        </button>

        {isEditing ? (
          <>
            <button type="button" onClick={saveChanges}>
              Сохранить
            </button>
            <button type="button" onClick={cancelChanges}>
              Отмена
            </button>
          </>
        ) : (
          <button type="button" onClick={() => setIsEditing(true)}>
            Изменить
          </button>
        )}

        <button
          type="button"
          className="danger-button"
          onClick={() => onDelete(habit.id)}
        >
          Удалить
        </button>
      </div>
    </article>
  );
}

export default HabitItem;

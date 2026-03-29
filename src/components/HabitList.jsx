import HabitItem from "./HabitItem.jsx";

function HabitList({ habits, onToggle, onDelete, onUpdate }) {
  return (
    <div className="habit-list">
      {habits.map((habit) => (
        <HabitItem
          key={habit.id}
          habit={habit}
          onToggle={onToggle}
          onDelete={onDelete}
          onUpdate={onUpdate}
        />
      ))}
    </div>
  );
}

export default HabitList;

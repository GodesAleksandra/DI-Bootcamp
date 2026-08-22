import { useSelector } from 'react-redux';
import TodoItem from './TodoItem';
import styles from './TodoList.module.css';

function TodoList() {
  const todos = useSelector((state) => state.todos);

  if (todos.length === 0) {
    return <p className={styles.emptyText}>No tasks yet. Take a break! 😊</p>;
  }

  return (
    <ul className={styles.list}>
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </ul>
  );
}

export default TodoList;

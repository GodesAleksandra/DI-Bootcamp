import { useDispatch } from 'react-redux';
import { toggleTodo, removeTodo } from '../features/todo/todoSlice';
import styles from './TodoItem.module.css';

function TodoItem({ todo }) {
  const dispatch = useDispatch();

  const itemClass = `${styles.item} ${todo.completed ? styles.itemCompleted : styles.itemNormal}`;
  const textClass = `${styles.text} ${todo.completed ? styles.textCompleted : ''}`;

  return (
    <li className={itemClass}>
      <span 
        onClick={() => dispatch(toggleTodo(todo.id))} 
        className={textClass}
      >
        {todo.text}
      </span>
      <button 
        onClick={() => dispatch(removeTodo(todo.id))} 
        className={styles.deleteButton}
      >
        Remove
      </button>
    </li>
  );
}

export default TodoItem;

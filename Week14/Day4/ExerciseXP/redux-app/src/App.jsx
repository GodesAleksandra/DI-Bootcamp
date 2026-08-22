import AddTodo from './components/AddTodo';
import TodoList from './components/TodoList';

function App() {
  return (
    <div style={{ maxWidth: '400px', margin: '50px auto', fontFamily: 'Arial, sans-serif' }}>
      <h2>My Todo List 📝</h2>
      
      <AddTodo />
      
      <TodoList />
    </div>
  );
}

export default App;
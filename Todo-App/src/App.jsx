import { useState } from "react";
import "./App.css";

function App() {
  const [todoList, setTodoList] = useState([
    { id: 0, content: "123", done: false },
  { id: 1, content: "코딩 공부하기", done: false },
  { id: 2, content: "잠 자기", done: false },
  ]);

  return (
    <>
    <div className="center">
      <div className="stack">
        <header>
          <h1>ToDo</h1>
        </header>
        <TodoList todoList={todoList} setTodoList={setTodoList} />
        <hr />
        <TodoInput todoList={todoList} setTodoList={setTodoList} />
      </div>
    </div>
    </>
  );
}

function TodoInput({ todoList, setTodoList }) {
  const [inputValue, setInputValue] = useState("");

  return (
    <>
      <input
        value={inputValue}
        onChange={(event) => setInputValue(event.target.value)}
      />
      <button className="button"
        onClick={() => {
          const newTodo = { id: Number(new Date()), content: inputValue };
          const newTodoList = [...todoList, newTodo];
          setTodoList(newTodoList);
          setInputValue("");
        }}
      >
        추가하기
      </button>
    </>
  );
}

function TodoList({ todoList, setTodoList }) {
  return (
    <ul>
      {todoList.map((todo) => (
        <Todo key={todo.id} todo={todo} setTodoList={setTodoList} />
      ))}
    </ul>
  );
}

function Todo({ todo, setTodoList }) {
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(todo.content);

  const commit = () => {
    const text = value.trim();
    setTodoList((prev) =>
      prev.map((el) =>
        el.id === todo.id ? { ...el, content: text || todo.content } : el
      )
    );
    setIsEditing(false);
  };

  const toggleDone = () => {
    setTodoList((prev) =>
      prev.map((el) =>
        el.id === todo.id ? { ...el, done: !el.done } : el
      )
    );
  };

  return (
    <li>
      <input
        type="checkbox"
        checked={todo.done}
        onChange={toggleDone}
      />
      {isEditing ? (
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && commit()}
          onBlur={commit}
          autoFocus
        />
      ) : (
        <>
          {todo.content}
          <button className="button"
            onClick={() => {
              setIsEditing(true);
              setValue(todo.content); // 현재 내용으로 편집 시작
            }}
          >
            수정
          </button>
        </>
      )}
      <button className="button"
        onClick={() =>
          setTodoList((prev) => prev.filter((el) => el.id !== todo.id))
        }
      >
        삭제
      </button>
    </li>
  );
}

export default App;
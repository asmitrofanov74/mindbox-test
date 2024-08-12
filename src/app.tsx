import { useState } from "react";
import { Todo } from "./components/todo";
import { TodoValueProps } from "./interfaces";
import "../src/styles/app.css";

function App() {
  const [value, setValue] = useState<TodoValueProps[] | null>(null);
  return (
    <div className="App">
      <Todo value={value} setValue={setValue} />
    </div>
  );
}

export default App;

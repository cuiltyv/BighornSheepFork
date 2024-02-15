import "./App.css";
import DropdownMonth from "./DropdownMonth";
import { useState } from "react";
import { firstName, lastName } from "./superHeroName";

function App() {
  const [name, setName] = useState("");
  const [month, setMonth] = useState("");

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  return (
    <div className="App">
      <h1>React App</h1>
      <div className="dropdowns">
        <form>
          <label for="letter">Write your name's first letter:</label>
          <input
            type="text"
            id="letter"
            name="letter"
            onChange={handleNameChange}
            value={name}
          />
        </form>
        <DropdownMonth setMonth={setMonth} />
      </div>

      <div className="results">
        <h2>Results</h2>
        <p>Your name starts with: {name}</p>
        <p>Your birth month is: {month}</p>
        <p>
          Your SuperHero name is: {firstName.get(name)} {lastName.get(month)}
        </p>
      </div>
    </div>
  );
}

export default App;

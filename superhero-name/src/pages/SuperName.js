import DropdownMonth from "../components/DropdownMonth";
import { useState } from "react";
import { firstName, lastName } from "../components/superHeroName";
import "./SuperName.css";


function SuperName() {
    const [letter, setLetter] = useState("");
    const [month, setMonth] = useState("");

    return (
        <div className="SuperName">
            <h1>My Superhero Name</h1>
            <form>
                <label for="letter">Write your name's first letter:</label>
                <input
                    type="text"
                    id="letter"
                    onChange={(e) => {
                        const char = e.target.value;
                        if (char === "" || char.match(/^[a-zA-Z]$/)) setLetter(char);
                    }}
                    value={letter}
                    maxLength={1}
                />
            </form>
            <DropdownMonth setMonth={setMonth} />

            <div className="results">
                <h2>Results</h2>
                <p>Your name starts with: {letter}</p>
                <p>Your birth month is: {month}</p>
                <b>
                    Your Superhero name is: {firstName[letter.toLowerCase()]}{" "}
                    {lastName[month]}
                </b>
            </div>
        </div>
    );
}

export default SuperName;



import React from "react";
import { GrAdd, GrSubtract } from "react-icons/gr";

import "tailwindcss/tailwind.css";
import "../styles/styles.css";

export default function PeopleSelect({ people, setPeople }) {
  const addPerson = () => {
    if (people.length < 6) {
      setPeople([...people, { name: "", registration: "" }]);
    }
  };

  const handleNameChange = (value, index) => {
    if (index === 0) return;
    const updatedPeople = [...people];
    updatedPeople[index].name = value;
    setPeople(updatedPeople);
  };

  const removePerson = () => {
    if (people.length > 1) {
      const updatedPeople = [...people];
      updatedPeople.pop();
      setPeople(updatedPeople);
    }
  };

  const handleRegistrationChange = (value, index) => {
    if (index === 0) return;
    const updatedPeople = [...people];
    updatedPeople[index].registration = value;
    setPeople(updatedPeople);
  };

  return (
    <div className="mx-4 my-10">
      <h2 className="mb-5 text-2xl font-bold">Personas adicionales</h2>
      {people.map((person, index) => (
        <div key={index} className="w- mb-2 flex items-center">
          <input
            type="text"
            placeholder="Matrícula"
            value={person.registration}
            onChange={(e) => handleRegistrationChange(e.target.value, index)}
            className="mr-2 w-40 rounded border border-gray-300 p-2 drop-shadow-lg"
            data-cy="matricula-input"
          />
          <input
            type="text"
            placeholder="Nombre"
            value={person.name}
            onChange={(e) => handleNameChange(e.target.value, index)}
            className="mr-2 w-80 rounded border border-gray-300 p-2 drop-shadow-lg"
            data-cy="nombre-input"
          />

          {index === people.length - 1 && (
            <>
              <button
                onClick={removePerson}
                className="h-11 w-11 rounded-full  border-2 border-gray-500 px-3 py-2 text-gray-500 "
              >
                <GrSubtract />
              </button>
              <button
                onClick={addPerson}
                className="bh-border-blue bh-text-blue ml-4  h-11 w-11 rounded-full border-2 px-3 py-2"
              >
                <GrAdd />
              </button>
            </>
          )}
        </div>
      ))}
    </div>
  );
}

import React from "react";
import { GrAdd, GrSubtract } from "react-icons/gr";

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
    <div className="mt-10">
      <h2 className="mb-2 text-xl font-bold">
        Personas adicionales reservación
      </h2>
      {people.map((person, index) => (
        <div key={index} className="mb-2 flex items-center">
          <input
            type="text"
            placeholder="Matrícula"
            value={person.registration}
            onChange={(e) => handleRegistrationChange(e.target.value, index)}
            className={`mr-2 w-60 rounded-md bg-white placeholder-black shadow-[0_5px_20px_-5px_rgba(0,0,0,0.3)] placeholder:text-xl ${index === 0 ? "text-gray-400" : "text-black"}`}
            data-cy="matricula-input"
            readOnly={index === 0}
          />

          <input
            type="text"
            placeholder="Nombre"
            value={person.name}
            onChange={(e) => handleNameChange(e.target.value, index)}
            className={`mr-2 w-full rounded-md bg-white placeholder-black shadow-[0_5px_20px_-5px_rgba(0,0,0,0.3)] placeholder:text-xl ${index === 0 ? "text-gray-400" : "text-black"}`}
            data-cy="nombre-input"
            readOnly={index === 0}
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

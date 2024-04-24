import React from "react";

interface MultiSelectFilterProps {
  options: string[];
  selectedOptions: Set<string>;
  setSelectedOptions: (options: Set<string>) => void;
  title: string;
}

const MultiSelectFilter: React.FC<MultiSelectFilterProps> = ({
  options,
  selectedOptions,
  setSelectedOptions,
  title,
}) => {
  const toggleOption = (option: string) => {
    const newSelectedOptions = new Set(selectedOptions);
    if (selectedOptions.has(option)) {
      newSelectedOptions.delete(option);
    } else {
      newSelectedOptions.add(option);
    }
    setSelectedOptions(newSelectedOptions);
  };

  const selectAll = () => setSelectedOptions(new Set(options));
  const clearAll = () => setSelectedOptions(new Set());

  return (
    <div
      className="multi-select-filter"
      style={{
        padding: "10px",
        border: "1px solid #ccc",
        borderRadius: "5px",
        margin: "10px",
      }}
    >
      <h3 style={{ margin: "0 0 10px 0" }}>{title}</h3>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "10px",
        }}
      >
        <button
          onClick={selectAll}
          style={{
            background: "#f0f0f0",
            color: "#333",
            padding: "5px 10px",
            border: "1px solid #ddd",
            borderRadius: "3px",
            cursor: "pointer",
            marginRight: "5px",
          }}
        >
          Seleccionar todas
        </button>
        <button
          onClick={clearAll}
          style={{
            background: "#f0f0f0",
            color: "#333",
            padding: "5px 10px",
            border: "1px solid #ddd",
            borderRadius: "3px",
            cursor: "pointer",
          }}
        >
          Limpiar
        </button>
      </div>
      <div style={{ maxHeight: "200px", overflowY: "auto" }}>
        {options.map((option) => (
          <div key={option} style={{ marginBottom: "5px" }}>
            <label>
              <input
                type="checkbox"
                checked={selectedOptions.has(option)}
                onChange={() => toggleOption(option)}
                style={{ marginRight: "5px" }}
              />
              {option}
            </label>
          </div>
        ))}
      </div>
      <div style={{ textAlign: "right", marginTop: "10px" }}>
        <button
          onClick={clearAll}
          style={{
            marginRight: "5px",
            background: "red",
            color: "white",
            padding: "5px 10px",
            border: "none",
            borderRadius: "3px",
            cursor: "pointer",
          }}
        >
          Cancelar
        </button>
        <button
          style={{
            background: "green",
            color: "white",
            padding: "5px 10px",
            border: "none",
            borderRadius: "3px",
            cursor: "pointer",
          }}
        >
          Aplicar
        </button>
      </div>
    </div>
  );
};

export default MultiSelectFilter;

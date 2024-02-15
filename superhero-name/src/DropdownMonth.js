import Dropdown from "react-bootstrap/Dropdown";

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

function DropdownMonth({ setMonth }) {
  return (
    <Dropdown>
      <Dropdown.Toggle variant="success" id="dropdown-basic">
        Take the month you were born
      </Dropdown.Toggle>

      <Dropdown.Menu>
        {months.map((month, index) => {
          return (
            <Dropdown.Item key={index} onClick={() => setMonth(month)}>
              {month}
            </Dropdown.Item>
          );
        })}
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default DropdownMonth;

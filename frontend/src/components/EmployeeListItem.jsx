import { Link } from "react-router-dom";
import "../pages/pages.css";

const EmployeeListItem = (props) => {
  const { details } = props;
  const { first_name, last_name, email, phone, id } = details;
  return (
    <Link className="link" to={`/employees/${id}`}>
      <li className="list-item">
        <h3 className=""> EmployeeID : {id}</h3>
        <p className="full_name">Full Name : {first_name + last_name}</p>
        <p className="email">Email : {email}</p>
        <p className="phone">Phone : {phone}</p>
      </li>
    </Link>
  );
};

export default EmployeeListItem;

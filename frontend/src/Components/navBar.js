import { Link } from "react-router-dom";
import Dropdown from "./Dropdown";

export default function NavBar() {
  return (
    <div className="navbar-container">
      <i class="fa-solid fa-circle-info"></i>
      <Link to={"/"}>
        <h1>MIXLE</h1>
      </Link>
      <Dropdown />
    </div>
  );
}

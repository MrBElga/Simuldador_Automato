import { Link } from "react-router-dom";
import "./header.scss";

export function Header() {
  return (
    <header className="main-header">
      <nav className="nav">
        <Link to="/" className="nav-link">
          Home
        </Link>
        <Link to="/expressaoregular" className="nav-link">
          Expressões Regulares
        </Link>
        <Link to="/gramaticaregular" className="nav-link">
          Gramática Regular
        </Link>
        <Link to="/automatofinito" className="nav-link">
          Autômatos
        </Link>
      </nav>
    </header>
  );
}

import { Link } from 'react-router-dom';
import { FaBookOpen } from 'react-icons/fa';

const Navbar = ({ onAddClick }) => {
    return (
        <nav className="navbar">
            <div className="container nav-container">
                <Link to="/" className="nav-logo" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <FaBookOpen className="text-primary" />
                    <span>BookInventory</span>
                </Link>
                <div className="nav-links">
                    <Link to="/" className="nav-link">Home</Link>
                    {onAddClick ? (
                        <button onClick={onAddClick} className="btn btn-primary">Add Book</button>
                    ) : (
                        <Link to="/add" className="btn btn-primary">Add Book</Link>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;

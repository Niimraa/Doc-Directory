import {Link} from 'react-router-dom'

// The Title
const Navbar = () => {
    return (
      <header>
        <div className="container">
          <h1>DocDirectory</h1>
  
          <nav className="nav-bar">
            <ul>
              <li>
                <Link to="allarticles" className="see-button">
                  See Articles
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>
    );
  };
  
export default Navbar
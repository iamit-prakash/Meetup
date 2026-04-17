import {NavLink} from "react-router-dom"

const Header = ({ searchTerm, setSearchTerm }) => {
    return (
        <header className="container py-3">
            <nav className="navbar">
        <NavLink to="/" className="text-decoration-none">
          <h2 style={{ color: "red" }} >Meetup</h2>
        </NavLink>
        
        <input type="text" placeholder="Search by title and tag" value={searchTerm} onChange={(e)=>setSearchTerm(e.target.value)}/>
      </nav>

      <hr />
        </header>
    )
}
export default Header;
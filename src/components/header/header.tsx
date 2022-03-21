import { NavLink } from 'react-router-dom';

const Header = () => (
  <nav>
    <NavLink
      style={
  ({ isActive }) => (
   isActive
   ? {
      textDecoration: 'none',
      color: 'red',
     }
   : {}
   )
 }
      className="nav-link"
      to="/"
    >
      Home
    </NavLink>
    <NavLink
      style={
            ({ isActive }) => (
             isActive
             ? {
                textDecoration: 'none',
                color: 'red',
               }
             : {}
             )
           }
      className="nav-link"
      to="/posts"
    >
      Users
    </NavLink>
  </nav>
  );
export default Header;

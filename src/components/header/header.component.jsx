import React from "react";
import { Link } from "react-router-dom";
import './header.styles.scss';

import {createStructuredSelector} from 'reselect';

import { ReactComponent as Logo } from "../../assets/crown.svg";
import { auth } from "../../firebase/firebase.utils"; 
import { connect } from "react-redux"; 
import CartIcon from "../cart-icon/cart-icon.component"; 
import CartDropdown from '../cart-dropdown/cart-dropdown.component';
import { selectCartHidden } from "../../redux/cart/cart.selectors";
import { selectCurrentUser } from "../../redux/user/user.selectors";


const Header = ({ currentUser, hidden }) => (
    <div className='header'>
      <Link className='logo-container' to='/'>
        <Logo className='logo' />
      </Link>
      <div className='options'>
        <Link className='option' to='/shop'>
          SHOP
        </Link>
        <Link className='option' to='/checkout'>
          CONTACT
        </Link>
        {
          currentUser?
          <div className='option' onClick={() => auth.signOut()}> SIGN OUT</div>
          :
          <div><Link className='option' to='/sign-in'> SIGN IN</Link></div>
          
          
        }
        <CartIcon /> 
      </div>
      {
        hidden ? null: <CartDropdown />
      }
      
    </div>
  );

const mapStateToProps = createStructuredSelector ({
  currentUser : selectCurrentUser,
  hidden: selectCartHidden
})

export default connect(mapStateToProps) (Header);
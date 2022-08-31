import React from 'react';
import './App.css';
import  {  Routes, Route  } from 'react-router-dom';

import HomePage from './pages/homepage/homepage.component';

import ShopPage from './pages/shop/shop.component';

import Header from '../src/components/header/header.component';

import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import CheckoutPage from './pages/checkout/checkout.component';

import { auth, createUserProfilDocument } from './firebase/firebase.utils';

import { connect } from 'react-redux';
import { setCurrentUser } from './redux/user/user.actions';

import { selectCurrentUser} from './redux/user/user.selectors';

import { createStructuredSelector } from 'reselect';


class App extends React.Component {

  

  unsubscribeFromAuth = null;

  componentDidMount(){
    const { setCurrentUser } = this.props;

    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if(userAuth){
        const userRef =await createUserProfilDocument(userAuth);
        userRef.onSnapshot(snapShot =>{
          setCurrentUser({
              id: snapShot.id,
              ...snapShot.data()
          });
        });
        console.log(this.state);
      }

      setCurrentUser( userAuth );
    })
  } 

  componentWillUnmount(){
    this.unsubscribeFromAuth();
  }


  render() {
    return (
      <div>
        <Header /> 
        <Routes>
          <Route exact path='/' element={<HomePage/>} />
          <Route path='/shop' element={<ShopPage/>} />
          <Route path='/sign-in' element={<SignInAndSignUpPage/>} />
          <Route path='/checkout' element={<CheckoutPage/>} />
        </Routes>
           
      </div>
    )
  }

}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
});
    
const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
})  

export default connect(mapStateToProps,mapDispatchToProps) (App);

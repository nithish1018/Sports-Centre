import React from 'react';
// Dialogue 1: Just import the file
import SigninForm from "./SigninForm"


const Signin: React.FC = () => {
  // Dialogue 2: And use it after the h1 tag
  return (
    <div >
      <div >
        <SigninForm />
      </div>
      </div>
 
  );
}
export default Signin;
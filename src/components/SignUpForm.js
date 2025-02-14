import React from "react";
import Input from "./Input";
import "./Form.css";
import {Link} from "react-router-dom";
import Fade from "react-reveal/Fade";
import {auth} from "../../src/firebase";
import SignUpSuccess from "./SignUpSuccess"

class SignUpForm extends React.Component{
    state = { 
        username:'',
        email: '',
        password: '',
        confirmPass: '',
        isSignedUp: false,
    }

    handleChange = (ev) => {
      const {name,value} = ev.target;
      this.setState({
          [name]:value
      })
    }
    
    handleSubmit = () => {
        this.clearState()
        const{email, password} = this.state

        auth.createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
          // Signed in 
          var user = userCredential.user;
         if(user){
            this.setState({
                isSignedUp: true
            })
         }
        })
        .catch((error) => {
           var errorCode = error.code;
           var errorMessage = error.message;
           console.error(errorCode, errorMessage) 
        });
    }

    clearState = () => {
        this.setState({
            username:'',
            email: '',
            password: '',
            confirmPass: ''
        })
    }

    //TODO Errors and Validation
//     validateData = () => {
//      const {username, email, password, confirmPass} = this.state
//      this.validateUsername(username)

//    }

//     validateUsername = (username) => {
//     const userErrors = []    
//     if(username.trim().length < 3 && !this.state.errors.includes('Username is too short')){
//         userErrors.push('Username is too short')
//         }
//     if(!(/^([^0-9]*)$/).test(username)){
//         userErrors.push('Username can not contain Numbers')
//     }
//     if(userErrors.length >0){
//         this.setState ({
//             errors: this.state.errors.concat(userErrors)
//         })
//         return false
//     } else {
//         return true
//     }
//    }

//    validatePassword = (password, confirmPass) => {
//        const errors = []
//        if((!password) && (!confirmPass)){
//         errors.push('Password is required')
//        }

//    }

    render(){
        const {username, email, password, confirmPass,isSignedUp} = this.state
        
        return (
                <Fade left duration={600} distance="50px">
                    <div className="form">
                    {isSignedUp ? (<SignUpSuccess/>) : 
                        (<>
                            <h1 className="form__title">Welcome!</h1>
                            <p className="form__subtitle">Please Sign Up to start making our country green!</p>
                            
                            <Input value={username}  handleChange={this.handleChange} type="text" name={'username'} placeholder="Name..."/>
                            <Input value={email} handleChange={this.handleChange} type="email" name={'email'} placeholder="Email..."/>
                            <Input value={password} handleChange={this.handleChange} type="password" name={'password'} placeholder="Password..."/>
                            <Input value={confirmPass} handleChange={this.handleChange} type="password" name={'confirmPass'} placeholder="Confirm Password..."/>
                            <Input handleSubmit={this.handleSubmit} type="button" className={'form__submit'} value="Sign Up"/>
                            <Link to="/signIn" className="form__link">Already signed up?</Link>
                        </>)}
                    </div>
                </Fade>
        )
    }
}

export default SignUpForm
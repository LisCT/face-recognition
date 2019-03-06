import React from 'react';
import PropTypes from 'prop-types';
import Header from '../Header';
import FormErrors from './FormError';

class Signin extends React.Component { 

    static propTypes = {

        onRouteChange: PropTypes.func.isRequired,
        loadUser: PropTypes.func.isRequired  

    }

    state = {

        email: '',
        password: '',
        formErrors: { email: '', password: '' },
        emailValid: false,
        passwordValid: false,
        formValid: false,
        wrong: false

    }

    validateField = (fieldName, value) => {

        const { formErrors } = this.state;
        const fieldValidationErrors = formErrors;
        let { emailValid, passwordValid } = this.state;
    
        switch (fieldName) {

        case 'email':
            emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
            fieldValidationErrors.email = emailValid ? '' : ' is invalid';
            break;
        case 'password':
            passwordValid = value !== '' && value.length >= 1;
            fieldValidationErrors.password = passwordValid ? '' : ' is required';
            break;
        default:
            break;
        
        }
        this.setState({
            formErrors: fieldValidationErrors,
            emailValid,
            passwordValid
        }, this.validateForm);
    
    }

    validateForm = () => {

        const { emailValid, passwordValid } = this.state;

        this.setState({ formValid: emailValid && passwordValid });
    
    }

    handleInput = (event) => {

        const { name } = event.target;
        const { value } = event.target;

        this.setState({ [name]: value, wrong: false }, 
            () => {

                this.validateField(name, value); 

            });

    }

    onSubmitSignIn = () => {

        const { onRouteChange, loadUser } = this.props;
        const { email, password } = this.state;
        
        fetch('https://enigmatic-peak-27513.herokuapp.com/signin', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                email,
                password 
            })
        })
            .then(res => res.json())
            .then((user) => {

                if (user.id) { 

                    this.setState({ wrong: false });

                    loadUser(user);
                    onRouteChange('home'); 


                } else {
                    
                    this.setState({ wrong: true });
                
                }
            
            });
    
    }

    render() {

        const { onRouteChange } = this.props;
        const { formErrors, formValid, wrong } = this.state;

        return (

            <div className="form__wrapper">
                <Header />
                <div>
                    <h1 className="form__title">Sign In</h1>
                    <FormErrors formErrors={formErrors} />
                    { wrong && (
                        <p className="form__errors">
                            Your info is incorrect. Is your CAPS lock on? 
                            If you are still stuck, you can contact
                            {' '}
                            <a className="form__errors--link" href="mailto: lcruztaveras@gmail.com">Support.</a>

                        </p>
                    )}
                    <div className="form__container_label">
                        <label className="form__input_label" htmlFor="email">
                            Email
                            <input 
                                className="form__input_text"
                                type="email" 
                                name="email" 
                                id="email" 
                                placeholder="john@doe.com" 
                                onChange={this.handleInput}
                            />
                        </label>
                    </div>
                    <div className="form__container_label">
                        <label className="form__input_label" htmlFor="password">
                            Password
                            <input 
                                className="form__input_text"
                                type="password" 
                                name="password" 
                                id="password" 
                                placeholder="Pass****"
                                onChange={this.handleInput}
                            />
                        </label>
                    </div>
                </div>
                <div className="form__container_buttons">
                    <input 
                        className="form__input_button"
                        type="submit" 
                        value="Sign in" 
                        disabled={!formValid}
                        onClick={this.onSubmitSignIn}
                    />
                    <div>
                        <input 
                            className="form__input_link"
                            type="submit" 
                            value="Need an account? Register." 
                            onClick={() => onRouteChange('register')}
                        />
                    </div>
                </div>
            </div>
        
        );
    
    }

}

export default Signin;

import React from 'react';
import PropTypes from 'prop-types';
import Header from '../Header';
import FormErrors from './FormError';

class Register extends React.Component { 

    static propTypes = {
        onRouteChange: PropTypes.func.isRequired, 
        loadUser: PropTypes.func.isRequired 
    }

    state = {

        name: '',
        email: '',
        password: '',
        formErrors: { email: '', password: '', name: '' },
        emailValid: false,
        passwordValid: false,
        nameValid: false,
        formValid: false,
        wrong: false

    }

    validateField = (fieldName, value) => {

        const { formErrors } = this.state;
        const fieldValidationErrors = formErrors;
        let { emailValid, passwordValid, nameValid } = this.state;
    
        switch (fieldName) {

        case 'email':
            emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
            fieldValidationErrors.email = emailValid ? '' : ' is invalid';
            break;
        case 'password':
            passwordValid = value.length >= 6;
            fieldValidationErrors.password = passwordValid ? '' : ' is too short';
            break;
        case 'name':
            nameValid = value !== '' && value.length >= 2;
            fieldValidationErrors.name = nameValid ? '' : ' is invalid';
            break;
        default:
            break;
        
        }
        this.setState({
            formErrors: fieldValidationErrors,
            emailValid,
            passwordValid,
            nameValid
        }, this.validateForm);
    
    }

    validateForm = () => {

        const { emailValid, passwordValid, nameValid } = this.state;

        this.setState({ formValid: emailValid && passwordValid && nameValid });
    
    }

    handleInput = (event) => {

        const { name } = event.target;
        const { value } = event.target;

        this.setState({ [name]: value, wrong: false }, 
            () => {

                this.validateField(name, value); 

            });

    }

    onSubmitRegister = () => {

        const { onRouteChange, loadUser } = this.props;
        const { name, email, password } = this.state;

        fetch('https://enigmatic-peak-27513.herokuapp.com/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name,
                email,
                password
            })
        })
            .then(res => res.json())
            .then((user) => {

                // need validation no emptyinput 
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
                    <h1 className="form__title">Register</h1>
                    <FormErrors formErrors={formErrors} />
                    { wrong && <p className="form__errors">Sorry, something went wrong. Try again later.</p>}
                    <div className="form__container_label">
                        <label className="form__input_label" htmlFor="name">
                            Name
                            <input 
                                className="form__input_text"
                                type="text" 
                                name="name" 
                                id="name" 
                                placeholder="John"
                                onChange={this.handleInput}
                            />
                        </label>
                    </div>
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
                        disabled={!formValid}
                        type="submit" 
                        value="Register" 
                        onClick={this.onSubmitRegister} 
                    />
               
                    <div>
                        <input 
                            className="form__input_link"
                            type="submit" 
                            value="Have an account? Sign in." 
                            onClick={() => onRouteChange('signin')} 
                        />
                    </div>
                </div>
            </div>
        );
    
    }

}


export default Register;

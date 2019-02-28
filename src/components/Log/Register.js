import React from 'react';
import PropTypes from 'prop-types';
import Header from '../Header';

class Register extends React.Component { 

    static propTypes = {
        onRouteChange: PropTypes.func.isRequired, 
        loadUser: PropTypes.func.isRequired 
    }

    state = {

        name: '',
        email: '',
        password: ''
    }

    onNameChange = (event) => {

        this.setState({ name: event.target.value });
    
    }

    onEmailChange = (event) => {

        this.setState({ email: event.target.value });
    
    }

    onPasswordChange = (event) => {

        this.setState({ password: event.target.value });
    
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

                    loadUser(user);
                    onRouteChange('home');    

                }
            
            });

    }

    render() {

        const { onRouteChange } = this.props;

        return (

            <div className="form__wrapper">
                <Header />
                <div>
                    <h1 className="form__title">Register</h1>
                    <div className="form__container_label">
                        <label className="form__input_label" htmlFor="name">
                            Name
                            <input 
                                className="form__input_text"
                                type="text" 
                                name="name" 
                                id="name" 
                                placeholder="John"
                                onChange={this.onNameChange}
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
                                onChange={this.onEmailChange}
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
                                onChange={this.onPasswordChange}
                            />
                        </label>
                    </div>
                </div>
                <div className="form__container_buttons">
                    <input 
                        className="form__input_button"
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

import React from 'react';
import PropTypes from 'prop-types';
import Header from '../Header';

class Signin extends React.Component { 

    static propTypes = {

        onRouteChange: PropTypes.func.isRequired,
        loadUser: PropTypes.func.isRequired  

    }

    state = {

        signInEmail: '',
        signInPassword: ''

    }

    onEmailChange = (event) => {

        this.setState({ signInEmail: event.target.value });

    }
    
    onPasswordChange = (event) => {

        this.setState({ signInPassword: event.target.value });

    }

    onSubmitSignIn = () => {

        const { onRouteChange, loadUser } = this.props;
        const { signInEmail: email, signInPassword: password } = this.state;
        
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
                    <h1 className="form__title">Sign In</h1>
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
                        value="Sign in" 
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

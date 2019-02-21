import React from 'react';
import PropTypes from 'prop-types';

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

        fetch('http://localhost:3001/register', {
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

            <div>
                <div>
                    <h3>Register</h3>
                    <div>
                        <label htmlFor="name">
                    Name
                            <input 
                                type="text" 
                                name="name" 
                                id="name" 
                                placeholder="name"
                                onChange={this.onNameChange}
                            />
                        </label>
                    </div>
                    <div>
                        <label htmlFor="email">
                    Email
                            <input 
                                type="email" 
                                name="email" 
                                id="email" 
                                placeholder="email"
                                onChange={this.onEmailChange}
                            />
                        </label>
                    </div>
                    <div>
                        <label htmlFor="password">
                    Password
                            <input
                                type="password"
                                name="password"
                                id="password"
                                placeholder="password"
                                onChange={this.onPasswordChange}
                            />
                        </label>
                    </div>
                </div>
                <div>
                    <input 
                        type="submit" 
                        value="Register" 
                        onClick={this.onSubmitRegister} 
                    />
                </div>
                <div>
                    <input 
                        type="submit" 
                        value="Sign in" 
                        onClick={() => onRouteChange('signin')} 
                    />
                </div>
            </div>
        );
    
    }

}


export default Register;

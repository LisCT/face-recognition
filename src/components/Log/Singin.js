import React from 'react';
import PropTypes from 'prop-types';

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
        
        fetch('http://localhost:3001/signin', {
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

            <div>
                <div>
                    <h3>Sign In</h3>
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
                        value="Sign in" 
                        onClick={this.onSubmitSignIn} 
                    />
                </div>
                <div>
                    <input 
                        type="submit" 
                        value="Register" 
                        onClick={() => onRouteChange('register')}
                    />
                </div>
            </div>
        
        );
    
    }

}

export default Signin;

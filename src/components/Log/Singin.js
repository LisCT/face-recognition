import React from 'react';
import PropTypes from 'prop-types';

const Signin = ({ onRouteChange }) => (

    <div>
        <div>
            <h3>Sign In</h3>
            <div>
                <label htmlFor="email">
                    Email
                    <input type="email" name="email" id="email" placeholder="email" />
                </label>
            </div>
            <div>
                <label htmlFor="password">
                    Password
                    <input type="password" name="password" id="password" placeholder="password" />
                </label>
            </div>
        </div>
        <div>
            <input 
                type="submit" 
                value="Sign in" 
                onClick={() => onRouteChange('home')} 
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

Signin.propTypes = {
    onRouteChange: PropTypes.func.isRequired
};

export default Signin;

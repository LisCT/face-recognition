import React from 'react';
import PropTypes from 'prop-types';

const Navegation = ({ onRouteChange, isSingedIn }) => (

    <nav>
        {isSingedIn 
            ? (
                <input 
                    type="submit" 
                    value="Sign out"
                    onClick={() => onRouteChange('signin')}
                />
            )
            : (
                <div>
                    <input 
                        type="submit" 
                        value="Register"
                        onClick={() => onRouteChange('register')}
                    />
                    <input 
                        type="submit" 
                        value="Sign in"
                        onClick={() => onRouteChange('signin')}
                    />
                </div>
            )
        }
    </nav>

);

Navegation.propTypes = {
    onRouteChange: PropTypes.func.isRequired,
    isSingedIn: PropTypes.bool.isRequired
};

export default Navegation;

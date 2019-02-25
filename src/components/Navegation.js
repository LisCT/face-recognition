import React from 'react';
import PropTypes from 'prop-types';

const Navegation = ({ onRouteChange, isSingedIn }) => (

    <nav>
        {isSingedIn
            && (
                <input 
                    className="form__input_link"
                    type="submit" 
                    value="Sign out"
                    onClick={() => onRouteChange('signout')}
                />
            )
        }
    </nav>

);

Navegation.propTypes = {
    onRouteChange: PropTypes.func.isRequired,
    isSingedIn: PropTypes.bool.isRequired
};

export default Navegation;

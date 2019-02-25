import React from 'react';
import PropTypes from 'prop-types';

const Header = ({ name }) => (

    <div className="header">
        <h1 className="header__title">
            Hello,  
            { name !== undefined ? name : ' Friend'}
        </h1>
        <p className="header__description">Enter your info details and start using this app.</p>
    </div>
);

Header.propTypes = {
    name: PropTypes.string
};

export default Header;

import React from 'react';
import PropTypes from 'prop-types';

const Rank = ({ name, entries }) => (

    <div>
        <h2>
            {`${name}, your current rank is: ${entries}`}
        </h2>
    </div>

);

Rank.propTypes = {
    name: PropTypes.string.isRequired,
    entries: PropTypes.string.isRequired
};

export default Rank;

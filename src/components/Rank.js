import React from 'react';
import PropTypes from 'prop-types';

const Rank = ({ name, entries }) => (

    <div className="detection__rank">
        <h1 className="detection__rank_copy">
            Hello,
            {' '}
            {name}
        </h1>
        <p className="detection__rank_description">
            your current rank is:
            {' '}
            <span className="lighter">
                {entries}
            </span>
        </p>
    </div>

);

Rank.propTypes = {
    name: PropTypes.string.isRequired,
    entries: PropTypes.string.isRequired
};

export default Rank;

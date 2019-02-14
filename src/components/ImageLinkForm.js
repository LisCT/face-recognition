import React from 'react';
import PropTypes from 'prop-types';

const ImageLinkForm = ({ onInputChange, onSubmit }) => (

    <div>
        <p>Will detect faces in your pictures. Give it a try.</p>

        <div>
            <input type="text" onChange={onInputChange} />
            <button type="submit" onClick={onSubmit}> Detect </button>
        </div>
    </div>
    
);

ImageLinkForm.propTypes = {
    onInputChange: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired
};

export default ImageLinkForm;

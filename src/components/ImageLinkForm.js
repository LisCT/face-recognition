import React from 'react';
import PropTypes from 'prop-types';

const ImageLinkForm = ({ onInputChange, onPictureSubmit }) => (

    <div>
        <p>Will detect faces in your pictures. Give it a try.</p>

        <div>
            <input type="text" onChange={onInputChange} />
            <button type="submit" onClick={onPictureSubmit}> Detect </button>
        </div>
    </div>
    
);

ImageLinkForm.propTypes = {
    onInputChange: PropTypes.func.isRequired,
    onPictureSubmit: PropTypes.func.isRequired
};

export default ImageLinkForm;

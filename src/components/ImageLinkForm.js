import React from 'react';
import PropTypes from 'prop-types';

const ImageLinkForm = ({ onInputChange, onPictureSubmit }) => (

    <div>

        <p className="form__subtitle">It will detect faces in your pictures. Give it a try.</p>

        <div>
            <input 
                className="form__input_text" 
                type="text" 
                placeholder="https://faceimage....."
                onChange={onInputChange}
            />
            <div className="form__container_buttons">
                <input 
                    className="form__input_button"
                    type="submit" 
                    value="Detect" 
                    onClick={onPictureSubmit}
                />
            </div>
        </div>
    </div>
    
);

ImageLinkForm.propTypes = {
    onInputChange: PropTypes.func.isRequired,
    onPictureSubmit: PropTypes.func.isRequired
};

export default ImageLinkForm;

import React from 'react';
import PropTypes from 'prop-types';

const FormErrors = ({ formErrors }) => (
    <div className="form__errors">
        {Object.keys(formErrors).map((fieldName, i) => {

            if (formErrors[fieldName].length > 0) {

                return (
                    <p key={fieldName}>
                        {fieldName} 
                        {' '}
                        {formErrors[fieldName]}
                    </p>
                );        
            
            } 
            return '';
      
        })}
    </div>
);

FormErrors.propTypes = {
    formErrors: PropTypes.objectOf(PropTypes.string).isRequired
};

export default FormErrors;

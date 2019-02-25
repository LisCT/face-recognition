import React from 'react';
import PropTypes from 'prop-types';

const FaceRecognition = ({ imageUrl, imgRef, box }) => (
    
    <div>
        { imageUrl 
          && (
              <div className="bounding_box__wrapper">
                  <img
                      className="bounding_box__image"
                      src={imageUrl} 
                      ref={imgRef} 
                      alt="dectected-preview"
                      height="auto"
                  /> 
                  
                  {Object.keys(box).map(key => (
                      <div
                          className="bounding_box" 
                          key={key}
                          style={{ 
                              top: box[key].topRow,
                              left: box[key].leftCol, 
                              bottom: box[key].bottomRow,
                              right: box[key].righCol 
                          }}
                      />
                  ))}

              </div>
          )

        }

    </div>

);

FaceRecognition.propTypes = {
    imageUrl: PropTypes.string.isRequired,
    imgRef: PropTypes.shape({ root: PropTypes.object }).isRequired,
    box: PropTypes.shape({ root: PropTypes.object }).isRequired
};

export default FaceRecognition;

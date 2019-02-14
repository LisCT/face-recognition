import React from 'react';
import PropTypes from 'prop-types';
import './FaceRecognition.css';

const FaceRecognition = ({ imageUrl, imgRef, box }) => (
    
    <div>
        { imageUrl 
          && (
              <div className="bounding_box__wrapper">
                  <img src={imageUrl} ref={imgRef} alt="dectected-preview" width="500px" height="auto" /> 
                  {console.log(box)}
                  {/*                   
                  { Object.keys(this.props.portfolioItems).map( key => <ItemPortfolio key={key} itemDetails={this.props.portfolioItems[key]} />) } */}
                  
                  <div 
                      className="bounding-box" 
                      style={{ 
                          top: box.topRow,
                          left: box.leftCol, 
                          bottom: box.bottomRow,
                          right: box.righCol 
                      }}
                  />
              </div>
          )
        }
    </div>
    
);

FaceRecognition.propTypes = {
    imageUrl: PropTypes.string.isRequired,
    imgRef: PropTypes.object.isRequired
};

export default FaceRecognition;

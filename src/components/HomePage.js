import React from 'react';
import Clarifai from 'clarifai';
import Navegation from './Navegation';
import Logo from './Logo';
import ImageLinkForm from './ImageLinkForm';
import Rank from './Rank';
import FaceRecognition from './FaceRecognition';
import Signin from './Log/Singin';
import Register from './Log/Register';

const app = new Clarifai.App({
    apiKey: '72bf4f7c90684ecd88498c2e8b44931a'
});

class HomePage extends React.Component {

    state = {

        input: '',
        imageUrl: '',
        box: {},
        route: 'signin',
        isSingedIn: false
        

    }

     // creating an instace of the item to get the element
     imgRef = React.createRef();


     displayFaceBox = (box) => {

         this.setState({ box });

     }

    calculateFaceLocation = (data) => {
        
        const facesDetected = data.outputs[0].data.regions;
        const boundingBox = {};

        facesDetected.forEach((face) => {
            
         
            const clarifaiFace = face.region_info.bounding_box;
            const image = this.imgRef.current;
            const width = Number(image.width);
            const height = Number(image.height);
            
            boundingBox[face.id] = {

                leftCol: clarifaiFace.left_col * width,
                topRow: clarifaiFace.top_row * height,
                righCol: width - (clarifaiFace.right_col * width),
                bottomRow: height - (clarifaiFace.bottom_row * height) + 8

            };

        });

        return boundingBox;

    }

    onInputChange = (event) => {

        this.setState({ input: event.target.value });

    }

    onSubmit = () => {

        const { input } = this.state;

        this.setState({ imageUrl: input }, () => {

            // inside a callback to be able to use it right after has been updated
            const { imageUrl } = this.state;

            // face recognition happened here
            app.models
                .predict(Clarifai.FACE_DETECT_MODEL, imageUrl) // second paramether url image
                .then(response => this.displayFaceBox(this.calculateFaceLocation(response)))
                .catch(err => console.log(err));

        });

    }

    onRouteChange = (route) => {
        
        if (route !== 'home') {

            this.setState({ isSingedIn: false }); 

        } else {

            this.setState({ isSingedIn: true }); 
        
        }

        this.setState({ route });

    }

    render() {

        const {
            
            imageUrl, 
            box, 
            route, 
            isSingedIn 

        } = this.state;

        return (

            <div>
                <Logo />
                <Navegation onRouteChange={this.onRouteChange} isSingedIn={isSingedIn} />
                { route === 'home'
                    ? (
                        <div>
                            <Rank />
                            <ImageLinkForm
                                onInputChange={this.onInputChange}
                                onSubmit={this.onSubmit}
                            />
                            <FaceRecognition imageUrl={imageUrl} imgRef={this.imgRef} box={box} />
                        </div>
                    )

                    : [( 
                        route === 'signin'
                            ? <Signin key="signin" onRouteChange={this.onRouteChange} />
                            : <Register key="register" onRouteChange={this.onRouteChange} />
                    )]

                }
            </div>

        );

    }

}

export default HomePage;

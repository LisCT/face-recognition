import React from 'react';
import Navegation from './Navegation';
import Logo from './Logo';
import ImageLinkForm from './ImageLinkForm';
import Rank from './Rank';
import FaceRecognition from './FaceRecognition';
import Signin from './Log/Singin';
import Register from './Log/Register';
import Copyright from './copyright';

const initialState = {
    input: '',
    imageUrl: '',
    box: {},
    route: 'signin',
    isSingedIn: false,
    user: {
        id: '',
        name: '',
        password: '',
        entries: 0,
        joined: ''
    }
};

class HomePage extends React.Component {

    state = initialState;

     // creating an instace of the item to get the element
     imgRef = React.createRef();

     displayFaceBox = (box) => {

         this.setState({ box });

     }

    loadUser = (data) => {

        const {

            id, name, password, entries, joined

        } = data;

        this.setState({
            user: { 
                id,
                name,
                password,
                entries,
                joined
            }
        });

    }

    calculateFaceLocation = (data) => {
        
        const facesDetected = data.outputs[0].data.regions;
        const boundingBox = {};

        facesDetected.forEach((face) => {
            
         
            const clarifaiFace = face.region_info.bounding_box;
            const image = this.imgRef.current;
            const width = Number(image.offsetWidth);
            const height = Number(image.offsetHeight);
            
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

    onPictureSubmit = () => {

        const { input, user } = this.state;
        const { id } = user;
        
        this.setState({ imageUrl: input }, () => {

            // inside a callback to be able to use it right after has been updated
            const { imageUrl } = this.state;

            // inside a callback to be able to use it right after has been updated
            fetch('https://enigmatic-peak-27513.herokuapp.com/imageurl', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: (JSON.stringify({
                    imageUrl
                }))

            })
                .then(response => response.json())
                .then((response) => {
                    
                    if (response) {

                        fetch('https://enigmatic-peak-27513.herokuapp.com/image', {
                            method: 'PUT',
                            headers: { 'Content-Type': 'application/json' },
                            body: (JSON.stringify({
                                id
                            }))

                        })
                            .then(res => res.json())
                            .then((entries) => {

                                /* Copy the actual the state, update de copy obj and 
                                then the state to avoid the state to be replaced 
                                with just the entries. */

                                const userCopy = { ...user }; // copy the actual user
                                userCopy.entries = entries; // update obj
                                
                                this.setState({ user: userCopy });
                                
                            })
                            .catch(console.log);

                    
                    }

                    this.displayFaceBox(this.calculateFaceLocation(response));
                
                })
                .catch(err => console.log(err));

        });

    }

    onRouteChange = (route) => {
        
        if (route === 'signout') {

            this.setState(initialState); 

        } else {

            this.setState({ isSingedIn: true }); 
        
        }

        this.setState({ route });

    }

    render() {

        const {

            imageUrl, box, route, isSingedIn, user 

        } = this.state;

        const { name, entries } = user;

        return (

            <div className={route === 'home' ? 'main home' : 'main logs'}>
                <div className="main__menu">
                    <Logo />
                    <Navegation 
                        onRouteChange={this.onRouteChange}
                        isSingedIn={isSingedIn}
                    />
                </div>
                { route === 'home'
                    ? (
                        <div className="detection_wrapper">
                            <Rank 
                                name={name}
                                entries={entries}
                            />
                            <ImageLinkForm
                                onInputChange={this.onInputChange}
                                onPictureSubmit={this.onPictureSubmit}
                            />
                            <FaceRecognition 
                                imageUrl={imageUrl}
                                imgRef={this.imgRef}
                                box={box}
                            />
                        </div>
                    )

                    : [( 
                        route === 'signin' || route === 'signout'
                            ? (
                                <Signin
                                    key="signin"
                                    onRouteChange={this.onRouteChange}
                                    loadUser={this.loadUser}
                                />
                            )
                            : (
                                <Register 
                                    key="register" 
                                    onRouteChange={this.onRouteChange}
                                    loadUser={this.loadUser}
                                />
                            )
                    )]

                }
                <Copyright />
            </div>

        );

    }

}

export default HomePage;

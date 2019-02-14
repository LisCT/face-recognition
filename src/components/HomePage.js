import React from 'react';
import Clarifai from 'clarifai';
import Navegation from './Navegation';
import Logo from './Logo';
import ImageLinkForm from './ImageLinkForm';
import Rank from './Rank';
import FaceRecognition from './FaceRecognition';

const app = new Clarifai.App({
    apiKey: '72bf4f7c90684ecd88498c2e8b44931a'
});

class HomePage extends React.Component {
    state = {

        input: '',
        imageUrl: ''

    }

    onInputChange = (event) => {
        this.setState({ input: event.target.value });
    }

    onSubmit = () => {
        const { input } = this.state;

        this.setState({ imageUrl: input });

        app.models
            .predict(
                Clarifai.GENERAL_MODEL,
                // URL image here
                'https://samples.clarifai.com/face-det.jpg'
            )
            .then((response) => {
                console.log(response);
            },
            (err) => {
                console.log(err);
            });
    }

    render() {
        const { imageUrl } = this.state;

        return (

            <div>
                <Logo />
                <Navegation />
                <Rank />
                <ImageLinkForm
                    onInputChange={this.onInputChange}
                    onSubmit={this.onSubmit}
                />
                <FaceRecognition imageUrl={imageUrl} />
            </div>

        );
    }
}

export default HomePage;

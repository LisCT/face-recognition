const Clarifai = require('clarifai');

const app = new Clarifai.App({
    apiKey: '72bf4f7c90684ecd88498c2e8b44931a'
});

const handleApiCall = (req, res) => {

    // face recognition happened here,  // second paramether url image
    app.models.predict(Clarifai.FACE_DETECT_MODEL, req.body.imageUrl)
        .then((data) => {

            res.json(data);
        
        })
        .catch(err => res.status(400).json('unable to work with API'));

};

const handleImage = (req, res, db) => {

    const { id } = req.body;

    db('users').where('id', '=', id)
        .increment('entries', 1)
        .returning('entries')
        .then((entries) => {

            res.json(entries[0]);
        
        })
        .catch(err => res.status(400).json('unable to get entries'));

};

module.exports = {
    handleImage,
    handleApiCall
};

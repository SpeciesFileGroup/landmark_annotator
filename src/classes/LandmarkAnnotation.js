const Landmark = require('./Landmark');

class LandmarkAnnotation {
    constructor(args = {}) {
        const {
            landmarks = []
        } = args;

        this.landmarks = landmarks.map(l => new Landmark(l));
        this.imageUrl = '';
        this.distancePerPixel = 0.01;
        this.distanceUnit = 'mm';
    }

    getViewmodel() {
        const landmarks = this.landmarks.map(l => l.getViewmodel());
        const imageUrl = this.imageUrl;
        const distancePerPixel = this.distancePerPixel;
        const distanceUnit = this.distanceUnit;

        return { landmarks, imageUrl, distancePerPixel, distanceUnit };
    }
}

module.exports = LandmarkAnnotation;
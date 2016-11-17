const Landmark = require('./Landmark');

class LandmarkAnnotation {
    constructor(args = {}) {
        const {
            landmarks = [],
            imageUrl = ``,
            scaleDistance = null,
            distanceUnit = null
        } = args;

        this.landmarks = landmarks.map(l => new Landmark(l));
        this.imageUrl = imageUrl;
        this.scaleDistance = scaleDistance;
        this.distanceUnit = distanceUnit;
    }

    getViewmodel() {
        const landmarks = this.landmarks.map(l => l.getViewmodel());
        const imageUrl = this.imageUrl;
        const scaleDistance = this.scaleDistance;
        const distanceUnit = this.distanceUnit;

        return { landmarks, imageUrl, scaleDistance, distanceUnit };
    }
}

module.exports = LandmarkAnnotation;
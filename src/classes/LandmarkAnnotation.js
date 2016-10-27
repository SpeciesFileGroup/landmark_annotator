class LandmarkAnnotation {
    constructor() {
        this.landmarks = [];
        this.imageUrl = '';
        this.distancePerPixel = 0.01;
        this.distanceUnit = 'mm';
    }
}

module.exports = LandmarkAnnotation;
const missingTrueError = `Missing trueImageSize argument`;
const missingPixelError = `Missing pixelImageSize argument`;

class ScaleConverter {
    constructor(args = {}) {
        const {
            trueImageSize = null,
            pixelImageSize = null
        } = args;

        if (!trueImageSize)
            throw missingTrueError;

        if (!pixelImageSize)
            throw missingPixelError;

        this.trueImageSize = trueImageSize;
        this.pixelImageSize = pixelImageSize;
    }

    pointToTrue([pixelX, pixelY] = []) {
        const [trueWidth, trueHeight] = this.trueImageSize;
        const [pixelWidth, pixelHeight] = this.pixelImageSize;

        const widthRatio = trueWidth / pixelWidth;
        const heightRatio = trueHeight / pixelHeight;

        const trueX = ScaleConverter.scale(pixelX, widthRatio);
        const trueY = ScaleConverter.scale(pixelY, heightRatio);

        return [Math.round(trueX), Math.round(trueY)];
    }

    pointToPixel([trueX, trueY] = []) {
        const [trueWidth, trueHeight] = this.trueImageSize;
        const [pixelWidth, pixelHeight] = this.pixelImageSize;

        const widthRatio = pixelWidth / trueWidth;
        const heightRatio = pixelHeight / trueHeight;

        return [ ScaleConverter.scale(trueX, widthRatio), ScaleConverter.scale(trueY, heightRatio) ];
    }

    distanceToPixel(distance) {
        const [trueWidth, trueHeight] = this.trueImageSize;
        const [pixelWidth, pixelHeight] = this.pixelImageSize;
        const ratio = pixelWidth / trueWidth;
        return ScaleConverter.scale(distance, ratio);
    }

    static scale(valueToConvert, ratio) {
        return valueToConvert * ratio;
    }
}

module.exports = ScaleConverter;
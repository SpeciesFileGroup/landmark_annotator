const missingTrueError = `Missing trueImageSize argument`;
const missingPixelError = `Missing pixelImageSize argument`;

class PointConverter {
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

    toTrue([pixelX, pixelY] = []) {
        const [trueWidth, trueHeight] = this.trueImageSize;
        const [pixelWidth, pixelHeight] = this.pixelImageSize;
        const trueX = (pixelX * trueWidth) / pixelWidth;
        const trueY = (pixelY * trueHeight) / pixelHeight;
        return [Math.round(trueX), Math.round(trueY)];
    }

    toPixel([trueX, trueY] = []) {
        const [trueWidth, trueHeight] = this.trueImageSize;
        const [pixelWidth, pixelHeight] = this.pixelImageSize;
        const pixelX = (trueX * pixelWidth) / trueWidth;
        const pixelY = (trueY * pixelHeight) / trueHeight;
        return [pixelX, pixelY];
    }
}

module.exports = PointConverter;
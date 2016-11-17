function calculateDistance(firstPoint, secondPoint) {
    const [firstPointX, firstPointY] = firstPoint;
    const [secondPointX, secondPointY] = secondPoint;

    if (firstPointX === secondPointX)
        return Math.abs(firstPointY - secondPointY);

    if (firstPointY === secondPointY)
        return Math.abs(firstPointX - secondPointX);

    //a, b, and c refer to the pythagorean theorem
    const a = firstPointX - secondPointX;
    const aSquared = a * a;

    const b = firstPointY - secondPointY;
    const bSquared = b * b;

    const c = Math.sqrt(aSquared + bSquared);
    return Math.round(c * 10) / 10;
}

module.exports = calculateDistance;
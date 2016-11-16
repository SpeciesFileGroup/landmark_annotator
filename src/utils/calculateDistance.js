function calculateDistance(firstPoint, secondPoint) {
    //a, b, and c refer to the pythagorean theorem
    if (firstPoint.x === secondPoint.x)
        return Math.abs(firstPoint.y - secondPoint.y);

    if (firstPoint.y === secondPoint.y)
        return Math.abs(firstPoint.x - secondPoint.x);

    const a = firstPoint.x - secondPoint.x;
    const aSquared = a * a;

    const b = firstPoint.y - secondPoint.y;
    const bSquared = b * b;

    const c = Math.sqrt(aSquared + bSquared);
    return Math.round(c * 10) / 10;
}

module.exports = calculateDistance;
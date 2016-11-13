function calculateDistance(firstPoint, secondPoint) {
    if (firstPoint.x === secondPoint.x)
        return Math.abs(firstPoint.y - secondPoint.y);

    if (firstPoint.y === secondPoint.y)
        return Math.abs(firstPoint.x - secondPoint.x);
}

module.exports = calculateDistance;
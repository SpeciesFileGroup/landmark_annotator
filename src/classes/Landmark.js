class Landmark {
    constructor(data = {}) {
        const {
            color = '#00FF00',
            points = [],
            title = 'Untitled'
        } = data;

        this.color = color;
        this.points = points;
        this.title = title;
    }

    getViewmodel() {
        const color = this.color;

        const points = this.points.map(p => {
            const [x, y] = p;
            return { x, y };
        });

        const title = this.title;

        return { color, points, title };
    }
}

module.exports = Landmark;
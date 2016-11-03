class Landmark {
    constructor(data = {}) {
        const {
            color = '#00FF00',
            points = [],
            title = 'Untitled',
            id = null
        } = data;

        this.color = color;
        this.points = points;
        this.title = title;
        this.id = id;
    }

    getViewmodel() {
        const color = this.color;

        const points = this.points.map(p => {
            const [x, y] = p;
            return { x, y };
        });

        const title = this.title;

        const id = this.id;

        return { color, points, title, id };
    }
}

module.exports = Landmark;
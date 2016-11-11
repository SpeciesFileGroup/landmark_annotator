class Landmark {
    constructor(data = {}) {
        const {
            color = '#00FF00',
            point = [],
            title = 'Untitled',
            id = null
        } = data;

        this.color = color;
        this.point = point;
        this.title = title;
        this.id = id;
    }

    getViewmodel() {
        const color = this.color;

        const [x, y] = this.point;

        const point = x && y ? { x, y } : null;

        const title = this.title;

        const id = this.id;

        return { color, point, title, id };
    }

    static getPointFromClick(pageX, pageY, clickableRect) {
        if (pageX > clickableRect.left + clickableRect.width)
            return null;

        if (pageY > clickableRect.top + clickableRect.height)
            return null;

        if (pageX < clickableRect.left)
            return null;

        if (pageY < clickableRect.top)
            return null;

        return [pageX - clickableRect.left, pageY - clickableRect.top];
    }
}

module.exports = Landmark;
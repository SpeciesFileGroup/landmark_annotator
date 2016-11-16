const store = require('./store');
const ACTION_TYPES = require('./actions/actions').ACTION_TYPES;
const React = require('react');
const ReactDOM = require('react-dom');
const LandmarkAnnotation = require('./classes/LandmarkAnnotation');
const Landmark = require('./classes/Landmark');
const calculateDistance = require('./utils/calculateDistance');
const PointConverter = require('./utils/PointConverter');

class LandmarkAnnotator extends React.Component {
    componentDidMount() {
        this.unsubscribe = store.subscribe(() => this.forceUpdate());
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    render() {
        const state = store.getState();
        console.info(state);
        const landmarkAnnotationData = new LandmarkAnnotation(state);
        const {landmarks, imageUrl, distancePerPixel, distanceUnit} = landmarkAnnotationData.getViewmodel();

        return (
            <div className="landmark-annotator">
                <div className="landmark-annotator__landmarks-and-image-container">
                    <div className="landmark-annotator__landmarks-container">
                        <button
                            className="landmark-annotator__button" type="button"
                            onClick={ this.createLandmark.bind(this) }>
                            Add Landmark
                        </button>
                        <ul className="landmark-annotator__landmarks-list">
                            {
                                landmarks.map(l => {
                                    return (
                                        <li className="landmark-annotator__landmarks-list-item" key={ l.id }>
                                            <label>
                                                <span className="landmark-annotator__radio-text">{ l.title }</span>
                                                <input
                                                    type="radio"
                                                    name="landmark-radios"
                                                    onChange={ this.handleLandmarkRadioChange.bind(this, l.id) }/>
                                            </label>
                                            <input
                                                type="color"
                                                value={ l.color }
                                                onChange={ this.handleLandmarkColorChange.bind(this, l.id) }/>
                                        </li>
                                    )
                                })
                            }
                        </ul>
                    </div>
                    <div className="landmark-annotator__image-container">
                        <img
                            className="landmark-annotator__image"
                            src={ imageUrl }
                            ref={ (element) => this.imageElement = element } />
                        <div
                            className="landmark-annotator__interactable-area"
                            ref={ (element) => this.interactableAreaElement = element }
                            onClick={ this.addPointToImage.bind(this) }>
                            { this.makeLandmarkPoints(landmarks) }
                        </div>
                    </div>
                </div>
                <div className="landmark-annotator__points-data-container">
                    <div className="landmark-annotator__points-title">Result</div>
                    <table className="landmark-annotator__point-table">
                        <thead className="landmark-annotator__point-table-head">
                            <tr className="landmark-annotator__point-table-row">
                                <th className="landmark-annotator__point-table-cell"></th>
                                { this.makePointHeaders(landmarks) }
                            </tr>
                        </thead>
                        <tbody className="landmark-annotator__point-table-body">
                            { this.attemptMakePointTableRow(landmarks) }
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }

    createLandmark() {
        store.dispatch({type: ACTION_TYPES.CreateLandmark});
    }

    handleLandmarkRadioChange(landmarkId, event) {
        if (event.target.value)
            store.dispatch({type: ACTION_TYPES.SelectLandmark, args: landmarkId});
    }

    handleLandmarkColorChange(id, event) {
        const color = event.target.value;
        const data = {color};
        store.dispatch({type: ACTION_TYPES.SetLandmarkData, args: {id, data}});
    }

    addPointToImage(event) {
        const {pageX, pageY} = event;
        const interactionRect = this.interactableAreaElement.getBoundingClientRect();
        const pixelPoint = Landmark.getPointFromClick(pageX, pageY, interactionRect);

        if (!pixelPoint)
            return;

        const truePoint = this.getPointConverter().toTrue(pixelPoint);

        store.dispatch({type: ACTION_TYPES.SetPoint, args: truePoint});
    }

    getPointConverter() {
        const pixelImageSize = [this.imageElement.width, this.imageElement.height];
        const trueImageSize = [this.imageElement.naturalWidth, this.imageElement.naturalHeight];
        return new PointConverter({ pixelImageSize, trueImageSize });
    }

    makeLandmarkPoints(landmarks) {
        return landmarks.map(landmark => {
            const {point = null} = landmark;
            if (!point)
                return null;

            const interactableRect = this.interactableAreaElement.getBoundingClientRect();

            const [pixelX, pixelY] = this.getPointConverter().toPixel([ point.x, point.y ]);

            const style = {
                color: landmark.color,
                left: `${pixelX}px`,
                top: `${pixelY}px`
            };
            return (
                <div className="landmark-annotator__point-base" style={ style }>
                    <div className="landmark-annotator__point"></div>
                    <div
                        className="landmark-annotator__targetting-rule-from-left"
                        style={ { left: `-${pixelX}px`, width: `${pixelX}px` } }>
                    </div>

                    <div
                        className="landmark-annotator__targetting-rule-from-right"
                        style={ { left: `0px`, width: `${interactableRect.width - pixelX}px` } }>
                    </div>

                    <div
                        className="landmark-annotator__targetting-rule-from-top"
                        style={ { top: `-${pixelY}px`, height: `${pixelY}px` } }>
                    </div>

                    <div
                        className="landmark-annotator__targetting-rule-from-bottom"
                        style={ { top: `0px`, height:`${interactableRect.height - pixelY}px` } }>
                    </div>
                </div>
            )
        });
    }

    makePointHeaders(landmarks) {
        return landmarks.map((l, i) => {
            return (
                <th className="landmark-annotator__point-table-cell" key={i}>{ l.title }</th>
            );
        });
    }

    attemptMakePointTableRow(landmarks) {
        return (
            landmarks.map((landmarkRow, rowIndex) => {
                return this.makePointRow(landmarkRow, rowIndex, landmarks);
            })
        )
    }

    makePointRow(rowLandmark, rowIndex, landmarks) {
        const rowHeader = [
            (
                <th className="landmark-annotator__point-table-cell">{ rowLandmark.title }</th>
            )
        ];

        const cells = landmarks.map((columnLandmark, columnIndex) => {
            return this.makePointCell(rowLandmark, columnLandmark);
        });

        return (
            <tr className="landmark-annotator__point-table-row" key={rowIndex}>
                { rowHeader.concat(cells) }
            </tr>
        );
    }

    makePointCell(rowLandmark, columnLandmark) {
        if (rowLandmark === columnLandmark) {
            return (
                <td className="landmark-annotator__point-table-cell landmark-annotator__point-table-cell--empty"></td>
            )
        } else {
            const distance = rowLandmark.point && columnLandmark.point ? calculateDistance(rowLandmark.point, columnLandmark.point) : '';

            return (
                <td className="landmark-annotator__point-table-cell">{ distance }</td>
            )
        }
    }
}

ReactDOM.render(<LandmarkAnnotator />, document.querySelector('landmark-annotator'));
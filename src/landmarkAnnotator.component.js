const store = require('./store');
const ACTION_TYPES = require('./actions/actions').ACTION_TYPES;
const React = require('react');
const ReactDOM = require('react-dom');
const LandmarkAnnotation = require('./classes/LandmarkAnnotation');
const Landmark = require('./classes/Landmark');

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
                        <img className="landmark-annotator__image" src={ imageUrl }/>
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
                        <thead>
                        <tr>
                            <th className="landmark-annotator__point-table-cell">x</th>
                            <th className="landmark-annotator__point-table-cell">y</th>
                        </tr>
                        </thead>
                        <tbody>
                        { this.attemptMakePointTableRow(landmarks, state.selectedLandmarkId) }
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
        const point = Landmark.getPointFromClick(pageX, pageY, interactionRect);
        if (point)
            store.dispatch({type: ACTION_TYPES.SetPoint, args: point});
    }

    makeLandmarkPoints(landmarks) {
        return landmarks.map(landmark => {
            const {point = null} = landmark;
            if (!point)
                return null;

            const interactableRect = this.interactableAreaElement.getBoundingClientRect();
            const style = {
                color: landmark.color,
                left: `${point.x}px`,
                top: `${point.y}px`
            };
            return (
                <div className="landmark-annotator__point-base" style={ style }>
                    <div className="landmark-annotator__point"></div>
                    <div
                        className="landmark-annotator__targetting-rule-from-left"
                        style={ { left: `-${point.x}px`, width: `${point.x}px` } }>
                    </div>

                    <div
                        className="landmark-annotator__targetting-rule-from-right"
                        style={ { left: `0px`, width: `${interactableRect.width - point.x}px` } }>
                    </div>

                    <div
                        className="landmark-annotator__targetting-rule-from-top"
                        style={ { top: `-${point.y}px`, height: `${point.y}px` } }>
                    </div>

                    <div
                        className="landmark-annotator__targetting-rule-from-bottom"
                        style={ { top: `0px`, height:`${interactableRect.height - point.y}px` } }>
                    </div>
                </div>
            )
        });
    }

    attemptMakePointTableRow(landmarks, selectedLandmarkId) {
        if (!selectedLandmarkId)
            return null;

        const {points = []} = landmarks.find(l => l.id === selectedLandmarkId);

        return (
            points.map((p, i) => {
                return (
                    <tr key={i}>
                        <td className="landmark-annotator__point-table-cell">{ p.x }</td>
                        <td className="landmark-annotator__point-table-cell">{ p.y }</td>
                    </tr>
                );
            })
        )
    }
}

ReactDOM.render(<LandmarkAnnotator />, document.querySelector('landmark-annotator'));
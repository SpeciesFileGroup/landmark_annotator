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
        const { landmarks, imageUrl, distancePerPixel, distanceUnit } = landmarkAnnotationData.getViewmodel();

        return (
            <div className="landmark-annotator">
                <div className="landmark-annotator__landmarks-and-image-container">
                    <div className="landmark-annotator__landmarks-container">
                        <button className="landmark-annotator__button" type="button" onClick={ this.createLandmark.bind(this) }>Add Landmark</button>
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
                                                    onChange={ this.handleLandmarkRadioChange.bind(this, l.id) } />
                                            </label>
                                            <input
                                                type="color"
                                                onChange={ this.handleLandmarkColorChange.bind(this, l.id) } />
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
                <div className="landmark-annotator__points">
                    <div className="landmark-annotator__points-title">Result</div>
                    <ul className="landmark-annotator__point-list">
                        { this.attemptMakePointListItem(landmarks, state.selectedLandmarkId) }
                    </ul>
                </div>
            </div>
        );
    }

    createLandmark() {
        store.dispatch({ type: ACTION_TYPES.CreateLandmark });
    }

    handleLandmarkRadioChange(landmarkId, event) {
        if (event.target.value)
            store.dispatch({ type: ACTION_TYPES.SelectLandmark, args: landmarkId });
    }

    handleLandmarkColorChange(id, event) {
        const color = event.target.value;
        const data = { color };
        store.dispatch({ type: ACTION_TYPES.SetLandmarkData, args: { id, data } });
    }

    addPointToImage(event) {
        const {pageX, pageY} = event;
        const interactionRect = this.interactableAreaElement.getBoundingClientRect();
        const point = Landmark.getPointFromClick(pageX, pageY, interactionRect);
        if (point)
            store.dispatch({ type: ACTION_TYPES.AddPoint, args: point });
    }

    makeLandmarkPoints(landmarks) {
        return landmarks.map(landmark => {
            const { points = [] } = landmark;
            return points.map(p => {
                const style = {
                    backgroundColor: landmark.color,
                    left: `${p.x}px`,
                    top: `${p.y}px`
                };
                return (
                    <div className="landmark-annotator__point" style={ style }></div>
                )
            });
        });
    }

    attemptMakePointListItem(landmarks, selectedLandmarkId) {
        if (!selectedLandmarkId)
            return null;

        const { points = [] } = landmarks.find(l => l.id === selectedLandmarkId);

        return (
            points.map((p, i) => {
                return (
                    <li key={i}>{ p.x }, {p.y}</li>
                );
            })
        )
    }
}

ReactDOM.render(<LandmarkAnnotator />, document.querySelector('landmark-annotator'));
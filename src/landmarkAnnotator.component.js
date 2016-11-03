const store = require('./store');
const ACTION_TYPES = require('./actions/actions').ACTION_TYPES;
const React = require('react');
const ReactDOM = require('react-dom');
const LandmarkAnnotation = require('./classes/LandmarkAnnotation');

class LandmarkAnnotator extends React.Component {
    componentDidMount() {
        this.unsubscribe = store.subscribe(() => this.forceUpdate());
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    render() {
        const landmarkAnnotationData = new LandmarkAnnotation(store.getState().landmarkAnnotation);
        const { landmarks, imageUrl, distancePerPixel, distanceUnit } = landmarkAnnotationData.getViewmodel();

        return (
            <div className="landmark-annotator">
                <div className="landmark-annotator__landmarks-and-image-container">
                    <div className="landmark-annotator__landmarks-container">
                        <button className="landmark-annotator__button" type="button" onClick={ this.createLandmark }>Add Landmark</button>
                        <ul className="landmark-annotator__landmarks-list">
                            {
                                landmarks.map((l, i) => {
                                    return (
                                        <li className="landmark-annotator__landmarks-list-item" key={ i }>
                                            <label>
                                                { l.title }
                                                <input type="radio" name="landmark-radios" />
                                            </label>
                                            <input type="color" />
                                        </li>
                                    )
                                })
                            }
                        </ul>
                    </div>
                    <div className="landmark-annotator__image-container">
                        <img className="landmark-annotator__image" src={ imageUrl }/>
                    </div>
                </div>
                <div className="landmark-annotator__points">
                    <div className="landmark-annotator__points-title">Result</div>
                    <ul className="landmark-annotator__point-list">

                    </ul>
                </div>
            </div>
        );
    }

    createLandmark() {
        store.dispatch({ type: ACTION_TYPES.CreateLandmark });
    }
}

ReactDOM.render(<LandmarkAnnotator />, document.querySelector('landmark-annotator'));
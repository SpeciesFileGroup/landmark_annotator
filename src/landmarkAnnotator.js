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
                <div className="landmark-annotator__image-container">
                    <img className="landmark-annotator__image" src={ imageUrl }/>
                </div>
                <div className="landmark-annotator__points">
                    <div className="landmark-annotator__points-title">Result</div>
                    <ul className="landmark-annotator__point-list">
                        {
                            landmarks.map(l => {
                                l.points.map(p => {
                                    return (
                                        <li>{ `${p.x}, ${p.y}` }</li>
                                    )
                                })
                            })
                        }
                    </ul>
                </div>
            </div>
        );
    }
}

ReactDOM.render(<LandmarkAnnotator />, document.querySelector('landmark-annotator'));
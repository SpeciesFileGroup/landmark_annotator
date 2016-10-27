const React = require('react');
const ReactDOM = require('react-dom');

class LandmarkAnnotator extends React.Component {
    render() {
        const points = [{
            x: 450,
            y: 333,
            label: 'FOOBARBAZ'
        }];

        return (
            <div className="landmark-annotator">
                <div className="landmark-annotator__image-container">
                    <img className="landmark-annotator__image" src="http://www.placebacon.net/4000/3000" />
                </div>
                <div className="landmark-annotator__points">
                    <div className="landmark-annotator__points-title">Result</div>
                    <ul className="landmark-annotator__point-list">
                        { points.map(p => {
                            return (
                                <li>{ `${p.x}, ${p.y} – ${p.label}` }</li>
                            )
                        }) }
                    </ul>
                </div>
            </div>
        );
    }
}

ReactDOM.render( <LandmarkAnnotator />, document.querySelector('landmark-annotator') );
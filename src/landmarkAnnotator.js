const React = require('react');
const ReactDOM = require('react-dom');

class LandmarkAnnotator extends React.Component {
    render() {
        return (
            <h1>Hello World</h1>
        );
    }
}

ReactDOM.render( <LandmarkAnnotator />, document.querySelector('landmark-annotator') );
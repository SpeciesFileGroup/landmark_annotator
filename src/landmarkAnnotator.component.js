const store = require('./store');
const ACTION_TYPES = require('./actions/actions').ACTION_TYPES;
const React = require('react');
const ReactDOM = require('react-dom');
const LandmarkAnnotation = require('./classes/LandmarkAnnotation');
const Landmark = require('./classes/Landmark');
const calculateDistance = require('./utils/calculateDistance');
const ScaleConverter = require('./utils/ScaleConverter');

class LandmarkAnnotator extends React.Component {
    componentDidMount() {
        this.unsubscribe = store.subscribe(() => this.forceUpdate());
        window.addEventListener('resize', this.lazyRerender.bind(this));
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    lazyRerender(event) {
        if (this.renderTimeout)
            clearTimeout(this.renderTimeout);

        this.renderTimeout = setTimeout(() => {
            this.forceUpdate();
        }, 250);
    }

    render() {
        const state = store.getState();
        console.info(state);
        const landmarkAnnotationData = new LandmarkAnnotation(state);
        const {landmarks, imageUrl, scaleDistance, distanceUnit} = landmarkAnnotationData.getViewmodel();

        return (
            <div className="landmark-annotator">
                <div className="landmark-annotator__control-bar">
                    <button
                        className={ this.getScaleButtonClasses() }
                        onClick={ this.toggleScalingMode.bind(this) }
                        type="button">
                            Set Scale
                    </button>
                    { this.attemptScaleBar(scaleDistance, distanceUnit) }
                </div>
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
                            onMouseMove={ this.dragPoint.bind(this) }
                            onClick={ this.doClickAction.bind(this) }>
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

    getScaleButtonClasses() {
        const isSettingScale = store.getState().isSettingScale;
        const activatedClass = isSettingScale ? `landmark-annotator__button--activated` : '';
        return `landmark-annotator__button ${activatedClass}`;
    }

    toggleScalingMode() {
        const isSettingScale = store.getState().isSettingScale;
        store.dispatch({ type: ACTION_TYPES.SetScalingMode, args: !isSettingScale });
    }

    attemptScaleBar(scaleDistance, distanceUnit) {
        if (scaleDistance) {
            const pixelDistance = this.getScaleConverter().distanceToPixel(scaleDistance);
            const width = `${pixelDistance}px`;
            const style = { width };
            return (
                <div className="landmark-annotator__scale-bar-container">
                    <div className="landmark-annotator__scale-bar" style={ style }>
                        one { distanceUnit }
                    </div>
                </div>
            )
        } else
            return null;
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

    doClickAction(event) {
        const isSettingScale = !!store.getState().isSettingScale;
        if (isSettingScale) {
            const pixelPoint = this.getPixelPointFromEvent(event);
            if (pixelPoint) {
                const truePoint = this.getScaleConverter().pointToTrue(pixelPoint);
                store.dispatch({ type: ACTION_TYPES.AddScalePoint, args: truePoint })
            }
        } else
            this.addPointToImageFrom(event);
    }

    addPointToImageFrom(event) {
        const pixelPoint = this.getPixelPointFromEvent(event);

        if (!pixelPoint)
            return;

        const truePoint = this.getScaleConverter().pointToTrue(pixelPoint);

        store.dispatch({type: ACTION_TYPES.SetPoint, args: truePoint});
    }

    getPixelPointFromEvent(event) {
        const {pageX, pageY} = event;
        const interactionRect = this.interactableAreaElement.getBoundingClientRect();
        return Landmark.getPointFromClick(pageX, pageY, interactionRect);
    }

    getScaleConverter() {
        const pixelImageSize = [this.imageElement.width, this.imageElement.height];
        const trueImageSize = [this.imageElement.naturalWidth, this.imageElement.naturalHeight];
        return new ScaleConverter({ pixelImageSize, trueImageSize });
    }

    makeLandmarkPoints(landmarks) {
        return landmarks.map(landmark => {
            const {point = null} = landmark;
            if (!point)
                return null;

            const interactableRect = this.interactableAreaElement.getBoundingClientRect();

            const [trueX, trueY] = point;

            const [pixelX, pixelY] = this.getScaleConverter().pointToPixel([ trueX, trueY ]);

            const style = {
                color: landmark.color,
                left: `${pixelX}px`,
                top: `${pixelY}px`
            };
            return (
                <div className="landmark-annotator__point-base" style={ style } key={ landmark.id }>
                    <div className="landmark-annotator__point landmark-annotator__point--ripple"></div>
                    <div
                        className="landmark-annotator__point-dragging-handle"
                        onMouseDown={ this.startDragging.bind(this, landmark.id) }
                        onMouseUp={ this.stopDragging.bind(this) }
                        onClick={ this.preventPropagation.bind(this) }>
                    </div>
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

    startDragging(landmarkId, event) {
        const state = store.getState();
        if (!state.selectedLandmarkId || state.selectedLandmarkId !== landmarkId)
            return;

        event.preventDefault();
        event.stopPropagation();

        this.startPositionX = event.pageX;
        this.startPositionY = event.pageY;

        const pointBaseElement = event.target.parentNode;
        this.draggingPointBaseElement = pointBaseElement;
    }

    dragPoint(event) {
        if (!this.draggingPointBaseElement)
            return;

        event.preventDefault();

        const currentX = event.pageX - this.startPositionX;
        const currentY = event.pageY - this.startPositionY;

        this.draggingPointBaseElement.style.transform = `translate(${currentX}px, ${currentY}px)`;
    }

    stopDragging(event) {
        event.preventDefault();
        event.stopPropagation();
        this.draggingPointBaseElement.style.transform = ``;
        this.draggingPointBaseElement = null;
        this.addPointToImageFrom(event);
    }

    preventPropagation(event) {
        event.stopPropagation();
    }

    makePointHeaders(landmarks) {
        return landmarks.map((l, i) => {
            return (
                <th className="landmark-annotator__point-table-cell" key={l.id}>{ l.title }</th>
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
                <th className="landmark-annotator__point-table-cell" key={ rowLandmark.id + '-row-header' }>{ rowLandmark.title }</th>
            )
        ];

        const cells = landmarks.map((columnLandmark, columnIndex) => {
            return this.makePointCell(rowLandmark, columnLandmark);
        });

        return (
            <tr className="landmark-annotator__point-table-row" key={rowLandmark.id}>
                { rowHeader.concat(cells) }
            </tr>
        );
    }

    makePointCell(rowLandmark, columnLandmark) {
        if (rowLandmark === columnLandmark) {
            return (
                <td className="landmark-annotator__point-table-cell landmark-annotator__point-table-cell--empty" key={ columnLandmark.id }> </td>
            )
        } else {
            const distance = rowLandmark.point && columnLandmark.point ? calculateDistance(rowLandmark.point, columnLandmark.point) : '';

            return (
                <td className="landmark-annotator__point-table-cell" key={ columnLandmark.id }>{ distance }</td>
            )
        }
    }
}

ReactDOM.render(<LandmarkAnnotator />, document.querySelector('landmark-annotator'));
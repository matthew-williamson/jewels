import React from 'react';
import { useCallback, useEffect, useState } from "react";
import { Image, Layer, Stage } from "react-konva";
import useImage from "use-image";

const URLImage = ({ src, height, width, x = 0, y = 0, rotation = 0 }) => {
    const [image] = useImage(src);
    return <Image image={image} height={height} width={width} x={x} y={y} rotation={rotation} />;
};
// export default function PendantSelection(newSrc,newWidth,newHeight,
//                                         newX,newY,newRotation){
export default class PendantImage extends React.Component {
    constructor(props) {
        super(props);
        this.handlePendantChange = this.handlePendantChange.bind(this);
        this.state = { source: '' };
    }
    handlePendantChange(newPendant) {
        this.props.onPendantChange(newPendant)
    }

    render() {
        return (
            <Layer>
                {/* center pendant */}
                <URLImage
                    src={this.props.newSrc}
                    width={this.props.newWidth}
                    height={this.props.newHeight}
                    x={this.props.newX}
                    y={this.props.newY}
                    rotation={this.props.newRotation}
                />
            </Layer>
        );
    }
}

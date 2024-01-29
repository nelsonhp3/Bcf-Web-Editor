import React from 'react';
import { useTransformEffect } from 'react-zoom-pan-pinch'

// import { Container } from './styles';

function ViewpointViewer({viewpointSrc}) {
    // It will trigger every time you interact with transform-component
    // At the same time it will not cause rerendering so you can control it on your own
    useTransformEffect(({ state, instance }) => {
        //console.log(state); // { previousScale: 1, scale: 1, positionX: 0, positionY: 0 }

        return () => {
        // unmount
        }
    })

    return <img id='viewpointViewer' src={viewpointSrc ?? ''}/>
}

export default ViewpointViewer
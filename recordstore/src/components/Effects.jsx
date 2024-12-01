import { Bloom, EffectComposer, Noise } from '@react-three/postprocessing'
import React from 'react'
import { BlendFunction } from 'postprocessing'


function Effects() {
    return (
        <EffectComposer >
            {/* <Bloom
                opacity={0.5}
            /> */}
            {/* <Noise
                premultiply
                opacity={0.25}
                // enables or disables noise premultiplication
                blendFunction={BlendFunction.NORMAL} // blend mode
            /> */}
        </EffectComposer>
    )
}

export default Effects
import { Bloom, EffectComposer, Noise } from '@react-three/postprocessing'
import React from 'react'
import { BlendFunction } from 'postprocessing'


function Effects() {
    return (
        <EffectComposer >
            <Bloom
                // opacity={0.15}
                opacity={0.5}
                luminanceThreshold={0.75}

            />
            {/* <Noise
                premultiply
                opacity={0.2}
                // enables or disables noise premultiplication
                blendFunction={BlendFunction.ADD} // blend mode
            /> */}
        </EffectComposer>
    )
}

export default Effects
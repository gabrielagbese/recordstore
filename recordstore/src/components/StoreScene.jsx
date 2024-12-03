import { Canvas, useThree, useFrame, useLoader } from '@react-three/fiber'
import { FirstPersonControls, useHelper, PivotControls, OrbitControls, Box, Text, Html, Sky, Cylinder, AccumulativeShadows, RandomizedLight, SoftShadows, Text3D, KeyboardControls, useGLTF, Environment, Edges } from '@react-three/drei'
import { useState, useRef, useCallback, useEffect, Children, Suspense } from 'react'
import * as THREE from 'three'
import Ecctrl from 'ecctrl'
import { EcctrlJoystick } from "ecctrl";
import { Physics, RigidBody } from '@react-three/rapier'

import { useTexture } from '@react-three/drei'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { TextureLoader } from 'three'
import Arcade from './modal-components/Arcade'
import Shelf1 from './modal-components/Shelf1'
import Shelf6 from './modal-components/Shelf6'
import Shelf5 from './modal-components/Shelf5'
import Shelf4 from './modal-components/Shelf4'
import Shelf3 from './modal-components/Shelf3'
import Shelf2 from './modal-components/Shelf2'
import Effects from './Effects'

function VinylTile({ position, color }) {
    return (
        <group position={position}>
            <Box args={[0.8, 0.8, 0.05]} rotation={[Math.PI / 12, 0, 0]} castShadow receiveShadow>
                <meshStandardMaterial color={color} />
            </Box>
            <Box args={[0.7, 0.7, 0.01]} position={[0, 0, 0.03]} rotation={[Math.PI / 12, 0, 0]} castShadow receiveShadow>
                <meshStandardMaterial color="black" />
            </Box>
            <Box args={[0.2, 0.2, 0.02]} position={[0, 0, 0.04]} rotation={[Math.PI / 12, 0, 0]} castShadow receiveShadow>
                <meshStandardMaterial color="gray" />
            </Box>
        </group>
    )
}

function Modal({ isOpen, onClose, title, content }) {
    if (!isOpen) return null;

    return (
        <div
            className="absolute top-0 left-0 w-full h-full flex items-center justify-center z-[100] -mt-8"
            style={{ pointerEvents: 'none' }}
        >
            <div
                className="w-full max-w-sm p-6 bg-white rounded-lg shadow-lg"
                style={{ pointerEvents: 'auto' }}
                onClick={(e) => e.stopPropagation()}
            >
                <h2 className="mb-4 text-xl font-bold">{title}</h2>
                <p className="mb-4">{content}</p>
                <button
                    onClick={onClose}
                    className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    Close
                </button>
            </div>
        </div>
    );
}

function ArcadeGame({ position, onClick }) {
    return (
        <group position={position} onClick={(e) => {
            e.stopPropagation(); // Prevent event bubbling
            onClick(); // Directly call the onClick handler
        }} rotation-y={3.1}>
            {/* Cabinet */}
            <Box args={[4, 6, 2]} position={[0, 3, 0]} castShadow receiveShadow>
                <meshStandardMaterial color="#4a4a4a" />
            </Box>
            {/* Screen */}
            <Box args={[3.5, 2.5, 0.1]} position={[0, 4.5, 1.05]} castShadow receiveShadow>
                <meshStandardMaterial color="#000000" />
            </Box>
            {/* Control Panel */}
            <Box args={[3.5, 1, 1.5]} position={[0, 2, 0.75]} rotation={[-Math.PI / 6, 0, 0]} castShadow receiveShadow>
                <meshStandardMaterial color="#2c3e50" />
            </Box>
            {/* Joystick */}
            <group position={[-0.75, 2.3, 1.2]}>
                <Cylinder args={[0.1, 0.1, 0.5, 16]} rotation={[Math.PI / 2, 0, 0]} castShadow receiveShadow>
                    <meshStandardMaterial color="#e74c3c" />
                </Cylinder>

            </group>
            {/* Buttons */}
            {[0, 0.5, 1].map((x, i) => (
                <Cylinder key={i} args={[0.15, 0.15, 0.1, 16]} position={[x, 2.3, 1.2]} rotation={[Math.PI / 2, 0, 0]}>
                    <meshStandardMaterial color={["#3498db", "#2ecc71", "#f1c40f"][i]} />
                </Cylinder>
            ))}
        </group>
    )
}



// function Shelf({ position, name, color, onClick }) {


//     return (
//         <RigidBody type="fixed" colliders="trimesh">
//             <group position={position} onClick={(e) => {
//                 e.stopPropagation()
//                 onClick();
//             }}>
//                 <Box args={[0.1, 4, 0.1]} position={[-1.45, 0, 0]} castShadow receiveShadow>
//                     <meshStandardMaterial color="#8B4513" />
//                 </Box>
//                 <Box args={[0.1, 4, 0.1]} position={[1.45, 0, 0]} castShadow receiveShadow>
//                     <meshStandardMaterial color="#8B4513" />
//                 </Box>

//                 {[-1.8, -0.6, 0.6, 1.8].map((y, index) => (
//                     <group key={index}>
//                         <Box args={[3, 0.1, 1]} position={[0, y, 0]} castShadow receiveShadow>
//                             <meshStandardMaterial color="#A0522D" />
//                         </Box>
//                         {[-1, 0, 1].map((x, i) => (
//                             <VinylTile key={i} position={[x, y + 0.4, -0.2]} color={color} />
//                         ))}
//                     </group>
//                 ))}

//                 <group position={[0, 2.7, 0]}>
//                     <Box args={[1.5, 0.5, 0.05]} castShadow receiveShadow>
//                         <meshStandardMaterial color="white" />
//                     </Box>
//                     {[0, Math.PI].map((rotation, index) => (
//                         <Text key={index} position={[0, 0, 0.03 * (index === 0 ? 1 : -1)]} fontSize={0.2} color="black" rotation={[0, rotation, 0]}>
//                             {name}
//                         </Text>
//                     ))}
//                 </group>


//             </group>
//         </RigidBody>
//     )
// }



function Shelf({ position, name, folderName, onClick }) {
    // Load textures dynamically from the specified folder
    const textures = useLoader(
        THREE.TextureLoader,
        Array.from({ length: 12 }, (_, i) => `/${folderName}/image${i + 1}.jpg`)
    );

    return (
        <RigidBody type="fixed" colliders="trimesh">
            <group
                position={position}
                onClick={(e) => {
                    e.stopPropagation();
                    onClick();
                }}
            >
                {/* Vertical Supports */}
                <Box args={[0.1, 4, 0.1]} position={[-1.45, 0, 0]} castShadow receiveShadow>
                    <meshStandardMaterial color="#8B4513" />
                </Box>
                <Box args={[0.1, 4, 0.1]} position={[1.45, 0, 0]} castShadow receiveShadow>
                    <meshStandardMaterial color="#8B4513" />
                </Box>

                {/* Shelves with Tiles */}
                {[-1.8, -0.6, 0.6, 1.8].map((y, shelfIndex) => (
                    <group key={shelfIndex}>
                        {/* Shelf Plank */}
                        <Box args={[3, 0.1, 1]} position={[0, y, 0]} castShadow receiveShadow>
                            <meshStandardMaterial color="#A0522D" />
                        </Box>

                        {/* Vinyl Tiles */}
                        {[-1, 0, 1].map((x, tileIndex) => {
                            const textureIndex = shelfIndex * 3 + tileIndex; // Calculate texture index
                            return (
                                <Box key={tileIndex} args={[0.8, 0.8, 0.025]} position={[x, y + 0.4, -0.2]}>
                                    <meshStandardMaterial map={textures[textureIndex]} />
                                </Box>
                            );
                        })}
                    </group>
                ))}

                {/* Label */}
                <group position={[0, 2.7, 0]}>
                    <Box args={[1.5, 0.5, 0.05]} castShadow receiveShadow>
                        <meshStandardMaterial color="white" />
                    </Box>
                    {[0, Math.PI].map((rotation, index) => (
                        <Text
                            key={index}
                            position={[0, 0, 0.03 * (index === 0 ? 1 : -1)]}
                            fontSize={0.2}
                            color="black"
                            rotation={[0, rotation, 0]}
                        >
                            {name}
                        </Text>
                    ))}
                </group>
            </group>
        </RigidBody>
    );
}





function Magazine({ position, color, title }) {


    return (
        <group>
            <Box
                args={[0.8, 0.02, 1]}
                position={position}
                onClick={(e) => {
                    e.stopPropagation()

                }}
                castShadow
                receiveShadow
            >
                <meshStandardMaterial color={color} />
            </Box>

        </group>
    )
}

function TableOne({ position, Children }) {
    return (
        <RigidBody type="fixed" colliders="trimesh">
            <group position={position}>
                <Box args={[3, 0.1, 20]} position={[0, 1.45, 0]} castShadow receiveShadow>
                    <meshStandardMaterial color="#8B4513" />
                </Box>
                <Box args={[0.1, 3, 0.1]} position={[-1.4, 0, -9.9]} castShadow receiveShadow>
                    <meshStandardMaterial color="#8B4513" />
                </Box>
                <Box args={[0.1, 3, 0.1]} position={[1.4, 0, -9.9]} castShadow receiveShadow>
                    <meshStandardMaterial color="#8B4513" />
                </Box>
                <Box args={[0.1, 3, 0.1]} position={[-1.4, 0, 9.9]} castShadow receiveShadow>
                    <meshStandardMaterial color="#8B4513" />
                </Box>
                <Box args={[0.1, 3, 0.1]} position={[1.4, 0, 9.9]} castShadow receiveShadow>
                    <meshStandardMaterial color="#8B4513" />
                </Box>
                {/* Add magazines in two columns */}
                {Children}
                <Magazine position={[0, 1.5, -0.5]} color="#FF6347" title="Magazine 1" />
            </group>
        </RigidBody>
    )
}
function TableTwo({ position, Children }) {
    return (
        <RigidBody type="fixed" colliders="trimesh">
            <group position={position}>
                <Box args={[3, 0.1, 20]} position={[0, 1.45, 0]} castShadow receiveShadow>
                    <meshStandardMaterial color="#8B4513" />
                </Box>
                <Box args={[0.1, 3, 0.1]} position={[-1.4, 0, -9.9]} castShadow receiveShadow>
                    <meshStandardMaterial color="#8B4513" />
                </Box>
                <Box args={[0.1, 3, 0.1]} position={[1.4, 0, -9.9]} castShadow receiveShadow>
                    <meshStandardMaterial color="#8B4513" />
                </Box>
                <Box args={[0.1, 3, 0.1]} position={[-1.4, 0, 9.9]} castShadow receiveShadow>
                    <meshStandardMaterial color="#8B4513" />
                </Box>
                <Box args={[0.1, 3, 0.1]} position={[1.4, 0, 9.9]} castShadow receiveShadow>
                    <meshStandardMaterial color="#8B4513" />
                </Box>
                {/* Add magazines in two columns */}
                {Children}
                <Magazine position={[1, 1.5, -0.5]} color="#FF6347" title="Magazine 1" />
            </group>
        </RigidBody>
    )
}

function Poster({ position, color }) {
    return (
        <mesh position={position}>
            <planeGeometry args={[6, 8]} />
            <meshStandardMaterial color={color} />
        </mesh>
    )
}

function Door({ position }) {
    return (
        <group position={position}>
            <Box args={[4, 7, 0.2]}>
                <meshStandardMaterial color="#8B4513" />
            </Box>
            <Box args={[0.5, 0.5, 0.1]} position={[1.5, 0, 0.1]}>
                <meshStandardMaterial color="#C0C0C0" />
            </Box>
        </group>
    )
}




// Update Sun to cast shadows
function Sun() {
    const sunRef = useRef(null)

    useFrame(({ clock }) => {
        if (sunRef.current) {

        }
    })

    return (
        <mesh ref={sunRef} position={[20, 5, 0]}>
            <sphereGeometry args={[1, 32, 32]} />
            <meshBasicMaterial color="#FDB813" />
            <pointLight
                color="#FFF"
                intensity={1}
                distance={100}
                castShadow
                shadow-mapSize-width={2048}
                shadow-mapSize-height={2048}
                shadow-camera-far={50}
                shadow-camera-near={0.1}
            />
        </mesh>
    )
}

function FloatingShelf({ position }) {
    return (
        <Box args={[27.5, 0.1, 1]} position={position} castShadow receiveShadow>
            <meshStandardMaterial color="#8B4513" />
        </Box>
    )
}

function ShelfObject({ position, color }) {
    return (
        <group position={position}>
            <Box args={[0.5, 0.5, 0.5]}>
                <meshStandardMaterial color={color} />
            </Box>
        </group>
    )
}

function FloatingShelves() {
    return (
        <group position={[0, 0, 14.5]}>
            <FloatingShelf position={[0, 6, 0]} />
            <FloatingShelf position={[0, 4, 0]} />
            <FloatingShelf position={[0, 2, 0]} />
            <FloatingShelf position={[0, 0, 0]} />

        </group>
    )
}
function SmallFlatLight({ position, tpx, tpz }) {
    const lightRef = useRef(null)
    //useHelper(lightRef, THREE.SpotLightHelper, 0.5, 'red')
    return (
        <group position={position}>
            <mesh>
                <cylinderGeometry args={[0.5, 0.5, 0.1, 32]} />
                <meshStandardMaterial color="#ffbb00" emissive="#ffbb00" emissiveIntensity={5} />
            </mesh>
            <spotLight
                ref={lightRef}
                position={[0, -1, 0]}
                angle={Math.PI / 2} // Wider angle
                penumbra={1.5} // More soft edges
                intensity={1} // Increased intensity
                distance={25}
                decay={0}
                target-position={[tpx, -11, tpz]}
                castShadow
                color="#ffbb00" // Match the bulb color
            />
        </group>
    )
}
function FlatLight({ position, tp }) {
    const lightRef = useRef(null)
    //useHelper(lightRef, THREE.SpotLightHelper, 0.5, 'red')
    return (
        <group position={position}>
            <mesh>
                <cylinderGeometry args={[0.5, 0.5, 0.1, 32]} />
                <meshStandardMaterial color="#ffff00" emissive="#ffff00" emissiveIntensity={15} />
            </mesh>
            <spotLight
                ref={lightRef}
                position={[0, -1, 0]}
                angle={Math.PI / 4} // Wider angle
                penumbra={0.5} // More soft edges
                intensity={10} // Increased intensity
                distance={10}
                decay={0}
                target-position={[tp, -11, 0]}
                castShadow
                color="#ff9900" // Match the bulb color
            />
        </group>
    )
}

function HangingBulb({ position }) {
    const lightRef = useRef(null)
    //useHelper(lightRef, THREE.SpotLightHelper, 'green')
    return (
        <group position={position}>
            <mesh position={[0, -1, 0]}>
                <sphereGeometry args={[0.75, 32, 32]} />
                <meshStandardMaterial color="#ff0000" emissive="#ff9900" emissiveIntensity={2} />
            </mesh>
            <mesh position={[0, -0.5, 0]}>
                <cylinderGeometry args={[0.05, 0.01, 3, 8]} />
                <meshStandardMaterial color="#404040" />
            </mesh>
            <spotLight
                ref={lightRef}
                position={[0, -1, 0]}
                angle={Math.PI / 2} // Wider angle
                penumbra={0.5} // More soft edges
                intensity={40} // Increased intensity
                distance={30}
                decay={1}
                target-position={[0, -10, 7]}
                castShadow
                color="#ff9900" // Match the bulb color
            />
        </group>
    )
}

function NeonTube({ position, tpx, tpz }) {
    const lightRef = useRef(null)
    //useHelper(lightRef, THREE.SpotLightHelper, 'cyan')
    return (
        <group position={position}>
            <mesh rotation={[0, 0, Math.PI / 2]}>
                <cylinderGeometry args={[0.025, 0.025, 2, 16]} />
                <meshStandardMaterial color="#00ffff" emissive="#00ffff" emissiveIntensity={5} />
            </mesh>
            <spotLight
                ref={lightRef}
                color="#00ffff"
                intensity={5}
                angle={Math.PI / 4}
                penumbra={7}
                distance={6}
                decay={2}
                position={[0, -0.05, 0]}
                target-position={[tpx, -10, tpz]}
                castShadow

            />
        </group>
    )
}

// Update Room to receive shadows
function Room() {
    {/* Loaded Models, Textures, and resizes */ }
    const bSpeaker1 = useLoader(GLTFLoader, "models/Speaker2.glb")
    const bSpeaker2 = useLoader(GLTFLoader, "models/Speaker3.glb")

    const pBig1 = useLoader(GLTFLoader, "models/potted_big.gltf")
    pBig1.scene.traverse((child) => {
        if (child.isMesh) { // Check if the child is a Mesh (i.e., a 3D object with geometry and material)
            child.castShadow = true; // Enable shadow casting
            child.receiveShadow = true; // Enable shadow receiving
        }
    });

    const outside = useLoader(GLTFLoader, "models/outside.glb")
    outside.scene.traverse((child) => {
        if (child.isMesh) { // Check if the child is a Mesh (i.e., a 3D object with geometry and material)
            child.castShadow = true; // Enable shadow casting
            child.receiveShadow = true; // Enable shadow receiving
        }
    });

    const pBigClone1 = pBig1.scene.clone();
    const pBigClone2 = pBig1.scene.clone();
    const pBigClone3 = pBig1.scene.clone();

    const tree = useLoader(GLTFLoader, "models/tree2.gltf")
    tree.scene.traverse((child) => {
        if (child.isMesh) { // Check if the child is a Mesh (i.e., a 3D object with geometry and material)
            child.castShadow = true; // Enable shadow casting
            child.receiveShadow = true; // Enable shadow receiving
        }
    });
    console.log(tree.scene)

    const grass = useLoader(TextureLoader, 'textures/grass.jpg')
    grass.wrapS = THREE.RepeatWrapping; // Repeat wrapping in S direction
    grass.wrapT = THREE.RepeatWrapping; // Repeat wrapping in T direction
    grass.repeat.set(1, 1); // Repeat 4x4 times
    const rconc = useLoader(TextureLoader, 'textures/rconc.jpg')
    rconc.wrapS = THREE.RepeatWrapping; // Repeat wrapping in S direction
    rconc.wrapT = THREE.RepeatWrapping; // Repeat wrapping in T direction
    rconc.repeat.set(0.6, 0.1); // Repeat 4x4 times

    const texture = useLoader(TextureLoader, 'textures/wood3.jpg')
    texture.wrapS = THREE.MirroredRepeatWrapping; // Repeat wrapping in S direction
    texture.wrapT = THREE.MirroredRepeatWrapping; // Repeat wrapping in T direction
    texture.repeat.set(7, 1.35); // Repeat 4x4 times
    const dpProps = useTexture({
        map: 'textures/dp/diagonal_parquet_diff_1k.jpg',
        normalMap: 'textures/dp/diagonal_parquet_nor_dx_1k.jpg',
        roughnessMap: 'textures/dp/diagonal_parquet_rough_1k.jpg',
        aoMap: 'textures/dp/diagonal_parquet_ao_1k.jpg'
    })

    Object.values(dpProps).forEach((dtexture) => {
        dtexture.wrapS = THREE.RepeatWrapping; // Repeat wrapping in S direction
        dtexture.wrapT = THREE.RepeatWrapping; // Repeat wrapping in T direction
        dtexture.repeat.set(4, 4); // Repeat 4x4 times
    });

    const carpetProps = useTexture({
        map: 'textures/carpet/Carpet012_1K-JPG_Color.jpg',
        normalMap: 'textures/carpet/Carpet012_1K-JPG_NormalDX.jpg',
        roughnessMap: 'textures/carpet/Carpet012_1K-JPG_Roughness.jpg',
        aoMap: 'textures/carpet/Carpet012_1K-JPG_AmbientOcclusion.jpg'
    })

    Object.values(carpetProps).forEach((dtexture) => {
        dtexture.wrapS = THREE.RepeatWrapping; // Repeat wrapping in S direction
        dtexture.wrapT = THREE.RepeatWrapping; // Repeat wrapping in T direction
        dtexture.repeat.set(4, 4); // Repeat 4x4 times
    });



    texture.wrapS = THREE.RepeatWrapping
    texture.wrapT = THREE.RepeatWrapping
    texture.repeat.set(8, 8)

    return (
        <RigidBody type="fixed" colliders="trimesh">
            <group>
                {/* Floor */}
                <RigidBody type="fixed" colliders="trimesh">
                    <Box args={[100, 0.1, 60]} position={[0, -2, 0]} receiveShadow>
                        <meshStandardMaterial  {...dpProps} reflectivity={0} color={[1, 1, 1]} />
                    </Box>
                </RigidBody>

                {/*Carpet*/}
                <RigidBody type="fixed" colliders="trimesh">
                    <Box args={[25, 0.1, 25]} position={[0, -1.9, 0]} receiveShadow>
                        <meshStandardMaterial  {...carpetProps} color={[1.2, 1.2, 1.2]} normalScale={[2, 2]} />
                    </Box>
                </RigidBody>

                {/*Courtyard Grass*/}
                <Box args={[20, 0.1, 32]} position={[-35, -1.5, 0]} receiveShadow>
                    <meshStandardMaterial map={grass} color={[1.2, 1.2, 1.2]} normalScale={[2, 2]} />
                </Box>

                {/* Ceiling */}
                <Box args={[50, 0.1, 30]} position={[0, 8, 0]} receiveShadow>
                    <meshStandardMaterial color="#DCDCDC" />
                </Box>

                {/*POP*/}
                <Box args={[30, 1, 20]} position={[0, 8, 0]} receiveShadow>
                    <meshStandardMaterial color="#efefef" />
                </Box>

                {/*Central Bulb*/}
                <HangingBulb position={[0, 7, 12]} />
                {/* <FlatLight position={[7, 7, -12.5]} tp={10} /> */}
                <SmallFlatLight position={[7, 7.5, -12.5]} tpx={7} tpz={-12.5} />
                {/* <FlatLight position={[-7, 7, -12.5]} tp={-10} /> */}
                <SmallFlatLight position={[-7, 7.5, -12.5]} tpx={-7} tpz={-12.5} />


                {/* Wall with window */}
                {/*Bottom Window Wall*/}
                <group position={[-25, -1.5, 0]} rotation={[0, 0, 0]}>
                    <Box args={[2, 3, 30]} receiveShadow castShadow>
                        <meshStandardMaterial color="#F5F5F5" />
                    </Box>
                </group>

                {/*Glass Window Wall*/}
                <group position={[-25, 3, 0]} rotation={[0, 0, 0]}>
                    <Box args={[0.1, 6.5, 25]} receiveShadow castShadow>
                        <meshPhysicalMaterial transmission={1} thickness={0} depthWrite={false} roughness={0} clearcoat={1} color={"#aaaabb"} />
                    </Box>
                </group>

                {/*Top Window Wall*/}
                <group position={[-25, 7.5, 0]} rotation={[0, 0, 0]}>
                    <Box args={[2, 3, 30]} receiveShadow castShadow>
                        <meshStandardMaterial color="#F5F5F5" />
                    </Box>
                </group>

                {/*Inner Right*/}
                <group position={[-25, 5, -15]} rotation={[0, 0, 0]}>
                    <Box args={[1, 10, 5]} receiveShadow castShadow>
                        <meshStandardMaterial color="#F5F5F5" />
                    </Box>
                </group>

                {/*Inner Left*/}
                <group position={[-25, 5, 15]} rotation={[0, 0, 0]}>
                    <Box args={[1, 10, 5]} receiveShadow castShadow>
                        <meshStandardMaterial color="#F5F5F5" />
                    </Box>
                </group>

                {/*Poster Wall*/}
                <group position={[25, 3, 0]} rotation={[0, Math.PI, 0]}>
                    <Box args={[0.1, 10, 30]} receiveShadow castShadow>
                        <meshStandardMaterial color="#F5F5F5" />
                    </Box>
                </group>

                {/*external garden walls*/}
                <Box args={[26, 5, 0.1]} position={[-32, 0, -16]} receiveShadow castShadow>
                    <meshStandardMaterial color="#eeeeee" opacity={0} />
                </Box>
                <Box args={[26, 5, 0.1]} position={[-32, 0, 16]} receiveShadow castShadow>
                    <meshStandardMaterial color="#dddddd" />
                </Box>
                <Box args={[0.1, 5, 32]} position={[-45, 0, 0]} receiveShadow castShadow>
                    <meshStandardMaterial color="#ffffff" />
                </Box>
                {/*Tree*/}
                <primitive
                    object={tree.scene}
                    position={[-33, -1, 0]}
                    rotation={[0, Math.PI / -1, 0]} // Rotate 90 degrees along the Y-axis
                    scale={[1.5, 1.5, 1.5]}
                    castShadow
                    receiveShadow
                />

                {/* Front and back walls */}
                {/* Front wall with door and posters */}
                <Box args={[50, 10, 0.1]} position={[0, 3, -15]}>
                    <meshStandardMaterial color="#F5F5F5" />
                </Box>
                <Door position={[0, 1.5, -14.9]} />
                <Poster position={[-15, 3, -14.8]} color="#FF6347" />
                <Poster position={[15, 3, -14.8]} color="#4682B4" />

                {/* Back wall */}
                <Box args={[50, 10, 0.1]} position={[0, 3, 15]}>
                    <meshStandardMaterial color="#F5F5F5" />
                </Box>

                {/*shelf panel*/}
                <Box args={[27.5, 8, 0.1]} position={[0, 2, 14.9]}>
                    <meshStandardMaterial map={texture} />
                </Box>

                {/*Speaker*/}
                <primitive
                    object={bSpeaker1.scene}
                    position={[12.2, 4, 14.25]}
                    rotation={[0, Math.PI / -1, 0]} // Rotate 90 degrees along the Y-axis
                    scale={[2, 2, 2]}
                    castShadow
                    receiveShadow
                />
                {/*Speaker*/}
                <primitive
                    object={bSpeaker2.scene}
                    position={[-12.2, 4, 14.25]}
                    rotation={[0, Math.PI / -1, 0]} // Rotate 90 degrees along the Y-axis
                    scale={[2, 2, 2]}
                    castShadow
                    receiveShadow
                />

                {/*Big Plant*/}
                <primitive
                    object={pBig1.scene}
                    position={[-22, -2, -13]}
                    rotation={[0, Math.PI / -3, 0]} // Rotate 90 degrees along the Y-axis
                    scale={[4, 4, 4]}
                    castShadow
                    receiveShadow
                />

                {/*Big Plant Clone 1*/}
                <primitive
                    object={pBigClone1}
                    position={[22, -2, -13]}
                    rotation={[0, Math.PI / -2, 0]} // Rotate 90 degrees along the Y-axis
                    scale={[4, 4, 4]}
                    castShadow
                    receiveShadow
                />

                {/*Big Plant Clone 2*/}
                <primitive
                    object={pBigClone2}
                    position={[22, -2, 13]}
                    rotation={[0, Math.PI / -7, 0]} // Rotate 90 degrees along the Y-axis
                    scale={[4, 4, 4]}
                    castShadow
                    receiveShadow
                />

                {/*Big Plant Clone 3*/}
                <primitive
                    object={pBigClone3}
                    position={[-22, -2, 13]}
                    rotation={[0, Math.PI / -2, 0]} // Rotate 90 degrees along the Y-axis
                    scale={[4, 4, 4]}
                    castShadow
                    receiveShadow
                />

                {/* Tables */}
                <TableOne position={[-19.5, -1.5, 0]} />
                <TableTwo position={[19.5, -1.5, 0]} />
                <FloatingShelves />
            </group>
        </RigidBody>
    )
}



function Player() {
    const keyboardMap = [
        { name: "forward", keys: ["ArrowUp", "KeyW"] },
        { name: "backward", keys: ["ArrowDown", "KeyS"] },
        { name: "leftward", keys: ["ArrowLeft", "KeyA"] },
        { name: "rightward", keys: ["ArrowRight", "KeyD"] },
        { name: "jump", keys: ["Space"] },
        { name: "run", keys: ["Shift"] },
        // Optional animation key map
        { name: "action1", keys: ["1"] },
        { name: "action2", keys: ["2"] },
        { name: "action3", keys: ["3"] },
        { name: "action4", keys: ["KeyF"] },
    ];
    return (
        <>
            <KeyboardControls map={keyboardMap}>
                <Ecctrl
                    camCollision={true} // disable camera collision detect (useless in FP mode)
                    camInitDis={-0.1} // camera intial position
                    camMinDis={-0.01} // camera zoom in closest position
                    camFollowMult={1000} // give a big number here, so the camera follows the target (character) instantly
                    camLerpMult={1000} // give a big number here, so the camera lerp to the followCam position instantly
                    turnVelMultiplier={1} // Turning speed same as moving speed
                    turnSpeed={100} // give it big turning speed to prevent turning wait time
                    mode="CameraBasedMovement"
                    floatHeight={0}
                    camTargetPos={{ x: 0, y: 3, z: 0 }}



                    // Keyboard control configuration
                    keyboardControls={{
                        forward: 'ArrowUp',
                        backward: 'ArrowDown',
                        leftward: 'ArrowLeft',
                        rightward: 'ArrowRight',
                        jump: 'Space',
                        sprint: 'Shift'
                    }}
                >
                    {/* Adjust mesh to be taller */}
                    <RigidBody type="fixed" colliders="trimesh">
                        <mesh visible={false} >
                            <cylinderGeometry args={[0.5, 0.5, 2, 16]} />  // Doubled height from 2 to 4
                            <meshStandardMaterial color="red" />
                        </mesh>
                    </RigidBody>
                </Ecctrl>
            </KeyboardControls >
        </>
    )
}



export default function StoreScene({ openModal }) {
    const [cFov, setCFov] = useState(65); // Default FOV

    useEffect(() => {
        const handleResize = () => {
            // Adjust FOV based on screen width
            setCFov(window.innerWidth < 768 ? 65 : 65); // Wider FOV for mobile (<768px)
        };

        handleResize(); // Initial check
        window.addEventListener("resize", handleResize);

        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const model = useGLTF("models/cashregister.glb")

    // Traverse and set shadow properties for the model
    model.scene.traverse((child) => {
        if (child.isMesh) {
            child.castShadow = true;
            child.receiveShadow = true;
        }
    });

    // Click handlers for different interactive elements
    const handleArcadeClick = () => {
        openModal("Arcade Game", Arcade);
    };

    const handleShelfClick = (shelfNumber) => {
        const shelfModals = {
            1: Shelf1,
            2: Shelf2,
            3: Shelf3,
            4: Shelf4,
            5: Shelf5,
            6: Shelf6
        };

        openModal(`Shelf ${shelfNumber}`, shelfModals[shelfNumber]);
    };

    return (
        <>
            <EcctrlJoystick
                buttonNumber={0}
                joystickPositionLeft={-20}
                joystickPositionBottom={-20}
                joystickBaseProps={{
                    receiveShadow: true,
                    scale: [0.55, 0.55, 0.55],
                    material: new THREE.MeshBasicMaterial({ color: "#8f8f8f" })
                }}
                joystickStickProps={{
                    castShadow: true,
                    scale: [0.65, 0.65, 0.65],
                    material: new THREE.MeshBasicMaterial({ color: "#A9A9A9" })
                }}
                joystickHandleProps={{
                    scale: [0.7, 0.7, 0.7],
                    material: new THREE.MeshBasicMaterial({ color: "#D3D3D3" })
                }}
            />
            <Canvas
                camera={{
                    position: [0, 5, -15],
                    fov: cFov,
                }}
                style={{ width: '100vw', height: '100vh' }}
                className="relative"
                shadows
            >
                <Suspense fallback={null}>
                    <ambientLight intensity={0.5} color={0xffffff} />

                    <directionalLight
                        position={[-10, 10, 4]}
                        intensity={2}
                        castShadow
                        shadow-mapSize-width={2048}
                        shadow-mapSize-height={2048}
                        shadow-camera-far={50}
                        shadow-camera-near={0.1}
                        shadow-camera-left={-20}
                        shadow-camera-right={20}
                        shadow-camera-top={20}
                        shadow-camera-bottom={-20}
                    />

                    <Physics>
                        <Player />

                        <hemisphereLight
                            intensity={0.3}
                            color="#ffffff"
                            groundColor="#bbbbff"
                        />

                        <Sky
                            sunPosition={[20, 5, 0]}
                            turbidity={0.1}
                            rayleigh={0.5}
                        />

                        <Room />

                        {/* Shelves with dynamic click handling */}
                        <Shelf
                            position={[-6.5, 0, -6.5]}
                            name="Shelf 1"
                            folderName="testA"
                            onClick={() => handleShelfClick(1)}
                        />
                        <Shelf
                            position={[-6.5, 0, 0]}
                            name="Shelf 2"
                            folderName="testA"
                            onClick={() => handleShelfClick(2)}
                        />
                        <Shelf
                            position={[-6.5, 0, 6.5]}
                            name="Shelf 3"
                            folderName="testA"
                            onClick={() => handleShelfClick(3)}
                        />
                        <Shelf
                            position={[6.5, 0, -6.5]}
                            name="Shelf 4"
                            folderName="testA"
                            onClick={() => handleShelfClick(4)}
                        />
                        <Shelf
                            position={[6.5, 0, 0]}
                            name="Shelf 5"
                            folderName="testA"
                            onClick={() => handleShelfClick(5)}
                        />
                        <Shelf
                            position={[6.5, 0, 6.5]}
                            name="Shelf 6"
                            folderName="testA"
                            onClick={() => handleShelfClick(6)}
                        />

                        <RigidBody type="fixed" colliders="trimesh">
                            <primitive
                                object={model.scene}
                                position={[0, -3, 10]}
                                rotation={[0, Math.PI / -1, 0]}
                                scale={[1.25, 1.25, 1.25]}
                                onClick={handleArcadeClick}
                                castShadow
                                onPointerOver={(e) => (document.body.style.cursor = "pointer")}
                                onPointerOut={(e) => (document.body.style.cursor = "auto")}
                                receiveShadow
                            />
                        </RigidBody>
                    </Physics>

                    <OrbitControls />
                    <Effects />
                </Suspense>
            </Canvas>
        </>
    )
}
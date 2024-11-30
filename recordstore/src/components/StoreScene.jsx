import { Canvas, useThree, useFrame, useLoader } from '@react-three/fiber'
import { FirstPersonControls, OrbitControls, Box, Text, Html, Sky, Cylinder, AccumulativeShadows, RandomizedLight, SoftShadows, Text3D, KeyboardControls, useGLTF } from '@react-three/drei'
import { useState, useRef, useCallback, useEffect, Children, Suspense } from 'react'
import * as THREE from 'three'
import Ecctrl from 'ecctrl'
import { EcctrlJoystick } from "ecctrl";
import { Physics, RigidBody } from '@react-three/rapier'
import { ArrowUp, ArrowDown, ArrowLeft, ArrowRight } from 'lucide-react'
import { Arcademodel } from './Arcademodel'
import { useTexture } from '@react-three/drei'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { TextureLoader } from 'three'

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
                className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full"
                style={{ pointerEvents: 'auto' }}
                onClick={(e) => e.stopPropagation()}
            >
                <h2 className="text-xl font-bold mb-4">{title}</h2>
                <p className="mb-4">{content}</p>
                <button
                    onClick={onClose}
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
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



function Shelf({ position, name, color }) {

    // const { camera } = useThree()

    return (
        <RigidBody type="fixed" colliders="trimesh">
            <group position={position} onClick={(e) => {
                e.stopPropagation()

            }}>
                <Box args={[0.1, 4, 0.1]} position={[-1.45, 0, 0]} castShadow receiveShadow>
                    <meshStandardMaterial color="#8B4513" />
                </Box>
                <Box args={[0.1, 4, 0.1]} position={[1.45, 0, 0]} castShadow receiveShadow>
                    <meshStandardMaterial color="#8B4513" />
                </Box>

                {[-1.8, -0.6, 0.6, 1.8].map((y, index) => (
                    <group key={index}>
                        <Box args={[3, 0.1, 1]} position={[0, y, 0]} castShadow receiveShadow>
                            <meshStandardMaterial color="#A0522D" />
                        </Box>
                        {[-1, 0, 1].map((x, i) => (
                            <VinylTile key={i} position={[x, y + 0.4, -0.2]} color={color} />
                        ))}
                    </group>
                ))}

                <group position={[0, 2.7, 0]}>
                    <Box args={[1.5, 0.5, 0.05]} castShadow receiveShadow>
                        <meshStandardMaterial color="white" />
                    </Box>
                    {[0, Math.PI].map((rotation, index) => (
                        <Text key={index} position={[0, 0, 0.03 * (index === 0 ? 1 : -1)]} fontSize={0.2} color="black" rotation={[0, rotation, 0]}>
                            {name}
                        </Text>
                    ))}
                </group>


            </group>
        </RigidBody>
    )
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
    )
}
function TableTwo({ position, Children }) {
    return (
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
        <Box args={[40, 0.1, 1]} position={position}>
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
            <FloatingShelf position={[0, 4, 0]} />
            <FloatingShelf position={[0, 2, 0]} />
            {[...Array(20)].map((_, index) => (
                <ShelfObject
                    key={index}
                    position={[
                        Math.random() * 38 - 19,
                        index < 10 ? 4.3 : 2.3,
                        Math.random() * 0.8 - 0.4
                    ]}
                    color={`hsl(${Math.random() * 360}, 70%, 70%)`}
                />
            ))}
        </group>
    )
}

// Update Room to receive shadows
function Room() {

    const texture = useLoader(TextureLoader, 'textures/wood2.jpg')

    texture.wrapS = THREE.RepeatWrapping
    texture.wrapT = THREE.RepeatWrapping
    texture.repeat.set(8, 8)

    return (
        <RigidBody type="fixed" colliders="trimesh">
            <group>
                {/* Floor */}
                <Box args={[50, 0.1, 30]} position={[0, -2, 0]} receiveShadow>
                    <meshStandardMaterial map={texture} />
                </Box>
                {/* Ceiling */}
                <Box args={[50, 0.1, 30]} position={[0, 8, 0]} receiveShadow>
                    <meshStandardMaterial color="#DCDCDC" />
                </Box>
                {/* Walls with windows */}
                {[[-25, 0], [25, Math.PI]].map(([x, rotation], index) => (
                    <group key={index} position={[x, 3, 0]} rotation={[0, rotation, 0]}>
                        <Box args={[0.1, 10, 30]} receiveShadow>
                            <meshStandardMaterial color="#F5F5F5" />
                        </Box>
                        {/* Windows */}
                        {[-10, 0, 10].map((z, i) => (
                            <Box key={i} args={[0.2, 4, 4]} position={[0, 1, z]} receiveShadow>
                                <meshStandardMaterial color="#87CEEB00" transparent opacity={1} />
                            </Box>
                        ))}
                    </group>
                ))}
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
                {/* Tables */}
                <TableOne position={[-16.5, -1.5, 0]} />



                <TableTwo position={[16.5, -1.5, 0]} />
                <FloatingShelves />
                {/* Welcome Sign */}
                {/* <WelcomeSign /> */}
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
    )
}


export default function StoreScene({ openModal }) {

    const model = useGLTF("models/acd4.glb")

    const handleArcadeClick = () => {
        openModal(
            "Arcade Game",
            "This is a classic arcade game. Insert a coin to play!"
        );
    };

    return (
        <>
            <EcctrlJoystick
                buttonNumber={0}
                joystickPositionLeft={80}
                joystickPositionBottom={-20}
                joystickBaseProps={{
                    receiveShadow: true,
                    scale: [0.55, 0.55, 0.55],
                    material: new THREE.MeshBasicMaterial({ color: "#8f8f8f" })  // Medium grey
                }}
                joystickStickProps={{
                    castShadow: true,
                    scale: [0.65, 0.65, 0.65],
                    material: new THREE.MeshBasicMaterial({ color: "#A9A9A9" })  // Darker grey
                }}
                joystickHandleProps={{
                    scale: [0.7, 0.7, 0.7],
                    material: new THREE.MeshBasicMaterial({ color: "#D3D3D3" })  // Lighter grey
                }}
            />
            <Canvas
                camera={{
                    position: [0, 5, -15], fov: 75,

                }}
                style={{ width: '100vw', height: '100vh' }} className="relative"
                shadows
            >
                {/* <CameraController /> */}
                <Suspense fallback={null}>
                    <ambientLight intensity={1} />
                    <directionalLight
                        position={[10, 10, 5]}
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
                        <hemisphereLight intensity={0.3} color="#ffffff" groundColor="#bbbbff" />
                        <Sky sunPosition={[20, 5, 0]} turbidity={0.1} rayleigh={0.5} />
                        <Sun />
                        <Room />
                        <Shelf position={[-8, 0, -8]} name="Shelf 1" color="red" />
                        <Shelf position={[-8, 0, 0]} name="Shelf 2" color="blue" />
                        <Shelf position={[-8, 0, 8]} name="Shelf 3" color="green" />
                        <Shelf position={[8, 0, -8]} name="Shelf 4" color="yellow" />
                        <Shelf position={[8, 0, 0]} name="Shelf 5" color="purple" />
                        <Shelf position={[8, 0, 8]} name="Shelf 6" color="orange" />
                        {/* <ArcadeGame position={[0, -2, 7]} onClick={handleArcadeClick} /> */}
                        {/* <Arcademodel /> */}
                        <primitive
                            object={model.scene}
                            position={[0, -2, 11.5]}
                            rotation={[0, Math.PI / -2, 0]} // Rotate 90 degrees along the Y-axis
                            scale={[2.25, 2.25, 2.5]}
                            onClick={handleArcadeClick}                     // Scale uniformly by 2
                        />

                        {/* <Till /> */}
                    </Physics>
                    <OrbitControls />
                    {/* <EcctrlJoystick /> */}
                </Suspense>
            </Canvas>
        </>

    )
}
import { Canvas, useThree, useFrame } from '@react-three/fiber'
import { OrbitControls, Box, Text, Html, Sky, Cylinder, AccumulativeShadows, RandomizedLight, SoftShadows } from '@react-three/drei'
import { useState, useRef, useCallback, useEffect } from 'react'
import * as THREE from 'three'
import { ArrowUp, ArrowDown, ArrowLeft, ArrowRight } from 'lucide-react'

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

function Shelf({ position, name, color }) {
    const [showModal, setShowModal] = useState(false)
    const { camera } = useThree()

    return (
        <group position={position} onClick={(e) => {
            e.stopPropagation()
            setShowModal(true)
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

            {showModal && (
                <Html center>
                    <div className="bg-white p-4 rounded shadow-lg">
                        <h2 className="text-xl font-bold mb-2">{name}</h2>
                        <p>This is {name}.</p>
                        <button
                            className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
                            onClick={(e) => {
                                e.stopPropagation()
                                setShowModal(false)
                            }}
                        >
                            Close
                        </button>
                    </div>
                </Html>
            )}
        </group>
    )
}

function Speaker({ position }) {
    return (
        <group position={position}>
            <Box args={[2, 4, 1]} position={[0, -1, 0]} castShadow receiveShadow>
                <meshStandardMaterial color="#777777" />
            </Box>
            <Cylinder args={[0.3, 0.3, 0.1, 32]} position={[0, 0, -0.5]} rotation={[Math.PI / 2, 0, 0]}>
                <meshStandardMaterial color="#000000" />
            </Cylinder>
            <Cylinder args={[0.2, 0.2, 0.1, 32]} position={[0, -1, -0.5]} rotation={[Math.PI / 2, 0, 0]}>
                <meshStandardMaterial color="#000000" />
            </Cylinder>
            <Cylinder args={[0.3, 0.3, 0.1, 32]} position={[0, -2, -0.5]} rotation={[Math.PI / 2, 0, 0]}>
                <meshStandardMaterial color="#000000" />
            </Cylinder>
        </group>
    )
}

// Update Till to cast and receive shadows
function Till() {
    return (
        <group position={[0, 1, 8]}>
            <Box args={[3, 2, 1]} castShadow receiveShadow>
                <meshStandardMaterial color="#A9A9A9" />
            </Box>
            <Box args={[0.5, 0.5, 0.5]} position={[0, 1.25, 0]} castShadow receiveShadow>
                <meshStandardMaterial color="#000000" />
            </Box>
            <Speaker position={[-2.5, 0, 0]} />
            <Speaker position={[2.5, 0, 0]} />
        </group>
    )
}

// Update Room to receive shadows
function Room() {
    return (
        <group>
            <Box args={[50, 0.1, 30]} position={[0, -2, 0]} receiveShadow>
                <meshStandardMaterial color="#708090" />
            </Box>
            <Box args={[50, 0.1, 30]} position={[0, 8, 0]} receiveShadow>
                <meshStandardMaterial color="#DCDCDC" />
            </Box>
            {[[-25, 0], [25, Math.PI]].map(([x, rotation], index) => (
                <group key={index} position={[x, 3, 0]} rotation={[0, rotation, 0]}>
                    <Box args={[0.1, 10, 30]} receiveShadow>
                        <meshStandardMaterial color="#F5F5F5" />
                    </Box>
                    {[-10, 0, 10].map((z, i) => (
                        <Box key={i} args={[0.2, 4, 4]} position={[0, 1, z]} receiveShadow>
                            <meshStandardMaterial color="#87CEEB" transparent opacity={0.6} />
                        </Box>
                    ))}
                </group>
            ))}
            {[-15, 15].map((z, index) => (
                <Box key={index} args={[50, 10, 0.1]} position={[0, 3, z]} receiveShadow>
                    <meshStandardMaterial color="#F5F5F5" />
                </Box>
            ))}
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

function CameraController() {
    const { camera } = useThree()
    const controlsRef = useRef()
    const speed = 1

    useEffect(() => {
        const handleKeyDown = (event) => {
            const oldPosition = camera.position.clone()

            // Get the camera's forward direction (excluding vertical component)
            const forward = new THREE.Vector3(0, 0, -1)
            forward.applyQuaternion(camera.quaternion)
            forward.y = 0  // Lock to horizontal plane
            forward.normalize()

            // Calculate right vector from forward vector
            const right = new THREE.Vector3()
            right.crossVectors(new THREE.Vector3(0, 1, 0), forward)

            // Movement vector to be applied
            const movement = new THREE.Vector3()

            switch (event.key) {
                case 'ArrowUp':
                    movement.add(forward.multiplyScalar(speed))
                    break
                case 'ArrowDown':
                    movement.add(forward.multiplyScalar(-speed))
                    break
                case 'ArrowLeft':
                    movement.add(right.multiplyScalar(speed))
                    break
                case 'ArrowRight':
                    movement.add(right.multiplyScalar(-speed))
                    break
            }

            // Apply movement to camera position
            camera.position.add(movement)

            // Update OrbitControls target
            if (controlsRef.current) {
                controlsRef.current.target.add(movement)
            }
        }

        window.addEventListener('keydown', handleKeyDown)
        return () => {
            window.removeEventListener('keydown', handleKeyDown)
        }
    }, [camera, speed])

    return <OrbitControls ref={controlsRef} />
}

function NavigationButtons() {
    const buttonStyle = "p-2 bg-white/80 hover:bg-white/90 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-lg backdrop-blur-sm"

    return (
        <div className="absolute top-4 right-4 flex flex-col items-center bg-white/50 p-4 rounded-lg backdrop-blur-sm">
            <button className={buttonStyle} onClick={() => window.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowUp' }))} aria-label="Move forward">
                <ArrowUp className="w-6 h-6" />
            </button>
            <div className="flex justify-between w-32 my-2">
                <button className={buttonStyle} onClick={() => window.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowLeft' }))} aria-label="Move left">
                    <ArrowLeft className="w-6 h-6" />
                </button>
                <button className={buttonStyle} onClick={() => window.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight' }))} aria-label="Move right">
                    <ArrowRight className="w-6 h-6" />
                </button>
            </div>
            <button className={buttonStyle} onClick={() => window.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' }))} aria-label="Move backward">
                <ArrowDown className="w-6 h-6" />
            </button>
        </div>
    )
}

export default function StoreScene() {
    return (
        <div style={{ width: '100vw', height: '100vh' }} className="relative">
            <Canvas
                camera={{ position: [25, 15, 15], fov: 50 }}
                shadows
            >
                <SoftShadows size={25} samples={30} focus={0.25} />
                <CameraController />
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
                <Till />
            </Canvas>
            <NavigationButtons />
        </div>
    )
}
import { Suspense, useState, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, Mask, useMask, OrbitControls, TransformControls, MeshDistortMaterial, Float } from "@react-three/drei";
import { useControls } from "leva";

function MaskedContents({invert, ...props}){
  const threeCircle = useRef()
  const masker = useMask(1, invert)
  const [hovered, hover] = useState(false)
  useFrame((state) => { threeCircle.current.rotation.y = state.clock.elapsedTime / 2 })
  return (
    <group {...props}>
      <mesh ref={threeCircle}>
        <torusKnotGeometry args={[0.6, 0.2, 128, 64]} />
        <meshNormalMaterial {...masker} />
      </mesh>
      <mesh onPointerOver={()=>{hover(true)}} onPointerOut={()=>{hover(false)}}>
        <sphereGeometry />
        <meshStandardMaterial color={(hovered)? 'yello': 'red'} {...masker}/>
      </mesh>
    </group>
  )
}
export default function App() {
  const { invert } = useControls({ invert: true})
  return (
    <Canvas camera={{position: [0, -4, 5]}}>
      <spotLight intensity={10}  />
      <hemisphereLight />
      <Float floatIntensity={5} rotationIntensity={3} floatingRange={3} speed={10} >
        <Mask id={1} position={[0, 0, -1]}>
          <ringGeometry args={[0.85, 0.75, 64]}/>
        </Mask>
      </Float>
      <TransformControls position={[1, 0, 0]}>
        <Mask id={2}>
          <planeGeometry args={[4, 4, 123, 123]}/>
          <MeshDistortMaterial distort={0.5} speed={5} radius={4} />
        </Mask>
      </TransformControls>
      <MaskedContents />
    </Canvas>
  )
}
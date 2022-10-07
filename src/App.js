import * as THREE from 'three'
import { Suspense, useMemo, useRef, useState} from 'react'
import { Canvas, useThree, useFrame, useLoader} from '@react-three/fiber'
import { OrbitControls, useTexture, CameraShake, Reflector} from '@react-three/drei'
import { SVGLoader } from 'three/examples/jsm/loaders/SVGLoader'

export default function App() {
  return (
    <Canvas dpr={[1, 1.5]} camera={{positions: [0, 0, 15]}}>
      <color attach="background" args={['black']}/>
      <ambientLight />
      <OrbitControls enableZoom={false} enablePan={false} enableRotate={false}/>
      <Suspense fallback={null}>
        <Rig>
          <Triangle color="#ff2060" scale={0.009} rotation={[0, 0, Math.PI / 3]} />
          <Triangle color="cyan" scale={0.009} position={[2, 0, -2]} rotation={[0, 0, Math.PI / 3]} />
          <Triangle color="orange" scale={0.009} position={[-2, 0, -2]} rotation={[0, 0, Math.PI / 3]} />
          <Triangle color="white" scale={0.009} position={[0, 2, -10]} rotation={[0, 0, Math.PI / 3]} />
          <Ground mirror={1} blur={[500, 100]} mixBlur={12} mixStrength={1.5} rotation={[-Math.PI / 2, 0, Math.PI / 2]} position-y={-0.8} />
        </Rig>
      </Suspense>
      <CameraShake yawFrequency={0.2} pitchFrequency={0.2} rollFrequency={0.2} />
    </Canvas>
  )

}

function Triangle({ color, ...props }) {
  const ref = useRef()
  useFrame((_) => (ref.current.position.y = -1.75 + Math.sin(_.clock.elapsedTime) / 10))
  const { paths: [path] } = useLoader(SVGLoader, '/triangle.svg')
  const geom = useMemo(() => SVGLoader.pointsToStroke(path.subPaths[0].getPoints(), path.userData.style), [])
  return (
    <group ref={ref} >
      <mesh geometry={geom} {...props}>
        <meshBasicMaterial toneMapped={false} color={color}/>
      </mesh>
    </group>
  )
}

function Rig({children}) {
  const ref = useRef()
  const { camera, mouse } = useThree()
  const vec = new THREE.Vector3()
  useFrame(() => {
    camera.position.lerp(vec.set(mouse.x * 2, 0, 3.5), 0.05)
    ref.current.position.lerp(vec.set(mouse.x, mouse.y*0.1, 0), 0.1)
    ref.current.rotation.y = THREE.MathUtils.lerp(ref.current.rotation.y, (-mouse.x * Math.PI) / 20, 0.1)
  })
  return <group ref={ref}>{children}</group>
}

function Ground(props) {
  const [floor, normal] = useTexture(['/SurfaceImperfections003_1K_var1.jpg', '/SurfaceImperfections003_1K_Normal.jpg'])
  return (
    <Reflector resolution={1024} args={[8, 8]} {...props}>
      {(Material, props) => <Material color="#f0f0f0" metalness={0} roughnessMap={floor} normalMap={normal} normalScale={[2, 2]} {...props} />}
    </Reflector>
  )
}
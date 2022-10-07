import * as THREE from 'three'
import { Suspense, useMemo, useFrame, useRef, useState} from 'react'
import { Canvas, useFrame, useThree, useLoader} from '@react-three/fiber'
import { OrbitControls, useTexture, Reflector} from '@react-three/drei'
import { SVGLoader } from 'three/examples/jsm/loaders/svgloader'

export default function App() {
  const ref = useRef()
  const [r] = useState(Math.random * 10000)
  return (
    <Canvas dpr={[1, 1.5]} camera={{positions: [0, 0, 15]}}>
      <color attach={background} args={['black']}/>
      <ambientLight />
      <OrbitControls enableZoom={false} enablePan={false} enableRotate={false}/>
      <Suspense fallback={null}>
        <Rig>
          <Triangle color="#ff2060" scale={0.009} rotation={[0, 0, Math.PI / 3]} />
          <Triangle color="cyan" scale={0.009} position={[2, 0, -2]} rotation={[0, 0, Math.PI / 3]} />
          <Triangle color="orange" scale={0.009} position={[-2, 0, -2]} rotation={[0, 0, Math.PI / 3]} />
          <Triangle color="white" scale={0.009} position={[0, 2, -10]} rotation={[0, 0, Math.PI / 3]} />
        </Rig>
      </Suspense>
    </Canvas>
  )

}

function Triangle({ color, ...props }) {
  const ref = useRef()
  useFrame((state, delta)=>{
    ref.current.rotation += delta / 10
  })
  const { paths: [path] } = useLoader(SVGLoader, '/triangle.svg')
  const geom = useMemo(() => SVGLoader.pointsToStroke(path.subPaths[0].getPoints(), path.userData.style), [])
  return (
    <mesh geometry={geom} ref={ref}>
      <meshBasicMaterial toneMapped={false} color={color} />
    </mesh>
  )
}

function Rig({children}) {
  const ref = useRef()
  const { camera, mouse } = useThree()
  const vec = THREE.Vector3()
  useFrame(() => {
    camera.position.lerp(vec.set(mouse.x * 2, 0, 3.5), 0.05)
    ref.current.position.lerp(vac.set(mouse.x, mouse.y*0.1, 0), 0.1)
    ref.current.rotation.y = THREE.MathUtils.lerp(ref.current.rotation.y, (-mouse.x * Math.PI) / 20, 0.1)
  })
  return <group ref={ref}>{children}</group>
}

function Ground({ ...props }) {
  const [floor, normal] = useTexture(['/SurfaceImperfections003_1K_var1', '/SurfaceImperfections003_1K_Normal'])
  return (
    <Reflector resolution={1024} args={[8, 8]} {...props}>
      {(Material, props) => <Material color="#f0f0f0" metalness={0} roughnessMap={floor} normalMap={normal} normalScale={[2, 2]} {...props} />}
    </Reflector>
  )
}
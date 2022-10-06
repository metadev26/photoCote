import { useState, useRef } from "react";
import { useFrame, Canvas } from "@react-three/fiber";

export default function App () {

  return(
    <Canvas camera={{position: [0, 0, 5]}}>
      <ambientLight intensity={5} />
      <spotLight position={[0, 0, 5]} />
      <group>
        <Partmesh position={[-1.2, 0, 0]} />
        <Partmesh position={[1.2, 0, 0]} />
      </group>
    </Canvas>
  )
}
function Partmesh(props){
  const refer = useRef()
  const [hovered, hover] = useState(false)
  const [clicked, click] = useState(false)
  useFrame((state , delta)=>{refer.current.rotation.x += delta})
  return(
    <mesh  
      ref={refer}
      {...props} 
      scale={(clicked)? 1 : 1.5}
      onPointerOver = {(e)=>hover(true)}
      onPointerOut = {(e)=>hover(false)}
      onClick = {(e)=>click(!clicked)}>
        <boxGeometry args={[1, 1, 1]}/>
        <meshStandardMaterial 
        color={ (hovered)? 'white' : 'orange'} />
    </mesh>
  )
}
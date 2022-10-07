import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import Glbloader from "./glbloader";
import { TransformControls } from "@react-three/drei";

export default function Glbgroup() {
  return(
    <Canvas camera={{position: [0, 0, 20]}}>
      <color attach="background" args={['#ffffdd']}/>
      <ambientLight />
      <Suspense fallback={<span>loding ...</span>}>
        <group>
          <Glbloader path="/Small Oak Tree.glb" scale={0.1} position={[2, -4, -10]}/>
          <Glbloader path="/Bee.glb" scale={0.5}/>
          <Glbloader path="/Brown Fall Leaves.glb" scale={200} position={[3, 3,3]}/>
          <Glbloader path="/Small Oak Tree.glb" scale={0.1} position={[2, -4, -5]}/>
          <Glbloader path="/Flower crown.glb" scale={50}/>
        </ group>
      </Suspense>
      <OrbitControls/>
    </Canvas>
  )
}
import { useGLTF } from "@react-three/drei";
import { useState } from "react";

export default function Glbloader({ path, ...props }){
  const { scene } = useGLTF(path)
  const [hovered, hover] = useState(false)

  return (
    <primitive object={scene} {...props}/>
  )
}
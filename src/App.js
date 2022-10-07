import Svgreflector from "./svgLoader Reflector"
import Snapshot from "./Usesnapshot"
import Glbgroup from "./glbgroup"
import Test from "./test"
import Viewer from "./robot"
import Cannon from "./simple physics demo with debug bounds"
import Shadermaterial from "./Shadermaterials"
import Watershader from "./Watershader"
import Edgegeometry from "./Edgegeometry"
import Wave from "./Wave"


export default function App() {
  return (
    <>
      <Shadermaterial />
      <Watershader />
      <Edgegeometry />
      <Wave />
    </>
  )
}
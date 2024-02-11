import { OrbitControls } from "@react-three/drei";
import Lights from "./Lights.jsx";
import Level, { BlockLimbo, BlockSpinner, BlockTrap } from "./Level.jsx";
import { Physics } from "@react-three/rapier";
import Player from "./Player.jsx";
import useGame from "./stores/useGame.js";

export default function Experience() {
  const blocksCount = useGame((state) => state.blocksCount);
  const blocksSeed = useGame((state) => state.blocksSeed);

  return (
    <>
      <color args={["#bdedfc"]} attach="background" />
      <Physics>
        <Lights />

        <Level
          count={blocksCount}
          types={[BlockLimbo, BlockSpinner, BlockTrap]}
          seed={blocksSeed}
        />
        <Player />
      </Physics>
    </>
  );
}

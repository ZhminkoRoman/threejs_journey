import { useMemo, useRef, useEffect } from "react";
import { DoubleSide } from "three";

export default function CustomGeometry() {
  const geometryRef = useRef(null);

  const verticesCount = 10 * 3;

  useEffect(() => {
    if (geometryRef.current) {
      geometryRef.current.computeVertexNormals();
    }
  }, [geometryRef]);

  const positions = useMemo(() => {
    const memoPositions = new Float32Array(verticesCount * 3);

    for (let i = 0; i < verticesCount * 3; i++) {
      memoPositions[i] = (Math.random() - 0.5) * 3;
    }

    return memoPositions;
  }, []);

  return (
    <mesh>
      <bufferGeometry ref={geometryRef}>
        <bufferAttribute
          attach="attributes-position"
          count={verticesCount}
          itemSize={3}
          array={positions}
        />
      </bufferGeometry>
      <meshStandardMaterial color="red" side={DoubleSide} />
    </mesh>
  );
}

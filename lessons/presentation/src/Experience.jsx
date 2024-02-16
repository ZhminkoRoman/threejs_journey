import React, {
  useCallback,
  useRef,
  useState,
  useMemo,
  useEffect,
} from "react";
import {
  PresentationControls,
  useGLTF,
  Environment,
  Float,
  Html,
} from "@react-three/drei";
import { RigidBody, Physics, InstancedRigidBodies } from "@react-three/rapier";
import { motion } from "framer-motion-3d";
import { Perf } from "r3f-perf";

export default function Experience() {
  const [slideNumber, setSlideNumber] = useState(1);
  const [slidesPosition, setSlidesPosition] = useState({
    1: {
      x: -1.5,
      y: -1,
      z: 0,
    },
    2: {
      x: -12.5,
      y: -1,
      z: 1,
    },
    3: {
      x: -24.5,
      y: -1,
      z: 1,
    },
    4: {
      x: -36.5,
      y: -2,
      z: 1,
    },
  });

  return (
    <>
      <Environment preset="city" />
      <color args={["#1267D3"]} attach="background" />

      <Perf position="top-left" className="perf" />
      <rectAreaLight
        width={2.5}
        height={1.65}
        intensity={65}
        color={"#ff6900"}
        rotation={[0.1, Math.PI, 0]}
        position={[0, 0.55, -3.15]}
      />
      <SlideOne
        position={[
          slidesPosition[1].x,
          slidesPosition[1].y,
          slidesPosition[1].z,
        ]}
        slideNumber={slideNumber}
        setSlideNumber={setSlideNumber}
        setSlidesPosition={setSlidesPosition}
      />
      <SlideTwo
        position={[
          slidesPosition[2].x,
          slidesPosition[2].y,
          slidesPosition[2].z,
        ]}
        slideNumber={slideNumber}
        setSlideNumber={setSlideNumber}
        setSlidesPosition={setSlidesPosition}
      />
      <SlideThree
        position={[
          slidesPosition[3].x,
          slidesPosition[3].y,
          slidesPosition[3].z,
        ]}
        slideNumber={slideNumber}
        setSlideNumber={setSlideNumber}
        setSlidesPosition={setSlidesPosition}
      />
      <SlideFour
        position={[
          slidesPosition[4].x,
          slidesPosition[4].y,
          slidesPosition[4].z,
        ]}
        slideNumber={slideNumber}
        setSlideNumber={setSlideNumber}
        setSlidesPosition={setSlidesPosition}
      />
    </>
  );
}

const SlideThree = (props) => {
  const model = useGLTF("./model/trailer.glb");

  const handleClickPrevSlide = useCallback(() => {
    props.setSlideNumber(2);
    props.setSlidesPosition((prev) => {
      return {
        ...prev,
        1: {
          ...prev[1],
          x: prev[1].x - 9,
        },
        2: {
          ...prev[2],
          x: prev[2].x - 12.5,
        },
        3: {
          ...prev[3],
          x: prev[3].x - 11.5,
        },
        4: {
          ...prev[4],
          x: prev[4].x - 11.5,
        },
      };
    });
  }, [props]);

  const handleClickNextSlide = useCallback(() => {
    props.setSlideNumber(4);
    props.setSlidesPosition((prev) => {
      return {
        ...prev,
        1: {
          ...prev[1],
          x: prev[1].x + 9,
        },
        2: {
          ...prev[2],
          x: prev[2].x + 12.5,
        },
        3: {
          ...prev[3],
          x: prev[3].x + 11.5,
        },
        4: {
          ...prev[4],
          x: prev[4].x + 11.5,
        },
      };
    });
  }, [props]);

  return (
    <PresentationControls
      global
      rotation={[0.13, 0.1, 0]}
      polar={[-0.4, 0.2]}
      azimuth={[-1, 0.75]}
      config={{ mass: 2, tension: 400 }}
      snap={{ mass: 4, tension: 400 }}
    >
      <motion.group
        animate={props.slideNumber === 3 ? "slideLeft" : "slideRight"}
        variants={{
          slideLeft: { x: props.position[0] },
          slideRight: { x: props.position[0] },
        }}
        transition={{ ease: "easeOut", duration: 1.5 }}
        initial={"slideRight"}
        position={props.position}
      >
        <motion.primitive
          object={model.scene}
          scale={0.8}
          rotation={[0, 1, 0]}
        />
        <Html
          transform
          distanceFactor={2.15}
          rotation={[1.3, 3, -0.5]}
          position={[2, 0.5, -1.5]}
        >
          <button onClick={handleClickPrevSlide} className="nextSlide">
            Предыдущий слайд (жмякни, ты же хочешь)
          </button>
        </Html>
        <Html
          transform
          distanceFactor={2.15}
          rotation={[1.3, 3, -0.5]}
          position={[0, 0.75, -3]}
        >
          <button onClick={handleClickNextSlide} className="nextSlide">
            Следующий слайд (жмяк)
          </button>
        </Html>
        <Html
          transform
          wrapperClass="htmlScreen"
          distanceFactor={1.15}
          rotation={[0, -Math.PI, 0]}
          position={[1, 1.5, 3]}
        >
          <p className="description-slide-2">
            Three.js и react-three/fiber прекрасно поддерживают и отрисовывают
            не только кубы
          </p>
          <p className="description-slide-1">Модели</p>
        </Html>
      </motion.group>
    </PresentationControls>
  );
};

const SlideFour = (props) => {
  const handleClickPrevSlide = useCallback(() => {
    props.setSlideNumber(3);
    props.setSlidesPosition((prev) => {
      return {
        ...prev,
        1: {
          ...prev[1],
          x: prev[1].x - 9,
        },
        2: {
          ...prev[2],
          x: prev[2].x - 12.5,
        },
        3: {
          ...prev[3],
          x: prev[3].x - 11.5,
        },
        4: {
          ...prev[4],
          x: prev[4].x - 11.5,
        },
      };
    });
  }, [props]);

  return (
    <PresentationControls
      global
      rotation={[0.13, 0.1, 0]}
      polar={[-0.4, 0.2]}
      azimuth={[-1, 0.75]}
      config={{ mass: 2, tension: 400 }}
      snap={{ mass: 4, tension: 400 }}
    >
      <motion.group
        animate={props.slideNumber === 3 ? "slideLeft" : "slideRight"}
        variants={{
          slideLeft: { x: props.position[0] },
          slideRight: { x: props.position[0] },
        }}
        transition={{ ease: "easeOut", duration: 1.5 }}
        initial={"slideRight"}
        position={props.position}
      >
        <Html
          transform
          distanceFactor={2.15}
          rotation={[1.3, 3, -0.5]}
          position={[2, 0.5, -1.5]}
        >
          <button onClick={handleClickPrevSlide} className="nextSlide">
            Назад
          </button>
        </Html>
        <Html
          transform
          wrapperClass="htmlScreen"
          distanceFactor={1.15}
          rotation={[0.3, Math.PI - 1, -0.3]}
          position={[-1.5, 1.5, -0.5]}
          occlude
        >
          <img src="./img/certificate.png" />
        </Html>
      </motion.group>
    </PresentationControls>
  );
};

const SlideOne = (props) => {
  const model = useGLTF("./model/finalLaptop.glb");

  const screenRef = useRef(null);
  const mainRef = useRef(null);
  const keyboardRef = useRef({});

  const [isScreenOpened, setIsScreenOpened] = useState(true);

  const mainFrame = useMemo(() => model.nodes.mainFrame, [model]);
  const screenFrame = useMemo(() => model.nodes.screenFrame, [model]);
  const keyboardMeshGroup = useMemo(() => {
    return Object.entries(model.nodes).filter(([key, value]) => {
      return (
        !key.includes("screenFrame") &&
        !key.includes("mainFrame") &&
        !key.includes("Cube") &&
        !key.includes("Cube") &&
        !key.includes("Lines") &&
        !key.includes("Scene")
      );
    });
  }, [model]);

  useEffect(() => {
    const typingFunction = (event) => {
      event.preventDefault();
      event.stopPropagation();
      const keyCode = event.code;
      if (keyboardRef.current[keyCode]) {
        keyboardRef.current[keyCode].position.y = 0.11;
        setTimeout(() => {
          keyboardRef.current[keyCode].position.y =
            keyboardRef.current[keyCode].userData.originY;
        }, 85);
      }
    };
    window.addEventListener("keydown", typingFunction);

    return () => {
      window.removeEventListener("keydown", typingFunction);
    };
  }, [isScreenOpened]);

  const handleScreenClick = useCallback(
    (event) => {
      event.stopPropagation();
      setIsScreenOpened((prev) => !prev);
    },
    [isScreenOpened]
  );

  const handleNextSlide = useCallback(() => {
    props.setSlideNumber(2);
    props.setSlidesPosition((prev) => {
      return {
        ...prev,
        1: {
          ...prev[1],
          x: prev[1].x + 9,
        },
        2: {
          ...prev[2],
          x: prev[2].x + 12.5,
        },
        3: {
          ...prev[3],
          x: prev[3].x + 11.5,
        },
        4: {
          ...prev[4],
          x: prev[4].x + 11.5,
        },
      };
    });
  }, [props]);

  return (
    <PresentationControls
      global
      rotation={[0.13, 0.1, 0]}
      polar={[-0.4, 0.2]}
      azimuth={[-1, 0.75]}
      config={{ mass: 2, tension: 400 }}
      snap={{ mass: 4, tension: 400 }}
    >
      <Float rotationIntensity={0.4}>
        <motion.group
          scale={0.5}
          position-y={props.position[1]}
          position-x={props.position[0]}
          initial={"slideRight"}
          animate={props.slideNumber === 1 ? "slideLeft" : "slideRight"}
          variants={{
            slideLeft: { x: props.position[0] },
            slideRight: { x: props.position[0] },
          }}
          transition={{ ease: "easeOut", duration: 1.5 }}
        >
          <motion.primitive
            ref={screenRef}
            object={screenFrame}
            onClick={handleScreenClick}
            initial={"open"}
            animate={isScreenOpened ? "open" : "close"}
            variants={{
              close: { rotateZ: -Math.PI / 1.715 },
              open: { rotateZ: 0 },
            }}
            transition={{ ease: "easeOut", duration: 1 }}
          />
          <primitive object={mainFrame} ref={mainRef} />
          {keyboardMeshGroup.map((child, index) => {
            return (
              <group
                position={child[1].position}
                rotation={child[1].rotation}
                ref={(key) => (keyboardRef.current[child[0]] = key)}
                key={child[0]}
                name={child[0]}
                userData={{
                  originY: child[1].position.y,
                }}
              >
                <mesh
                  geometry={child[1].children[0].geometry}
                  material={child[1].children[0].material}
                />
                <mesh
                  geometry={child[1].children[1].geometry}
                  material={child[1].children[1].material}
                />
              </group>
            );
          })}
          <Html
            transform
            wrapperClass="htmlScreen"
            distanceFactor={1.15}
            rotation={[0, -Math.PI, 0]}
            position={[3, 2, 5]}
          >
            <p className="description-slide-1">Three.js</p>
            <p className="description-slide-2">
              - это JavaScript библиотека для отображения интерактивной 3D
              графики в WebGl. А если в кратце - мы можем делать супер
              интерактивные сайты с использованием 3D (этот сайт плохой пример,
              но я работаю над этим)
            </p>
          </Html>
          <Html
            transform
            distanceFactor={4.15}
            rotation={[0.1, 1.2, 0]}
            position={[-2, 2, -4.5]}
          >
            <button className="nextSlide" onClick={handleNextSlide}>
              Там дальше интересно
            </button>
          </Html>
        </motion.group>
      </Float>
    </PresentationControls>
  );
};

const SlideTwo = (props) => {
  const gModel = useGLTF("./model/gDetailBlue.glb");
  const tModel = useGLTF("./model/tDetailBlue.glb");
  const hq = useGLTF("./model/hq.glb");

  const [paused, setPaused] = useState(true);
  const [isRenderEnded, setIsRenderEnded] = useState(true);

  const cubeRef = useRef();
  const hqRef = useRef();
  const tRef = useRef();

  const cubeJump = useCallback(() => {
    if (cubeRef.current) {
      cubeRef.current.applyImpulse({ x: 0, y: 0.002, z: 0 });
      cubeRef.current.applyTorqueImpulse({
        x: Math.random() * 0.05,
        y: Math.random() * 0.005,
        z: Math.random() * 0.05,
      });
    }
  }, [cubeRef]);

  const hqJump = useCallback(() => {
    if (hqRef.current) {
      hqRef.current.applyImpulse({ x: 0, y: 0.001, z: 0 });
      hqRef.current.applyTorqueImpulse({
        x: Math.random() * 0.05,
        y: Math.random() * 0.003,
        z: Math.random() * 0.05,
      });
    }
  }, [hqRef]);

  const tJump = useCallback(() => {
    if (tRef.current) {
      tRef.current.applyImpulse({ x: 0, y: 0.2, z: 0 });
      tRef.current.applyTorqueImpulse({
        x: Math.random() * 0.05,
        y: Math.random() * 0.5,
        z: Math.random() * 0.05,
      });
    }
  }, [tRef]);

  const figuresCount = 150;

  const figures = useMemo(() => {
    const instances = [];

    for (let i = 0; i < figuresCount; i++) {
      instances.push({
        key: "instance_" + i,
        position: [
          (Math.random() - 0.5) * 3,
          Math.random() * 8,
          (Math.random() - 0.5) * 3,
        ],
        rotation: [Math.random(), Math.random(), Math.random()],
      });
    }
    return instances;
  }, [isRenderEnded]);

  const onClick = () => {
    setPaused(false);
    setIsRenderEnded((prev) => !prev);
  };

  const handleNextSlide = useCallback(() => {
    props.setSlideNumber(3);
    props.setSlidesPosition((prev) => {
      return {
        ...prev,
        1: {
          ...prev[1],
          x: prev[1].x + 9,
        },
        2: {
          ...prev[2],
          x: prev[2].x + 12.5,
        },
        3: {
          ...prev[3],
          x: prev[3].x + 11.5,
        },
        4: {
          ...prev[4],
          x: prev[4].x + 11.5,
        },
      };
    });
  }, [props]);

  const handleClickPrevSlide = useCallback(() => {
    props.setSlideNumber(1);
    props.setSlidesPosition((prev) => {
      return {
        ...prev,
        1: {
          ...prev[1],
          x: prev[1].x - 9,
        },
        2: {
          ...prev[2],
          x: prev[2].x - 12.5,
        },
        3: {
          ...prev[3],
          x: prev[3].x - 11.5,
        },
        4: {
          ...prev[4],
          x: prev[4].x - 11.5,
        },
      };
    });
  }, [props]);

  return (
    <motion.group
      animate={props.slideNumber === 2 ? "slideLeft" : "slideRight"}
      variants={{
        slideLeft: { x: props.position[0] },
        slideRight: { x: props.position[0] },
      }}
      transition={{ ease: "easeOut", duration: 1.5 }}
      initial={"slideRight"}
      position={props.position}
    >
      <Physics gravity={[0, -2, 0]} paused={paused}>
        <RigidBody ref={cubeRef}>
          <primitive object={gModel.scene} scale={0.16} onClick={cubeJump} />
        </RigidBody>
        <RigidBody ref={tRef}>
          <primitive
            object={tModel.scene}
            scale={0.16}
            position={[0.75, 0, 0.75]}
            rotation={[0, 0.4, 0]}
            onClick={tJump}
          />
        </RigidBody>
        <RigidBody ref={hqRef}>
          <primitive
            object={hq.scene}
            scale={1}
            position={[-0.7, 0.083, -1.35]}
            rotation={[0, 1.3, 0]}
            onClick={hqJump}
          />
        </RigidBody>
        <RigidBody type="fixed">
          <motion.mesh rotation={[4.7, 0, 0]} receiveShadow scale={[3, 3, 3]}>
            <planeGeometry />
            <meshStandardMaterial color={"white"} />
          </motion.mesh>
        </RigidBody>
        <InstancedRigidBodies instances={figures} position={[-12.5, 0.1, 1]}>
          <instancedMesh
            castShadow
            receiveShadow
            args={[null, null, figuresCount]}
          >
            <boxGeometry args={[0.3, 0.3, 0.3]} />
            <meshStandardMaterial color="orange" />
          </instancedMesh>
        </InstancedRigidBodies>

        <Html position={[-3, 0, 0]}>
          <button onClick={onClick} className="startPhysics">
            Кубы
          </button>
        </Html>
        <Html
          transform
          wrapperClass="htmlScreen"
          distanceFactor={1.15}
          rotation={[0, Math.PI * 0.5, 0]}
          position={[-6, 1, -0.5]}
        >
          <p className="description-slide-1">Физика</p>
          <p className="description-slide-2">
            Мы можем генерировать объекты с физическими свойствами, а так же
            клацать на них чтобы делать штуки (немножко забаговано)
          </p>
        </Html>
        <Html
          transform
          distanceFactor={2.15}
          rotation={[0, 3.3, 0]}
          position={[0, 2.05, -1]}
        >
          <button onClick={handleNextSlide} className="nextSlide">
            К модельке
          </button>
        </Html>
        <Html
          transform
          distanceFactor={2.15}
          rotation={[0, 3.3, 0]}
          position={[2, 2, -1]}
        >
          <button onClick={handleClickPrevSlide} className="nextSlide">
            К началу
          </button>
        </Html>
      </Physics>
    </motion.group>
  );
};

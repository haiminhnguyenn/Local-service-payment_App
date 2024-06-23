import Particles from "react-particles";
import { loadFull } from "tsparticles";
import { useCallback } from "react";

const ParticleBackground = () => {
  const options = {
    particles: {
      number: {
        value: 50,
        density: {
          enable: true,
          area: 800
        }
      },
      color: {
        value: ["#2EB67D", "#ECB22E", "#E01E5B", "#36C5F0"]
      },
      shape: {
        type: "triangle"
      },
      opacity: {
        value: 0.3
      },
      size: {
        value: { min: 2, max: 4 }
      },
      links: {
        enable: true,
        distance: 150,
        color: "#808080",
        opacity: 0.2,
        width: 1
      },
      move: {
        enable: true,
        speed: 4,
        direction: "random",
        random: true,
        straight: false,
        outModes: "out"
      }
    },
    interactivity: {
      events: {
        onHover: {
          enable: true,
          mode: "attract"
        }
      },
      modes: {
        atrract: {
          distance: 150,
          links: {
            opacity: 1
          }
        }
      }
    }
  };

  const particlesInit = useCallback(async (engine) => {
    await loadFull(engine);
  }, []);

  return (
    <div className="App">
      <Particles options={options} init={particlesInit} />
    </div>
  );
};

export default ParticleBackground;
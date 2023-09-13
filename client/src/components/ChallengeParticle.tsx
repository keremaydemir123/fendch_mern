import { useCallback } from 'react';
import Particles from 'react-tsparticles';
import type { Container, Engine } from 'tsparticles-engine';
import { loadFull } from 'tsparticles';
import { v4 as uuidv4 } from 'uuid';

function ChallengeParticle() {
  const particlesInit = useCallback(async (engine: Engine) => {
    // you can initialize the tsParticles instance (engine) here, adding custom shapes or presets
    // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
    // starting from v2 you can add only the features you need reducing the bundle size
    await loadFull(engine);
  }, []);

  const particlesLoaded = useCallback(
    async (container: Container | undefined) => {},
    []
  );

  return (
    <Particles
      init={particlesInit}
      loaded={particlesLoaded}
      className="tsparticles"
      id={uuidv4()}
      options={{
        fullScreen: {
          enable: false,
        },
        particles: {
          number: {
            value: 10,
          },
          line_linked: {
            enable: false,
          },
          move: {
            enable: true,
            speed: 1,
            out_mode: 'bounce',
          },
          shape: {
            type: ['image'],
            image: [
              {
                src: '../../assets/logos/html.svg',
                height: 20,
                width: 20,
              },
              {
                src: '../../assets/logos/js.png',
                height: 20,
                width: 20,
              },
              {
                src: '../../assets/logos/react.svg',
                height: 20,
                width: 20,
              },
              {
                src: '../../assets/logos/css.svg',
                height: 20,
                width: 20,
              },
            ],
          },
          color: {
            value: '#CCC',
          },
          size: {
            value: 30,
            random: false,
            anim: {
              enable: true,
              speed: 7,
              size_min: 10,
              sync: false,
            },
          },
        },
        retina_detect: false,
      }}
    />
  );
}

export default ChallengeParticle;

// PACKAGES
import React, { useEffect, useRef, useState } from "react";
import Particles from "react-particles-js";
import PropTypes from "prop-types";

const StarMagic = ({ stars }) => {
  const [size, setSize] = useState({ h: 1000, w: 1000 });
  const wrapper = useRef();

  useEffect(() => {
    const sizeData = wrapper?.current.getBoundingClientRect();
    // set canvas to size of screen
    setSize({ h: sizeData.height, w: sizeData.width });
    setTimeout(() => {
      // remove inline styles added by library after canvas inited
      wrapper.current.children[0].children[0].style.pointerEvents = "none";
    }, 50);
  }, [wrapper.current]);

  console.log(stars);

  return (
    <div className="particles-wrapper" ref={wrapper}>
      <Particles
        height={size.h}
        params={{
          particles: {
            color: "#FFFF00",
            line_linked: {
              enable: false,
            },
            move: {
              direction: "top",
              random: true,
              speed: 1,
            },
            number: {
              density: {
                enable: false,
                value_area: 1500,
              },
              value: stars,
            },
            opacity: {
              anim: {
                enable: true,
                opacity_min: 0.99,
                speed: 1,
              },
            },
            shape: {
              image: [
                {
                  height: 10,
                  src: "/star.svg",
                  width: 10,
                },
              ],
              type: ["star"],
            },
            size: {
              value: 20,
            },
          },
          retina_detect: true,
        }}
        width={size.w}
      />
      <style jsx>
        {`
          .particles-wrapper {
            width: 100vw;
            height: 100vh;
            position: fixed;
            top: 0;
            left: 0;
            pointer-events: none !important;
            z-index: 1000;
          }
          .particles-wrapper * {
            pointer-events: none !important;
          }
        `}
      </style>
    </div>
  );
};

StarMagic.propTypes = {
  stars: PropTypes.number,
};

export default StarMagic;

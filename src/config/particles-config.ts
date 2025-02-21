export const particlesConfig = {
  "autoPlay": true,
  "background": {
    "color": {
      "value": "transparent"
    },
    "position": "50% 50%",
    "repeat": "no-repeat",
    "size": "cover",
    "opacity": 1
  },
  "fullScreen": {
    "enable": false,
    "zIndex": -1
  },
  "style": {
    "position": "absolute"
  },
  "detectRetina": true,
  "fpsLimit": 120,
  "interactivity": {
    "events": {
      "onClick": {
        "enable": true,
        "mode": "push"
      },
      "onHover": {
        "enable": true,
        "mode": "grab"
      },
      "resize": true
    },
    "modes": {
      "grab": {
        "distance": 140,
        "links": {
          "opacity": 1
        }
      },
      "push": {
        "quantity": 4
      }
    }
  },
  "particles": {
    "color": {
      "value": "#ffffff"
    },
    "links": {
      "color": "#ffffff",
      "distance": 150,
      "enable": true,
      "opacity": 0.4,
      "width": 1
    },
    "move": {
      "direction": "none",
      "enable": true,
      "outModes": {
        "default": "out"
      },
      "random": false,
      "speed": 2,
      "straight": false
    },
    "number": {
      "density": {
        "enable": true,
        "area": 800
      },
      "value": 80
    },
    "opacity": {
      "value": 0.8
    },
    "shape": {
      "type": "circle"
    },
    "size": {
      "value": {
        "min": 1,
        "max": 5
      }
    }
  }
};

export default particlesConfig;

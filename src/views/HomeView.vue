<script setup lang="ts">
// 添加渐变动画效果
import { onMounted,ref } from "vue";
import bg from "@/assets/images/bg.jpg";
onMounted(() => {
  document.querySelector(".welcome-content")?.classList.add("show");
});

const loading = ref(true);
const particlesLoaded = async (container: any) => {
  console.log("Particles container loaded", container);
  loading.value = false;
};

const options = {
  autoPlay: true,
  background: {
    color: {
      value: "#ffffff",
    },
    image: `url(${bg} )`,
    position: "50% 50%",
    repeat: "no-repeat",
    size: "cover",
    opacity: 1,
  },
  backgroundMask: {
    composite: "destination-out",
    cover: {
      opacity: 1,
      color: {
        value: {
          r: 255,
          g: 255,
          b: 255,
        },
      },
    },
    enable: true,
  },
  clear: true,
  defaultThemes: {},
  delay: 0,
  fullScreen: {
    enable: true,
    zIndex: 0,
  },
  detectRetina: true,
  duration: 0,
  fpsLimit: 120,
  interactivity: {
    detectsOn: "window",
    events: {
      onClick: {
        enable: true,
        mode: "push",
      },
      onDiv: {
        selectors: {},
        enable: false,
        mode: {},
        type: "circle",
      },
      onHover: {
        enable: true,
        mode: "bubble",
        parallax: {
          enable: false,
          force: 2,
          smooth: 10,
        },
      },
      resize: {
        delay: 0.5,
        enable: true,
      },
    },
    modes: {
      trail: {
        delay: 1,
        pauseOnStop: false,
        quantity: 1,
      },
      attract: {
        distance: 200,
        duration: 0.4,
        easing: "ease-out-quad",
        factor: 1,
        maxSpeed: 50,
        speed: 1,
      },
      bounce: {
        distance: 200,
      },
      bubble: {
        distance: 400,
        duration: 2,
        mix: false,
        opacity: 1,
        size: 100,
        divs: {
          distance: 200,
          duration: 0.4,
          mix: false,
          selectors: {},
        },
      },
      connect: {
        distance: 80,
        links: {
          opacity: 0.5,
        },
        radius: 60,
      },
      grab: {
        distance: 100,
        links: {
          blink: false,
          consent: false,
          opacity: 1,
        },
      },
      push: {
        default: true,
        groups: [],
        quantity: 4,
      },
      remove: {
        quantity: 2,
      },
      repulse: {
        distance: 200,
        duration: 0.4,
        factor: 100,
        speed: 1,
        maxSpeed: 50,
        easing: "ease-out-quad",
        divs: {
          distance: 200,
          duration: 0.4,
          factor: 100,
          speed: 1,
          maxSpeed: 50,
          easing: "ease-out-quad",
          selectors: {},
        },
      },
      slow: {
        factor: 3,
        radius: 200,
      },
      particle: {
        replaceCursor: false,
        pauseOnStop: false,
        stopDelay: 0,
      },
      light: {
        area: {
          gradient: {
            start: {
              value: "#ffffff",
            },
            stop: {
              value: "#000000",
            },
          },
          radius: 1000,
        },
        shadow: {
          color: {
            value: "#000000",
          },
          length: 2000,
        },
      },
    },
  },
  manualParticles: [],
  particles: {
    bounce: {
      horizontal: {
        value: 1,
      },
      vertical: {
        value: 1,
      },
    },
    collisions: {
      absorb: {
        speed: 2,
      },
      bounce: {
        horizontal: {
          value: 1,
        },
        vertical: {
          value: 1,
        },
      },
      enable: false,
      maxSpeed: 50,
      mode: "bounce",
      overlap: {
        enable: true,
        retries: 0,
      },
    },
    color: {
      value: "#ffffff",
      animation: {
        h: {
          count: 0,
          enable: false,
          speed: 1,
          decay: 0,
          delay: 0,
          sync: true,
          offset: 0,
        },
        s: {
          count: 0,
          enable: false,
          speed: 1,
          decay: 0,
          delay: 0,
          sync: true,
          offset: 0,
        },
        l: {
          count: 0,
          enable: false,
          speed: 1,
          decay: 0,
          delay: 0,
          sync: true,
          offset: 0,
        },
      },
    },
    effect: {
      close: true,
      fill: true,
      options: {},
      type: {},
    },
    groups: [],
    move: {
      angle: {
        offset: 0,
        value: 90,
      },
      attract: {
        distance: 200,
        enable: false,
        rotate: {
          x: 3000,
          y: 3000,
        },
      },
      center: {
        x: 50,
        y: 50,
        mode: "percent",
        radius: 0,
      },
      decay: 0,
      distance: {},
      direction: "none",
      drift: 0,
      enable: true,
      gravity: {
        acceleration: 9.81,
        enable: false,
        inverse: false,
        maxSpeed: 50,
      },
      path: {
        clamp: true,
        delay: {
          value: 0,
        },
        enable: false,
        options: {},
      },
      outModes: {
        default: "out",
        bottom: "out",
        left: "out",
        right: "out",
        top: "out",
      },
      random: false,
      size: false,
      speed: 2,
      spin: {
        acceleration: 0,
        enable: false,
      },
      straight: false,
      trail: {
        enable: false,
        length: 10,
        fill: {},
      },
      vibrate: false,
      warp: false,
    },
    number: {
      density: {
        enable: true,
        width: 1920,
        height: 1080,
      },
      limit: {
        mode: "delete",
        value: 0,
      },
      value: 80,
    },
    opacity: {
      value: 1,
      animation: {
        count: 0,
        enable: false,
        speed: 2,
        decay: 0,
        delay: 0,
        sync: false,
        mode: "auto",
        startValue: "random",
        destroy: "none",
      },
    },
    reduceDuplicates: false,
    shadow: {
      blur: 0,
      color: {
        value: "#000",
      },
      enable: false,
      offset: {
        x: 0,
        y: 0,
      },
    },
    shape: {
      close: true,
      fill: true,
      options: {},
      type: "circle",
    },
    size: {
      value: {
        min: 1,
        max: 30,
      },
      animation: {
        count: 0,
        enable: false,
        speed: 5,
        decay: 0,
        delay: 0,
        sync: false,
        mode: "auto",
        startValue: "random",
        destroy: "none",
      },
    },
    stroke: {
      width: 0,
    },
    zIndex: {
      value: 0,
      opacityRate: 1,
      sizeRate: 1,
      velocityRate: 1,
    },
    destroy: {
      bounds: {},
      mode: "none",
      split: {
        count: 1,
        factor: {
          value: 3,
        },
        rate: {
          value: {
            min: 4,
            max: 9,
          },
        },
        sizeOffset: true,
        particles: {},
      },
    },
    roll: {
      darken: {
        enable: false,
        value: 0,
      },
      enable: false,
      enlighten: {
        enable: false,
        value: 0,
      },
      mode: "vertical",
      speed: 25,
    },
    tilt: {
      value: 0,
      animation: {
        enable: false,
        speed: 0,
        decay: 0,
        sync: false,
      },
      direction: "clockwise",
      enable: false,
    },
    twinkle: {
      lines: {
        enable: false,
        frequency: 0.05,
        opacity: 1,
      },
      particles: {
        enable: false,
        frequency: 0.05,
        opacity: 1,
      },
    },
    wobble: {
      distance: 5,
      enable: false,
      speed: {
        angle: 50,
        move: 10,
      },
    },
    life: {
      count: 0,
      delay: {
        value: 0,
        sync: false,
      },
      duration: {
        value: 0,
        sync: false,
      },
    },
    rotate: {
      value: 0,
      animation: {
        enable: false,
        speed: 0,
        decay: 0,
        sync: false,
      },
      direction: "clockwise",
      path: false,
    },
    orbit: {
      animation: {
        count: 0,
        enable: false,
        speed: 1,
        decay: 0,
        delay: 0,
        sync: false,
      },
      enable: false,
      opacity: 1,
      rotation: {
        value: 45,
      },
      width: 1,
    },
    links: {
      blink: false,
      color: {
        value: "#ffffff",
      },
      consent: false,
      distance: 150,
      enable: true,
      frequency: 1,
      opacity: 1,
      shadow: {
        blur: 5,
        color: {
          value: "#000",
        },
        enable: false,
      },
      triangles: {
        enable: false,
        frequency: 1,
      },
      width: 1,
      warp: false,
    },
    repulse: {
      value: 0,
      enabled: false,
      distance: 1,
      duration: 1,
      factor: 1,
      speed: 1,
    },
  },
  pauseOnBlur: true,
  pauseOnOutsideViewport: true,
  responsive: [],
  smooth: false,
  style: {},
  themes: [],
  zLayers: 100,
  key: "backgroundMask",
  name: "Background Mask",
  motion: {
    disable: false,
    reduce: {
      factor: 4,
      value: true,
    },
  },
};
</script>

<template>
  <div class="particles-container"  v-loading="loading"  element-loading-text="初始化中..."
  element-loading-background="rgba(255, 255, 255, 0.7)">

    <vue-particles id="tsparticles"  @particles-loaded="particlesLoaded" :options="options" class="particles">

    </vue-particles>
    <div class="home">
        <div class="background-gradient"></div>
        <el-row justify="center" align="middle" class="welcome-section">
          <el-col :xs="22" :sm="20" :md="16" :lg="14" :xl="12">
            <div class="welcome-content">
              <h1 class="title">欢迎使用 Deepseek AI模型</h1>
              <p class="subtitle">探索 AI 对话的无限可能</p>
              <div class="features">
                <div class="feature-item">
                  <el-icon>
                    <ChatLineRound />
                  </el-icon>
                  <span>智能对话</span>
                </div>
                <div class="feature-item">
                  <el-icon>
                    <Lightning />
                  </el-icon>
                  <span>快速响应</span>
                </div>
                <div class="feature-item">
                  <el-icon>
                    <Connection />
                  </el-icon>
                  <span>深度理解</span>
                </div>
              </div>
              <el-button type="primary" size="large" class="start-button" @click="$router.push('/chat')">
                开始对话
                <el-icon class="el-icon--right">
                  <ArrowRight />
                </el-icon>
              </el-button>
            </div>
          </el-col>
        </el-row>
      </div>
  </div>
</template>

<style scoped>
.particles-container {
  position: relative;
  width: 100%;
  min-height: calc(100vh - 60px);
}

.particles {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 1;
}

.home {
  position: relative;
  min-height: calc(100vh - 60px);
  z-index: 10;
}

.background-gradient {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;

  z-index: 1;
}

.welcome-section {
  position: relative;
  z-index: 1;
  width: 100%;
  min-height: calc(100vh - 60px);
  display: flex;
  align-items: center;
}

.welcome-content {
  position: relative;
  z-index: 20;
  background: rgba(255, 255, 255, 0.6);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 24px;
  padding: 50px;
  text-align: center;
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.8s ease-out;
  box-shadow:
    0 8px 32px rgba(31, 38, 135, 0.12),
    0 4px 8px rgba(0, 0, 0, 0.05);
}

.welcome-content::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border-radius: 24px;
  background: linear-gradient(
    45deg,
    rgba(255, 255, 255, 0.1) 0%,
    rgba(255, 255, 255, 0.2) 100%
  );
  z-index: -1;
}

.welcome-content.show {
  opacity: 1;
  transform: translateY(0);
}

.title {
  font-size: 2.6em;
  font-weight: 700;
  background: linear-gradient(135deg, #409EFF 0%, #36cfc9 50%, #1890ff 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 20px;
  letter-spacing: -0.3px;
}

.subtitle {
  font-size: 1.3em;
  color: #4a5568;
  margin-bottom: 35px;
  font-weight: 400;
}

.features {
  display: flex;
  justify-content: center;
  gap: 40px;
  margin-bottom: 40px;
  flex-wrap: wrap;
}

.feature-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  padding: 20px;
  background: rgba(255, 255, 255, 0.5);
  border-radius: 14px;
  backdrop-filter: blur(8px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  transition: all 0.3s ease;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
}

.feature-item:hover {
  transform: translateY(-5px);
  background: rgba(255, 255, 255, 0.7);
  box-shadow:
    0 8px 16px rgba(64, 158, 255, 0.15),
    0 2px 4px rgba(0, 0, 0, 0.1);
}

.feature-item .el-icon {
  font-size: 22px;
  color: #409eff;
}

.start-button {
  padding: 12px 32px;
  font-size: 1.1em;
  font-weight: 500;
  border-radius: 10px;
  background: linear-gradient(135deg, #409EFF 0%, #36cfc9 100%);
  border: none;
  transition: all 0.3s ease;
}

.start-button:hover {
  transform: translateY(-2px);
  box-shadow:
    0 8px 20px rgba(64, 158, 255, 0.25),
    0 4px 8px rgba(54, 207, 201, 0.15);
}

/* 响应式调整 */
@media (max-width: 768px) {
  .welcome-content {
    padding: 35px;
  }

  .title {
    font-size: 2.2em;
  }

  .subtitle {
    font-size: 1.1em;
  }
}

@media (max-width: 480px) {
  .welcome-content {
    padding: 25px;
    margin: 15px;
  }
}
</style>

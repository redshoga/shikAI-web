<template>
  <div class="container">
    <video ref="video" class="video" width="600" height="400">
      現在お使いのブラウザではご利用いただけません。
    </video>

    <canvas ref="canvas" class="canvas" width="600" height="400" />
  </div>
</template>

<script>
import jsQR from 'jsqr'

export default {
  data() {
    return {
      canvasCtx: null,
      showCanvas: false
    }
  },
  computed: {
    videoEle() {
      return this.$refs.video
    },
    canvasEle() {
      return this.$refs.canvas
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      this.canvasCtx = this.canvasEle.getContext('2d')

      navigator.mediaDevices.getUserMedia({
        audio: false,
        video: { width: 600, height: 400 }
      }).then((mediaStream) => {
        this.videoEle.srcObject = mediaStream
        this.videoEle.onloadedmetadata = (event) => {
          this.videoEle.play()
          this.detectQrCode()
        }
      }).catch((err) => {
        this.$emit('error', err)
      })
    },
    detectQrCode() {
      this.canvasCtx.drawImage(this.videoEle, 0, 0, this.canvasEle.width, this.canvasEle.height)
      const imageData = this.canvasCtx.getImageData(0, 0, this.canvasEle.width, this.canvasEle.height)
      const code = jsQR(imageData.data, this.canvasEle.width, this.canvasEle.height)

      if (code) {
        this.$emit('detect', code)
      }

      setTimeout(() => {
        this.detectQrCode()
      }, 100)
    }
  }
}
</script>

<style lang="scss" scoped>
.canvas {
  display: none;
}

// responsive video element
.container {
  position: relative;
  padding-bottom: 66.66%; // 400/600

  .video {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
}
</style>

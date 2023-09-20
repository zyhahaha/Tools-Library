import * as paddlejs from '@paddlejs/paddlejs-core'
import '@paddlejs/paddlejs-backend-webgl'
const plugin = requirePlugin('paddlejs-plugin')
plugin.register(paddlejs, wx)

const initPaddle = () => {
  return new Promise((resolve, reject) => {
    const pdjs = new paddlejs.Runner({
      modelPath: 'https://paddlejs.bj.bcebos.com/models/fuse/humanseg/humanseg_398x224_fuse_activation/model.json',
      feedShape: {
        fw: 224,
        fh: 224
      },
      fill: '#fff',
      targetSize: {
        height: 224,
        width: 224
      },
      mean: [0.485, 0.456, 0.406],
      std: [0.229, 0.224, 0.225]
    })
    pdjs.init().then(() => {
     // 初始化完成
      console.log('初始化成功')
      resolve(pdjs)
    })
  })
}

// app.js
App({
  globalData: {
    paddleRunner: null
  },
  async onLaunch() {
    const paddleRunner = await initPaddle()
    this.globalData.paddleRunner = paddleRunner
  }
})

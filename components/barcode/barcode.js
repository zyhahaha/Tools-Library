const app = getApp();
Component({
    /**
     * 组件的属性列表
     */
    properties: {

    },

    /**
     * 组件的初始数据
     */
    data: {
        codeResult: ''
    },

    /**
     * 组件的方法列表
     */
    methods: {
        onScanCode() {
            wx.scanCode().then(res => {
                this.setData({
                    codeResult: res.result
                })
            })
        },
        onCopyText() {
            wx.setClipboardData({
                data: this.data.codeResult,
                success: res => {
                    wx.getClipboardData({
                        success: res => {
                            wx.showToast({
                                title: '复制成功'
                            })
                        }
                    })
                }
            })
        },
        chooseImage() {
            const that = this
            // this.getImageInfo()
            wx.chooseImage({
                count: 1,
                sizeType: ['original'],
                sourceType: ['album', 'camera'],
                success(res) {
                    // console.log(res.tempFilePaths)
                    // tempFilePath可以作为img标签的src属性显示图片
                    that.getImageInfo(res.tempFilePaths[0]);
                }
            });
        },
        getImageInfo(imgPath) {
            // wx.getFileSystemManager()
            const fs = wx.getFileSystemManager()
            // 获取到图片的像素信息
            // console.log(fs)
            fs.readFile({
                filePath: imgPath,
                // encoding: 'utf8',
                position: 0,
                success: async res => {
                    // console.log(new Uint8Array(res.data))
                    // 创建离屏 2D canvas 实例
                    const canvas = wx.createOffscreenCanvas({type: '2d', width: 300, height: 150})
                    // 获取 context。注意这里必须要与创建时的 type 一致
                    const context = canvas.getContext('2d')

                    // 创建一个图片
                    const image = canvas.createImage()
                    // 等待图片加载
                    await new Promise(resolve => {
                        image.onload = resolve
                        image.src = imgPath // 要加载的图片 url
                    })

                    // 把图片画到离屏 canvas 上
                    context.clearRect(0, 0, 300, 150)
                    context.drawImage(image, 0, 0, 300, 150)

                    // 获取画完后的数据
                    const imgData = context.getImageData(0, 0, 300, 150)
                    console.log('xxx', imgData)
                    // imgData.data = new Uint8Array(imgData.data)
                    // this.predict(imgData)
                    this.predict({
                        data: new Uint8Array(imgData.data),
                        width: imgData.width,
                        height: imgData.height
                    });
                },
                fail(res) {
                    // console.error(res)
                }
            })
        },
        predict(imgObj) {
            // 4. 在线预测计算
            // console.log('xxx', app.globalData.paddleRunner.predict)
            const pdjs = app.globalData.paddleRunner
            pdjs.predict(imgObj, data => {
                console.log('xxx', data)
                // 5. 对预测结果进行后处理
                const maxItem = pdjs.utils.getMaxItem(data);
                this.setData({
                    result: maps[maxItem.index]
                });
            });
        },
    }
})

// components/qrcode/qrcode.js
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
        inputValue: '',
        qrTxt: '',
        qrImaSrc: ''
    },

    /**
     * 组件的方法列表
     */
    methods: {
        onSaveQrImage() {
            saveImageFn(this.data.qrImaSrc)
        },
        onLoadQr(res) {
            // console.log(res.detail)
            this.setData({
                qrImaSrc: res.detail
            })
        },
        onChangeValue(e) {
            this.setData({
                inputValue: e.detail.value
            })
        },
        onGenerateQrcode() {
            this.setData({
                qrTxt: this.data.inputValue
            })
        }
    }
})

function saveImageFn(imgUrl) {
    wx.showLoading({
        title: '图片下载中'
    })
    wx.downloadFile({
        url: imgUrl,
        success: function (res) {
            // 图片保存到本地
            wx.saveImageToPhotosAlbum({
                filePath: res.tempFilePath,
                success: function (data) {
                    wx.hideLoading()
                    wx.showModal({
                        title: '提示',
                        content: '图片已保存到您的手机相册',
                        showCancel: false
                    })
                },
                fail: function (err) {
                    wx.hideLoading()
                    // console.log(err)
                    if (err.errMsg === 'saveImageToPhotosAlbum:fail auth deny') {
                        // console.log('当用户拒绝，再次发起授权')
                        wx.openSetting({
                            success(settingdata) {
                                // console.log(settingdata)
                                if (settingdata.authSetting['scope.writePhotosAlbum']) {
                                    // console.log('获取权限成功，给出再次点击图片保存到相册的提示。')
                                } else {
                                    // console.log('获取权限失败，给出不给权限就无法正常使用的提示')
                                }
                            }
                        })
                    }
                },
                complete(res) {
                    // console.log(res)
                    wx.hideLoading()
                }
            })
        }
    })
    setTimeout(() => {
        wx.hideLoading()
    }, 3000)
}
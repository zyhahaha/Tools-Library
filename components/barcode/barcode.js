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
        codeResult: 'xxx'
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
                data: this.codeResult,
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
        }
    }
})

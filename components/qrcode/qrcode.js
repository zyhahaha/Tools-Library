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
        qrTxt: ''
    },

    /**
     * 组件的方法列表
     */
    methods: {
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

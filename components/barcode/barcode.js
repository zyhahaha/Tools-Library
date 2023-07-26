import wxbarcode from 'wxbarcode'
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

    },

    /**
     * 组件的方法列表
     */
    methods: {
        onHandlerDdvanced() {
            console.log('xxx')
            let aaa = wxbarcode.barcode('barcode', '1234567890123456789', 680, 200);
            console.log(aaa)
        }
    }
})

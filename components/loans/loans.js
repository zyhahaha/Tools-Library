import { computeMoneyFn } from '../../utils/compute-loans.js'
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
        dataList: [],
        debtMoney: 0,
        periods: 0, // 年限
        rate: 0.00 // 利率
    },

    /**
     * 组件的方法列表
     */
    methods: {
        onCompute() {
            const dataList = computeMoneyFn(this.data.debtMoney, this.data.periods, this.data.rate)
            this.setData({
                dataList
            })
        },
        onChangeDebtMoneyValue(e) {
            this.setData({
                debtMoney: e.detail.value
            })
        },
        onChangePeriodsValue(e) {
            this.setData({
                periods: e.detail.value
            })
        },
        onChangeRateValue(e) {
            this.setData({
                rate: e.detail.value
            })
        }
    }
})

import { computeMoneyFn } from '../../utils/compute-loans.js'
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        tableHeight: {
            type: Number
        }
    },

    /**
     * 组件的初始数据
     */
    data: {
        dataList: [],
        debtMoney: 0,
        periods: 0, // 年限
        rate: 0.00, // 利率

        // width总和：750 - padding(20 * 2 = 40) = 710
        tableHeader: [
            {
                prop: 'index',
                width: 110,
                label: '期数'
                // color: '#55C355'
            },
            {
                prop: 'repaymentMonth',
                width: 150,
                label: '月供'
            },
            {
                prop: 'debtMoneyMonth',
                width: 150,
                label: '本金'
            },
            {
                prop: 'interestMonth',
                width: 150,
                label: '利息'
            },
            {
                prop: 'remainDebtMoneyTotal',
                width: 150,
                label: '剩余'
            }
        ]
    },

    /**
     * 组件的方法列表
     */
    methods: {
        onCompute() {
            var debtMoney = this.data.debtMoney * 10000
            var periods = Number(this.data.periods)
            var rate = this.data.rate / 100
            console.log(debtMoney, periods, rate)
            const dataList = computeMoneyFn(debtMoney, periods, rate)
            dataList.forEach((item, index) => {
                item.index = index + 1
                item.remainDebtMoneyTotal = `${item.remainDebtMoneyTotal}W`
            })
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

/**
 * 房贷计算
 * @param {*} debtMoneyTotalOrigin 贷款金额
 * @param {*} _periods 贷款年限
 * @param {*} _rate 贷款利率 
 */
export function computeMoneyFn(debtMoneyTotalOrigin, _periods, _rate) {
    var dataList = []
    /**
     * 公式：等额本息
     * P:贷款本金 --> debtMoneyTotalOrigin
     * R:月利率 --> monthRate
     * N:还款期数 --> monthTotal
     * 其中还款期数=贷款年限*12
     * P * (((1 + R) ** N * R) / ((1 + R) ** N - 1))
     */
    // var debtMoneyTotalOrigin = 1111100000;
    // var monthRate = 0.0588 / 12;
    // var monthTotal = 30 * 12;
    let monthRate = _rate / 12;
    let monthTotal = _periods * 12
    /**
     * 计算总共要还多少钱
     * @param debtMoneyTotalParam 贷了多少钱
     * @returns {object} 每月需要还款多少、总共需要还多少钱、总共要还多少利息
     */
    function computeTotal(debtMoneyTotalParam) {
        var commonVar = Math.pow((1 + monthRate), monthTotal);
        var fractionUp = monthRate * commonVar; // 公式上半部分
        var fractionDown = commonVar - 1; // 公式下半部分
        var repaymentMonth = debtMoneyTotalParam * (fractionUp / fractionDown); // 每月需要还款多少
        var repaymentTotal = repaymentMonth * monthTotal; // 总共需要还多少钱（本金+利息）
        var interestTotal = repaymentTotal - debtMoneyTotalParam; // 总共要还多少利息（贷款利息）
        return { repaymentMonth: repaymentMonth, repaymentTotal: repaymentTotal, interestTotal: interestTotal };
    }
    /*********************** * **************************/
    /**
     * 计算每月还款的明细
     * @param debtMoneyTotalParam 总贷款
     * @param repaymentMonth 每月需要还款多少
     * @returns {object} 每月利息、月供中本金是多少、每月交完月供后还剩多少贷款
     */
    function computeDetail(debtMoneyTotalParam, repaymentMonth) {
        var interestMonth = debtMoneyTotalParam * monthRate; // 每月利息
        var debtMoneyMonth = repaymentMonth - interestMonth; // 月供中本金是多少
        var remainDebtMoneyTotal = debtMoneyTotalParam - debtMoneyMonth; // 每月交完月供后还剩多少贷款

        dataList.push({
            repaymentMonth: repaymentMonth.toFixed(2), // 每月需要还款多少
            interestMonth: interestMonth.toFixed(2), // 每月利息
            debtMoneyMonth: debtMoneyMonth.toFixed(2), // 月供中本金是多少
            remainDebtMoneyTotal: (remainDebtMoneyTotal / 10000).toFixed(2) // 每月交完月供后还剩多少贷款
        })
        return { interestMonth: interestMonth, debtMoneyMonth: debtMoneyMonth, remainDebtMoneyTotal: remainDebtMoneyTotal };
    }
    /**
     * 多少个月后，还入多少钱，还剩多少贷款
     * @param {number} debtMoneyTotalParam 总贷款
     * @param {number} month 多少个月后还款
     * @param {number} minusMoney 还入多少钱
     * @returns {number} 还剩多少贷款
     */
    function computeMonthly(debtMoneyTotalParam, month, minusMoney) {
        if (minusMoney === void 0) { minusMoney = 0; }
        var remainDebtMoneyTotal = debtMoneyTotalParam; // 剩余贷款
        var repaymentMonth = computeTotal(debtMoneyTotalParam).repaymentMonth;

        for (var i = 1; i <= month; i++) {
            remainDebtMoneyTotal = computeDetail(remainDebtMoneyTotal, repaymentMonth).remainDebtMoneyTotal;
        }
        return remainDebtMoneyTotal - minusMoney;
    }

    computeMonthly(debtMoneyTotalOrigin, 20, 0)
    return dataList;
    // let aaa = computeMonthly(debtMoneyTotalOrigin, 18, 300000)
    // let bbb = computeMonthly(aaa, 12, 200000)
    // let ccc = computeMonthly(bbb, 12, 200000)
    // let ddd = computeMonthly(ccc, 12, 200000)
    // let eee = computeMonthly(ddd, 12, 200000)
    // let fff = computeMonthly(eee, 12, 100000)
    // console.log(computeMonthly(aaa, 1))
}

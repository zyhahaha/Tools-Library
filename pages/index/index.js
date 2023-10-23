// index.js
// 获取应用实例
const app = getApp()

Page({
  data: {
    tableHeight: 0,
    drawerVisible: false,
    tabName: '文字识别OCR',
    tabValue: '1',
    sideMenuList: [
      {
        title: '房贷计算器（等额本息）',
        icon: 'money-circle',
        index: '0'
      }, {
        title: '文字识别OCR',
        icon: 'scan',
        index: '1'
      }, {
        title: '二维码生成',
        icon: 'qrcode',
        index: '2'
      }, {
        title: '解析二维码',
        icon: 'scan',
        index: '3'
      }
    ]
    // tabPanelstyle: 'display:flex;justify-content:center;align-items:center;',
  },
  onLoad() {
    this.setData({
        tableHeight: wx.getSystemInfoSync().windowHeight - wx.getSystemInfoSync().statusBarHeight
    })
  },
  onOpenDrawer() {
    this.setData({
      drawerVisible: true
    })
  },
  onClickDrawerItem(e) {
    this.setData({
      tabValue: e.detail.item.index,
      tabName: e.detail.item.title
    })
    this.setData({
      drawerVisible: false
    })
  },
  onTabsChange(event) {
    this.setData({
      tabValue: event.detail.value,
    });
    // console.log(`Change tab, tab-panel value is ${event.detail.value}.`);
  },

  onTabsClick(event) {
    // console.log(`Click tab, tab-panel value is ${event.detail.value}.`);
  },
})

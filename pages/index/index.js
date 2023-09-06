// index.js
// 获取应用实例
const app = getApp()

Page({
  data: {
    drawerVisible: false,
    tabName: '房贷计算器（等额本息）',
    tabValue: '0',
    sideMenuList: [
      {
        title: '房贷计算器（等额本息）',
        index: '0'
      }, {
        title: '条形码 / 二维码 / 解析',
        index: '1'
      }, {
        title: '解析',
        index: '2'
      }
    ]
    // tabPanelstyle: 'display:flex;justify-content:center;align-items:center;',
  },
  onLoad() {
    if (wx.getUserProfile) {
      this.setData({
        canIUseGetUserProfile: true
      })
    }
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

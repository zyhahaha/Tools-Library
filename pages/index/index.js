// index.js
// 获取应用实例
const app = getApp()

Page({
  data: {
    tabPanelstyle: 'display:flex;justify-content:center;align-items:center;',
  },
  onLoad() {
    if (wx.getUserProfile) {
      this.setData({
        canIUseGetUserProfile: true
      })
    }
  },
  onHandlerDdvanced() {
    console.log('xxx')
  },
  onTabsChange(event) {
    console.log(`Change tab, tab-panel value is ${event.detail.value}.`);
  },

  onTabsClick(event) {
    console.log(`Click tab, tab-panel value is ${event.detail.value}.`);
  },
})

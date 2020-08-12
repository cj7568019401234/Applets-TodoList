//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    todo: {
      isShowed: true, //是否展示
      spread: false, //是否点击展开
      collapse: false, //是否点击收缩
      num: 189, //待完成任务数
    },
    done: {
      isShowed: true,
      spread: false,
      collapse: false,
      num: 139,
    }
  },
  //事件处理函数
  handleCollapseEvent: function(event) {
    const {
      type,
    } = event.currentTarget.dataset;

    const {
      todo,
      done,
    } = this.data;

    if (type == 'todo') {
        this.setData({
          todo:{
            isShowed:!todo.isShowed,
            spread:todo.isShowed ? false : true,
            collapse: todo.isShowed ? true : false
          }
        })
    }
    console.log(this.data);
  },
  onLoad: function() {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
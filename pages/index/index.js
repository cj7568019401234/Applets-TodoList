//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    todo: {
      isShowed: true, //是否展示
      spread: false, //是否点击展开
      collapse: false, //是否点击收缩
      list:[
        {
          id:1,
          value: 'hahaha todoList开发开发开发开发开发开发开发开发开发开发开发开发开发开发开发开发开发开发开发开发开发开发开发开发',
          endDate: '2020年10月12日',
          endTime: '20:18',
          isFinished:false
        },{
          id: 2,
          value: '这是第二个任务啦',
          endDate: '2020年10月12日',
          endTime: '20:18',
          isFinished: false
        }
      ],//具体的待办事项
    },
    done: {
      isShowed: true,
      spread: false,
      collapse: false,
      list:[],
    }
  },
  //处理展开收缩
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
            ...todo,
            isShowed:!todo.isShowed,
            spread:todo.isShowed ? false : true,
            collapse: todo.isShowed ? true : false,
          },
        })
    }
    if (type == 'done') {
      this.setData({
        done: {
          ...done,
          isShowed: !done.isShowed,
          spread: done.isShowed ? false : true,
          collapse: done.isShowed ? true : false,
        }
      })
    }
    // console.log(this.data);
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
  }
})
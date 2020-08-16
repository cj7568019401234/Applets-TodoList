//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    showModal: false,
    value: '', //正在编辑的任务的内容
    endDate: '', //正在编辑的任务的截止日期 
    endTime: '', //正在编辑的任务的截止时间
    todoNum: 0,
    doneNum: 0,
    todoDetail: '',
    todo: {
      isShowed: true, //是否展示
      spread: false, //是否点击展开
      collapse: false, //是否点击收缩
    },
    done: {
      isShowed: true,
      spread: false,
      collapse: false,
    },
    todoList: [{
      id: 1,
      value: 'hahaha todoList开发开发开发开发开发开发开发开发开发开发开发开发开发开发开发开发开发开发开发开发开发开发开发开发',
      endDate: '2020年10月12日',
      endTime: '20:18',
      isFinished: false
    }, {
      id: 2,
      value: '这是第二个任务啦',
      endDate: '2020年10月12日',
      endTime: '20:18',
      isFinished: true
    }, {
      id: 3,
      value: '这是第二个任务啦111~~~~~~不是的吧123445~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~',
      endDate: '2020年10月16日',
      endTime: '23:48',
      isFinished: false
    }, {
      id: 4,
      value: '这是第二个任务啦111~~~~~~不是的吧123445~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~',
      endDate: '2020年10月16日',
      endTime: '',
      isFinished: false
    }, {
      id: 5,
      value: '任务6ixixi',
      endDate: '',
      endTime: '',
      isFinished: false
    }, {
      id: 6,
      value: '任务6ixixi',
      endDate: '',
      endTime: '23:17',
      isFinished: false
    }], //具体的待办事项
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
        todo: {
          ...todo,
          isShowed: !todo.isShowed,
          spread: todo.isShowed ? false : true,
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

  //展示任务编辑框
  showModal: function() {
    this.setData({
      showModal: true
    })
  },

  //取消编辑任务
  closeModal: function() {
    this.setData({
      showModal: false,
      value: '',
      endDate: '',
      endTime: ''
    })
  },

  //获取文本输入框的任务内容
  bindTextAreaBlur: function(e) {
    this.setData({
      value: e.detail.value
    })
  },

  //获取任务的截止日期
  bindDateChange: function(e) {
    this.setData({
      endDate: e.detail.value
    })
  },
  //获取任务的截止时间
  bindTimeChange: function(e) {
    this.setData({
      endTime: e.detail.value.replace('undefined', '00'),
    })
  },

  //提交新增的待办事项
  bindSubmit: function(e) {
    const {
      value,
      endDate,
      endTime,
      todoList
    } = this.data;

    if (!value) return;
    let id = new Date().toString().split('GMT')[0].replace(/\s+/g, '')
    this.setData({
      todoList: [
        ...todoList,
        {
          id: id,
          value: value,
          endDate: endDate,
          endTime: endTime,
          isFinished: false
        }
      ]
    })

    this.closeModal(); //关闭弹窗
  },

  onLoad: function() {
    const {
      todoList
    } = this.data;

    let todoNum = todoList.filter(item => { //统计未完成任务数量
      return !item.isFinished;
    }).length;

    let doneNum = todoList.length - todoNum; //统计已完成任务数量

    this.setData({
      todoNum: todoNum,
      doneNum: doneNum
    })
  }
})
//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
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
      id: 5,
      value: '任务6ixixi',
      endDate: '',
      endTime: '23:17',
      isFinished: false
    }], //具体的待办事项
    todo: {
      isShowed: true, //是否展示
      spread: false, //是否点击展开
      collapse: false, //是否点击收缩
      num: 0,
    },
    done: {
      isShowed: true,
      spread: false,
      collapse: false,
      num: 0
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
  onLoad: function() {
    const{ todoList} = this.data.todoList;
    console.log('todoList',todoList);

    let todoNum = todoList.filter(item => {
      return !item.isFinished;
    }).length;

    let doneNum = todoList.length - todoNum;

    this.setData({
      todo: {
        ...todo,
        num: todoNum
      },
      done: {
        ...done,
        num: doneNum
      }
    })

    console.log(todoNum,doneNum);
  }
})
//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    showModal: false,
    id: '', //正在编辑的任务的id
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
    todoList: [], //具体的待办事项
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






//blur调用在submit之后的问题提没有解决,导致编辑任务的时候，直接编辑提交文案不会更新的



















  //提交新增的待办事项
  bindSubmit: function(e) {
    const {
      id,
      value,
      endDate,
      endTime,
      todoList,
      todoNum
    } = this.data;

    if (!value) return;

    if (e.currentTarget.dataset.id) { //如果提交的数据有id，那就是编辑任务，否则是提交新的任务
      let crrId = e.currentTarget.dataset.id;

      todoList.some((item, index) => {
        
        if (item.id == crrId) {
          console.log('found',value);
          todoList[index].value = value;
          todoList[index].endDate = endDate;
          todoList[index].endTime = endTime;
          return true;
        }
      })

      this.setData({
        id:'',
        value:'',
        endTime:'',
        endDate:'',
        todoList: todoList,
      })

    } else {
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
        ],
        todoNum: todoNum + 1,
        id: '',
        value: '',
        endTime: '',
        endDate: '',
      })
    }

    wx.setStorage({
      key: "todoList",
      data: this.data.todoList
    })

    this.closeModal(); //关闭弹窗
  },

  //删除任务
  bindDelete: function(e) {
    const id = e.currentTarget.dataset.id;

    let todoList = this.data.todoList.filter(item => {
      return item.id != id
    })

    wx.setStorage({
      key: "todoList",
      data: todoList
    });

    let todoNum = todoList.filter(item => { //统计未完成任务数量
      return !item.isFinished;
    }).length

    let doneNum = todoList.length - todoNum;
    this.setData({
      todoList: todoList,
      todoNum: todoNum,
      doneNum: doneNum
    })
  },

  //扭转任务状态
  bindToggle: function(e) {
    const id = e.currentTarget.dataset.id;

    let {
      todoList,
      todoNum,
      doneNum
    } = this.data;

    let status = 0;
    let index = todoList.some((item, index) => {
      if (item.id == id) {
        todoList[index].isFinished = !todoList[index].isFinished;
        if (todoList[index].isFinished) {
          status = 1;
        }
        return true;
      }
    })

    this.setData({
      todoNum: status == 1 ? todoNum - 1 : todoNum + 1,
      doneNum: status == 1 ? doneNum + 1 : doneNum - 1,
      todoList: todoList
    })

    wx.setStorage({
      key: "todoList",
      data: this.data.todoList
    })
  },

  //编辑任务
  bindEdit: function(e) {
    const crrId = e.currentTarget.dataset.id;

    console.log('bindEdit',crrId);

    let {
      id,
      todoList,
      value,
      endDate,
      endTime,
    } = this.data;

    let index = todoList.some((item, index) => {
      if (item.id == crrId) {
        id = crrId;
        value = item.value;
        endDate = item.endDate;
        endTime = item.endTime;
        return true;
      }
    })

    this.setData({
      id: id,
      value: value,
      endDate: endDate,
      endTime: endTime
    })

    this.showModal();
  },

  onLoad: function() {
    let todoList = [];

    //获取本地数据
    try {
      todoList = wx.getStorageSync('todoList');
      if (todoList) {
        console.log('get local data success')
      }
    } catch (e) {
      console.log('get data fail:', e)
    }

    if (typeof todoList === 'string') return; //本地没有数据直接返回

    let todoNum = todoList.filter(item => { //统计未完成任务数量
      return !item.isFinished;
    }).length;

    let doneNum = todoList.length - todoNum; //统计已完成任务数量

    this.setData({
      todoNum: todoNum,
      doneNum: doneNum,
      todoList: todoList
    })
  },
})
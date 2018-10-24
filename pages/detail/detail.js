// pages/detail/detail.js
let wxparse = require("../../wxparse/wxParse.js");
let newsUrl;
let newsTitle;
let newsAuthor;
let newsId;
let indexIsHidden;
let newsContent = '';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    newsTitle: newsTitle,
    newsUrl: newsUrl,
    newsAuthor: newsAuthor,
    contentTip: '由于后台接口原因，新闻具体内容无法编辑，只返回了一个新闻链接...'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let _this = this;
    newsTitle = options.newsTitle;
    newsAuthor = options.newsAuthor;
    newsId = options.newsId;
    _this.setData({
      newsId: newsId,
      newsTitle: newsTitle,
      newsAuthor: newsAuthor,
      indexIsHidden: true
    })
    this.loadDetail()
  },
  loadDetail(){
    let _this = this
    let newsContent = ''
    wx.request({
      url: 'https://test-miniprogram.com/api/news/detail' + '?id=' + newsId,
      data: {
      },
      success: res => {
        let resultData = res.data.result.content
        for (let i = 0; i < resultData.length; i++){
          if (resultData[i].type == "image"){
            newsContent += "<img src=\"" + resultData[i].src + "\"/>"
          } else if (resultData[i].type == "p"){
            newsContent += "<p>" + resultData[i].text + "</p>"
          } else if (resultData[i].type == "strong"){
            newsContent += "<strong>" + resultData[i].text + "</strong>"
          }
        }
        wxparse.wxParse('newsContent', 'html', newsContent,this,5)
      },
      fail: error => {

      },
      complete: () => {

      }
    }),
      _this.setData({
        newsContent : newsContent
      })
  }
})
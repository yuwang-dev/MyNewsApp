// pages/detail/detail.js
let newsUrl;
let newsTitle;
let newsAuthor;
let newsId;
let articleContent;
let indexIsHidden;
let newsContent;
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
    wx.request({
      url: 'https://test-miniprogram.com/api/news/detail' + '?id=' + newsId,
      data: {
      },
      success: res => {
        console.log(res)
        let resultData = res.data.result.content
        console.log(resultData)
        for (let i = 0; i < resultData.length; i++){
          if (resultData[i].hasOwnProperty("text")){
            newsContent += resultData.text[i]
          }
        }
        console.log(newsContent)
      },
      fail: error => {
        console.log(error)
      },
      complete: () => {

      }
    }),
      _this.setData({
        newsContent : newsContent
      })
  }
})
//index.js
//获取应用实例
const app = getApp();

let contentNewsList;
let newsType;
let indexIsHidden;
let topPic = [
  { url: '', ID: '1' },
  { url: '', ID: '2' },
  { url: '', ID: '3' }
];
let newsId;
let newsTitle;
let newsAuthor;

Page({
  data: {
    topPic: topPic,
    tapID: 201701, //判断是否选中
    contentNewsList: contentNewsList,

    indexIsHidden: indexIsHidden,
    headerTitleName: [
      { name: '国内', nameID: '201701', newsType: 'gn' },
      { name: '国际', nameID: '201702', newsType: 'gj' },
      { name: '财经', nameID: '201703', newsType: 'cj' },
      { name: '娱乐', nameID: '201704', newsType: 'yl' },
      { name: '军事', nameID: '201705', newsType: 'js' },
      { name: '体育', nameID: '201706', newsType: 'ty' },
      { name: '其他', nameID: '201707', newsType: 'other' }
    ]
  },
  newsType: 'ty', //默认请求的是头条数据
  headerTitleClick: function (e){
    let _this = this;
    newsType = e.currentTarget.dataset.newstype;
    
    _this.setData({
      tapID: e.target.dataset.id,
      indexIsHidden: false,
      newsType : newsType
    })
    this.loadNewsList()
  },
  loadNewsList(){
    let _this = this
    wx.request({
      url: 'https://test-miniprogram.com/api/news/list',
      data: {
        type: newsType
      },
      success: res => {
        let resultData = res.data.result
        //获取头部轮播图片
        for (let n = 0; n < 3; n++) {
          topPic[n].url = resultData[n].firstImage
        }
        
        for (let i = 0; i < resultData.length; i++){
          resultData[i].date = resultData[i].date.match(/T(\S*).000Z/)[1];
          if (resultData[i].firstImage == ""){
            resultData[i].firstImage = "/img/lightrain-icon.png"
          }
        }
        
        _this.setData({
          contentNewsList: resultData,
          indexIsHidden: true,
          topPic: topPic
        })

      },
      fail: error => {

      },
      complete: () => {

      }
    })
  },
  onLoad: function () {
    newsType = 'gn'
    this.loadNewsList()
  },
  onPullDownRefresh: function() {
    newsType = 'gn'
    this.loadNewsList(() => {
      wx.stopPullDownRefresh()
    })
  },
  viewDetail: function (e) {
    newsId = e.currentTarget.dataset.newsid;
    newsTitle = e.currentTarget.dataset.newstitle;
    newsAuthor = e.currentTarget.dataset.newsauthor;
    wx.navigateTo({
      url: '../detail/detail' + '?newsId=' + newsId + '&newsTitle=' + newsTitle + '&newsAuthor=' + newsAuthor
    })
  },
})

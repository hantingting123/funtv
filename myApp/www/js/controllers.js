angular.module('controllers', ['ngCordova'])

  .controller('shouyeC', function(miandata,$scope,$http,$state,$ionicSlideBoxDelegate) {
     $scope.bangtitle="明星排行榜";

    $scope.$on("$ionicView.enter" ,function () {
        if(miandata.guanzhu.isdenglu==true){
      $scope.bangtitle="我关注的"
      $scope.bangstar=miandata.guanzhu.hotstar;
      console.log($scope.bangstar);
          $scope.starbangClick=function (index) {
            $state.go("tab.hots");
            miandata.guanzhu.sid=$scope.bangstar[index].sid,
              miandata.guanzhu.thumb=$scope.bangstar[index].thumb,
              miandata.guanzhu.title=$scope.bangstar[index].name

          }

          }
    });


    $scope.mine={
      itemClick:function (index) {

        $state.go("tab.detail",{
          sid: $scope.mine.hothan.items[index].sid
        });

      },
      bangClick:function () {
        $state.go("tab.starbang");


      },


    baguaiClick:function (index) {
        $state.go("tab.baguadetail",{
          url: $scope.mine.hotbaiguai.items[index].sources
        });
      },
      starClick:function (index) {
        $state.go("tab.baguadetail",{
          url: $scope.mine.hotstar.items[index].sources
        });
      },
      hotxingzuoClick:function (index) {
        $state.go("tab.baguadetail",{
          url: $scope.mine.hotxingzuo.items[index].sources
        });
      },
      hotjianshenClick:function (index) {
        $state.go("tab.baguadetail",{
          url: $scope.mine.hotjianshen.items[index].sources
        });
      },
      hotliuyouClick:function (index) {
        $state.go("tab.baguadetail",{
          url: $scope.mine.hotliuyou.items[index].sources
        });
      },
      hotmeizuoClick:function (index) {
        $state.go("tab.baguadetail",{
          url: $scope.mine.hotmeizhuang.items[index].sources
        });
      }
    };


    $scope.clickFn=function (index) {
      console.log(index);
      $ionicSlideBoxDelegate.slide(index);
    }
    $scope.url=encodeURIComponent("http://api.hanju.koudaibaobao.com/api/index/recommend");
    $http({
      url: "http://59.110.139.104:3000/wy?myUrl=" + $scope.url,
      method: "GET"
    }).then(function (res) {

      $scope.mine.hothan = res.data.recs[0];
      $scope.mine.hotstar = res.data.recs[1];
      $scope.mine.hotbaiguai = res.data.recs[2];
      $scope.mine.hotmeizhuang = res.data.recs[3];
      $scope.mine.hotxingzuo = res.data.recs[5];
      $scope.mine.hotjianshen = res.data.recs[6];
      $scope.mine.hotliuyou = res.data.recs[7];
    })
      .then(function (error) {

      })



    //下拉刷新
    $scope.doRefresh = function() {
      $http({
        url: "http://59.110.139.104:3000/wy?myUrl=" + $scope.url,
        method: "GET"
      }).then(function (res) {


        $scope.mine.hothan = res.data.recs[0];
        $scope.mine.hotstar = res.data.recs[1];
        $scope.mine.hotbaiguai = res.data.recs[2];
        $scope.mine.hotmeizhuang = res.data.recs[3];
        $scope.mine.hotxingzuo = res.data.recs[5];
        $scope.mine.hotjianshen = res.data.recs[6];
        $scope.mine.hotliuyou = res.data.recs[7];
        console.log($scope.mine.hotxingzuo);


        console.log(res.data.recs)

      })
        .then(function (error) {

        })
        .finally(function() {
          // 停止广播ion-refresher
          $scope.$broadcast('scroll.refreshComplete');
        });
    }



  })
  .controller('wodeC', function($scope,$http,miandata) {

    $scope.userimg="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1487746286958&di=5bc7bbc0ad6fc1d61a24871a7e2c616d&imgtype=0&src=http%3A%2F%2Fimgsrc.baidu.com%2Fforum%2Fpic%2Fitem%2Fd50735fae6cd7b89d07599c40f2442a7d9330e5f.jpg";
    $scope.username="登录后有更多授权哦";

    $scope.isdenglu=true;
    $scope.dengluFn=function () {
      QQSDK.ssoLogin(function (res) {
             $scope.assesstoken=res.access_token;
              $scope.userid=res.userid;
        $scope.url = encodeURIComponent("https://graph.qq.com/user/get_user_info?access_token=" + $scope.assesstoken + "&oauth_consumer_key=" +  1105995390 + "&openid=" +$scope.userid+"&format=json");

        $http({
          method:"GET",
          url:"http://59.110.139.104:3000/wy?myUrl=" +$scope.url
        }).then(function (res) {
          $scope.user=res.userId;

          $scope.username=res.data.nickname;
          $scope.userimg=res.data.figureurl_2;
           $scope.istuichu=true;
          $scope.isdenglu=false;
          miandata.guanzhu.isdenglu=true;
         


        }).then(function (error) {

        })

      },function (error) {


      })

    }

  })
  .controller('detailC',function ($ionicNavBarDelegate , $http , $state , $scope , $stateParams, $ionicSlideBoxDelegate) {
           $scope.mine={};

          $scope.sid=$stateParams.sid;
          $scope.url=encodeURIComponent("http://api.hanju.koudaibaobao.com/api/series/detailV3?sid="+$scope.sid);
          $http({
            method:"GET",
            url:"http://59.110.139.104:3000/wy?myUrl="+$scope.url,

          }).then(function (res) {
               $scope.mine.jishu=res.data.playItems;
                $scope.mine.jiemian={
                  intro:res.data.series.intro,
                  name:res.data.series.name,
                  count:res.data.series.count,
                  source:res.data.series.source,
                  img:res.data.series.thumb
                }

          }).then(function (error) {

          });
          $scope.tabNames=['剧集','简介'];
          $scope.slectIndex=0;
          $scope.activeSlide=function(index){//点击时候触发
            $scope.slectIndex=index;
            $ionicSlideBoxDelegate.slide(index);
          };
          $scope.slideChanged=function(index){//滑动时候触发
            $scope.slectIndex=index;
          };
    $scope.goBack = function() {
      window.history.go(-1);
    };

  })
  .controller("baguaC",function ($scope,$state,$stateParams) {
         $scope.videourl= $stateParams.url[0].page;
         var video=document.getElementById("video");
            video.src=$scope.videourl;

      $scope.goBack=function () {
      //根据历史记录回到上一个页面
      window.history.go(-1);
    }

  })
  .controller("starbangC",function ($state,$scope,$http,$ionicLoading,miandata,$ionicPopup) {
    $scope.$on("$ionicView.enter" ,function () {
      $scope.guanzhustar=miandata.guanzhu.hotstar;
      console.log(")_)))))))))");
      console.log( $scope.guanzhustar);
      $scope.textguanzhu="+ 关注";
               $scope.mine={
                 isguanzhu:false,
                guanzhuClick:function (index,even) {
                  if( miandata.guanzhu.isdenglu==false){
                    var alertpopup=$ionicPopup.alert({
                      title:"失败",
                      template:"请先登录再关注"
                    })

                  }else {
                    for(var i = 0; i < $scope.mine.hotstar.length; i++){
                      if(index==i){
                        $scope.mine.hotstar[i].isFocus=true;
                        event.target.innerText="已关注"
                        miandata.guanzhu.hotstar.push($scope.mine.hotstar[index]);
                      }
                    }

                  }



                },
                starClick:function (index) {
                  $state.go("tab.hots");
                  miandata.guanzhu.sid=$scope.mine.hotstar[index].sid,
                  miandata.guanzhu.thumb=$scope.mine.hotstar[index].thumb,
                  miandata.guanzhu.title=$scope.mine.hotstar[index].name

                }

              };

              $scope.goBack=function () {

                //根据历史记录回到上一个页面
                 $state.go("tab.shouye");
              }
              $scope.count=0;
             $scope.url=encodeURIComponent("http://api.hanju.koudaibaobao.com/api/star/hotStars?offset="+$scope.count+"&count=30");
              $http({
                method:"GET",
                url:"http://59.110.139.104:3000/wy?myUrl=" + $scope.url,

              }).then(function (res) {
                        $scope.mine.hotstar=res.data.hotStars;
                        for(var i = 0; i < $scope.mine.hotstar.length; i++){
                          var minItem = $scope.mine.hotstar[i];

                          $scope.mine.hotstar[i].textguanzhu="+ 关注";
                          for (var j = 0; j < $scope.guanzhustar.length; j++){
                            var focusItem = $scope.guanzhustar[j];

                            if(focusItem.sid == minItem.sid){
                              $scope.mine.hotstar[i].isFocus = true;
                              $scope.mine.hotstar[i].textguanzhu="已 关注";



                            }
                          }
                        }



              }).then(function (error) {

              });
           $scope.loadMore=function () {

             $scope.count+=30;
             $scope.url=encodeURIComponent("http://api.hanju.koudaibaobao.com/api/star/hotStars?offset="+$scope.count+"&count=30");
             $http({
               method:"GET",
               url:"http://59.110.139.104:3000/wy?myUrl=" + $scope.url,

             }).then(function (res) {

                 for(var i=0;i<res.data.hotStars.length;i++) {
                   var minItem = res.data.hotStars[i];
                   minItem.textguanzhu = "+ 关注"
                   minItem.isFocus=false;
                   $scope.mine.hotstar.push(minItem);
                 }

                   // console.log(minItem.sid);
                   // console.log($scope.guanzhustar);
               for(var i = 0; i < $scope.mine.hotstar.length; i++) {
                     var minItem = $scope.mine.hotstar[i];

               }
                   for (var j=0; j<$scope.guanzhustar.length; j++) {
                     var focusItem = $scope.guanzhustar[j];
                     console.log(focusItem);
                     if (focusItem.sid == minItem.sid) {
                       console.log(111);
                       $scope.mine.hotstar[i].isFocus = true;
                       $scope.mine.hotstar[i].textguanzhu = "已关注";


                     }
                   }
                     $scope.$broadcast('scroll.infiniteScrollComplete');

             }).then(function (error) {

             });

           }
            $scope.$on('stateChangeSuccess', function() {
              $scope.loadMore();
    });
    })
  })
  .controller("faxianC" , function ($scope,$http,$state , miandata) {



    $scope.mine={

      headClick:function (index) {
        $state.go("tab.head" , {
          // url:url,
          // title:title,
          // img:img,
          list:$scope.mine.newArr,
          index:index,
        });
      },

      itemClick:function (index) {

        $state.go("tab.myTalk" , {
          list:$scope.mine.dataArr,
          index:index
        })


      },
      hotsClick:function (index) {

        // console.log(index);
        // console.log($scope.mine.dataHots)

        // $state.go("tab.hots" , {
        //   sid:$scope.mine.dataHots[index].sid,
        //    thumb:$scope.mine.dataHots[index].thumb,
        //    title:$scope.mine.dataHots[index].title
        // });


        console.log($scope.mine.dataHots[index]);
        console.log(miandata);
        $state.go("tab.hots");
        miandata.guanzhu.sid = $scope.mine.dataHots[index].sid;
        miandata.guanzhu.thumb = $scope.mine.dataHots[index].thumb;
        miandata.guanzhu.title = $scope.mine.dataHots[index].title;

      }
    }
    $scope.url = encodeURIComponent('http://api.hanju.koudaibaobao.com/bbs/api/forum/getBoardsV2');

    $http({
      url:"http://59.110.139.104:3000/wy?myUrl=" + $scope.url,
      method:"GET"
    })
      .then(function (res) {
        // console.log(res);
        $scope.mine.dataArr = res.data.mines;
        $scope.mine.dataHots = res.data.hots;
         console.log($scope.mine.dataHots);
      })
      .then(function (error) {
        console.log(error)
      })

    //  栅格栏请求
    $scope.tabUrl = encodeURIComponent("http://api.hanju.koudaibaobao.com/api/series/discoveryV4");
    $http({
      url:"http://59.110.139.104:3000/wy?myUrl=" + $scope.tabUrl,
      method:"GET"
    })
      .then(function (res) {
        // console.log(res);
        // res.data.items.splice(0,1);
        // res.data.items.splice(9,1);

        $scope.mine.tabList = res.data.items;
        $scope.mine.newArr=$scope.mine.tabList.slice(1,8);
        console.log($scope.mine.newArr);

        console.log($scope.mine.newArr)
      })
      .then(function (error) {
        console.log(error)
      })



  })
  .controller("headC",function ($ionicNavBarDelegate,$scope,$http,$stateParams,$state) {
    // $scope.data = $stateParams.list;

    $scope.index = $stateParams.index;

    $scope.cid = $stateParams.list[$stateParams.index].cid;

    $scope.mine = {
      videoClick:function (index) {
        $state.go("tab.headVideo" , {
          list:$scope.mine.videoArr,
          index:index,
        });
      }
    }
    $scope.goBack = function() {
      $ionicNavBarDelegate.back();
    };
    $scope.count = 10;
    $scope.offset = 1;
    $scope.url = "http://api.hanju.koudaibaobao.com/api/cate/videos?cid="+$scope.cid+"&offset="+$scope.offset+"&count="+$scope.count;
    $scope.newUrl = encodeURIComponent( $scope.url);

    $http({
      url:"http://59.110.139.104:3000/wy?myUrl=" + $scope.newUrl,
      method:"GET"
    })
      .then(function (res) {
        // console.log(res);
        $scope.mine.videoArr = res.data.videos;

        $scope.name=$stateParams.list[$stateParams.index].name

      })
      .then(function (error) {
        console.log(error)
      })



    // 下拉触发函数
    $scope.doRefresh = function(){
      //
      $http({
        url:"http://59.110.139.104:3000/wy?myUrl="+$scope.newUrl,
        metheod:"GET"
      })
        .then(function (res) {
          console.log(res);
          $scope.mine.videoArr = res.data.videos;
          $scope.$broadcast('scroll.refreshComplete');
        })
        .then(function (error) {
          if (error) {
          }
        })
    }
    //

    //  上拉触发的函数
    $scope.loadMore = function () {

      $scope.offset +=10;
      $scope.count += 10;

      $scope.url = "http://api.hanju.koudaibaobao.com/api/cate/videos?cid="+$scope.cid+"&offset="+$scope.offset+"&count="+$scope.count;
      $scope.newUrl = encodeURIComponent( $scope.url);

      $http({
        url:"http://59.110.139.104:3000/wy?myUrl="+$scope.newUrl,
        metheod:"GET"
      })
        .then(function (res) {
          console.log(res);
          for(var i = 0; i < res.data.videos.length; i++){
            $scope.mine.videoArr.push(res.data.videos[i]);
          }

          console.log($scope.mine.videoArr);
          $scope.$broadcast('scroll.infiniteScrollComplete');
          console.log("停止了");
        });
    };


  })
  .controller("headVideoC",function ($scope,$http,$stateParams) {

    $scope.videoUrl = $stateParams.list[$stateParams.index].sources[0].page;


    var video=document.getElementById("video");
    video.src = $scope.videoUrl
    $scope.goBack=function () {
      //根据历史记录回到上一个页面
      window.history.go(-1);
    }

  })
  .controller("hotsC",function ($ionicNavBarDelegate,$scope,$http,$stateParams,$state,$ionicSlideBoxDelegate,miandata) {
    $scope.$on("$ionicView.enter" ,function () {
      $scope.imgs = miandata.guanzhu.thumb;
      $scope.sid = miandata.guanzhu.sid;
      $scope.title = miandata.guanzhu.title;
      console.log($scope.sid);

      $scope.isClick = true;
      $scope.btnClick = function () {
        if ($scope.isClick) {
          console.log(btn.innerText)
          btn.innerText = "已关注";
          btn.style.backgroundColor = "hotpink";
          btn.style.color = "white";
          $scope.isClick = false;
        } else if ($scope.isClick == false) {
          btn.innerText = "+ 关注";
          btn.style.backgroundColor = "";
          btn.style.color = "";
          $scope.isClick = true;
        }
      }
      $scope.goBack = function () {
          $state.go("tab.faxian");
      };
      $scope.mine = {
        videosClick: function (index) {
          console.log(index)
          $state.go("tab.hotsV");
          miandata.datalist.videoList = $scope.mine.videosArr;
          console.log(miandata.datalist.videoList);
          miandata.datalist.index = index;
        },

        articleClick: function (index) {
          $state.go("tab.article");
          miandata.datalist.articleList = $scope.mine.articleLsit;
          miandata.datalist.articleindex = index;
        }
      };

      $scope.count = 20;
      $scope.offset = 0;

      $scope.url = "http://api.hanju.koudaibaobao.com/api/star/videos?sid=" + $scope.sid + "&sort=t&offset=0&count=" + $scope.count;
      $scope.allUrl = encodeURIComponent($scope.url)

      $http({
        url: "http://59.110.139.104:3000/wy?myUrl=" + $scope.allUrl,
        method: "GET"
      })
        .then(function (res) {
          console.log(res);
          $scope.mine.videosArr = res.data.videos;
          miandata.datalist.videoArr = $scope.mine.videosArr;

        })
        .then(function (error) {

        })

      //跳转作品集
      $scope.articleUrl = "http://api.hanju.koudaibaobao.com/api/star/works?sid=" + $scope.sid + "&cate=2&offset=0&count=20";
      $scope.articleURL = encodeURIComponent($scope.articleUrl);

      $http({
        url: "http://59.110.139.104:3000/wy?myUrl=" + $scope.articleURL,
        method: "GET"
      })
        .then(function (res) {
          console.log(res.data.works)
          $scope.mine.articleLsit = res.data.works;
        })
        .then(function (error) {

        })

      //  上拉触发的函数
      $scope.loadMore = function () {
        $scope.offset += 20;
        // $scope.count += 20;
        $scope.url = "http://api.hanju.koudaibaobao.com/api/star/videos?sid=" + $scope.sid + "&sort=t&offset=" + $scope.offset + "&count=" + $scope.count;
        $scope.allUrl = encodeURIComponent($scope.url)
        $http({
          url: "http://59.110.139.104:3000/wy?myUrl=" + $scope.allUrl,
          metheod: "GET"
        })
          .then(function (res) {
            console.log(res.data.videos);
            for (var i = 0; i < res.data.videos.length; i++) {
              $scope.mine.videosArr.push(res.data.videos[i]);
            }

            // console.log($scope.mine.videoArr);
            $scope.$broadcast('scroll.infiniteScrollComplete');
            console.log("停止了");
          });
      };

      //滑动
    })
      $scope.tabNames = ['最新动态', '作品集'];
      $scope.slectIndex = 0;
      $scope.activeSlide = function (index) {//点击时候触发
        $scope.slectIndex = index;
        $ionicSlideBoxDelegate.slide(index);

      };
      $scope.slideChanged = function (index) {//滑动时候触发
        $scope.slectIndex = index;
      };
      $scope.pages = ["templates/tab01.html", "templates/tab02.html", "templates/tab03.html"];

  })
  .controller("hotsVC",function ($scope,$http,miandata) {

    $scope.index = miandata.datalist.index;

    $scope.musicUrl = miandata.datalist.videoList[$scope.index].sources[0].page;
    console.log($scope.musicUrl);
    var video=document.getElementById("video");
    video.src = $scope.musicUrl;

    $scope.goBack=function () {
      //根据历史记录回到上一个页面
      window.history.go(-1);
    }

  })
  .controller("articleC",function ($ionicNavBarDelegate,$scope,$http,miandata) {
    $scope.index = miandata.datalist.articleindex;
    $scope.musicUrl = miandata.datalist.articleList[$scope.index].sources[0].page
    console.log($scope.musicUrl);
    var videos =document.getElementById("videos");
    videos.src = $scope.musicUrl;
    $scope.goBack=function () {
      //根据历史记录回到上一个页面
      window.history.go(-1);
    }

  })
  .controller("myTalkC",function ($ionicNavBarDelegate,$scope,$http,$stateParams) {
    $scope.headImg = $stateParams.list[$stateParams.index].thumb;
    $scope.title = $stateParams.list[$stateParams.index].title;
    $scope.bid = $stateParams.list[$stateParams.index].bid;
    console.log($stateParams.list)
    $scope.mine = {};
    $scope.topic =  $stateParams.list[$stateParams.index].dailyCount;

    $scope.page = 1;
    $scope.url = "http://api.hanju.koudaibaobao.com/bbs/api/forum/topicsV2?bid="+$scope.bid+"&page="+$scope.page;
    $scope.tabUrl = encodeURIComponent($scope.url);
    $scope.goBack=function () {

      //根据历史记录回到上一个页面
      window.history.go(-1);
    }
    $http({
      url:"http://59.110.139.104:3000/wy?myUrl=" + $scope.tabUrl,
      method:"GET"
    })
      .then(function (res) {
        $scope.mine.dataArr = res.data.topics;
        console.log(res.data)
      })
      .then(function (error) {
        console.log(error)
      })


    //  上拉触发的函数
    $scope.loadMore = function () {

      $scope.page++;
      $scope.count += 10;

      $scope.url = "http://api.hanju.koudaibaobao.com/bbs/api/forum/topicsV2?bid="+$scope.bid+"&page="+$scope.page;
      $scope.tabUrl = encodeURIComponent($scope.url);
      $http({
        url:"http://59.110.139.104:3000/wy?myUrl="+$scope.tabUrl,
        metheod:"GET"
      })
        .then(function (res) {
          console.log(res.data.topics);
          for(var i = 0; i < res.data.topics.length; i++){
            $scope.mine.dataArr.push(res.data.topics[i]);
          }
          //
          // console.log($scope.mine.videoArr);
          $scope.$broadcast('scroll.infiniteScrollComplete');
          console.log("停止了");
        });
    };

  })
  .controller("openvideoC",function ($scope,$http,$stateParams) {

    $scope.data = $stateParams.list;
    $scope.shareUrl = $scope.data[$stateParams.index].share_url;
    $scope.title = $scope.data[$stateParams.index].title;
    $scope.imgs = $scope.data[$stateParams.index].image;
    $scope.url = $scope.data[$stateParams.index].file_url;
    console.log($scope.url )
    var myVideo = document.getElementById("myVideo");
    myVideo.src = $scope.url;


    //qq视频分享
    $scope.shareFn = function () {

      // QQSDK.shareAudio((successCB,errorCB,params))

      var obj={};
      obj.scene=QQSDK.Scene.QQ;
      obj.url=$scope.shareUrl;
      obj.title=$scope.title;
      obj.description = "秒拍视频";
      obj.image =$scope.imgs;
      obj.flashUrl = $scope.url;


      QQSDK.shareAudio(function () {
        alert("分享视频成功")
      },function (error) {
        alert(error);
      },obj)
    }


    $scope.goBack=function () {

      //根据历史记录回到上一个页面
      window.history.go(-1);
    }


  })
  .controller("shipinC",function ($scope,$http,$state) {
    $scope.mine = {
      VideoClick:function (index) {
        $state.go("tab.openvideo" , {
          list:$scope.mine.dataArr,
          index:index,
        });
      }
    }

    $scope.url = encodeURIComponent("http://dailyapi.ibaozou.com/api/v31/documents/videos/latest")
    $http({
      url:"http://59.110.139.104:3000/wy?myUrl=" + $scope.url,
      method:"GET"
    })
      .then(function (res) {
        $scope.mine.dataArr = res.data.data;
        console.log($scope.mine.dataArr)
      })
      .then(function (error) {
        console.log(error)
      })

    $scope.goBack=function () {

      //根据历史记录回到上一个页面
      window.history.go(-1);
    }
  })










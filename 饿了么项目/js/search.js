$(function() {
    var availableTags = [
      "A",
      "北京市",
      "上海市",
      "天津市重庆市",
      "香港特别行政区",
      "澳门特别行政区",
      "南宁市",
      "贺州市",
      "玉林市",
      "桂林市",
      "柳州市","梧州市","北海市","钦州市","百色市","防城港市","贵港市", 
      "河池市","崇左市 ","来宾市 ","东兴市"," 桂平市","北流市","岑溪市","合山市","凭祥市","宜州市",
      "杭州市"," 宁波市"," 绍兴市 ","温州市"," 台州市"," 湖州市"," 嘉兴市"," 金华市"," 舟山市"," 衢州市","丽水市","余姚市",
      "临海市","温岭市","永康市","瑞安市","慈溪市","义乌市","上虞市","诸暨市"," 海宁市"," 桐乡市"," 兰溪市"," 龙泉市",
       "建德市"," 富德市"," 富阳市"," 平湖市东阳市"," 东阳市"," 嵊州市"," 奉化市","临安市","江山市"
    ];
    $("#tags").autocomplete({
      source: availableTags
    });
  });
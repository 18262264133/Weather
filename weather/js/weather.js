$(function(){
    //为按钮绑定单击事件处理函数
    $("#ajax-btn").on("click",function(){
        $(".table>tbody").find("tr").remove();
        var city=$(".input").val() || "上海";
        var oDate=new Date();
        var month=oDate.getMonth();
        var url="http://wthrcdn.etouch.cn/weather_mini?city="+city;
        //发起ajax请求,JQuery会自动将json数据转为js数据
        $.getJSON(url,function(datas){
            var content="<div>提醒:"+datas.data.ganmao+"</div>";
            for(var i=0;i<datas.data.forecast.length;i++){
                var data=datas.data.forecast[i]; //数组中的每一个对象
                //构造每一行tr数据
                var $tr=$("<tr>");
                var high=data.high;
                var low=data.low;

                var mun_h=high.replace(/[\u4e00-\u9fa5]+/g,"");
                var mun_l=low.replace(/[\u4e00-\u9fa5]+/g,"");

                $("<td>").append((month+1)+"月"+data.date).appendTo($tr);
                $("<td>").append("<span><img src='"+getIcon(data.type)+ "'></span>"+data.type).appendTo($tr);
                $("<td>").append(mun_h).appendTo($tr);
                $("<td>").append(mun_l).appendTo($tr);
                $("<td>").append(data.fengxiang).appendTo($tr);
                $("<td>").append(data.fengli).appendTo($tr);

                $("#reminder").html(content);
                //将构造的每一行,追加到.table>tbody里
                $(".table>tbody").append($tr);

                $(".table>tbody").find("tr").find("td").css({"vertical-align":"middle"},{"height":"50px"},{"line-height":"50px"});

            }
        });
    });

    //为输入框绑定按键的事件,当用户输入聊天内容,按回车键发送
    $(".input").on("keyup",function(event){
        //判断是否是回车键:回车键的键值是13
        //根据事件对象的keyCode属性值来判断
        if(event.keyCode==13){
            //说明按下的是回车键,发送消息
            //使用事件触发
            $("#ajax-btn").trigger("click");
        }
    });

    function getIcon(weather){
        var icon = "images/yin.png";
        var icons = {
            "晴":"images/day_qing.png",
            "多云":"images/day_duoyun.png",
            "阴":"images/day_yin.png",
            "霾":"images/mai.png",
            "小雨":"images/day_xiaoyu.png",
            "中雨":"images/day_zhongyu.png",
            "大雨":"images/day_dayun.png",
            "小雪":"images/day_xiaoxue.png",
            "中雪":"images/day_zhongxue.png",
            "大雪":"images/day_daxue.png"
        };
        return icons[weather] || icon;
    }
    function getBg(weather2){
        var Bg = "images/background1.jpg";
        var Bgs = {
            "多云":"images/background1.jpg"
        };
        return Bgs[weather2] || Bg;
    }

    $("#ajax-btn").trigger("click");

});


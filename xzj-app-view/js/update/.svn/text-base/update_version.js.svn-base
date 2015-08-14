var wgtVer=null;
function plusReady(){
    // ......
    // 获取本地应用资源版本号
    plus.runtime.getProperty(plus.runtime.appid,function(inf){
        wgtVer=inf.version;
    });
}
if(window.plus){
    plusReady();
}else{
    document.addEventListener('plusready',plusReady,false);
}
// 检测更新
var checkUrl=const_server_url+"/version.txt";
function checkUpdate(){
	var flag=false;
    var xhr=new XMLHttpRequest();
    var params="r="+Math.random();
    xhr.onreadystatechange=function(){
        switch(xhr.readyState){
            case 4:
            if(xhr.status==200){
                var newVer=xhr.responseText;
                if(wgtVer&&newVer&&(wgtVer!=newVer)){
                	flag=true;
                    downWgt();  // 下载升级包
                }else{
                }
            }else{
            }
            break;
            default:
            break;
        }
    }
    xhr.open('GET',checkUrl,false);
    xhr.send(params);
    return flag;
}


// 下载wgt文件
var wgtUrl=const_server_url+"/version.wgt";
function downWgt(){
    plus.downloader.createDownload( wgtUrl, {filename:"_doc/update/"}, function(d,status){
        if ( status == 200 ) { 
            installWgt(d.filename); // 安装wgt包
        } else {
        }
    }).start();
}
// 更新应用资源
function installWgt(path){
    plus.runtime.install(path,{force: true},function(){
        plus.runtime.restart();
    },function(e){
    });
}


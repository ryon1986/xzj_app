//app后端接口地址
var const_server_url='http://app.xuanzejia.me/';
//var const_server_url='http://192.168.1.14:8081/xzj-app/';
//token 过期时间(相对于服务端应该稍微少一些)
var const_token_expire = 25*60*1000;
// 图片地址
var IMAGE_DOMAIN = "http://images.xuanzejia.com/";
// 首页图片大小定义
var IMAGE_160_160 = "@200w_200h.jpg";
// 详情页图片
var IMAGE_350_350 = "@350w_350h.jpg";
// 商品查询页
var IMAGE_80_80 = "@80w_80h.jpg";

//验证 
//手机号正则表达式
var PHONE_REGION = /^(13[0-9]|15[012356789]|17[6780]|18[0-9]|14[57])[0-9]{8}$/
//地址长度
var ADDRESS_LENGTH = 128
//姓名长度
var NAME_LENGTH = 16
//备注长度
var MEMO_LENGTH = 128
//数字正则表达式
var CHECKNUM = /^[0-9]*[1-9][0-9]*$/;
//特殊字符
var SPECIAL_CHAR=/^(?!_)(?!.*?_$)[a-zA-Z0-9_ \u4e00-\u9fa5]+$/;
const prefix = "/groupshopping-server"

module.exports = {
  "GOODS_LIST":prefix+"/api/web/goodsList",     // 拼团商品列表
  "GOODS_DETAIL":prefix+"/api/web/goodsDetail",     // 拼团商品详情

  "CREATE_ORDER":prefix+"/api/web/order/createOrder",     // 提交订单
  "OTHERDETAIL":prefix+"/api/web/order/otherdetail",      // 订单详情
  "ORDER_PAY":prefix+"/api/web/order/pay",     // 立即支付

  "MYGROUP":prefix+"/api/web/mygroup",        // 我的拼团
  "CANCEL_ORDER":prefix+"/api/web/order/cancel",  // 取消订单
}
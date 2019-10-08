// 开发时用rap的host，上线打包时把host设置为空字符串
const host = 'http://rap2api.taobao.org/app/mock/13801'

const url = {
  getCode: '/api/getCode', // 获取验证码
  login: '/user/login',
  logout: '/user/logout',
  userInfo: '/user/userInfo',
  navList: '/home/navList',
  homePage: '/home/homePage',
  category: '/home/category',
  commodity: '/home/commodityList',
  forRecommend: '/home/forRecommend',
  productView: '/product/productView',
  recommend: '/product/recommend',
  estDelivery: '/product/estDelivery',
  cartIndex: '/cart/index',
  cartSelect: '/cart/selcart',
  cartEdit: '/cart/edit',
  cartAdd: '/cart/add',
  cartDelete: '/cart/del',
  cartSelService: '/cart/selService',
  cartCount: '/cart/count',
  addressList: '/address/list',
  addressAdd: '/address/add',
  addressSave: '/address/save',
  addressView: '/address/view',
  addressDel: '/address/del',
  addressAll: '/address/all',
  addressRegion: '/address/region',
  orderCheckout: '/order/checkout',
  orderList: '/order/list',
  orderView: '/order/view'
}

Object.keys(url).forEach(key => {
  url[key] = host + url[key]
})

export default url

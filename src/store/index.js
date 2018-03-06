import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

//定义一个全局的容器
let store = new Vuex.Store({
	state:{
		list:[],	//所有商品数据
		carPanelData:[],	//购物车商品数据
		receiveInfo: [],
	    orderData: []	//所有订单数据
	},
	getters:{
		// 计算已选商品的总数
		totalSelectCount(state){
			let count = 0
			state.carPanelData.forEach((item)=>{
				if (item.isSelected) {
					count += item.count
				}
			})
			return count
		},
		// 计算购物车内所有商品的总数
		totleCount(state){
			let count = 0
			state.carPanelData.forEach((item)=>{
				count += item.count
			})
			return count
		},
		// 计算购物车已选商品总价
		totlePrice(state){
			let price = 0
			state.carPanelData.forEach((item)=>{
				if(item.isSelected){
					price += item.price*item.count
				}
			})
			return price
		},
		// 获取待结算的商品数据列表
		getpayList(state){
			let payList = state.carPanelData.filter((item)=>{
				return item.isSelected == true
			})
			return payList
		}
	},
	mutations:{
		// 异步获取商品数据
		changeList(state,payload){
			state.list = payload;
		},
		// 添加商品到购物车
		addCarPanelData (state,data) {
			let bOff = true
	  	  	state.carPanelData.forEach((item) => {
	  	    	if(item.id === data.id){
	  	      		item.count ++
	  	     		bOff = false
	  	    	}
	  	 	})
	  	  	if(bOff){
	  	    	let goodsData = data
	  	    	Vue.set(goodsData,'count',1)
	  	    	state.carPanelData.push(goodsData)
	  	  	}
		},
		// 删除购物车中的商品
		delCarPanelData(state,delList){
			delList.forEach((item)=>{
				let index = state.carPanelData.findIndex((carItem)=>{
					return carItem.id == item.id
				})
				state.carPanelData.splice(index,1)
			})
		},
		// 全选
		selectall(state){
			state.carPanelData.forEach((item)=>{
				item.isSelected = !item.isSelected
			})
		},
		// 删减购物车内商品的数量
		lessCount(state,data){
			state.carPanelData.forEach((item)=>{
				if (item.id == data.id) {
					if (data.count == 1) {
						return
					}else{
						data.count--
					}
				}
			})
		},
		// 增加购物车内商品的数量
		plusCount(state,data){
			state.carPanelData.forEach((item)=>{
				if (item.id == data.id) {
					if (data.count >= data.plus_num) {
						return
					}else{
						data.count++
					}
				}
			})
		},
		// 保存新的收货地址
		submitReceive(state,data){
			if(data.addSelect){
				state.receiveInfo.forEach((item)=>{
					item.addSelect = false
				})
			}
			state.receiveInfo.push(data)
		},
		// 删除一条地址信息
		delReceive(state,id){
			let index = state.receiveInfo.findIndex((item)=>{
					return item.id == id
				})
			state.receiveInfo.splice(index,1)
		},
		// 修改一条地址信息
		saveReceive(state,data){
			if(data[1].addSelect){
				state.receiveInfo.forEach((item)=>{
					item.addSelect = false
				})
			}
			let index = state.receiveInfo.findIndex((item)=>{
					return item.id == data[0]
				})
			state.receiveInfo.splice(index,1,data[1])
		},
		// 提交一个新的订单
		submitOrder(state,data){
			let i = state.carPanelData.length
			while(i--){
				if(state.carPanelData[i].isSelected){
					state.carPanelData.splice(i,1)
				}
			}
			state.orderData.unshift(data)
			console.log(state.orderData)
		}
	},
	actions:{
		// 异步从后端获取商品数据
		getList({commit}){
			axios({
		    	methods: 'get',
		    	url: 'https://www.easy-mock.com/mock/5a93cdd98be1e80aa1c92ac0/yplift/list'
		    })
		    .then((response)=>{
		    	// console.log(response.data)
		    	commit('changeList',response.data);
		    })
		    .catch((error)=>{
		    	console.log(error)
		    })
		}
	}
})
export default store
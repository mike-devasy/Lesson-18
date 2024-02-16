import { defineStore } from 'pinia'
export const usePresentsStore = defineStore('presents', {
state:()=> ({
	presentsList:[],
	presents:[
		{
			id:1,
			title:'Торт',
		},
		{
			id:2,
			title:'Листівка',
		},
		{
			id:3,
			title:'Шовдарь',
		},
	]
}),
getters:{
	getPresentsList : (state) => state.presentsList,
	getPresentById: (state) => (presentId) => state.presentsList.find(item => item.id == presentId)
},
actions:{
	loadList(){ 
		if(this.presentsList.length === 0)
		this.presentsList = this.presents
	},
	addItem(item) {
		const newId = this.presentsList.length > 0 ? this.presentsList[this.presentsList.length - 1].id + 1 : 1;
		this.presentsList.push({ ...item, id: newId });
	},
	deleteItem(itemId){
		this.presentsList = 	this.presentsList.filter(item => item.id !== itemId)
	}
}
})
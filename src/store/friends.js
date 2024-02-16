import { defineStore } from 'pinia'
 
export const useFriendsStore = defineStore('friends', {
state:()=> ({
	friendsList:[],
	// friendsNamesList:[],
	friends:[
		{
			id:1,
			name:'Галя',
			category:'баба'
		},
		{
			id:2,
			name:'Іван',
			category:'дід'
		},
		{
			id:3,
			name:'Оленка',
			category:'онука'
		},
	]
}),
getters:{
	getFriendsList : (state) => state.friendsList,
  getFriendById: (state) => (friendId) => state.friendsList.find(item => item.id == friendId)
},
actions:{
	loadList(){ 
		if (this.friendsList.length === 0) {
			this.friendsList = this.friends;
			// this.friendsNamesList = this.getFriendsList.map(friend => ({ name: friend.name, category: friend.category, id: friend.id }));

	}
	},
	addItem(item) {
		const newId = this.friendsList.length > 0 ? this.friendsList[this.friendsList.length - 1].id + 1 : 1;
		this.friendsList.push({ ...item, id: newId });
		// this.friendsNamesList.push({ ...item, id: newId });
	},
	deleteItem(itemId){
		this.friendsList = 	this.friendsList.filter(item => item.id !== itemId)
	},
}
})
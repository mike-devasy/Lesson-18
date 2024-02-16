<template>
    <div class="container">
        <h3>Список друзів:</h3>
        <ol>
            <li v-for="{ name, category,id} in friendsNamesList" :key="id" class="friend">
                <div class="friend-content">
									<span>{{ category }} {{ name }}</span>
																	<button @click="onShow(id)">Видалити</button>
								</div>
            </li>
						<div v-if="isDeleting">
					<p>Видалити всі призначення с цім ім'ям ?</p>
					<button @click="onDeleteAll(id)">Так</button>
					<button @click="onDelete(id)">Тільки им'я</button>
				</div>
        </ol>
		
				<div class="new-friend">
					<label>
						 Новий  друг
						<input v-model="newFriend.category"  type="text" class="family" placeholder='Ступінь рідства'>
						<input v-model="newFriend.name"  type="text" placeholder="Им'я">
					</label>
					<button @click="onAdd(newFriend)">Додати</button>
				</div>
    </div>
</template>

<script>
import { useFriendsStore } from '@/store/friends'
import { mapState, mapActions } from 'pinia'
import { useAssignmentsStore } from '@/store/assignments'
export default {
    name: 'FriendsView',
		data(){
			return{
				newFriend:{},
				isDeleting:false,
				friendIdToDelete: null,
				friendsNamesList:[]
			}
		},
    computed: {
        ...mapState(useFriendsStore, ['getFriendsList', 'friendsNamesList']),
    },
    created() {
        this.loadList();
				if(this.friendsNamesList.length === 0){
				this.friendsNamesList = this.getFriendsList.map(friend => ({ name: friend.name, category: friend.category, id: friend.id }));
				}
    },
		methods: {
			...mapActions(useFriendsStore, ['loadList', 'deleteItem', 'addItem']),
			...mapActions(useAssignmentsStore, ['deleteAssignmentByFriend']),

			onShow(id){
      this.isDeleting = true
			this.friendIdToDelete = id
      },
			onDelete() {
            if (this.friendIdToDelete) {
							this.friendsNamesList = this.friendsNamesList.filter(friend => friend.id !== this.friendIdToDelete)
                this.friendIdToDelete = null
            }
            this.isDeleting = false
        },
        onDeleteAll() {
            if (this.friendIdToDelete) {
							this.deleteAssignmentByFriend(this.friendIdToDelete)
                this.deleteItem(this.friendIdToDelete)
								this.onDelete(this.friendIdToDelete)

                this.friendIdToDelete = null
            }
            this.isDeleting = false
        },
			onAdd(item){
				this.addItem(item)
		   const newId = this.friendsNamesList.length > 0 ? this.friendsNamesList[this.friendsNamesList.length - 1].id + 1 : 1;
				this.friendsNamesList.push({ ...item, id: newId })
				this.newFriend = {}
			}
		},
}
</script>

<style lang="scss" scoped>
.friend {
    width: 200px;
    font-size: 20px;
    text-align: left;
    margin: 0 auto;
 
}
.friend-content{
	
	width: 300px;
	display: flex;
	justify-content: space-between;
	margin-bottom: 10px;
}
 
button{
	cursor: pointer;
	width: 150px;
	font-size: 20px;
padding: 5px 10px;
margin-right: 20px;

}
label{
 margin-right: 20px;
	font-size: 25px;
}
input{
	margin-right: 20px;
	font-size: 20px;
	width: 200px;
	height: 30px;
}
</style>

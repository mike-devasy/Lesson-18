<template>
    <div class="container">
        <h3>Список подарунків:</h3>
        <ol>
            <!-- {{ getFriendsList }} -->
            <li v-for="{ title, id} in getPresentsList" :key="id" class="present">
                <div class="present-content">
									<span>{{ title }} </span>
																	<button @click="onDelete(id)">Видалити</button>
								</div>
            </li>
        </ol>
				<div class="new-present">
					<label>
						 Новий  подарунок
						<input v-model="newPresent.title"  type="text">
					</label>
					<button @click="onAdd(newPresent)">Додати</button>
				</div>
    </div>
</template>

<script>
import { usePresentsStore } from '@/store/presents'
import { mapState, mapActions } from 'pinia'
export default {
    name: 'PresentsView',
		data(){
			return{
				newPresent:{}
			}
		},
    computed: {
        ...mapState(usePresentsStore, ['getPresentsList']),

    },
    created() {
        this.loadList()
    },
		methods: {
			...mapActions(usePresentsStore, ['loadList', 'deleteItem', 'addItem']),

			onDelete(id) {
				this.deleteItem(id)
			},
			onAdd(item){
				this.addItem(item)
				this.newPresent = {}
			}
		},
}
</script>

<style lang="scss" scoped>
.present {
    width: 200px;
    font-size: 20px;
    text-align: left;
    margin: 0 auto;
    // display: flex;
    // gap: 10px;
}
.present-content{
	width: 300px;
	display: flex;
	justify-content: space-between;
	margin-bottom: 10px;
}
.new-friend{

}
button{
	cursor: pointer;
	width: 150px;
	font-size: 20px;
padding: 5px 10px;
}
label{
 margin-right: 20px;
	font-size: 25px;
}
input{
	font-size: 20px;
	width: 200px;
	height: 30px;
}
</style>
<template>
    <div class="container">
        <h2>Призначення подарунків:</h2>
        <ol>
            <li v-for="{ person, present, id } in assignmentsFoolList" :key="id" class="friend">
                <div class="friend-content">
                    <span> {{ person.category }} {{ person.name }} ---- {{ present.title }} </span>
                    <button @click="onDelete(id)">Видалити</button>
                </div>
            </li>
        </ol>
        <div class="new-friend">
            <label>
                Нове призначення
                <select v-model="assignment.personId">
                    <option v-for="friend in getFriendsList" :key="friend.id" :value="friend.id">
                        {{ friend.category }} {{ friend.name }}
                    </option>
                </select>

                <select v-model="assignment.presentId">
                    <option v-for="present in getPresentsList" :key="present.id" :value="present.id">
                        {{ present.title }}
                    </option>
                </select>
            </label>
            <button @click="onAdd(assignment)">Додати</button>
        </div>
    </div>
</template>

<script>
import { useAssignmentsStore } from '@/store/assignments'
import { useFriendsStore } from '@/store/friends'
import { usePresentsStore } from '@/store/presents'
import { mapState, mapActions } from 'pinia'
export default {
    name: 'AssignmentsView',
    data() {
        return {
            assignment: {},
        }
    },
    computed: {
        ...mapState(useAssignmentsStore, ['getAssignmentsList', 'getAssignmentsListById']),
        ...mapState(useFriendsStore, ['getFriendsList', 'getFriendById']),
        ...mapState(usePresentsStore, ['getPresentsList', 'getPresentById']),
        assignmentsFoolList() {
            const friendsList = useFriendsStore().getFriendsList
            const presentsList = usePresentsStore().getPresentsList
            return useAssignmentsStore().getAssignmentsListById(friendsList, presentsList)
        },
    },
    created() {
        this.loadList()
        this.loadFriendsList()
        this.loadPresentsList()
    },
    methods: {
        ...mapActions(useAssignmentsStore, ['loadList', 'deleteItem', 'addItem']),
        ...mapActions(useFriendsStore, { loadFriendsList: 'loadList' }),
        ...mapActions(usePresentsStore, { loadPresentsList: 'loadList' }),
        onAdd(item) {
            this.addItem(item)
            this.assignment = {}
        },
        onDelete(id) {
            this.deleteItem(id)
        },
    },
}
</script>

<style lang="scss" scoped>
.friend {
    width: 600px;
    font-size: 25px;
    text-align: left;
    margin: 30px auto;
}
.friend-content {
    width: 500px;
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
}
.new-friend {
}
button {
    cursor: pointer;
    width: 150px;
    font-size: 20px;
    padding: 5px 10px;
}
label {
    font-size: 25px;
}
select {
    width: 200px;
    margin-right: 20px;
    height: 30px;
    font-size: 20px;
}
input {
    margin-right: 20px;
    width: 200px;
}
</style>

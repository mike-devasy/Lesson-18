import { defineStore } from 'pinia'
// import { useFriendsStore } from '@/store/friends'
// import { usePresentsStore } from '@/store/presents'
export const useAssignmentsStore = defineStore('assignments', {
    state: () => ({
        assignmentsList: [],
        assignments: [
            {
                id: 1,
                personId: 3,
                presentId: 3,
            },
            {
                id: 2,
                personId: 1,
                presentId: 2,
            },
            {
                id: 3,
                personId: 2,
                presentId: 1,
            },

        ],
    }),
    getters: {
        getAssignmentsList: (state) => state.assignmentsList,
				getAssignmentsListById: (state) => (friends, presents) => {
					console.log('Friends:', friends);
					console.log('Presents:', presents);
					return state.assignmentsList.map((assignment) => {
							const person = friends.find(friend => friend.id === assignment.personId);
							const present = presents.find(present => present.id === assignment.presentId);
			
							// Перевіряємо, чи знайдено об'єкт person та present
							if (person && present) {
									return {
											person: {
													name: person.name,
													category: person.category
											},
											present: present,
											id: assignment.id
									};
							} else {
									// Якщо хоча б один з об'єктів відсутній, повертаємо порожній об'єкт
									return {
											person: {},
											present: {},
											id: assignment.id
									};
							}
					});
			},
			
    },
    actions: {
        loadList() {
					if(this.assignmentsList.length === 0)
            this.assignmentsList = this.assignments;
        },
        addItem(item) {
            const newId =
                this.assignmentsList.length > 0 ? this.assignmentsList[this.assignmentsList.length - 1].id + 1 : 1
            this.assignmentsList.push({ ...item, id: newId })
        },
        deleteItem(itemId) {
            this.assignmentsList = this.assignmentsList.filter((item) => item.id !== itemId)
        },
				deleteAssignmentByFriend(personId) {
					const assignments = this.assignmentsList;
					const filteredAssignments = assignments.filter((assignment) => assignment.personId === personId);
		     	filteredAssignments.forEach((assignment) => {
					this.deleteItem(assignment.id)
					});
			},
    },
})

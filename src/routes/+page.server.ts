import type { Todo } from '$lib/models/Todo';
import { error } from '@sveltejs/kit';
import type { Actions } from './$types';
import type { PageServerLoad } from './$types';
import axios from 'axios';

export const load: PageServerLoad = async () => {
	try {
		const response = await axios.get('http://localhost:4000/todos');

		return {
			tasks: response.data
		};
	} catch (error) {
		console.error(error);
		return {
			error: 'There was an error fetching data'
		};
	}
};

export const actions = {
	addTask: async ({ request }) => {
		try {
			const data = await request.formData();
			const title = data.get('title');
			const description = data.get('description');
			const status = data.get('status') === 'on';

			const newTask = {
				title: title,
				description: description,
				status: status
			};

			await axios.post('http://localhost:4000/todos', newTask);
		} catch (error) {
			console.error(error);
		}
	},

	deleteTask: async ({ request }) => {
		try {
			const formData = await request.formData();
			const id = formData.get('id');

			await axios.delete(`http://localhost:4000/todos/${id}`);
			console.log('Item was deleted successfully');
		} catch (error) {
			console.error('There was an issue deleting the item');
		}
	},

	updateStatus: async ({request}) => {
		try {
			const formData = await request.formData()
			const id = formData.get("id")

			await axios.put(`https://daisyui.com/components/toggle/${id}`)
		} catch (error) {
			
		}
	}
	
} satisfies Actions;

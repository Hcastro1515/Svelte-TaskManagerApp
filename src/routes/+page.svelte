<script lang="ts">
	import Modal from '$lib/components/modal/modal.svelte';
	import type { Todo } from '$lib/models/Todo';
	import axios from 'axios';

	import { onMount } from 'svelte';

	export let data;
	let tasks: Todo[] = [];
	console.log(data.tasks);
	onMount(() => {
		if (data && data.tasks) {
			tasks = data.tasks;
		}
		localStorage.setItem('tasks', JSON.stringify(tasks));
	});

	let taskSelected: boolean = false;
	let currentTask: Todo;

	function handleSelectTaskChange(task: Todo) {
		currentTask = task;
		taskSelected = !taskSelected;
	}

	const markTaskComplete = async (taskId: number) => {};
</script>

<div class="w-1/2">
	<header class="flex justify-between items-center">
		<p class="text-3xl">Taski</p>
		<Modal>
			<div slot="trigger" let:open>
				<button
					on:click={open}
					class="bg-black text-white rounded-md py-1 px-2 hover:bg-opacity-80 transition-all"
				>
					Add Todo
				</button>
			</div>
			<div slot="header">
				<p>Create a taski</p>
			</div>
			<div class="my-4" slot="content" let:store>
				<form action="?/addTask" method="POST">
					<div class="form-control w-full">
						<label class="label-text" for="title">Title</label>
						<input
							required
							class="input input-bordered w-full"
							type="text"
							name="title"
							id="title"
							placeholder="Examples: buy groceries..."
						/>
					</div>
					<div class="form-control w-full">
						<label for="description" class="label-text">Description</label>
						<textarea
							required
							class="textarea textarea-bordered"
							name="description"
							placeholder="Milk, Chips, Beer, Water, Fruits...."
						/>
					</div>
					<div class="flex flex-col justify-start space-y-2">
						<label for="status">Have you completed this task?</label>
						<input type="checkbox" name="status" class="toggle toggle-success" />
					</div>

					<div class="mt-6">
						<button
							class="w-full bg-black text-white rounded-md py-1 px-2 hover:bg-opacity-80 transition-all"
						>
							Add Task
						</button>
					</div>
				</form>
			</div>
		</Modal>
	</header>
	<div class="overflow-x-auto mt-12">
		{#if taskSelected}
			<div class="alert">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					class="stroke-info shrink-0 w-6 h-6"
					><path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
					/></svg
				>
				<span>Woud you like to remove this task?</span>
				<div class="flex items-center space-x-4">
					<form action="?/deleteTask" method="POST">
						<input type="hidden" name="id" value={currentTask.id} />
						<button class="btn btn-sm btn-success text-white" formaction="?/updateStatus"
							>complete</button
						>
						<button class="btn btn-sm btn-error text-white">Delete</button>
					</form>
				</div>
			</div>
		{/if}
		<table class="table table-zebra">
			<thead>
				<tr>
					<th />
					<th>Id</th>
					<th>Task</th>
					<th>Description</th>
					<th>Status</th>
					<th />
				</tr>
			</thead>
			<tbody>
				{#if tasks.length > 0}
					{#each tasks as task, idx}
						<tr>
							<th>
								<label>
									<input
										type="checkbox"
										class="checkbox"
										on:change={() => handleSelectTaskChange(task)}
									/>
								</label>
							</th>
							<th>{++idx}</th>
							<td>{task.title}</td>
							<td>{task.description}</td>
							<td>
								{#if task.status}
									<span>completed</span>
								{:else}
									<span>Not completed</span>
								{/if}
							</td>
							<td>
								<Modal>
									<div slot="trigger" let:open>
										<button class="btn btn-ghost btn-xs" on:click={open}>details</button>
									</div>
									<div slot="header">
										<h2 class="card-title">{task.title}</h2>
									</div>
									<div class="my-4" slot="content">
										<p>{task.description}</p>
									</div>
									<div class="" slot="footer">
										<button class="btn btn-ghost btn-outline w-full">Update Details</button>
									</div>
								</Modal>
							</td>
						</tr>
					{/each}
				{/if}
			</tbody>
		</table>
		{#if tasks.length <= 0}
			<div class="w-full h-full grid place-items-center">
				<figure>
					<img src="/placeholder.png" alt="placeholder image" />
				</figure>
			</div>
		{/if}
	</div>
</div>

<script lang="ts">	
	import Modal from '$lib/components/modal/modal.svelte';
	import type { Todo } from '$lib/models/Todo';

	import { onMount } from 'svelte';
	import { fade, fly } from 'svelte/transition';

	export let data;
	let tasks: Todo[] = [];
	console.log(data.tasks);
	onMount(() => {
		if (data && data.tasks) {
			tasks = data.tasks;
		}
		localStorage.setItem('tasks', JSON.stringify(tasks));
	});	
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
				<p class="text-2xl">Create a taski</p>
			</div>
			<div class="my-4" slot="content" let:store>
				<form action="?/addTask" method="POST">
					<div class="flex flex-col space-y-2 my-3">
						<label for="title">Title</label>
						<input
							required
							class="ring-2 ring-slate-800 p-2 rounded-md hover:ring-3 hover:ring-black focus:outline-2 focus:outline-black"
							type="text"
							name="title"
							id="title"
							placeholder="Examples: buy groceries..."
						/>
					</div>
					<div class="flex flex-col space-y-2">
						<label for="description">Description</label>
						<textarea
							required
							class="ring-2 ring-slate-800 p-2 rounded-md hover:ring-3 hover:ring-black focus:outline-2 focus:outline-black"
							name="description"
							cols="30"
							rows="4"
							placeholder="Milk, Chips, Beer, Water, Fruits...."
						/>
					</div>
					<div class="flex flex-col justify-start space-y-2">
						<label for="status">Have you completed this task?</label>
						<input type="checkbox" name="status" />
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
	{#if tasks.length > 0}
		<section class="mt-10">
			{#each tasks as task}
				<div
					in:fly={{ y: 200, duration: 1200 }}
					out:fade
					class="my-6 w-full flex justify-between py-2 px-3 shadow-md rounded-md bg-white text-black items-center"
				>
					<div>
						<p class="font-bold">Title</p>
						<p class="text-sm">
							{task.title}
						</p>
					</div>
					<div class="flex items-center">
						<div class="flex-1">
							<p>
								Status
								<br />
								{#if task.status}
									<p class="text-green-600">completed</p>
								{:else}
									<p class="text-red-500">Not completed</p>
								{/if}
							</p>
						</div>
						<Modal>
							<div slot="trigger" let:open>
								<button
									on:click={open}
									class="ml-5 bg-black text-white py-1 px-2 rounded-md hover:bg-slate-600 transition-all"
								>
									Details
								</button>
							</div>
							<div slot="header">
								<p class="text-2xl font-bold my-2">{task.title}</p>
							</div>
							<div slot="content">
								{task.description}
							</div>
							<div slot="footer" let:close>
								{task.status}
								<button
									on:click={close}
									class="w-full bg-black text-white rounded-md py-1 px-2 hover:bg-opacity-80 transition-all"
								>
									close
								</button>
							</div>
						</Modal>
						<form action="?/deleteTask" method="POST">
							<input type="hidden" name="id" value={task.id} />
							<button class="text-red-700 material-symbols-outlined">delete</button>
						</form>
					</div>
				</div>
			{/each}
		</section>
	{/if}
</div>

<style>
	.material-symbols-outlined {
		font-variation-settings: 'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 48;
	}
</style>

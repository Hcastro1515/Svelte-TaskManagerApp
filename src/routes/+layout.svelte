<script>
	import '../app.postcss';
</script>

<svelte:head>
	<link
		rel="stylesheet"
		href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
	/>
</svelte:head>

<main class="h-screen w-screen flex justify-center mt-10">
	<slot />
</main>

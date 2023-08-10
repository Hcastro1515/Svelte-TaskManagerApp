<!-- if you're not using typescript, remove lang="ts" attribute from the script tag -->
<script context="module" lang="ts">
	// for passing focus on to the next Modal in the queue.
	// A module context level object is shared among all its component instances. [Read More Here](https://svelte.dev/tutorial/sharing-code)
	const modalList: HTMLElement[] = []
  </script>
  
  <script lang="ts">
	import { booleanStore } from '$lib/store/booleanStore'
	import { fade, fly } from 'svelte/transition';
  
	const store = booleanStore(false)
	const { isOpen, open, close } = store
	function keydown(e: KeyboardEvent) {
	  e.stopPropagation()
	  if (e.key === 'Escape') {
		close()
	  }
	}
	function transitionend(e: TransitionEvent) {
	  const node = e.target as HTMLElement
	  node.focus()
	}
	function modalAction(node: HTMLElement) {
	  const returnFn: { (): void; (): void; }[] = []
	  // for accessibility
	  if (document.body.style.overflow !== 'hidden') {
		const original = document.body.style.overflow
		document.body.style.overflow = 'hidden'
		returnFn.push(() => {
		  document.body.style.overflow = original
		})
	  }
	  node.addEventListener('keydown', keydown)
	  node.addEventListener('transitionend', transitionend)
	  node.focus()
	  modalList.push(node)
	  returnFn.push(() => {
		node.removeEventListener('keydown', keydown)
		node.removeEventListener('transitionend', transitionend)
		modalList.pop()
		// Optional chaining to guard against empty array.
		modalList[modalList.length - 1]?.focus()
	  })
	  return {
		destroy: () => returnFn.forEach((fn) => fn()),
	  }
	}
  </script>

<slot name="trigger" {open}>
	<!-- fallback trigger to open the modal -->
	<button on:click={open}>Open</button>
</slot>
{#if $isOpen}
	<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
	<div
		class="fixed top-0 left-0 w-full h-screen flex justify-center items-center"
		use:modalAction
		tabindex={0}
		in:fly={{y: 200, duration: 100}}	
		out:fade
	>
		<!-- svelte-ignore a11y-no-static-element-interactions -->
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<div
			class="bg-black bg-opacity-5 absolute h-full w-full not-focus-within:opacity-99 transition-opacity duration-100"
			on:click={close}
		/>

		<div class="z-10 max-w-md p-6 rounded-md bg-white overflow-hidden">
			<slot name="header" {store} />

			<div class="max-h-md">
				<slot name="content" {store} />
			</div>

			<slot name="footer" {close} />
		</div>
	</div>
{/if}

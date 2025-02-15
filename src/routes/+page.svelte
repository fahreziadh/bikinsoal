<script>
	import { Button } from '@/components/ui/button';
	import { ScrollArea } from '@/components/ui/scroll-area';
	import { Textarea } from '@/components/ui/textarea';
	import { useChat } from '@ai-sdk/svelte';
	import { CommandIcon, CornerDownLeftIcon, LogInIcon, PlusIcon, SquareIcon } from 'lucide-svelte';
	import { fade } from 'svelte/transition';

	const { input, handleSubmit, messages, status, stop } = useChat();
</script>

<div class="flex h-dvh flex-1 flex-col">
	<nav class="container flex flex-row justify-between py-4">
		<a class="text-2xl font-medium" href="/">Bikinsoal</a>
		<div class="flex flex-row gap-2">
			<Button variant="outline">
				<span>Login</span>
				<LogInIcon size={16} />
			</Button>
		</div>
	</nav>
	<div class="flex-1 overflow-y-scroll">
		<div class="container max-w-2xl pt-4 pb-14 prose prose-neutral prose-invert prose-pre:m-0 prose-pre:bg-transparent prose-pre:p-0">
			{#if $messages.length === 0}
				<div class="text-center text-sm text-muted-foreground">
					Start chatting with the AI
				</div>
			{/if}
			{#each $messages as message}
				<li>{message.role}: {@html message.content}</li>
			{/each}
		</div>
	</div>
	<form class="relative mx-auto mb-4 w-2xl" on:submit={handleSubmit}>
		<Textarea
			class="min-h-24 resize-none"
			placeholder="Enter your text here"
			bind:value={$input}
			on:keydown={(e) => {
				if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
					e.preventDefault();
					handleSubmit(e);
				}
			}}
		></Textarea>
		<div class="absolute right-2 bottom-2">
			{#if $status === 'ready' || $status === 'error'}
				<Button type="submit">
					<span>Submit</span>
					<div class="flex flex-row opacity-70">
						<CommandIcon size={10} />
						<PlusIcon size={10} />
						<CornerDownLeftIcon size={10} />
					</div>
				</Button>
			{/if}
			{#if $status === 'submitted'}
				<Button disabled class="animate-pulse">
					<span>Loading...</span>
				</Button>
			{/if}

			{#if $status === 'streaming'}
				<Button on:click={stop} size="icon" class="rounded-full">
					<SquareIcon size={14} fill="currentColor" />
				</Button>
			{/if}
		</div>
	</form>
</div>

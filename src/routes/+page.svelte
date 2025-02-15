<script>
	import { Button } from '@/components/ui/button';
	import { Textarea } from '@/components/ui/textarea';
	import { CommandIcon, CornerDownLeftIcon, LogInIcon, PlusIcon } from 'lucide-svelte';
</script>

<div class="flex min-h-screen flex-col">
  <nav class="container py-4 flex flex-row justify-between">
    <a class="font-medium text-2xl" href="/">Bikinsoal</a>
    <div class="flex flex-row gap-2">
      <Button variant="outline">
        <span>Login</span>
        <LogInIcon size={16} />
      </Button>
    </div>
  </nav>
	<div class="container max-w-2xl grow">
		Lorem ipsum dolor sit amet consectetur, adipisicing elit. Incidunt, cumque ad voluptatem
		blanditiis laudantium et eaque ipsa sequi magnam sunt, sit modi at autem. Incidunt veniam amet
		rem est quaerat?
	</div>
	<form class="relative mx-auto w-2xl mb-4">
		<Textarea class="resize-none min-h-24" placeholder="Enter your text here"></Textarea>
		<Button class="absolute bottom-2 right-2">
			<span>Submit</span>
			<div class="flex flex-row opacity-70">
				<CommandIcon size={10} />
				<PlusIcon size={10} />
				<CornerDownLeftIcon size={10} />
			</div>
		</Button>
	</form>
</div>

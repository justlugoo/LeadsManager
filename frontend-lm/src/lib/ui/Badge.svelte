<script lang="ts">
  import type { Snippet } from 'svelte'

  interface Props {
    class?: string
    children: Snippet
  }

  let { class: className = 'bg-text-muted/12 text-text-muted', children }: Props = $props()
</script>

<span class="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium {className}">
  {@render children()}
</span>

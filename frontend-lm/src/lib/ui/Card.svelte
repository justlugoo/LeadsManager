<script lang="ts">
  import type { Snippet } from 'svelte'

  interface Props {
    title?: string
    subtitle?: string
    class?: string
    actions?: Snippet
    children: Snippet
  }

  let { title, subtitle, class: className = '', actions, children }: Props = $props()
</script>

<div class="bg-surface rounded-2xl border border-border p-6 {className}">
  {#if title || subtitle || actions}
    <div class="flex items-start justify-between mb-4">
      <div>
        {#if title}<h3 class="text-base font-semibold text-text">{title}</h3>{/if}
        {#if subtitle}<p class="text-sm text-text-muted mt-0.5">{subtitle}</p>{/if}
      </div>
      {#if actions}<div class="flex items-center gap-2">{@render actions()}</div>{/if}
    </div>
  {/if}
  {@render children()}
</div>

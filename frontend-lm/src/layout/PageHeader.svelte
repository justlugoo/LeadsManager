<script lang="ts">
  import { link } from 'svelte-spa-router'
  import type { Snippet } from 'svelte'

  interface Crumb {
    name: string
    href?: string
  }

  interface Props {
    title: string
    subtitle?: string
    breadcrumbs?: Crumb[]
    actions?: Snippet
  }

  let { title, subtitle, breadcrumbs, actions }: Props = $props()
</script>

<div class="mb-8">
  {#if breadcrumbs}
    <nav class="mb-3">
      <ol class="flex items-center flex-wrap gap-x-2 text-sm text-text-secondary">
        {#each breadcrumbs as crumb, index (crumb.name)}
          <li class="flex items-center gap-x-2">
            {#if index > 0}<span class="text-text-muted">/</span>{/if}
            {#if crumb.href}
              <a href={crumb.href} use:link class="hover:text-text transition-colors">{crumb.name}</a>
            {:else}
              <span class="text-text">{crumb.name}</span>
            {/if}
          </li>
        {/each}
      </ol>
    </nav>
  {/if}
  <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
    <div>
      <h1 class="text-xl font-semibold text-text tracking-tight">{title}</h1>
      {#if subtitle}<p class="mt-1 text-sm text-text-secondary">{subtitle}</p>{/if}
    </div>
    {#if actions}
      <div class="flex items-center gap-2">
        {@render actions()}
      </div>
    {/if}
  </div>
</div>

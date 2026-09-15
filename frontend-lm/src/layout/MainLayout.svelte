<script lang="ts">
  import Header from './Header.svelte'
  import type { Snippet } from 'svelte'

  interface Props {
    children: Snippet
  }

  let { children }: Props = $props()
</script>

<div class="min-h-screen bg-page">
  <Header />
  <main class="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
    {@render children()}
  </main>
</div>

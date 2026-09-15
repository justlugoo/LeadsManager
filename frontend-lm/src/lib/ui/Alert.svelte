<script lang="ts">
  import InformationCircleIcon from 'lib/icons/InformationCircleIcon.svelte'
  import CheckCircleIcon from 'lib/icons/CheckCircleIcon.svelte'
  import ExclamationTriangleIcon from 'lib/icons/ExclamationTriangleIcon.svelte'
  import ExclamationCircleIcon from 'lib/icons/ExclamationCircleIcon.svelte'
  import XMarkIcon from 'lib/icons/XMarkIcon.svelte'
  import type { Snippet, Component } from 'svelte'

  interface Props {
    type?: 'info' | 'success' | 'warning' | 'error'
    title?: string
    class?: string
    onclose?: () => void
    children: Snippet
  }

  let { type = 'info', title, class: className = '', onclose, children }: Props = $props()

  const config: Record<string, { icon: Component<{ class?: string }>; classes: string }> = {
    info: { icon: InformationCircleIcon, classes: 'bg-accent/8 border-accent/20 text-accent' },
    success: { icon: CheckCircleIcon, classes: 'bg-good/8 border-good/20 text-good' },
    warning: { icon: ExclamationTriangleIcon, classes: 'bg-warning/10 border-warning/25 text-[#8a5a00]' },
    error: { icon: ExclamationCircleIcon, classes: 'bg-critical/8 border-critical/20 text-critical' },
  }

  const c = $derived(config[type])
</script>

<div class="border rounded-xl p-4 {c.classes} {className}">
  <div class="flex">
    <c.icon class="w-5 h-5 flex-shrink-0" />
    <div class="ml-3 flex-1">
      {#if title}
        <h3 class="text-sm font-medium">{title}</h3>
      {/if}
      <div class="text-sm {title ? 'mt-1' : ''} text-text">
        {@render children()}
      </div>
    </div>
    {#if onclose}
      <button onclick={onclose} class="ml-auto pl-3 hover:opacity-70">
        <XMarkIcon class="w-5 h-5" />
      </button>
    {/if}
  </div>
</div>

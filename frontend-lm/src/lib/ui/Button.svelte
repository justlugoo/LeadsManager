<script lang="ts">
  import type { Snippet } from 'svelte'

  interface Props {
    variant?: 'primary' | 'outline' | 'ghost' | 'danger'
    size?: 'sm' | 'md' | 'lg'
    disabled?: boolean
    loading?: boolean
    type?: 'button' | 'submit' | 'reset'
    class?: string
    onclick?: () => void
    icon?: Snippet
    children?: Snippet
    'aria-label'?: string
  }

  let {
    variant = 'primary',
    size = 'md',
    disabled = false,
    loading = false,
    type = 'button',
    class: className = '',
    onclick,
    icon,
    children,
    'aria-label': ariaLabel,
  }: Props = $props()

  const base =
    'inline-flex items-center justify-center font-medium rounded-lg transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-page'

  const variants = {
    primary: 'bg-accent hover:bg-accent-hover text-white focus-visible:ring-accent',
    outline: 'border border-border text-text hover:bg-surface-raised focus-visible:ring-accent',
    ghost: 'text-text-secondary hover:bg-surface-raised hover:text-text focus-visible:ring-accent',
    danger: 'bg-critical hover:brightness-90 text-white focus-visible:ring-critical',
  } as const

  const sizes = {
    sm: 'px-3 py-1.5 text-sm gap-1.5',
    md: 'px-4 py-2 text-sm gap-2',
    lg: 'px-5 py-2.5 text-base gap-2',
  } as const
</script>

<button
  {type}
  {onclick}
  disabled={disabled || loading}
  aria-label={ariaLabel}
  class="{base} {variants[variant]} {sizes[size]} {disabled || loading ? 'opacity-50 cursor-not-allowed' : ''} {className}"
>
  {#if loading}
    <div class="animate-spin rounded-full h-4 w-4 border-2 border-current border-t-transparent"></div>
  {:else if icon}
    <span class="w-4 h-4">{@render icon()}</span>
  {/if}
  {#if children}{@render children()}{/if}
</button>

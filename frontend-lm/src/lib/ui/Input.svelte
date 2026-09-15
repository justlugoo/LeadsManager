<script lang="ts">
  import ExclamationCircleIcon from 'lib/icons/ExclamationCircleIcon.svelte'
  import type { Snippet } from 'svelte'

  interface Props {
    label?: string
    placeholder?: string
    type?: 'text' | 'email' | 'password' | 'tel' | 'url'
    value: string
    error?: string
    disabled?: boolean
    required?: boolean
    class?: string
    icon?: Snippet
  }

  let {
    label,
    placeholder,
    type = 'text',
    value = $bindable(''),
    error,
    disabled = false,
    required = false,
    class: className = '',
    icon,
  }: Props = $props()

  const inputId = $props.id()
</script>

<div class="space-y-1.5 {className}">
  {#if label}
    <label for={inputId} class="block text-xs font-medium uppercase tracking-wide text-text-muted">
      {label}
      {#if required}<span class="text-critical ml-0.5">*</span>{/if}
    </label>
  {/if}
  <div class="relative">
    {#if icon}
      <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <span class="text-text-muted w-4 h-4">{@render icon()}</span>
      </div>
    {/if}
    <input
      id={inputId}
      {type}
      bind:value
      {placeholder}
      {disabled}
      class="block w-full rounded-lg bg-surface py-2.5 px-3.5 text-sm text-text
        ring-1 {error ? 'ring-critical' : 'ring-border'} focus:ring-2 focus:ring-accent
        focus:outline-none transition-shadow duration-150
        disabled:opacity-50 disabled:cursor-not-allowed
        {icon ? 'pl-10' : ''}"
    />
  </div>
  {#if error}
    <p class="text-sm text-critical flex items-center gap-1">
      <ExclamationCircleIcon class="w-4 h-4" />
      {error}
    </p>
  {/if}
</div>

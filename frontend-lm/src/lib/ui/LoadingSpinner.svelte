<script lang="ts">
  interface Props {
    size?: 'sm' | 'md' | 'lg'
  }

  let { size = 'md' }: Props = $props()

  const sizes = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
  } as const
</script>

<div class="flex items-center justify-center">
  <div class="animate-spin rounded-full border-2 border-accent border-t-transparent {sizes[size]}"></div>
</div>

<script lang="ts">
  import Bars3Icon from 'lib/icons/Bars3Icon.svelte'
  import XMarkIcon from 'lib/icons/XMarkIcon.svelte'
  import UserIcon from 'lib/icons/UserIcon.svelte'
  import ArrowRightOnRectangleIcon from 'lib/icons/ArrowRightOnRectangleIcon.svelte'
  import { mobileMenuOpen } from 'lib/stores/layout'
  import { user, logout } from 'lib/stores/auth'
  import { navigationItems } from 'lib/navigation'
  import { link, router } from 'svelte-spa-router'

  let userMenuOpen = $state(false)

  const displayName = $derived($user?.email.split('@')[0] ?? '')

  function handleLogout() {
    userMenuOpen = false
    mobileMenuOpen.set(false)
    logout()
  }
</script>

<header class="sticky top-0 z-40 bg-surface/90 backdrop-blur border-b border-border">
  <div class="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
    <div class="flex items-center justify-between h-16">
      <div class="flex items-center gap-8">
        <a href="/dashboard" use:link class="flex items-center gap-2.5 shrink-0">
          <img src="/leads-manager-icon-simple.svg" alt="" class="w-7 h-7" />
          <span class="text-[15px] font-semibold text-text tracking-tight">Leads Manager</span>
        </a>

        <nav class="hidden md:flex items-center gap-1">
          {#each navigationItems as item (item.name)}
            <a
              href={item.href}
              use:link
              class="px-3 py-2 rounded-lg text-sm font-medium transition-colors {router.location === item.href
                ? 'text-accent bg-accent/8'
                : 'text-text-secondary hover:text-text hover:bg-surface-raised'}"
            >
              {item.name}
            </a>
          {/each}
        </nav>
      </div>

      <div class="flex items-center gap-2">
        <button
          onclick={() => mobileMenuOpen.update((v) => !v)}
          class="md:hidden p-2 rounded-lg text-text-secondary hover:bg-surface-raised"
          aria-label="Abrir menú"
        >
          {#if $mobileMenuOpen}<XMarkIcon class="w-5 h-5" />{:else}<Bars3Icon class="w-5 h-5" />{/if}
        </button>

        <div class="relative hidden md:block">
          <button
            onclick={() => (userMenuOpen = !userMenuOpen)}
            class="flex items-center gap-2.5 p-1.5 pr-3 rounded-full hover:bg-surface-raised transition-colors"
          >
            <div class="w-7 h-7 rounded-full bg-accent/12 flex items-center justify-center">
              <UserIcon class="w-4 h-4 text-accent" />
            </div>
            <span class="text-sm font-medium text-text">{displayName}</span>
          </button>

          {#if userMenuOpen}
            <div class="absolute right-0 mt-2 w-44 bg-surface border border-border rounded-xl shadow-lg py-1 z-50">
              <a
                href="/profile"
                use:link
                onclick={() => (userMenuOpen = false)}
                class="block px-3.5 py-2 text-sm text-text hover:bg-surface-raised"
              >
                Mi perfil
              </a>
              <hr class="border-divider my-1" />
              <button
                onclick={handleLogout}
                class="w-full text-left flex items-center gap-2 px-3.5 py-2 text-sm text-critical hover:bg-surface-raised"
              >
                <ArrowRightOnRectangleIcon class="w-4 h-4" />
                Cerrar sesión
              </button>
            </div>
          {/if}
        </div>
      </div>
    </div>

    {#if $mobileMenuOpen}
      <nav class="md:hidden pb-4 space-y-1">
        {#each navigationItems as item (item.name)}
          <a
            href={item.href}
            use:link
            onclick={() => mobileMenuOpen.set(false)}
            class="block px-3 py-2 rounded-lg text-sm font-medium {router.location === item.href
              ? 'text-accent bg-accent/8'
              : 'text-text-secondary hover:bg-surface-raised'}"
          >
            {item.name}
          </a>
        {/each}
        <hr class="border-divider my-2" />
        <button
          onclick={handleLogout}
          class="w-full text-left flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-critical hover:bg-surface-raised"
        >
          <ArrowRightOnRectangleIcon class="w-4 h-4" />
          Cerrar sesión
        </button>
      </nav>
    {/if}
  </div>
</header>

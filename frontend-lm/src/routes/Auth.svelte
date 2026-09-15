<script lang="ts">
  import { fly } from 'svelte/transition'
  import Card from 'lib/ui/Card.svelte'
  import Input from 'lib/ui/Input.svelte'
  import Button from 'lib/ui/Button.svelte'
  import Alert from 'lib/ui/Alert.svelte'
  import { login, register } from 'lib/stores/auth'

  let isLogin = $state(true)
  let email = $state('')
  let password = $state('')
  let loading = $state(false)
  let error = $state('')

  function toggle() {
    isLogin = !isLogin
    error = ''
  }

  async function handleSubmit(e: SubmitEvent) {
    e.preventDefault()
    error = ''
    loading = true
    const result = isLogin ? await login(email, password) : await register({ email, password })
    if (!result.success) error = result.error ?? 'Ocurrió un error.'
    loading = false
  }
</script>

<div class="flex min-h-screen items-center justify-center bg-page px-4">
  <div class="w-full max-w-sm">
    <div class="flex items-center justify-center gap-2.5 mb-8">
      <img src="/leads-manager-icon-simple.svg" alt="" class="w-8 h-8" />
      <span class="text-lg font-semibold text-text tracking-tight">Leads Manager</span>
    </div>

    <Card class="overflow-hidden">
      {#if isLogin}
        <div in:fly={{ x: -24, duration: 200 }} out:fly={{ x: 24, duration: 200 }}>
          <form onsubmit={handleSubmit} class="space-y-5">
            <div>
              <h1 class="text-lg font-semibold text-text">Inicia sesión</h1>
              <p class="text-sm text-text-secondary mt-0.5">Entra con tu cuenta para ver tus leads.</p>
            </div>
            <Input label="Email" type="email" placeholder="tú@ejemplo.com" bind:value={email} required />
            <Input label="Contraseña" type="password" placeholder="••••••••" bind:value={password} required />
            {#if error}<Alert type="error">{error}</Alert>{/if}
            <Button type="submit" variant="primary" class="w-full" {loading}>Iniciar sesión</Button>
            <p class="text-center text-sm text-text-secondary">
              ¿No tienes cuenta?
              <button type="button" class="text-accent font-medium hover:underline" onclick={toggle}>
                Regístrate
              </button>
            </p>
          </form>
        </div>
      {:else}
        <div in:fly={{ x: 24, duration: 200 }} out:fly={{ x: -24, duration: 200 }}>
          <form onsubmit={handleSubmit} class="space-y-5">
            <div>
              <h1 class="text-lg font-semibold text-text">Crea una cuenta</h1>
              <p class="text-sm text-text-secondary mt-0.5">Empieza a llevar tus leads en minutos.</p>
            </div>
            <Input label="Email" type="email" placeholder="tú@ejemplo.com" bind:value={email} required />
            <Input label="Contraseña" type="password" placeholder="••••••••" bind:value={password} required />
            {#if error}<Alert type="error">{error}</Alert>{/if}
            <Button type="submit" variant="primary" class="w-full" {loading}>Registrarse</Button>
            <p class="text-center text-sm text-text-secondary">
              ¿Ya tienes cuenta?
              <button type="button" class="text-accent font-medium hover:underline" onclick={toggle}>
                Inicia sesión
              </button>
            </p>
          </form>
        </div>
      {/if}
    </Card>
  </div>
</div>

<script lang="ts">
  import { onMount } from 'svelte'
  import { user, logout } from 'lib/stores/auth'
  import { apiService } from 'lib/api'
  import type { Lead } from 'lib/types'
  import { routes } from 'lib/routes'
  import Card from 'lib/ui/Card.svelte'
  import Button from 'lib/ui/Button.svelte'
  import LoadingSpinner from 'lib/ui/LoadingSpinner.svelte'
  import Badge from 'lib/ui/Badge.svelte'
  import PageHeader from 'layout/PageHeader.svelte'
  import UserIcon from 'lib/icons/UserIcon.svelte'
  import EnvelopeIcon from 'lib/icons/EnvelopeIcon.svelte'
  import ShieldCheckIcon from 'lib/icons/ShieldCheckIcon.svelte'
  import KeyIcon from 'lib/icons/KeyIcon.svelte'

  let stats = $state({ totalLeads: 0, activeLeads: 0, convertedLeads: 0 })

  onMount(async () => {
    try {
      const res = await apiService.get<Lead[]>('/leads/')
      const leads = res.data
      stats = {
        totalLeads: leads.length,
        activeLeads: leads.filter((l) => l.status !== 'won' && l.status !== 'lost').length,
        convertedLeads: leads.filter((l) => l.status === 'won').length,
      }
    } catch {
      // El dashboard ya muestra un error si esto falla; aquí simplemente no se actualizan las stats.
    }
  })

  function handleLogout() {
    if (window.confirm('¿Estás seguro de que quieres cerrar sesión?')) logout()
  }
</script>

<div class="space-y-6">
  <PageHeader
    title="Mi perfil"
    subtitle="Tu cuenta en Leads Manager"
    breadcrumbs={[{ name: 'Inicio', href: routes.app.dashboard }, { name: 'Perfil' }]}
  />

  {#if !$user}
    <div class="flex justify-center items-center h-64">
      <LoadingSpinner />
    </div>
  {:else}
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div class="lg:col-span-2 space-y-6">
        <Card>
          <div class="flex items-center gap-4 mb-6">
            <div class="w-14 h-14 rounded-full bg-accent/12 flex items-center justify-center shrink-0">
              <UserIcon class="w-7 h-7 text-accent" />
            </div>
            <h2 class="text-xl font-semibold text-text">{$user.email}</h2>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-3 mb-6">
            <div class="text-center p-4 bg-page rounded-xl">
              <div class="text-2xl font-semibold text-text">{stats.totalLeads}</div>
              <div class="text-xs text-text-muted mt-0.5">Total de leads</div>
            </div>
            <div class="text-center p-4 bg-page rounded-xl">
              <div class="text-2xl font-semibold text-text">{stats.activeLeads}</div>
              <div class="text-xs text-text-muted mt-0.5">Leads activos</div>
            </div>
            <div class="text-center p-4 bg-page rounded-xl">
              <div class="text-2xl font-semibold text-text">{stats.convertedLeads}</div>
              <div class="text-xs text-text-muted mt-0.5">Convertidos</div>
            </div>
          </div>

          <div class="space-y-4">
            <div class="flex items-center gap-3">
              <EnvelopeIcon class="w-5 h-5 text-text-muted" />
              <div>
                <p class="text-xs text-text-muted">Email</p>
                <p class="text-text text-sm font-medium">{$user.email}</p>
              </div>
            </div>
            <div class="flex items-center gap-3">
              <ShieldCheckIcon class="w-5 h-5 text-text-muted" />
              <div>
                <p class="text-xs text-text-muted mb-1">Estado de la cuenta</p>
                <Badge class="bg-good/12 text-good">Activa</Badge>
              </div>
            </div>
          </div>
        </Card>
      </div>

      <div class="space-y-6">
        <Card title="Acciones">
          <div class="space-y-2">
            <Button
              variant="outline"
              class="w-full"
              onclick={() => window.open('mailto:soporte@leadsmanager.com', '_blank')}
            >
              {#snippet icon()}<EnvelopeIcon class="w-4 h-4" />{/snippet}
              Contactar soporte
            </Button>
            <Button variant="danger" class="w-full" onclick={handleLogout}>
              {#snippet icon()}<KeyIcon class="w-4 h-4" />{/snippet}
              Cerrar sesión
            </Button>
          </div>
        </Card>

        <Card title="Información del sistema">
          <div class="space-y-2.5 text-sm">
            <div class="flex justify-between">
              <span class="text-text-muted">ID de usuario</span>
              <span class="text-text font-mono">#{$user.id}</span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  {/if}
</div>

<script lang="ts">
  import { onMount } from 'svelte'
  import { push } from 'svelte-spa-router'
  import { leadsService } from 'lib/leads'
  import { statusConfig } from 'lib/types'
  import type { Lead } from 'lib/types'
  import { routes } from 'lib/routes'
  import Card from 'lib/ui/Card.svelte'
  import Button from 'lib/ui/Button.svelte'
  import LoadingSpinner from 'lib/ui/LoadingSpinner.svelte'
  import Alert from 'lib/ui/Alert.svelte'
  import Badge from 'lib/ui/Badge.svelte'
  import PageHeader from 'layout/PageHeader.svelte'
  import UsersIcon from 'lib/icons/UsersIcon.svelte'
  import UserPlusIcon from 'lib/icons/UserPlusIcon.svelte'
  import EnvelopeIcon from 'lib/icons/EnvelopeIcon.svelte'

  interface Stats {
    total_leads: number
    new_leads: number
    converted_leads: number
    conversion_rate: number
    leads_by_status: Record<string, number>
    recent_leads: Lead[]
  }

  let stats = $state<Stats | null>(null)
  let loading = $state(true)
  let error = $state<string | null>(null)

  onMount(async () => {
    try {
      const leads = await leadsService.getLeads()

      const weekAgo = new Date()
      weekAgo.setDate(weekAgo.getDate() - 7)

      const newLeads = leads.filter((lead) => new Date(lead.date_created) >= weekAgo).length
      const convertedLeads = leads.filter((lead) => lead.status === 'won').length
      const totalLeads = leads.length

      const leadsByStatus = leads.reduce<Record<string, number>>((acc, lead) => {
        acc[lead.status] = (acc[lead.status] || 0) + 1
        return acc
      }, {})

      const recentLeads = [...leads]
        .sort((a, b) => new Date(b.date_created).getTime() - new Date(a.date_created).getTime())
        .slice(0, 5)

      stats = {
        total_leads: totalLeads,
        new_leads: newLeads,
        converted_leads: convertedLeads,
        conversion_rate: totalLeads > 0 ? (convertedLeads / totalLeads) * 100 : 0,
        leads_by_status: leadsByStatus,
        recent_leads: recentLeads,
      }
    } catch {
      error = 'Error al cargar las estadísticas del dashboard'
    } finally {
      loading = false
    }
  })

  const statTiles = $derived(
    stats
      ? [
          { label: 'Total de leads', value: stats.total_leads, accent: 'bg-accent' },
          { label: 'Nuevos (7 días)', value: stats.new_leads, accent: 'bg-stage-1' },
          { label: 'Convertidos', value: stats.converted_leads, accent: 'bg-good' },
          { label: 'Tasa de conversión', value: `${stats.conversion_rate.toFixed(1)}%`, accent: 'bg-stage-4' },
        ]
      : [],
  )
</script>

{#if loading}
  <div class="flex justify-center items-center h-64">
    <LoadingSpinner />
  </div>
{:else if !stats}
  <div class="text-center py-12">
    <Alert type="error">No se pudieron cargar las estadísticas</Alert>
  </div>
{:else}
  <div class="space-y-8">
    <PageHeader title="Dashboard" subtitle="Resumen de tu gestión de leads" breadcrumbs={[{ name: 'Dashboard' }]} />

    {#if error}<Alert type="error">{error}</Alert>{/if}

    <div class="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {#each statTiles as tile (tile.label)}
        <div class="bg-surface rounded-2xl border border-border p-5 overflow-hidden relative">
          <div class="absolute inset-x-0 top-0 h-0.5 {tile.accent}"></div>
          <p class="text-xs font-medium uppercase tracking-wide text-text-muted">{tile.label}</p>
          <p class="text-3xl font-semibold text-text mt-1.5">{tile.value}</p>
        </div>
      {/each}
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card title="Leads por estado">
        <div class="space-y-3">
          {#each Object.entries(stats.leads_by_status) as [status, count] (status)}
            {@const config = statusConfig(status)}
            <div class="flex items-center justify-between">
              <span class="text-sm text-text">{config.label}</span>
              <Badge class={config.badgeClass}>{count}</Badge>
            </div>
          {/each}
          {#if Object.keys(stats.leads_by_status).length === 0}
            <p class="text-text-muted text-sm text-center py-4">No hay leads registrados</p>
          {/if}
        </div>
      </Card>

      <Card title="Leads recientes">
        {#snippet actions()}
          <Button variant="ghost" size="sm" onclick={() => push(routes.app.leads)}>Ver todos</Button>
        {/snippet}
        <div class="space-y-1">
          {#each stats.recent_leads as lead (lead.id)}
            {@const config = statusConfig(lead.status)}
            <button
              onclick={() => push(routes.app.leadDetail(lead.id))}
              class="w-full flex items-center justify-between gap-3 p-2.5 -mx-2.5 rounded-lg hover:bg-surface-raised transition-colors text-left"
            >
              <div class="min-w-0">
                <p class="text-sm font-medium text-text truncate">{lead.first_name} {lead.last_name}</p>
                <p class="text-xs text-text-muted truncate">{lead.company || 'Sin empresa'}</p>
              </div>
              <Badge class="{config.badgeClass} shrink-0">{config.label}</Badge>
            </button>
          {/each}
          {#if stats.recent_leads.length === 0}
            <div class="text-center py-8">
              <p class="text-text-muted text-sm mb-4">No hay leads recientes</p>
              <Button onclick={() => push(routes.app.leadForm)} variant="primary">Crear tu primer lead</Button>
            </div>
          {/if}
        </div>
      </Card>
    </div>

    <Card title="Acciones rápidas">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
        <Button onclick={() => push(routes.app.leadForm)} variant="primary" class="h-11">
          {#snippet icon()}<UserPlusIcon class="w-4 h-4" />{/snippet}
          Nuevo lead
        </Button>
        <Button onclick={() => push(routes.app.leads)} variant="outline" class="h-11">
          {#snippet icon()}<UsersIcon class="w-4 h-4" />{/snippet}
          Ver todos los leads
        </Button>
        <Button onclick={() => push(routes.app.profile)} variant="outline" class="h-11">
          {#snippet icon()}<EnvelopeIcon class="w-4 h-4" />{/snippet}
          Mi perfil
        </Button>
      </div>
    </Card>
  </div>
{/if}

<script lang="ts">
  import { push } from 'svelte-spa-router'
  import { leadsService } from 'lib/leads'
  import { LEAD_STATUS_CONFIG, statusConfig } from 'lib/types'
  import type { Lead } from 'lib/types'
  import { routes } from 'lib/routes'
  import Card from 'lib/ui/Card.svelte'
  import Button from 'lib/ui/Button.svelte'
  import Badge from 'lib/ui/Badge.svelte'
  import LoadingSpinner from 'lib/ui/LoadingSpinner.svelte'
  import Alert from 'lib/ui/Alert.svelte'
  import PageHeader from 'layout/PageHeader.svelte'
  import PencilIcon from 'lib/icons/PencilIcon.svelte'
  import TrashIcon from 'lib/icons/TrashIcon.svelte'
  import ArrowLeftIcon from 'lib/icons/ArrowLeftIcon.svelte'
  import EnvelopeIcon from 'lib/icons/EnvelopeIcon.svelte'
  import BuildingOfficeIcon from 'lib/icons/BuildingOfficeIcon.svelte'
  import CalendarIcon from 'lib/icons/CalendarIcon.svelte'
  import ClockIcon from 'lib/icons/ClockIcon.svelte'

  // svelte-spa-router pasa los parámetros de la ruta (ej. /leads/:id) como
  // esta prop, en vez de tener que leerlos del singleton global del router.
  interface Props {
    params?: { id?: string }
  }
  let { params = {} }: Props = $props()

  let lead = $state<Lead | null>(null)
  let loading = $state(true)
  let error = $state<string | null>(null)
  let updatingStatus = $state(false)

  async function loadLead(leadId: number) {
    try {
      loading = true
      lead = await leadsService.getLead(leadId)
      error = null
    } catch {
      error = 'Error al cargar el lead'
    } finally {
      loading = false
    }
  }

  $effect(() => {
    if (params.id) loadLead(Number(params.id))
  })

  async function handleStatusChange(newStatus: string) {
    if (!lead) return
    try {
      updatingStatus = true
      await leadsService.updateLeadStatus(lead.id, newStatus)
      await loadLead(lead.id)
    } catch {
      error = 'Error al actualizar el estado del lead'
    } finally {
      updatingStatus = false
    }
  }

  async function handleDeleteLead() {
    if (!lead) return
    if (!window.confirm('¿Estás seguro de que quieres eliminar este lead? Esta acción no se puede deshacer.')) return
    try {
      await leadsService.deleteLead(lead.id)
      push(routes.app.leads)
    } catch {
      error = 'Error al eliminar el lead'
    }
  }

  function formatDate(dateString: string) {
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }
</script>

{#if loading}
  <div class="flex justify-center items-center h-64">
    <LoadingSpinner />
  </div>
{:else if !lead}
  <div class="text-center py-12">
    <Alert type="error">Lead no encontrado</Alert>
  </div>
{:else}
  {@const config = statusConfig(lead.status)}
  <div class="space-y-6">
    <PageHeader
      title="{lead.first_name} {lead.last_name}"
      subtitle="Detalles del lead"
      breadcrumbs={[
        { name: 'Inicio', href: routes.app.dashboard },
        { name: 'Leads', href: routes.app.leads },
        { name: `${lead.first_name} ${lead.last_name}` },
      ]}
    >
      {#snippet actions()}
        <div class="flex gap-2">
          <Button variant="outline" onclick={() => push(routes.app.leads)}>
            {#snippet icon()}<ArrowLeftIcon class="w-4 h-4" />{/snippet}
            Volver
          </Button>
          <Button variant="outline" onclick={() => push(`${routes.app.leadForm}?id=${lead!.id}`)}>
            {#snippet icon()}<PencilIcon class="w-4 h-4" />{/snippet}
            Editar
          </Button>
          <Button variant="danger" onclick={handleDeleteLead}>
            {#snippet icon()}<TrashIcon class="w-4 h-4" />{/snippet}
            Eliminar
          </Button>
        </div>
      {/snippet}
    </PageHeader>

    {#if error}<Alert type="error">{error}</Alert>{/if}

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div class="lg:col-span-2 space-y-6">
        <Card>
          <div class="flex items-start justify-between mb-6">
            <div class="flex items-center gap-4">
              <div class="w-14 h-14 rounded-full bg-accent/12 flex items-center justify-center shrink-0">
                <span class="text-accent text-xl font-semibold">{lead.first_name[0]}{lead.last_name[0]}</span>
              </div>
              <div>
                <h2 class="text-xl font-semibold text-text">{lead.first_name} {lead.last_name}</h2>
                <p class="text-text-secondary text-sm">{lead.company || 'Sin empresa'}</p>
              </div>
            </div>
            <Badge class="{config.badgeClass} text-sm">{config.label}</Badge>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="space-y-4">
              <div class="flex items-center gap-3">
                <EnvelopeIcon class="w-5 h-5 text-text-muted" />
                <div>
                  <p class="text-xs text-text-muted">Email</p>
                  <p class="text-text text-sm font-medium">{lead.email}</p>
                </div>
              </div>
              {#if lead.company}
                <div class="flex items-center gap-3">
                  <BuildingOfficeIcon class="w-5 h-5 text-text-muted" />
                  <div>
                    <p class="text-xs text-text-muted">Empresa</p>
                    <p class="text-text text-sm font-medium">{lead.company}</p>
                  </div>
                </div>
              {/if}
            </div>

            <div class="space-y-4">
              <div class="flex items-center gap-3">
                <CalendarIcon class="w-5 h-5 text-text-muted" />
                <div>
                  <p class="text-xs text-text-muted">Fecha de creación</p>
                  <p class="text-text text-sm font-medium">{formatDate(lead.date_created)}</p>
                </div>
              </div>
              <div class="flex items-center gap-3">
                <ClockIcon class="w-5 h-5 text-text-muted" />
                <div>
                  <p class="text-xs text-text-muted">Última actualización</p>
                  <p class="text-text text-sm font-medium">{formatDate(lead.date_last_updated)}</p>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {#if lead.note}
          <Card title="Notas">
            <div class="bg-page p-4 rounded-xl">
              <p class="text-text text-sm whitespace-pre-wrap">{lead.note}</p>
            </div>
          </Card>
        {/if}
      </div>

      <div class="space-y-6">
        <Card title="Estado del lead">
          <div class="space-y-3">
            <div>
              <span class="form-label">Cambiar estado</span>
              <select
                class="input-field"
                value={lead.status}
                disabled={updatingStatus}
                onchange={(e) => handleStatusChange(e.currentTarget.value)}
              >
                {#each Object.entries(LEAD_STATUS_CONFIG) as [key, opt] (key)}
                  <option value={key}>{opt.label}</option>
                {/each}
              </select>
            </div>
            {#if updatingStatus}
              <div class="flex items-center gap-2 text-sm text-text-muted">
                <LoadingSpinner size="sm" />
                Actualizando estado...
              </div>
            {/if}
          </div>
        </Card>

        <Card title="Acciones">
          <div class="space-y-2">
            <Button variant="primary" class="w-full" onclick={() => push(`${routes.app.leadForm}?id=${lead!.id}`)}>
              {#snippet icon()}<PencilIcon class="w-4 h-4" />{/snippet}
              Editar lead
            </Button>
            <Button variant="outline" class="w-full" onclick={() => window.open(`mailto:${lead!.email}`, '_blank')}>
              {#snippet icon()}<EnvelopeIcon class="w-4 h-4" />{/snippet}
              Enviar email
            </Button>
            <Button variant="danger" class="w-full" onclick={handleDeleteLead}>
              {#snippet icon()}<TrashIcon class="w-4 h-4" />{/snippet}
              Eliminar lead
            </Button>
          </div>
        </Card>

        <Card title="Información del sistema">
          <div class="space-y-2.5 text-sm">
            <div class="flex justify-between">
              <span class="text-text-muted">ID del lead</span>
              <span class="text-text font-mono">#{lead.id}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-text-muted">Creado</span>
              <span class="text-text">{new Date(lead.date_created).toLocaleDateString()}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-text-muted">Actualizado</span>
              <span class="text-text">{new Date(lead.date_last_updated).toLocaleDateString()}</span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  </div>
{/if}

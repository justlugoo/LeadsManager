<script lang="ts">
  import { onMount } from 'svelte'
  import { push } from 'svelte-spa-router'
  import { leadsService } from 'lib/leads'
  import { LEAD_STATUS_CONFIG, statusConfig } from 'lib/types'
  import type { Lead } from 'lib/types'
  import { routes } from 'lib/routes'
  import Card from 'lib/ui/Card.svelte'
  import Button from 'lib/ui/Button.svelte'
  import Input from 'lib/ui/Input.svelte'
  import LoadingSpinner from 'lib/ui/LoadingSpinner.svelte'
  import Alert from 'lib/ui/Alert.svelte'
  import PageHeader from 'layout/PageHeader.svelte'
  import PlusIcon from 'lib/icons/PlusIcon.svelte'
  import MagnifyingGlassIcon from 'lib/icons/MagnifyingGlassIcon.svelte'
  import FunnelIcon from 'lib/icons/FunnelIcon.svelte'
  import EyeIcon from 'lib/icons/EyeIcon.svelte'
  import PencilIcon from 'lib/icons/PencilIcon.svelte'
  import TrashIcon from 'lib/icons/TrashIcon.svelte'

  let leads = $state<Lead[]>([])
  let loading = $state(true)
  let error = $state<string | null>(null)

  let searchTerm = $state('')
  let statusFilter = $state('')
  let companyFilter = $state('')
  let showFilters = $state(false)

  async function loadLeads() {
    try {
      loading = true
      leads = await leadsService.getLeads()
      error = null
    } catch {
      error = 'Error al cargar los leads'
    } finally {
      loading = false
    }
  }

  onMount(loadLeads)

  const filteredLeads = $derived(
    leads.filter((lead) => {
      if (searchTerm) {
        const term = searchTerm.toLowerCase()
        const matches =
          lead.first_name.toLowerCase().includes(term) ||
          lead.last_name.toLowerCase().includes(term) ||
          lead.email.toLowerCase().includes(term) ||
          lead.company.toLowerCase().includes(term)
        if (!matches) return false
      }
      if (statusFilter && lead.status !== statusFilter) return false
      if (companyFilter && !lead.company.toLowerCase().includes(companyFilter.toLowerCase())) return false
      return true
    }),
  )

  async function handleStatusChange(leadId: number, newStatus: string) {
    try {
      await leadsService.updateLeadStatus(leadId, newStatus)
      await loadLeads()
    } catch {
      error = 'Error al actualizar el estado del lead'
    }
  }

  async function handleDeleteLead(leadId: number) {
    if (!window.confirm('¿Estás seguro de que quieres eliminar este lead?')) return
    try {
      await leadsService.deleteLead(leadId)
      await loadLeads()
    } catch {
      error = 'Error al eliminar el lead'
    }
  }

  function clearFilters() {
    searchTerm = ''
    statusFilter = ''
    companyFilter = ''
  }
</script>

{#if loading}
  <div class="flex justify-center items-center h-64">
    <LoadingSpinner />
  </div>
{:else}
  <div class="space-y-6">
    <PageHeader
      title="Leads"
      subtitle="Gestiona tus clientes potenciales"
      breadcrumbs={[{ name: 'Inicio', href: routes.app.dashboard }, { name: 'Leads' }]}
    >
      {#snippet actions()}
        <Button onclick={() => push(routes.app.leadForm)} variant="primary">
          {#snippet icon()}<PlusIcon class="w-4 h-4" />{/snippet}
          Nuevo lead
        </Button>
      {/snippet}
    </PageHeader>

    {#if error}<Alert type="error">{error}</Alert>{/if}

    <Card>
      <div class="space-y-4">
        <div class="flex flex-col sm:flex-row gap-3">
          <div class="flex-1">
            <Input placeholder="Buscar leads..." bind:value={searchTerm}>
              {#snippet icon()}<MagnifyingGlassIcon class="w-4 h-4" />{/snippet}
            </Input>
          </div>
          <Button variant="outline" onclick={() => (showFilters = !showFilters)}>
            {#snippet icon()}<FunnelIcon class="w-4 h-4" />{/snippet}
            Filtros
          </Button>
        </div>

        {#if showFilters}
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-page rounded-xl border border-border">
            <div>
              <label class="form-label" for="status-filter">Estado</label>
              <select id="status-filter" class="input-field" bind:value={statusFilter}>
                <option value="">Todos los estados</option>
                {#each Object.entries(LEAD_STATUS_CONFIG) as [key, config] (key)}
                  <option value={key}>{config.label}</option>
                {/each}
              </select>
            </div>
            <div>
              <span class="form-label">Empresa</span>
              <Input placeholder="Filtrar por empresa..." bind:value={companyFilter} />
            </div>
            <div class="md:col-span-2">
              <Button variant="ghost" onclick={clearFilters}>Limpiar filtros</Button>
            </div>
          </div>
        {/if}
      </div>

      <div class="mt-6 overflow-x-auto">
        {#if filteredLeads.length === 0}
          <div class="text-center py-12">
            <div class="text-text-secondary text-sm mb-3">
              {leads.length === 0 ? 'No hay leads registrados' : 'No se encontraron leads con los filtros aplicados'}
            </div>
            {#if leads.length === 0}
              <Button onclick={() => push(routes.app.leadForm)} variant="primary">Crear tu primer lead</Button>
            {/if}
          </div>
        {:else}
          <table class="w-full">
            <thead>
              <tr class="border-b border-border">
                <th class="text-left py-2.5 px-4 text-xs font-medium uppercase tracking-wide text-text-muted"
                  >Nombre</th
                >
                <th class="text-left py-2.5 px-4 text-xs font-medium uppercase tracking-wide text-text-muted"
                  >Email</th
                >
                <th class="text-left py-2.5 px-4 text-xs font-medium uppercase tracking-wide text-text-muted"
                  >Empresa</th
                >
                <th class="text-left py-2.5 px-4 text-xs font-medium uppercase tracking-wide text-text-muted"
                  >Estado</th
                >
                <th class="text-left py-2.5 px-4 text-xs font-medium uppercase tracking-wide text-text-muted"
                  >Fecha</th
                >
                <th class="text-right py-2.5 px-4 text-xs font-medium uppercase tracking-wide text-text-muted"
                  >Acciones</th
                >
              </tr>
            </thead>
            <tbody>
              {#each filteredLeads as lead (lead.id)}
                {@const config = statusConfig(lead.status)}
                <tr class="border-b border-divider hover:bg-page/60 transition-colors">
                  <td class="py-3 px-4 font-medium text-text text-sm">{lead.first_name} {lead.last_name}</td>
                  <td class="py-3 px-4 text-text-secondary text-sm">{lead.email}</td>
                  <td class="py-3 px-4 text-text-secondary text-sm">{lead.company || '-'}</td>
                  <td class="py-3 px-4">
                    <select
                      class="rounded-full border-0 py-1 pl-2.5 pr-7 text-xs font-medium focus:ring-2 focus:ring-accent focus:outline-none {config.badgeClass}"
                      value={lead.status}
                      onchange={(e) => handleStatusChange(lead.id, e.currentTarget.value)}
                    >
                      {#each Object.entries(LEAD_STATUS_CONFIG) as [key, opt] (key)}
                        <option value={key}>{opt.label}</option>
                      {/each}
                    </select>
                  </td>
                  <td class="py-3 px-4 text-text-muted text-sm">{new Date(lead.date_created).toLocaleDateString()}</td>
                  <td class="py-3 px-4">
                    <div class="flex justify-end gap-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        aria-label="Ver lead"
                        onclick={() => push(routes.app.leadDetail(lead.id))}
                      >
                        {#snippet icon()}<EyeIcon class="w-4 h-4" />{/snippet}
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        aria-label="Editar lead"
                        onclick={() => push(`${routes.app.leadForm}?id=${lead.id}`)}
                      >
                        {#snippet icon()}<PencilIcon class="w-4 h-4" />{/snippet}
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        aria-label="Eliminar lead"
                        onclick={() => handleDeleteLead(lead.id)}
                      >
                        {#snippet icon()}<TrashIcon class="w-4 h-4" />{/snippet}
                      </Button>
                    </div>
                  </td>
                </tr>
              {/each}
            </tbody>
          </table>
        {/if}
      </div>

      {#if filteredLeads.length > 0}
        <div class="mt-4 text-sm text-text-muted">
          Mostrando {filteredLeads.length} de {leads.length} leads
        </div>
      {/if}
    </Card>
  </div>
{/if}

<script lang="ts">
  import { onMount } from 'svelte'
  import { push, router } from 'svelte-spa-router'
  import { leadsService } from 'lib/leads'
  import { LEAD_STATUS_CONFIG } from 'lib/types'
  import type { LeadCreate } from 'lib/types'
  import { routes } from 'lib/routes'
  import Card from 'lib/ui/Card.svelte'
  import Button from 'lib/ui/Button.svelte'
  import Input from 'lib/ui/Input.svelte'
  import Alert from 'lib/ui/Alert.svelte'
  import PageHeader from 'layout/PageHeader.svelte'

  const id = $derived(new URLSearchParams(router.querystring).get('id'))
  const isEdit = $derived(Boolean(id))

  let form = $state<LeadCreate>({
    first_name: '',
    last_name: '',
    email: '',
    company: '',
    status: 'new',
    note: '',
  })
  let loading = $state(false)
  let error = $state<string | null>(null)

  onMount(async () => {
    if (!id) return
    loading = true
    try {
      const lead = await leadsService.getLead(Number(id))
      form = {
        first_name: lead.first_name,
        last_name: lead.last_name,
        email: lead.email,
        company: lead.company,
        status: lead.status,
        note: lead.note,
      }
    } catch {
      error = 'No se pudo cargar el lead'
    } finally {
      loading = false
    }
  })

  async function handleSubmit(e: SubmitEvent) {
    e.preventDefault()
    error = null
    loading = true
    try {
      if (id) {
        await leadsService.updateLead(Number(id), form)
      } else {
        await leadsService.createLead(form)
      }
      push(routes.app.leads)
    } catch (err) {
      const detail = (err as { response?: { data?: { detail?: string } } })?.response?.data?.detail
      error = detail ?? 'Error al guardar el lead'
    } finally {
      loading = false
    }
  }
</script>

<div class="space-y-6">
  <PageHeader
    title={isEdit ? 'Editar lead' : 'Nuevo lead'}
    subtitle={isEdit ? 'Modifica los datos del lead' : 'Crea un nuevo lead'}
    breadcrumbs={[
      { name: 'Inicio', href: routes.app.dashboard },
      { name: 'Leads', href: routes.app.leads },
      { name: isEdit ? 'Editar' : 'Nuevo' },
    ]}
  />
  <Card class="max-w-xl mx-auto">
    <form onsubmit={handleSubmit} class="space-y-5">
      <div class="grid grid-cols-2 gap-4">
        <Input label="Nombre" placeholder="Nombre" bind:value={form.first_name} required />
        <Input label="Apellido" placeholder="Apellido" bind:value={form.last_name} required />
      </div>
      <Input label="Email" type="email" placeholder="Email" bind:value={form.email} required />
      <Input label="Empresa" placeholder="Empresa" bind:value={form.company} />
      <div>
        <span class="form-label">Estado</span>
        <select class="input-field" bind:value={form.status}>
          {#each Object.entries(LEAD_STATUS_CONFIG) as [key, config] (key)}
            <option value={key}>{config.label}</option>
          {/each}
        </select>
      </div>
      <Input label="Nota" placeholder="Nota" bind:value={form.note} />
      {#if error}<Alert type="error">{error}</Alert>{/if}
      <div class="flex gap-2 justify-end">
        <Button type="button" variant="outline" onclick={() => push(routes.app.leads)}>Cancelar</Button>
        <Button type="submit" variant="primary" {loading}>{isEdit ? 'Guardar cambios' : 'Crear lead'}</Button>
      </div>
    </form>
  </Card>
</div>

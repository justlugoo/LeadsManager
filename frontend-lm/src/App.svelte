<script lang="ts">
  import Router, { router, replace } from 'svelte-spa-router'
  import { routes } from 'lib/routes'
  import { token } from 'lib/stores/auth'
  import MainLayout from 'layout/MainLayout.svelte'
  import Auth from 'routes/Auth.svelte'
  import Dashboard from 'routes/Dashboard.svelte'
  import LeadsList from 'routes/LeadsList.svelte'
  import LeadForm from 'routes/LeadForm.svelte'
  import LeadDetail from 'routes/LeadDetail.svelte'
  import Profile from 'routes/Profile.svelte'

  const appRoutes = {
    '/dashboard': Dashboard,
    '/leads': LeadsList,
    '/leads/form': LeadForm,
    '/leads/:id': LeadDetail,
    '/profile': Profile,
  }

  const isAuthRoute = $derived(router.location === routes.auth)

  $effect(() => {
    if (!$token && !isAuthRoute) {
      replace(routes.auth)
    } else if ($token && (isAuthRoute || router.location === '/')) {
      replace(routes.app.dashboard)
    }
  })
</script>

{#if isAuthRoute}
  <Auth />
{:else if $token}
  <MainLayout>
    <Router routes={appRoutes} />
  </MainLayout>
{/if}

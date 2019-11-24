<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light mb-5">
    <AppNavigation />
    <NavbarList />
  </nav>
</template>

<script>
import AppNavigation from '@/components/Molecules/HeaderNavigation/AppNavigation'
import NavbarList from '@/components/Molecules/HeaderNavigation/NavbarList'

export default {
  components: {
    AppNavigation,
    NavbarList
  },
  methods: {
    //
  }
}
</script>

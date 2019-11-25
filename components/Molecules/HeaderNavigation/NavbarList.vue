<template>
  <div>
    <v-toolbar
      :color="'grey darken-4'"
      dark
    >
      <v-toolbar-title><NavbarHomeLink /></v-toolbar-title>

      <v-spacer></v-spacer>

      <v-toolbar-items>
        <v-btn text><NavbarTopicsLink /></v-btn>
        <v-btn text><NavbarCreateLink /></v-btn>
        <template v-if="!$auth.loggedIn">
          <v-btn text><NavbarLoginLink /></v-btn>
          <v-btn text><NavbarRegisterLink /></v-btn>
        </template>
        <template v-if="$auth.loggedIn">
          <v-btn text><NavbarUserLink /></v-btn>
          <v-btn text><NavbarLogoutLink /></v-btn>
        </template>
      </v-toolbar-items>
    </v-toolbar>
  </div>
</template>

<script>
import NavbarTopicsLink from '@/components/Atoms/Link/NavbarTopicsLink'
import NavbarHomeLink from '@/components/Atoms/Link/NavbarHomeLink'
import NavbarLoginLink from '@/components/Atoms/Link/NavbarLoginLink'
import NavbarCreateLink from '@/components/Atoms/Link/NavbarCreateLink'
import NavbarRegisterLink from '@/components/Atoms/Link/NavbarRegisterLink'
import NavbarLogoutLink from '@/components/Atoms/Link/NavbarLogoutLink'
import NavbarUserLink from '@/components/Atoms/Link/NavbarUserLink'

export default {
  components: {
    NavbarTopicsLink,
    NavbarHomeLink,
    NavbarCreateLink,
    NavbarLoginLink,
    NavbarRegisterLink,
    NavbarLogoutLink,
    NavbarUserLink
  },
  methods: {
    //
  }
}
</script>

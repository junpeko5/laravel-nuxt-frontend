<template>
  <div class="collapse navbar-collapse" id="navbarSupportedContent">
    <ul class="navbar-nav mr-auto">
      <li class="nav-item active">
        <NavbarHomeLink />
      </li>
      <li class="nav-item">
        <NavbarTopicsLink />
      </li>
      <li class="nav-item">
        <NavbarCreateLink />
      </li>
    </ul>
    <template v-if="!$auth.loggedIn">
      <ul class="navbar-nav ml-auto">
        <li class="nav-item">
          <NavbarLoginLink />
        </li>
        <li class="nav-item">
          <NavbarRegisterLink />
        </li>
      </ul>
    </template>
    <template v-if="$auth.loggedIn">
      <ul class="navbar-nav ml-auto">
        <li class="nav-item">
          <NavbarUserLink />
        </li>
        <li class="nav-item">
          <NavbarLogoutLink />
        </li>
      </ul>
    </template>
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

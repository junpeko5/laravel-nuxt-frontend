<template>
  <div>
    <NavbarTopLink />
    <button class="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
  </div>
</template>

<script>
import NavbarTopLink from '@/components/Atoms/Link/NavbarTopLInk'

export default {
  components: {
    NavbarTopLink
  },
  methods: {
    //
  }
}
</script>

<template>
  <div class="text-center">
    <v-pagination
      v-model="pageCount"
      :length="pagenateLength"
      :total-visible="totalVisible"
      @input="onPaginationClicked"
    ></v-pagination>
  </div>
</template>

<script>
  export default {
    props: {
      length: Number,
      page: Number
    },
    data () {
      return {
        totalVisible: 5,
        pagenateLength: this.length,
        pageCount: this.page
      }
    },
    methods: {
      onPaginationClicked(pageNumber) {
        this.$emit("updatePagenation", pageNumber)
      }
    }
  }
</script>

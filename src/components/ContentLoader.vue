<template>
  <div class="content-loader">
    <div class="margin-vertical text-align-right">
      <f7-button
        class="padding-horizontal display-inline-block"
        raised
        fill
        round
        @click.prevent="refreshData()"
        color="blue"
        :disabled="isLoading"
      >
        <f7-preloader color="white" v-if="isLoading" :size="16"></f7-preloader>
        {{!isLoading? 'Refresh': 'Loading...'}}
      </f7-button>
    </div>
    <template v-if="!isLoading">
      <slot name="content"></slot>
    </template>
    <div v-else class="text-align-center">
      <f7-preloader color="blue" :size="96"></f7-preloader>
      <h2>
        Stay safe, stay home!
        <br />Ress ou lakaz
      </h2>
    </div>
  </div>
</template>

<script>
export default {
  name: "ContentLoader",
  props: { isLoading: { default: true } },
  data() {
    return {};
  },
  methods: {
    refreshData() {
      this.$emit("refresh-data");
    }
  }
};
</script>
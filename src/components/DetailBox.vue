<template>
  <v-content>
    <h4><slot></slot></h4>
  </v-content>
</template>

<script lang="ts">
export default {
  name: "DetailBox",
};
</script>

<style>
h4 {
  text-align: left;
  padding: 10px;
  color: #4caf50;
}
</style>

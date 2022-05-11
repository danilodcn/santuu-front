<template>
  <div class="proposal-values">
    <BoxContent :data="a"></BoxContent>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import BoxContent from "@/components/BoxContent.vue"; // @ is an alias to /src
import DetailBox from "@/components/DetailBox.vue";
const a = {
  desserts: [
    {
      name: "Frozen Yogurt",
      calories: 159,
    },
    {
      name: "Ice cream sandwich",
      calories: 237,
    },
    {
      name: "Eclair",
      calories: 262,
    },
    {
      name: "Cupcake",
      calories: 305,
    },
    {
      name: "Gingerbread",
      calories: 356,
    },
    {
      name: "Jelly bean",
      calories: 375,
    },
    {
      name: "Lollipop",
      calories: 392,
    },
    {
      name: "Honeycomb",
      calories: 408,
    },
    {
      name: "Donut",
      calories: 452,
    },
    {
      name: "KitKat",
      calories: 518,
    },
  ],
};
@Component({
  components: {
    BoxContent,
    DetailBox,
  },
})
export default class ProposalValues extends Vue {
  a = a;
}
</script>

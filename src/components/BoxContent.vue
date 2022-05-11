<template>
  <v-card class="box-content">
    <slot></slot>
    <v-simple-table>
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-left">Name</th>
            <th class="text-left">Calories</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in data.desserts" :key="item.name">
            <td>{{ item.name }}</td>
            <td>{{ item.calories }}</td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
  </v-card>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

interface IDetailedInfo {
  value: string | number;
  description: string;
}

interface ITableCol {
  title: IDetailedInfo;
  values: IDetailedInfo[];
}

@Component
export default class ProposalValues extends Vue {
  @Prop() data!: ITableCol[];
}
</script>

<style scoped>
.box-content {
  margin: 30px;
  padding: 50px;
}
</style>

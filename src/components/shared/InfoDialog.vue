<template>
  <v-dialog v-model="active" max-width="500">
    <template v-slot:activator="{ on, attrs }">
      <v-btn color="primary" fab small text v-bind="attrs" v-on="on">
        <slot />
      </v-btn>
    </template>
    <v-card>
      <v-card-title class="text-subtitle-1">
        <v-row justify="center" align="center">
          <p style="max-width: 90%">
            {{ title }}
          </p>
          <v-spacer></v-spacer>
          <v-btn fab small text color="primary" @click="active = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-row>
      </v-card-title>
      <v-card-text v-if="text" class="text-body1" v-text="text" />
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

@Component
export default class InfoDialog extends Vue {
  active = false;

  @Prop() title = "";
  @Prop() text = "";
}
</script>

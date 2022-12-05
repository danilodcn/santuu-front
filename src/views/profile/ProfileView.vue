<template>
  <v-container class="pt-12 px-10">
    <v-row class="col-12">
      <div class="profile">
        <v-btn icon class="mt-auto mb-auto">
          <v-icon large @click.prevent="">mdi-chevron-left</v-icon>
        </v-btn>
        <v-menu offset-y>
          <template v-slot:activator="{ on, attrs }">
            <v-avatar size="200" v-bind="attrs" v-on="on">
              <img :src="userData.avatarUrl" alt="Foto de perfil do Danilo" />
            </v-avatar>
          </template>
          <v-list>
            <v-list-item>
              <v-list-item-title>Remover</v-list-item-title>
            </v-list-item>
            <v-list-item>
              <v-list-item-title>Enviar nova foto</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </div>
    </v-row>
    <div class="mt-5">
      <p class="text-center text-h5">Danilo da Conceição Nascimento</p>
    </div>
    <v-container fluid class="mx-auto">
      <v-row justify="center">
        <v-col v-bind="inputProps">
          <v-text-field
            v-model="userData.firstName"
            label="Nome"
            required
          ></v-text-field>
        </v-col>
        <v-col v-bind="inputProps">
          <v-text-field
            v-model="userData.lastName"
            label="Sobrenome"
            required
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row justify="center">
        <v-col v-bind="inputProps">
          <v-text-field
            v-model="userData.firstName"
            label="Nome"
            required
          ></v-text-field>
        </v-col>
        <v-col v-bind="inputProps">
          <v-text-field
            v-model="userData.lastName"
            label="Sobrenome"
            required
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row justify="center">
        <v-col v-bind="inputProps">
          <v-text-field
            v-model="userData.firstName"
            label="Nome"
            required
          ></v-text-field>
        </v-col>
        <v-col v-bind="inputProps">
          <v-text-field
            v-model="userData.lastName"
            label="Sobrenome"
            required
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row justify="center">
        <v-col v-bind="inputProps">
          <v-text-field
            v-model="userData.firstName"
            label="Nome"
            required
          ></v-text-field>
        </v-col>
        <v-col v-bind="inputProps">
          <v-text-field
            v-model="userData.lastName"
            label="Sobrenome"
            required
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row justify="center">
        <v-col v-bind="inputProps">
          <v-text-field
            v-model="userData.firstName"
            label="Nome"
            required
          ></v-text-field>
        </v-col>
        <v-col v-bind="inputProps">
          <v-text-field
            v-model="userData.lastName"
            label="Sobrenome"
            required
          ></v-text-field>
        </v-col>
      </v-row>
    </v-container>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import EventCard from "@/components/shared/events/EventCard.vue";
import { ProfileHandler } from "@/helper/profile";

import LoadingTips from "@/components/LoadingTips.vue";

const profileHandler = new ProfileHandler();

@Component({
  components: { EventCard, LoadingTips },
})
export default class ProfileView extends Vue {
  userData = profileHandler.userData;
  inputProps = { cols: "12", xs: "8", sm: "6", md: "5", lg: "4" };
}
</script>

<style lang="scss">
.profile {
  display: flex;
  margin-left: auto;
  margin-right: auto;
  gap: 2rem;
}
</style>

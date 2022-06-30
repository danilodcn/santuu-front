<template>
  <v-container class="content-container">
    <h2 class="title-content my-15">Escolha uma opção</h2>
    <v-row class="cards-sinister justify-center">
      <router-link
        to="/bike-events/events/?type=going"
        class="card-events col-8 col-md-3"
      >
        <v-card class="py-3 py-md-5">
          <v-icon class="col-6 offset-3" size="90">mdi-bike</v-icon>
          <p class="col-12 text-center py-0 my-0">Eventos Disponíveis</p>
        </v-card>
      </router-link>
      <router-link
        to="/bike-events/events/?type=my_events"
        class="card-events col-8 col-md-3"
      >
        <v-card class="py-3 py-md-5">
          <v-icon class="col-6 offset-3" size="90">mdi-calendar-check</v-icon>
          <p class="col-12 text-center py-0 my-0">Meus Eventos</p>
        </v-card>
      </router-link>
      <router-link
        to="/bike-events/events/?type=finished"
        class="card-events col-8 col-md-3"
      >
        <v-card class="py-3 py-md-5">
          <v-icon class="col-6 offset-3" size="90">mdi-calendar-remove</v-icon>
          <p class="col-12 text-center py-0 my-0">Eventos Finalizados</p>
        </v-card>
      </router-link>
    </v-row>
  </v-container>
</template>

<style lang="scss" scoped>
@import "@/scss/main.scss";
p {
  color: rgb(124, 124, 124);
  font-size: 1.2em;
}
a {
  text-decoration: none;
}
.title-content {
  text-align: center;
  font-weight: 500;
  color: $main-dark-color;
}
.card-events:hover {
  transform: scale(1.05);
}
.card-events:first-child i,
.card-events:last-child i {
  color: $main-color;
}
@media (min-width: 960px) {
  p {
    font-size: 0.9em;
  }
  .title-content {
    font-weight: 800;
    margin: 30px auto 60px 10px;
  }
}
</style>

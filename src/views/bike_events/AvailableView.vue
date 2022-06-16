<template>
  <v-container class="content-container">
    <h3 class="title-content">Eventos Disponíveis</h3>
    <div class="card-item-container">
      <ul>
        <template v-for="bike_event in bike_events">
          <li :key="bike_event" class="item-proposal">
            <a
              href="{% url 'bike_event_available_view' pk=bike_event.id %}"
            ></a>
            <strong>Nome:</strong>
            <p>
              {{ bike_event }}
            </p>
            <strong>Data de Inicio:</strong>
            <p>
              {{ bike_event.initial_date }}
            </p>
            <strong>Data de Final:</strong>
            <p>{{ bike_event.final_date }}</p>
            <div class="info-proposal">
              <div class="proposal-program">
                <li v-if="bike_event.poster"></li>
                <!-- <img
                  src="{{bike_event.poster.url}}"
                  width="80px"
                  height="60px"
                /> -->
              </div>
            </div>
          </li>
        </template>
      </ul>
    </div>
  </v-container>
</template>

<script></script>

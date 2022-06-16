<template>
    <v-container class="content-container">
    <h3 class="title-content">Eventos Concluidos</h3>
    <div class="card-item-container">
        <ul>
            <li v-for= "bike_event in bike_events" :keys="bike_event"></li>
            <li class="item-proposal">
                <strong>Nome:</strong>
                <p>
                    {{bike_event}}
                </p>
                <strong>Data de Inicio:</strong>
                <p>
                    {{ bike_event.initial_date }}
                </p>
                <strong>Data de Final:</strong>
                <p>{{ bike_event.final_date }}</p>
                <a href="{% url 'bike_event_concluded_view' pk=bike_event.id %}">
               <div class="info-proposal">
                    <div class="proposal-program">
                        <li v-if="bike_event.poster" ></li>
                            <img src="{{bike_event.poster.url}}"
                                width="80px"
                                height="60px" />
                    </div>
                </div>
            </ul>
        </div>
    </div>
</template>
<template>
    <v-container class="content-container">
        <h3 class="title-content">Meus Eventos</h3>
        <div class="card-item-container">
            <li v-if="bike_events" ></li>
            <ul>
                <li v-for="bike_event in bike_events"></li>
                <a href="{% url 'bike_event_scheduled_view' pk=bike_event.id %}">
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
                    <li v-if="biker.has_checkin" ></li>
                    <strong>Protocolo de Check-in:</strong>
                    <p>{{biker.protocol }}</p>   
                <div class="info-proposal">
                        <div class="proposal-program">
                            <li v-if = "bike_event.poster"></li>
                                <img src="{{bike_event.poster.url}}"
                                    width="80px"
                                    height="60px" />
                        </div>
                    </div>
                    </li></a>
            </ul>
            <li v-else ></li>
            <span> Para fazer o seu check-in escolha um evento 
                <a onclick="document.location.href='/dashboard/bike/events/available'" style="color: #cccb00; font-weight: 700; cursor: pointer">clicando aqui.</a>
            </span>
        </div>
</template> 
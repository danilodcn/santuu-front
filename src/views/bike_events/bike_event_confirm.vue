<!-- <template>
    <div class="content">
        <div class="container-send">
                <img class="carraca" src="{% static 'assets/carraca.svg' %}">
                <li v-if="biker.bike_event"></li>
                    <p class="title-comunicate">Você já possui confirmação em outro evento</p>
                        <div class="content-send">
                            <p class="desc-comunicate"><strong>{{biker.bike_event.name}}</strong> </p>
                            <p class="desc-comunicate">que vai acontecer no dia <strong>{{bike_event.initial_date}}</strong></p>
                            <p class="desc-comunicate"> Ao chegar no local, faça Check-in</p>

                        </div>
                    <form method="GET" action="{% url 'bike_event_scheduled' %}"></br>
                        {% csrf_token %}
                        <button type="submit" class="btn-certificate btn-check-user">Meus Eventos</button>
                    </form>
                    <li v-else></li>
                        <p class="title-comunicate">Deseja Confirmar, sua presença nesse evento ?</p>
                        <div class="content-send">
                            <p class="desc-comunicate"><strong>{{bike_event.name}}</strong> </p>
                            <p class="desc-comunicate">que vai acontecer no dia <strong>{{bike_event.initial_date}}</strong></p>
                        </div>
                    <form method="POST" action="{% url 'bike_event_available_view' pk=bike_event.id %}"></br>
                        {% csrf_token %}
                        <button type="submit" class="btn-certificate btn-check-user">Quero participar</button>
                    </form>
            </div>
        </div>
</template> -->

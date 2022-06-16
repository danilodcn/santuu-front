<template>
    <v-container class="content">
        <div class="container-send">
                <img class="carraca" src="{% static 'assets/carraca.svg' %}">
                <p class="title-comunicate">Só falta você fazer o check-in!</p>
                <div class="content-send">
                    <p class="desc-comunicate">Pronto, para confirmar sua presença no evento: <strong>{{bike_event.name}}</strong> </p>
                    <p class="desc-comunicate">que vai acontecer no dia <strong>{{bike_event.initial_date}}</strong></p>
                    <p class="desc-comunicate">faça o check-in no botão abaixo</p>
                </div>
            <form method="GET" action="{% url 'bike_event_scheduled_view' pk=bike_event.id %}"></br>
                {% csrf_token %}
                <button type="submit" class="btn-certificate btn-check-user">Fazer check-in</button>
            </form>
        </div>
    </div>
</template>
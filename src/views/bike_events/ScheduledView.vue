<template>
    <div id="termModal" class="modal">
      <div class="modal-content">
           <span class="close">&times;</span>
          <p>Pelo presente instrumento eu declaro que com o recebimento do bem abaixo mencionado, darei a
              SEGUROS SURA BRASIL, a mais ampla, plena, geral, rasa, total e irrestrita quitação em decorrência
              do presente sinistro ocorrido com o item segurado
              MARCA: <strong>{{bike.brand}}</strong>, MODELO: <strong>{{bike.model}}</strong> e NÚMERO DE SÉRIE: <strong>{{bike.serial_number}}</strong>, ocorrido na data de {{sinister.date}}, alcançando tal
              quitação aos danos
              materiais, renunciando a tudo expressamente, constituindo-se ainda, o presente acordo, na figura de
              transação prevista no artigo 840 do Código Civil.
              A presente transação é firmada livre e conscientemente, sem qualquer vício de consentimento,
              conferindo as partes signatárias e a este acordo os efeitos da coisa julgada, renunciando,
              expressamente, a qualquer direito de arrependimento, e declarando inexistir dolo, coação ou erro
              essencial quanto à pessoa ou coisa controversa, nos termos estabelecidos no artigo 849 do Código Civil.
          </p>
            <br>
          <a href="/dashboard/insurance_claim/discharge?sinister={{sinister.id}}" class="btn-certificate btn-resume-sinister"> Aceitar</a>
        </div>
    </div>
    <!-- <div class="content-container"> -->
        <h3 class="title-content">{{bike_event.name}}</h3>
        <div class="center-block white-block" style="border-radius: 8px; padding: 25px 20px 25px 20px">
            <div class="resume-sinister">
                <div class="row line-resume-sinister">
                    <div class="container">
                        <p>Data Inicial</p>
                        <span>
                            {{bike_event.initial_date}}
                        </span>
                    </div>
                    <div class="container">
                        <p>Data Final</p>
                            {{bike_event.final_date}}
                    </div>
                </div>
            </div>
        </div>
        <br>
        <h3 class="title-content">Descrição do Evento</h3>
        <div class="center-block">
            <div class="bike-certificate-container white-block" style="border-radius: 8px; padding: 25px 20px 25px 20px;">
                <div class="row status-block-sinister">
                    <div class="container">
                        <div class="container container-status-sinister">
                            <span class="name-bike-certificate">
                                {{bike_event.description}}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
            <h3 class="title-content">Fazer Check-in no evento</h3>
                <div class="center-block">
                    <div class="bike-certificate-container white-block" style="border-radius: 8px; padding-left: 20px;">
                        <li v-if="biker.has_checkin == False"></li>
                        <div class="row row-inputs">
                            <form method="post" enctype="multipart/form-data">
                                <template v-for="field in form">
                                <li :key="field" ></li>
                                    <label for="id_{{ field.name }}">
                                        <p style="margin-top: 20px; cursor: pointer;">
                                        {{field.label}}
                                        </p>
                                    </label>
                                    <span>{{field}}</span>
                                <li v-if="field.errors" ></li>
                                    <div class="error-msg">{{field.errors}}</div>
                                    <br>
                                    <button onclick="validar()" class="btn-certificate" id="botao" style="margin-top: 20px;">Fazer Check-in</button>
                                    </template>
                                </form>
                            <div>
                            <li v-else></li>
                                <div class="container" style="margin-left: 35%; margin-bottom: 50px; margin-top: 30px;">
                                <img class="mb-4" style="margin-left:13%" src='{% static "core/img/logo.png" %}' alt="" width="102" height="102">
                                <h3 class="h3 font-weight-normal" style="margin-buttom: 10px; padding: 25px 20px 25px 20px;"> Você já fez check-in neste evento</h3>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    $(document).ready(function(){
        $("input[type=file]").prop('required',true);
    })
</script>

<!-- Acho que não é utilizado isso nos eventos, mas vou deixar de standby na dúvida  -->

<!-- <template>
  <v-container>
    <div id="termModal" class="modal">
      <div class="modal-content">
        <span class="close">&times;</span>
        <p>
          Pelo presente instrumento eu declaro que com o recebimento do bem
          abaixo mencionado, darei a SEGUROS SURA BRASIL, a mais ampla, plena,
          geral, rasa, total e irrestrita quitação em decorrência do presente
          sinistro ocorrido com o item segurado MARCA:
          <strong>{{ bike.brand }}</strong
          >, MODELO: <strong>{{ bike.model }}</strong> e NÚMERO DE SÉRIE:
          <strong>{{ bike.serial_number }}</strong
          >, ocorrido na data de {{ sinister.date }}, alcançando tal quitação
          aos danos materiais, renunciando a tudo expressamente, constituindo-se
          ainda, o presente acordo, na figura de transação prevista no artigo
          840 do Código Civil. A presente transação é firmada livre e
          conscientemente, sem qualquer vício de consentimento, conferindo as
          partes signatárias e a este acordo os efeitos da coisa julgada,
          renunciando, expressamente, a qualquer direito de arrependimento, e
          declarando inexistir dolo, coação ou erro essencial quanto à pessoa ou
          coisa controversa, nos termos estabelecidos no artigo 849 do Código
          Civil.
        </p>
        <br />
        <a href="#" class="btn-certificate btn-resume-sinister">Aceitar</a>
      </div>
    </div>
    <div class="container">
      <h3 class="title-content">{{ bike_event.name }}></h3>
      <div class="center-block white-block">
        <div class="resume-sinister">
          <div class="row line-resume-sinister">
            <div class="container">
              <p>Data Inicial</p>
              <span>
                {{ bike_event.initial_date }}
              </span>
            </div>
            <div class="container">
              <p>Data Final</p>
              {{ bike_event.final_date }}
            </div>
          </div>
        </div>
      </div>
      <br />
      <h3 class="title-content">Descrição do Evento</h3>
      <div class="center-block">
        <div class="bike-certificate-container white-block">
          <div class="row status-block-sinister">
            <div class="container">
              <div class="container container-status-sinister">
                <span class="name-bike-certificate">
                  {{ bike_event.description }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="center-block">
        <div class="bike-certificate-container white-block">
          <div class="row row-inputs">
            <form
              action="{% url 'bike_event_index' %}"
              id=""
              method="GET"
              enctype="multipart/form-data"
            >
              <v-row justify="space-between" class="mx-5">
                <v-btn text>Voltar</v-btn>
                <v-btn text class="button">Fazer Check-in</v-btn>
              </v-row>
            </form>
          </div>
        </div>
      </div>
    </div>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import InfoDialog from "@/components/shared/InfoDialog.vue";

@Component({
  components: {
    InfoDialog,
  },
})
export default class Available extends Vue {
  bike = {
    brand: "Caloi",
    serial_number: "40028922",
    model: "Intel",
  };
  bike_event = {
    name: "UCI WORLD CUP - PETRÓPOLIS - RJ",
    initial_date: "20-02-2000",
    final_date: "20-02-2030",
    poster: {
      url: "https://santuu-storage-production.s3.amazonaws.com/bike_event/7e17c950-9929-41a0-a7d4-cc79b915ef7f.png?AWSAccessKeyId=AKIAXOYKOXGQ7UE4CH42&Signature=BTRVbdq7IBnZZnj4JHdK0cHMTMk%3D&Expires=1656015537",
    },
    description: "2022 MERCEDES-BENZ UCI MOUNTAIN BIKE WORLD CUP",
  };
  sinister = {
    date: "30-02-2030",
  };
}
</script> -->

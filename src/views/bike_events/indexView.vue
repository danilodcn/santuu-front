<template>
  <div class="content-container">
    <h3 class="title-content">O que deseja fazer?</h3>
    <div class="cards-sinister">
      <a href="available" class="card-events">
        <img src="@/assets/bike.svg/" width="125px" height="85px" />
        <p>Eventos Disponíveis</p>
      </a>
      <a href="scheduled" class="card-events">
        <img src="@/assets/checklist.svg" width="125px" height="85px" />
        <p>Meus Eventos</p>
      </a>
      <a href="concluded" class="card-events">
        <img src="@/assets/bike.svg/" width="125px" height="85px" />
        <p>Eventos Finalizados</p>
      </a>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "@/scss/main.scss";
.card-events {
  width: 400px;
  height: 200px;
  margin: 15px 20px;
  box-shadow: 3px 3px 9px #0000001f;
  border-radius: 5px;
  display: flex;
  float: left;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.card-events:first-child {
  background: #e6f7e8;
}

.card-events:last-child {
  background-color: white;
}
</style>

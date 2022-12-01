<template>
  <GmapMap :center="center" :zoom="20" style="width: 100%; height: 400px" />
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class TesteComp extends Vue {
  options = {
    enableHighAccuracy: true,
  };
  // eslint-disable-next-line
  coords = {} as GeolocationCoordinates;
  get center() {
    return { lat: this.coords.latitude, lng: this.coords.longitude };
  }

  created() {
    this.getLocation();
  }

  // eslint-disable-next-line
  success(position: GeolocationPosition) {
    console.info(position);
    this.coords = position.coords;
  }
  // eslint-disable-next-line
  error(error: GeolocationPositionError) {
    console.warn(`ERROR(${error.code}): ${error.message}`);
  }

  getLocation() {
    navigator.geolocation.getCurrentPosition(
      this.success,
      this.error,
      this.options
    );
  }
}
</script>

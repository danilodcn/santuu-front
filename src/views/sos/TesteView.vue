<template>
  <GmapMap :center="center" :zoom="20" style="width: 100%; height: 400px">
    <GmapPolyline
      :editable="false"
      :path="paths"
      visible="true"
      ref="polyline"
    />
  </GmapMap>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { sosService } from "@/api/sos";

@Component
export default class MapDirections extends Vue {
  apiKey = "AIzaSyDVMlhAb27wQjAxWhww-vEKbmUtQXZjE88";
  paths = [
    { lat: -4.948918605677907, lng: -47.50236213790677 },
    { lat: -4.951202708685028, lng: -47.50240351692399 },
    { lat: -4.948893954102727, lng: -47.50234608724194 },
  ];

  options = {
    enableHighAccuracy: true,
  };
  // eslint-disable-next-line
  coords = {} as GeolocationCoordinates;
  get center() {
    return { lat: this.coords.latitude, lng: this.coords.longitude };
  }

  // async steps() {
  //   const response = await sosService.getSteps();
  //   console.log(response);
  // }

  async getStepsApi() {
    return fetch(
      "https://maps.googleapis.com/maps/api/directions/json?\
      origin=-4.951202708685028,-47.50240351692399\
      &destination=-4.951169640013109,-47.50147841208672\
      &mode=bicycling\
      &key=AIzaSyDkHRIc73aAeYGZrWQ6423o4BTxoNnAGfQ"
    )
      .then((data) => data.json())
      .catch((err) => console.log(err));
  }

  async getStep() {
    const response = await this.getStepsApi();
    console.log(response);
  }

  created() {
    this.getLocation();
    this.getStep();
    // this.steps();
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

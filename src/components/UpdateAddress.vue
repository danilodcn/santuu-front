<template>
  <v-form ref="form" :disabled="!update">
    <v-row>
      <v-col cols="12" md="3">
        <v-text-field
          color="grey"
          filled
          label="CEP"
          v-mask="'#####-###'"
          :rules="obrigatory"
          :error="!validZipCode"
          :error-messages="!validZipCode ? ['CEP Inválido'] : ''"
          v-model="form.zipcode"
          @change="newCep()"
          clearable
          hide-spin-buttons
          required
        >
        </v-text-field>
      </v-col>
      <v-col cols="12" md="4">
        <v-text-field
          color="grey"
          filled
          label="Estado"
          :rules="obrigatory"
          v-model="form.state"
          clearable
          hide-spin-buttons
        >
        </v-text-field>
      </v-col>
      <v-col cols="12" md="4">
        <v-text-field
          color="grey"
          filled
          label="Cidade"
          :rules="obrigatory"
          v-model="form.city"
          clearable
          hide-spin-buttons
        >
        </v-text-field>
      </v-col>
      <v-col cols="12" md="4">
        <v-text-field
          color="grey"
          filled
          label="Bairro"
          :rules="obrigatory"
          v-model="form.neighborhood"
          clearable
          hide-spin-buttons
        >
        </v-text-field>
      </v-col>
      <v-col cols="12" md="4">
        <v-text-field
          color="grey"
          filled
          label="Rua"
          :rules="obrigatory"
          v-model="form.street"
          clearable
          hide-spin-buttons
        >
        </v-text-field>
      </v-col>
      <v-col cols="12" md="2">
        <v-text-field
          color="grey"
          filled
          label="Número"
          :rules="obrigatory"
          v-model="form.number"
          clearable
          hide-spin-buttons
        >
        </v-text-field>
      </v-col>
      <v-col cols="12" md="4">
        <v-text-field
          color="grey"
          filled
          label="Complemento"
          :rules="obrigatory"
          v-model="form.complement"
          clearable
          hide-spin-buttons
        >
        </v-text-field>
      </v-col>
    </v-row>
  </v-form>
</template>
<script lang="ts">
import { BaseComponent } from "@/utils/component";
import { Component, Prop, Watch } from "vue-property-decorator";
import { IAddress } from "@/types/address";
import { validateForm } from "@/utils/utils";
import { AddressByCepService } from "@/api/addressByCep";
import { AddressService } from "@/api/address";

const addressByCepService = new AddressByCepService();
const addressService = new AddressService();

@Component
export default class UpdateAddress extends BaseComponent {
  @Prop() update!: boolean;
  @Prop() addressId!: number;
  validZipCode = true;

  form = {
    zipcode: "",
    state: "",
    city: "",
    neighborhood: "",
    street: "",
    number: "",
    complement: "",
  } as IAddress;

  async newCep() {
    this.changeLoading(true);
    const response = await addressByCepService.getAddress(this.form.zipcode);
    this.changeLoading(false);

    console.log(response);

    if (!response.error && !response.erro) {
      this.form.street = response.logradouro;
      this.form.neighborhood = response.bairro;
      this.form.state = response.uf;
      this.form.city = response.localidade;
      this.validZipCode = true;
      return true;
    }

    this.validZipCode = false;
    return false;
  }

  async associateAddress() {
    if (validateForm(this.$refs.form) && this.addressId && this.validZipCode) {
      this.changeLoading(true);
      const response = await addressService.updateAddress(
        this.addressId,
        this.form
      );
      this.changeLoading(false);
      if (!response.error) {
        return true;
      } else {
        this.fail(response);
        return false;
      }
    }

    return false;
  }

  fail(response: any) {
    this.changeMainDialog({
      msg:
        response.axiosError.response.data?.error ||
        "Não foi possível realizar esta ação",
      title: "Erro",
      persistent: false,
      active: true,
      bntClose: true,
    });
  }

  obrigatory = [(v: string) => !!v || "Campo obrigatório"];

  async getData() {
    if (this.addressId) {
      const response = await addressService.getAddress(this.addressId);
      this.form = response as IAddress;
    }
  }

  @Watch("addressId")
  onAddressIdChange() {
    this.getData();
  }
}
</script>

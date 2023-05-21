<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <v-app>
    <Header />
    <Views />
  </v-app>
</template>

<script>
import Header from "@/components/Header";
import Views from "./View";
export default {
  name: "DefaultLayout",
  components: {
    Header,
    Views,
  },
};
</script>

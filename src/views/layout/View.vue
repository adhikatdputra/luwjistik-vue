<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <v-main>
    <div class="content-main-area">
      <div class="bg-blue-ab"></div>
      <div class="k-wrapping">
        <div class="k-dashboard">
          <Sidebar />
          <div class="k-content">
            <router-view />
          </div>
        </div>
      </div>
    </div>
  </v-main>
</template>

<script>
import Sidebar from "@/components/Sidebar";
export default {
  name: "ViewLayout",
  components: {
    Sidebar,
  },
  data() {
    return {};
  },
};
</script>

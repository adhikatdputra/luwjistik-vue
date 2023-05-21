<template>
  <div>
    <Loading :isLoading="isLoading" />
    <Alert
      :notifdanger="$root.notifdanger"
      :notifsuccess="$root.notifsuccess"
      :textNotif="$root.textNotif"
    />
    <div class="header">
      <div class="k-wrapping">
        <div class="content">
          <img src="@/assets/img/header-logo.svg" alt="" />
          <div class="menu">
            <a @click="logout"
              ><v-icon color="black">mdi-logout</v-icon> Logout</a
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<!-- eslint-disable -->
<script>
import Loading from "@/components/Loading";
import Alert from "@/components/Alert.vue";
export default {
  name: "HeaderCMS",
  components: {
    Loading,
    Alert,
  },
  data() {
    return {
      isLoading: false,
    };
  },

  methods: {
    // /auth/profile
    logout() {
      this.$root.alert("Logout Success", "success");
      this.isLoading = true;
      this.$root.token(false);
      window.localStorage.removeItem("tokenExp");
      setTimeout(() => {
        this.isLoading = false;
      }, 1000);
      setTimeout(() => {
        this.$router.push({
          path: `/login`,
        });
      }, 2000);
    },
  },
  mounted() {
    var token = this.$root.token();
    if (!token) {
      this.$root.token(false);
      this.$router.replace("/login");
    } else {
      var newDate = new Date(window.localStorage.getItem("tokenExp"));
      if (newDate.getDate() != new Date().getDate()) {
        this.$root.token(false);
        this.$router.replace("/login");
      } 
    }
  },
};
</script>
<style lang="scss" scoped>
.header {
  box-shadow: 1px 5px 20px 0px rgb(186 186 186 / 26%);
  padding: 10px 0px;
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  background: #fff;
  // background: #2245e7;
  z-index: 9;

  .k-wrapping {
    padding: 10px 40px;
  }

  .content {
    display: flex;
    align-items: center;
    justify-content: space-between;

    img {
      width: 150px;
    }

    .menu {
      display: flex;
      align-items: center;

      a {
        margin-left: 24px;
        color: #000;
      }
    }
  }
}
</style>

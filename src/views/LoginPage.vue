<template>
  <v-fade-transition>
    <div class="main-container">
      <Alert
        :notifdanger="$root.notifdanger"
        :notifsuccess="$root.notifsuccess"
        :textNotif="$root.textNotif"
      />
      <div class="auth-area">
        <div class="heading">
          <img src="@/assets/img/header-logo.svg" alt="" />
        </div>
        <div class="form-area">
          <v-form class="f-form">
            <div class="f-label">Username</div>
            <v-text-field
              outlined
              placeholder="Enter your username"
              prepend-inner-icon="mdi-account-outline"
              v-model="username"
            ></v-text-field>
            <div class="f-label">Password</div>
            <v-text-field
              v-model="password"
              outlined
              placeholder="Enter a password"
              prepend-inner-icon="mdi-lock-outline"
              :append-icon="showPass ? 'mdi-eye' : 'mdi-eye-off'"
              :type="showPass ? 'text' : 'password'"
              @click:append="showPass = !showPass"
            ></v-text-field>
            <div class="cta">
              <v-btn
                block
                elevation="0"
                rounded
                class="btn-main"
                @click="Login()"
                :loading="isLoading"
                :disabled="!username || !password"
                >Login</v-btn
              >
            </div>
          </v-form>
        </div>
      </div>
    </div>
  </v-fade-transition>
</template>

<script>
import Alert from "@/components/Alert.vue";
import axios from "axios";

export default {
  name: "LoginAdmin",

  components: {
    Alert,
  },
  data: () => ({
    showPass: false,
    username: "",
    password: "",

    // notif
    isLoading: false,
  }),
  methods: {
    Login() {
      this.isLoading = true;
      var data = {
        username: this.username,
        password: this.password,
      };
      axios({
        method: "post",
        url: `/login`,
        data: data,
      })
        .then((res) => {
          console.log(res);
          var date = new Date();
          window.localStorage.setItem("tokenExp", date);
          this.$root.token(res.data.session);
          this.$root.alert("Login Success", "success");
          setTimeout(() => {
            this.$router.push(`/`);
          }, 3000);

          this.isLoading = false;
        })
        .catch((e) => {
          this.$root.alert(e.message, "danger");
          this.isLoading = false;
        });
    },
  },
  mounted() {},
};
</script>

<style lang="scss" scoped>
.btn-google {
  display: flex;
  align-items: center;
  border-radius: 8px;
  padding: 12px 16px;
  color: #393939;
  border: 1px solid #e2e2e2;
  margin-bottom: 16px;

  img {
    width: 20px;
  }

  span {
    padding-left: 12px;
  }
}

.btn-amazon {
  display: flex;
  align-items: center;
  border-radius: 4px;
  padding: 8px 8px;
  color: #393939;
  border: 1px solid #b08a28;
  margin-bottom: 16px;
  background: linear-gradient(181deg, #fce8a6, #ecc84d);
  font-size: 14px;
  width: 300px;
  margin: -15px auto 10px;

  img {
    width: 23px;
  }

  span {
    padding-left: 8px;
    font-weight: 500;
    text-align: center;
    width: 100%;
  }
}

.text-info {
  font-size: 13px;
  color: #000;
  position: relative;
  margin: 8px 0;
  text-align: center;

  span {
    background: #fff;
    position: relative;
    padding: 0 12px;
  }
}

.text-info::before {
  content: "";
  background: #000;
  height: 1px;
  width: 100%;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  right: 0;
}

.main-container {
  max-width: 414px;
  margin: 0 auto;
  background: #fff;
  width: 100%;
  min-height: 100vh;
  position: relative;
  padding: 20px;
}

.main-container {
  .bg-ellipse {
    position: absolute;
    top: 0;
    left: 0;
    width: 65%;
  }

  .auth-area {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    left: 0;
    width: 100%;
    box-shadow: 0 0 3px rgb(0 0 0 / 9%);
    border-radius: 16px;

    .heading {
      font-weight: 700;
      font-size: 20px;
      text-align: center;
      // margin-bottom: 40px;
      padding: 40px 0 50px;
      background: #f6f6f6;
      border-radius: 16px 16px 0 0;

      img {
        width: 50%;
      }
    }

    .form-area {
      padding: 30px 20px 20px;
      border-radius: 16px;
      margin-top: -20px;
      position: relative;
      background: #fff;
    }

    .text-help {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-top: -30px;

      a {
        font-weight: 600;
        font-size: 13px;
      }
    }

    .cta {
      margin: 10px 0 20px;
    }

    .signup-txt {
      text-align: center;
      font-size: 14px;
    }

    .forgot-pass {
      text-align: right;
      font-size: 14px;
      margin-top: -20px;
      margin-bottom: 20px;
    }
  }
}

.dialog-lms {
  .f-form {
    margin-bottom: 16px;
  }
}
</style>

<style lang="scss">
.capcha > div {
  margin: auto;
}

.text-help {
  .v-label {
    font-size: 13px !important;
    color: #2b2c27;
  }
}

#buttonGoogle iframe {
  margin: auto !important;
}
</style>

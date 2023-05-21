<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="sidebar">
    <div class="menu-cate"><span>Luwjistik Management</span></div>
    <div class="menu">
      <div class="list">
        <router-link :to="`/`">
          <div
            class="left"
            :class="{ active: this.$root.menuActive == 'dashboard' }"
          >
            <v-icon small> mdi-view-dashboard </v-icon>
          </div>
          <span>Orders</span>
        </router-link>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.sidebar::-webkit-scrollbar {
  display: none;
}

.sidebar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
.sidebar {
  width: 270px;
  min-height: calc(100vh - 150px);
  height: 100%;
  background: #fff;
  overflow-y: scroll;
  padding: 20px;
  box-shadow: 0 0 3px rgb(0 0 0 / 9%);
  margin-top: 20px;
  border-radius: 8px;

  .user {
    margin-bottom: 24px;

    .desc {
      font-size: 13px;
      margin-bottom: 8px;
    }
  }

  .menu-cate {
    font-size: 12px;
    color: #000;
    position: relative;
    margin-bottom: 16px;

    span {
      background: #fff;
      position: relative;
      padding-right: 12px;
    }
  }

  .menu-cate::before {
    content: "";
    background: #000;
    height: 1px;
    width: 100%;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: 0;
  }

  .menu {
    .list.active {
      span {
        font-weight: 600;
        color: #1961e4;
      }

      .left {
        .v-icon {
          color: #1961e4;
        }
      }
    }
    .list {
      :hover {
        span {
          font-weight: 600;
          color: #1961e4;
        }

        .left {
          .v-icon {
            color: #1961e4;
          }
        }
      }

      a {
        display: flex;
        align-items: center;
        margin-bottom: 20px;
        position: relative;
        cursor: pointer !important;

        .left {
          line-height: 0;

          .v-icon {
            color: #000;
          }
        }

        span {
          margin-left: 16px;
          font-size: 14px;
          color: #000;
          transition: all 0.1s ease-in-out;
        }
      }

      a.router-link-exact-active {
        .left {
          line-height: 0;

          .v-icon {
            color: #1961e4;
          }
        }

        span {
          color: #1961e4;
          font-weight: 700;
        }
      }
    }
  }
}
</style>

<template>
  <v-toolbar color="amber" app clipped-left fixed>
    <span class="title ml-3 mr-5">Envision&nbsp;<span class="slim-text">Web</span></span>
    <v-spacer></v-spacer>

    <v-menu v-if="isUserLogged == true">
      <v-btn icon slot="activator">
        <v-icon>create</v-icon>
      </v-btn>
      <v-list dense>
        <v-list-tile
          v-for="(item, index) in createItems"
          :key="index"
          :to="item.link"
        >
          <v-list-tile-title>{{ item.title }}</v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-menu>
  
    <v-tooltip bottom v-if="isUserLogged == true">
      <v-btn icon slot="activator">
        <v-badge left overlap color=red>
          <span slot="badge">!</span>
            <v-icon>notifications</v-icon>
        </v-badge>
      </v-btn>
      <span>通知</span>
    </v-tooltip>

    <v-btn outline large @click="ShowLoginDialog" v-if="isUserLogged == false">
      <v-icon>account_circle</v-icon> 
      <span class="font-weight-bold"> &nbsp;登录/注册</span>
    </v-btn>

    <v-menu v-if="isUserLogged == true">
      <v-btn slot="activator" fab flat small>
        <v-tooltip bottom>
          <v-avatar color="grey lighten-4" :size=40 slot="activator">
            <img :src="avatarHash" alt="avatar">
          </v-avatar>
          <span>我的</span>
        </v-tooltip>
      </v-btn>
      <v-list dense>
        <v-list-tile avatar class="my-2">
          <v-list-tile-avatar>
            <img :src="avatarHash" alt="avatar" :size=40>
          </v-list-tile-avatar>

          <v-list-tile-content>
            <v-list-tile-title>{{ username }}</v-list-tile-title>
            <v-list-tile-sub-title>{{ userdescription }}</v-list-tile-sub-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile
          v-for="(item, index) in menuItems"
          :key="index"
          avatar
          :to="item.link"
        >
          <v-list-tile-avatar>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-avatar>
          <v-list-tile-title>{{ item.title }}</v-list-tile-title>
        </v-list-tile>
        <v-list-tile avatar @click="Logout()">
          <v-list-tile-avatar>
            <v-icon>exit_to_app</v-icon>
          </v-list-tile-avatar>
          <v-list-tile-title>注销登录</v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-menu>

    <v-dialog v-model="dialog" max-width="300px" dark>
      <v-card>
        <v-card-title>注销</v-card-title>
        <v-card-text>注销登录后，你将退出当前登录的账号，并返回首页。同时 Envision 会要求你重新登录。请确认注销：</v-card-text>
        <v-card-actions>
          <v-btn flat color="pink" @click="dialog = false">取消</v-btn>
          <v-spacer></v-spacer>
          <v-btn flat color="green" @click="PerformLogout()">确认</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-toolbar> 
</template>

<script>
  import router from '@/plugins/router'

  export default {
    props: {
      isUserLogged: Boolean,
      ShowLoginDialog: Function,
      userId: String,
      username: String,
      userDescription: String,
      avatarHash: String,
      menuItems: Array,
      createItems: Array,
    },
    data: () => ({
      dialog: false,
    }),
    methods: {
      Logout: function () {
        this.dialog = true;
      },
      PerformLogout: function () {
        this.dialog = false;
        window.localStorage.clear();
        router.go('/');
      }
    }
  }
</script>

<style>
.slim-text {
  font-weight: 300;
}
</style>

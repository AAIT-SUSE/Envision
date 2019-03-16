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
          @click=";"
          :to="item.link"
        >
          <v-list-tile-avatar>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-avatar>
          <v-list-tile-title>{{ item.title }}</v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-menu>
    <v-tooltip bottom v-if="isUserLogged == true">
      <v-btn icon to="" slot="activator" @click="dialog = true">
        <v-icon>exit_to_app</v-icon>
      </v-btn>
      <span>注销</span>
    </v-tooltip>
    <v-dialog v-model="dialog" max-width="300">
      <v-card>
        <v-card-title class="headline">确认注销？</v-card-title>
        <v-card-text>
          注销后，你将结束当前会话。同时，Envision 将会要求你重新登录。
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" @click="dialog = false">
            取消
          </v-btn>
          <v-btn color="error darken-1" @click="dialog = false; Logout();">
            确认
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-toolbar> 
</template>

<script>
export default {
  props: {
    isUserLogged: Boolean,
    ShowLoginDialog: Function,
    username: String,
    userDescription: String,
    avatarHash: String
  },
  data: () => ({
    userdescription: '2015级自动化3班',
    dialog: false,
    menuItems: [
      { title: '个人中心', icon: 'person', link: '/user/new' },
      { title: '我的草稿', icon: 'subject' , link: '/home/new' },
      { title: '关注内容', icon: 'stars' , link: '/giftshop/new'},
      { title: '系统设置', icon: 'settings' , link: '/explore/new'},
    ],
    createItems: [
      { title:'新文章', link: '/articles/new' },
      { title: '新帖子', link: '/posts/new' },
      { title: '新问题', link: '/questions/new' },
      { title: '从草稿创建', link: '/draft' }
    ]
  }),
  methods: {
    Logout: function() {
      window.localStorage.clear();
      router.go(0);
    }
  }
}
</script>

<style>
.slim-text {
  font-weight: 300;
}
</style>

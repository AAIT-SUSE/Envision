<template>
  <v-app>
    <app-tool-bar
      :is-user-logged="isUserLogged"
      :username="toolbarUsername"
      :user-id="toolbarId"
      :user-description="toolbarDescription"
      :avatar-hash='"https://api.adorable.io/avatars/165/" + randomHash'
      :menu-items="userMenuItems"
      :create-items="createMenuItems"
      :show-login-dialog="ShowLoginWindow"
    ></app-tool-bar>

    <app-side-menu :is-user-logged="isUserLogged"></app-side-menu>
    <v-content style="padding-right: 300px">
      <v-container fluid>
        <v-layout>
          <v-flex shrink style="width: 100%">
            <router-view></router-view>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>

    <app-right-panel></app-right-panel>

    <!-- Dialogs and windows -->
    <v-dialog max-width="450" dark v-model="loginWindow" :persistent="true">
      <v-card class="mx-auto">
        <v-card-title class="display-1 font-weight-regular justify-space-between">
          <span>{{ currentTitle }}</span>
          <v-btn icon @click="loginWindow = false">
            <v-icon>close</v-icon>
          </v-btn>
        </v-card-title>

        <v-window v-model="step" :touchless="true">
          <v-window-item :value="1">
            <v-card-text>
              在不登录Envision的情况下，您只能访问有限的内容。登录 Envision 来让我们更好的为你服务。
            </v-card-text>
            <v-card-text>
              <v-layout row wrap>
                <v-flex xs12>
                  <v-text-field
                    label="用户名或邮箱"
                    color="amber"
                    v-model="inputUsername"
                  ></v-text-field>
                </v-flex>
                <v-flex xs12>
                  <v-text-field
                    label="密码"
                    :type="passwordInputType"
                    :append-icon="showPassword ? 'visibility' : 'visibility_off'"
                    @click:append="TogglePasswordVisibility"
                    v-model="inputPassword"
                    color="amber"
                  ></v-text-field>
                </v-flex>
              </v-layout>
            </v-card-text>
          </v-window-item>

          <v-window-item :value="2">
            <v-card-text>
              欢迎您注册 Envision，并享受我们进一步的服务。注册一旦完成，Envision 会记住你的登录状态。
            </v-card-text>
            <v-card-text>
              <v-layout row wrap>
                <v-flex xs12>
                  <v-text-field
                    label="用户名"
                    color="amber"
                    v-model="inputUsername"
                    hint="用户名可以包含汉字、英文字母和数字"
                  ></v-text-field>
                </v-flex>
                <v-flex xs12>
                  <v-text-field
                    label="邮箱"
                    color="amber"
                    v-model="inputEmail"
                    hint="您的邮箱将被用于接收 Envision 的必要通知及密码的重置"
                  ></v-text-field>
                </v-flex>
                <v-flex xs12>
                  <v-text-field
                    label="密码"
                    :type="passwordInputType"
                    :append-icon="showPassword ? 'visibility' : 'visibility_off'"
                    @click:append="TogglePasswordVisibility"
                    v-model="inputPassword"
                    color="amber"
                    hint="为了您的安全，您的密码长度应当至少为8位"
                  ></v-text-field>
                </v-flex>
                <v-flex xs6 class="mt-2">
                  经过 Envision 的努力运算得出结论：这个头像最适合你了！<br>
                  不满意？点击下面的按钮可以重新生成头像。生成需要时间，请等候几秒~
                </v-flex>
                <v-flex
                  xs6
                  align-center
                  justify-center
                  layout
                  text-xs-center
                >
                  <v-avatar
                    size=100
                    color="grey lighten-4"
                  >
                    <img :src="'https://api.adorable.io/avatars/165/' + randomHash" alt="avatar">
                  </v-avatar>
                </v-flex>
              </v-layout>
            </v-card-text>
          </v-window-item>
        </v-window>

        <v-divider></v-divider>

        <v-card-actions>
          <v-btn color="amber" flat @click="SwitchWindow()">
            {{ currentLeftBtnCaption }}
          </v-btn>
          <v-spacer v-if="step===2"></v-spacer>
          <v-btn v-if="step===2" color="amber" flat @click="GenerateRandomHash()">
            更换头像
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn flat color="amber" @click="LoginWindowAction()">
            {{ currentTitle }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog max-width="390" dark v-model="messageWindow">
      <v-card>
        <v-card-title class="display-1">{{ messageWindowTitle }}</v-card-title>
        <v-card-text>{{ messageWindowContent }}</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn depressed color="pink" @click="messageWindow=false">关闭</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

  </v-app>
</template>

<script>
  import AppToolBar from './components/AppToolbar'
  import AppSideMenu from './components/AppSideMenu'
  import AppRightPanel from './components/AppRightSidePanel'
  import axios from 'axios'
  import storage from './plugins/storage'
  import router from './plugins/router'
  export default {
    components: {
      AppToolBar,
      AppSideMenu,
      AppRightPanel
    },
    data: () => ({
      isUserLogged: false,
      //For toolbar elements to display correctly
      toolbarUsername: "error",
      toolbarDescription: "error",
      toolbarAvatar: "error",
      toolbarId: "0",
      userMenuItems: [
        {icon: "face", title: "个人中心"},
        {icon: "bookmark", title: "我的关注"},
        {icon: "settings", title: "个人设置"},
      ],
      createMenuItems: [
        {title: "创建新文章", link: "/articles/new"},
        {title: "发表新帖子", link: "/posts/new"},
        {title: "提出新问题", link: "/questions/new"},
        {title: "从草稿创建...", link: "/draft"},
      ],
      //Login Window and bind members
      loginWindow: false,
      inputUsername: "",
      inputPassword: "",
      inputEmail: "",
      passwordInputType: "password",
      showPassword: false,
      step: 1,
      randomHash: "",
      //Message dialog
      messageWindow: false,
      messageWindowTitle: '',
      messageWindowContent: '',
    }),
    methods: {
      ShowLoginWindow: function() {
        this.loginWindow = true;
      },
      SwitchWindow: function() {
        if (this.step === 1){
          this.step ++;
        } else {
          this.step --;
        }
      },
      TogglePasswordVisibility: function() {
        if(this.passwordInputType === "password") {
          this.passwordInputType = "text";
        } else {
          this.passwordInputType = "password";
        }
        this.showPassword = !this.showPassword;
      },
      CheckLoginStatus: function() {
        let status = window.localStorage.getItem('envision_uid');
        if(status != null) {
          return true;
        } else {
          return false;
        }
      },
      GenerateRandomHash: function() {
        this.randomHash =  Math.random().toString(30).substr(2);
      },
      PopWindow: function(title, content) {
        this.messageWindowTitle = title;
        this.messageWindowContent = content;
        this.messageWindow = true;
      },
      LoginWindowAction: function() {
        if (this.step === 1){
          this.Login();
        } else {
          this.Register();
        }
      },
      //Login
      Login: function() {
        let username = this.inputUsername;
        let password = this.inputPassword;
        let self = this;
        axios.post('http://127.0.0.1:8000/login/', {
          'email_or_username': username,
          'password': password
        }).then(function (response) {
          if(response.data.msg === 'Succeeded') {
            //Login succeeded, write token into local storage
            window.localStorage.setItem('envision_token', response.data.token);
            let uid = response.data.id;
            //Send request to get user info
            axios.get(`http://127.0.0.1:8000/api/UserViewSet/${uid}`).then(function (response) {
              window.localStorage.setItem('envision_uid', uid);
              window.localStorage.setItem('envision_user', response.data.username);
              window.localStorage.setItem('envision_avatar', response.data.user_logo);
            });
            //Refresh Page
            router.go('/');
           console.log(storage.state.uid);
           self.CheckLoginStatus();
          }
        }).catch(function () {
          self.PopWindow('登录失败', '这个错误可能是由于你填写了错误的用户名或者密码导致的，请检查用户名或密码的正确性。');
        })
      },
      Register: function() {
        let username = this.inputUsername;
        let password = this.inputPassword;
        let email = this.inputEmail;
        let avatar = this.randomHash;
        let self = this;
        axios.post('http://127.0.0.1:8000/register/', {
          'username': username,
          'e_mail': email,
          'password': password,
          'user_logo': avatar
        }).then(function (response) {
          if(response.data.msg === 'Succeeded') {
            let uid = response.data.id;
            //Send request to get user info
            axios.get(`http://127.0.0.1:8000/api/UserViewSet/${uid}`).then(function (response) {
              window.localStorage.setItem('envision_uid', uid);
              window.localStorage.setItem('envision_user', response.data.username);
              window.localStorage.setItem('envision_avatar', response.data.user_logo);
            });
            //Refresh Page
            router.go('/');
          }
        }).catch(function () {
          self.PopWindow('注册失败', '这个错误可能是由于你填写的用户名或者邮箱已经被注册使用过了。如果你拥有 Envision 的账户，请直接登录；否则，请更换其他的用户名或邮箱并尝试重新注册');
        })
      }
    },
    mounted () {
      if(this.CheckLoginStatus()) {
        //TODO: Send token to verify
        //Get personal info from localStorage
        let id = window.localStorage.getItem('envision_uid');
        let user = window.localStorage.getItem('envision_user');
        let avatar = window.localStorage.getItem('envision_avatar');
        //Commit to global storage
        storage.commit('setUsername', user);
        storage.commit('setUserAvatar', avatar);
        storage.commit('setUserId', id);
        //Set properties of toolbar
        this.toolbarUsername = user;
        this.toolbarAvatar = avatar;
        this.toolbarId = id;
        this.toolbarDescription = "Envision 用户";
        this.isUserLogged = true;
      } else {
        this.GenerateRandomHash();
      }
    },
    computed: {
      currentTitle () {
        if(this.step === 1) {
          return '登录';
        } else {
          return '注册';
        }
      },
      currentLeftBtnCaption () {
        if(this.step === 1) {
          return '没有账号？注册一个';
        } else {
          return '已有账号？直接登录';
        }
      },
    }
  }
</script>

<style>
  * {
    font-family: 等线, Serif,sans-serif;
  }
</style>
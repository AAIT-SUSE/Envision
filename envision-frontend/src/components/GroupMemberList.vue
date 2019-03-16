<template>
  <v-card flat>
    <v-layout row wrap>
      <v-flex xs10 class="pr-3">
        <v-text-field
          label="搜索成员"
          box
        ></v-text-field>
      </v-flex>
      <v-flex xs2>
        <v-btn block color="primary">
          搜索
        </v-btn>
      </v-flex>
    </v-layout>

    <v-list three-line>
      <template v-for="(member, index) in members">
        <v-subheader
          v-if="member.header"
          :key="member.header"
        >
          {{ member.header }}
        </v-subheader>

        <v-divider
          v-else-if="member.divider"
          :key="index"
          :inset="member.inset"
        ></v-divider>

        <v-list-tile
          v-else
          :key="member.title"
          avatar
          @click=";"
        >
          <v-list-tile-avatar>
            <img :src="member.avatar">
          </v-list-tile-avatar>

          <v-list-tile-content>
            <v-list-tile-title v-html="member.title"></v-list-tile-title>
            <v-list-tile-sub-title v-html="member.subtitle"></v-list-tile-sub-title>
          </v-list-tile-content>
        </v-list-tile>
      </template>
    </v-list>
  </v-card>
</template>

<script>
  export default {
    data: () => ({
      members: [
        {  }
      ]
    })
  }
</script>
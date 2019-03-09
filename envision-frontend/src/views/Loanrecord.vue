<template>
   <div>
      <v-toolbar flat color="white">
        <v-spacer></v-spacer>
          <v-dialog v-model="dialog" max-width="500px">
            <v-btn slot="activator" color="primary" dark class="mb-2">借还登记</v-btn>
              <v-card>
                <v-card-title>
                  <span class="headline">{{ formTitle }}</span>
                </v-card-title>
  
            <v-card-text>
              <v-container grid-list-md>
                <v-layout row wrap  align-left justify-left fill-height >
                  <v-flex-wrap xs12 sm6 md4>
                    <v-text-field v-model="editedItem.name" label="名称"></v-text-field>
                  </v-flex-wrap>

            <v-flex-wrap xs12 sm6 md4>
              <v-dialog
                  ref="dialog1"
                  v-model="borrowtime"
                  :return-value.sync="date"
                  persistent
                  lazy
                  full-width
                  width="290px"
                >
                  <template v-slot:activator="{ on }">
                    <v-text-field
                      v-model="date"
                      label="借出时间"
                      prepend-icon="event"
                      readonly
                      v-on="on"
                    ></v-text-field>
                  </template>
                  
                  <v-date-picker v-model="date" scrollable>
                    <v-spacer></v-spacer>
                    <v-btn flat color="primary" @click="borrowtime = false">取消</v-btn>
                    <v-btn flat color="primary" @click="$refs.dialog1.save(date)">确认</v-btn>
                  </v-date-picker>
                </v-dialog>
             </v-flex-wrap>
      
            <v-flex-wrap xs12 sm6 md4>
                <v-text-field v-model="editedItem.status" label="状态"></v-text-field>
              </v-flex-wrap>
      
            <v-flex-wrap xs12 sm6 md4>
              <v-dialog
                ref="dialog2"
                v-model="returntime"
                :return-value.sync="date"
                persistent
                lazy
                full-width
                width="290px"
              >
                <template v-slot:activator="{ on }">
                  <v-text-field
                    v-model="date"
                    label="归还时间"
                    prepend-icon="event"
                    readonly
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker v-model="date" scrollable>
                  <v-spacer></v-spacer>
                  <v-btn flat color="primary" @click="returntime = false">取消</v-btn>
                  <v-btn flat color="primary" @click="$refs.dialog2.save(date)">确认</v-btn>
                </v-date-picker>
              </v-dialog>
            </v-flex-wrap>
              </v-layout>
              </v-container>
            </v-card-text>
  
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" flat @click="close">取消</v-btn>
              <v-btn color="blue darken-1" flat @click="save">保存</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
      <v-data-table
        :headers="headers"
        :items="desserts"
        class="elevation-1"
      >
        <template slot="items" slot-scope="props">
          <td>{{ props.item.name }}</td>
          <td class="text-xxs-right">{{ props.item.borrowtime }}</td>
          <td class="text-xxs-right">{{ props.item.returntime }}</td>
          <td class="text-xxs-right">{{ props.item.status }}</td>
          <td class="text-xxs-right">{{ props.item.operate }}
            <v-icon
              small
              class="mr-2"
              @click="editItem(props.item)"
            >
              edit
            </v-icon>
            <v-icon
              small
              @click="deleteItem(props.item)"
            >
              delete
            </v-icon>
          </td>
        </template>
        <template slot="no-data">
          <v-btn color="primary" @click="initialize">Reset</v-btn>
        </template>
      </v-data-table>
    </div>
</template>

<script>
  export default {
    data: () => ({
      date: new Date().toISOString().substr(0, 10),
      borrowtime: false,
      returntime: false,
      dialog: false,
      headers: [
        {
         text: '名称',
        align: 'left',
        sortable: false,
        value: 'name'
      },
      { text: '借用时间', value: 'borrowtime', sortable: false },
      { text: '归还时间', value: 'returntime' , sortable: false},
      { text: '状态', value: 'status', sortable: false },
      { text: '操作', value: 'operate', sortable: false }
    ],
    desserts: [],
    editedIndex: -1,
    editedItem: {
      name: '',
      borrowtime: '',
      returntime: '',
      status: '',
    },
    defaultItem: {
      name: '',
      borrowtime: '',
      returntime: '',
      status: '',
    }
  }),
  computed: {
    formTitle () {
      return this.editedIndex === -1 ? '借还登记' : 'Edit Item'
    }
  },
  watch: {
    dialog (val) {
      val || this.close()
    }
  },

  created () {
    this.initialize()
  },

  methods: {
    initialize () {
      this.desserts = [
        {
          name: 'Frozen Yogurt',
          borrowtime: 82,
          returntime: 7.0,
          status: '已归还'
        },
        {
          name: 'Ice cream sandwich',
          borrowtime: 224,
          returntime: 3.0,
          status: '已归还'
        },
        {
          name: 'Eclair',
          borrowtime: 263,
          returntime: 6.0,
          status: '已归还'
        },
        {
          name: 'Cupcake',
          borrowtime: 159,
          returntime: 6.0,
          status: '已归还'
        },
        {
          name: 'Gingerbread',
          borrowtime: 159,
          returntime: 6.0,
          status: '已归还'
        },
        {
          name: 'Jelly bean',
          borrowtime: 159,
          returntime: 6.0,
          status: '已归还'
        },
        {
          name: 'Lollipop',
          borrowtime: 159,
          returntime: 6.0,
          status: '已归还'
        },
        {
          name: 'Honeycomb',
          borrowtime: 159,
          returntime: 6.0,
          status: '已归还'
        },
        {
          name: 'Donut',
          borrowtime: 159,
          returntime: 6.0,
          status: '已归还'
        },
        {
          name: 'KitKat',
          borrowtime: 159,
          returntime: 6.0,
          status: '已归还'
        }
      ]
    },

    editItem (item) {
      this.editedIndex = this.desserts.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },

    deleteItem (item) {
      const index = this.desserts.indexOf(item)
      confirm('Are you sure you want to delete this item?') && this.desserts.splice(index, 1)
    },

    close () {
      this.dialog = false
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      }, 300)
    },

    save () {
      if (this.editedIndex > -1) {
        Object.assign(this.desserts[this.editedIndex], this.editedItem)
      } else {
        this.desserts.push(this.editedItem)
      }
      this.close()
    }
  }
  }
</script>
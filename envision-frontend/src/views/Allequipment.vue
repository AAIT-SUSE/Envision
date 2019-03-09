<template>
<v-div>
  <v-toolbar flat color="white">
        <v-spacer></v-spacer>
        <Registration></Registration>
  </v-toolbar>
 
  <v-data-table
    v-model="selected"
    :headers="headers"
    :items="desserts"
    item-key="name"
    select-all
    class="elevation-1"
  >

    <template slot="items" slot-scope="props">
      <td>
        <v-checkbox
          v-model="props.selected"
          primary
          hide-details
        ></v-checkbox>
      </td>
      <td>{{ props.item.name }}</td>
      <td class="text-xxs-right">{{ props.item.All }}</td>
      <td class="text-xxs-right">{{ props.item.Borrowed }}</td>
      <td class="text-xxs-right">{{ props.item.Overplus }}</td>
      <td class="text-xxs-right">{{ props.item.Department }}</td>
      <td class="text-xxs-right">{{ props.item.Contacts }}</td>
    </template>
  </v-data-table>
</v-div>
</template>

<script>
import Registration from '@/components/Registration' 
  export default {
    components: {
    Registration
  },
    data () {
      return {
        selected: [],
        headers: [
          {
            text: '名称',
            align: 'left',
            sortable: false,
            value: 'name'
          },
          { text: '总量', value: 'All' },
        { text: '已借', value: 'Borrowed' },
        { text: '剩余', value: 'Overplus' },
        { text: '所属部门', value: 'Department', sortable: false },
        { text: '物品联系人', value: 'Contacts', sortable: false }
      ],
      desserts: [
        {
          name: '物品一',
          All: 1,
          Borrowed: 0,
          Overplus: 1,
          Department: '机器人技术部',
          Contacts: '路人甲'
        },
        {
          name: '物品二',
          All: 97,
          Borrowed: 6,
          Overplus: 91,
          Department: '宣传策划部',
          Contacts:'路人乙'
        },
        {
          name: '物品三',
          All: 82,
          Borrowed: 4,
          Overplus: 78,
          Department:'办公室',
          Contacts: '路人丙'
        },
        {
          name: '物品四',
          All: 35,
          Borrowed: 12,
          Overplus: 13,
          Department: '大数据技术部',
          Contacts: '路人丁'
        },
        {
          name: '物品五',
          All: 21,
          Borrowed: 5,
          Overplus: 16,
          Department: '图像处理部',
          Contacts: '路人戊'
        },
        {
          name: '物品六',
          All: 34,
          Borrowed: 3,
          Overplus: 31,
          Department: '大数据技术部',
          Contacts: '路人戌'
        },
        {
          name: '物品七',
          All: 15,
          Borrowed: 11,
          Overplus: 3,
          Department: '图像处理部',
          Contacts: '路人七'
        },
        {
         name: '物品八',
          All: 19,
          Borrowed: 6,
          Overplus: 13,
          Department:'办公室',
          Contacts: '路人八'
        },
        {
          name: '物品九',
          All: 151,
          Borrowed: 24,
          Overplus: 127,
          Department:'办公室',
          Contacts: '路人九'
        },
        {
          name: '物品十',
          All: 126,
          Borrowed: 6,
          Overplus: 120,
          Department: '机器人技术部',
          Contacts: '路人十'
        }
      ]
      }
    }
    }
</script>
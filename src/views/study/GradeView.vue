<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-card>
          <v-card-title>
            <span class="headline">Grade - Timetable</span>
            <v-spacer></v-spacer>
            <v-menu bottom left>
              <template v-slot:activator="{ on }">
                <v-btn dark icon v-on="on">
                  <v-icon>mdi-dots-vertical</v-icon>
                </v-btn>
              </template>
              <v-list>
                <v-list-item v-for="(item, i) in listActions" :key="i" @click="item.action">
                  <v-list-item-title>{{item.title}}</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
          </v-card-title>
          <v-card-text>
            <template v-if="action == actions.NEW">
              <subject-form />
            </template>
            <template v-if="action == actions.HORARIO">
              <grade-hour-form v-model="gradeHour" />
            </template>
            <template v-if="action == actions.LIST">
              <list-subject-table @hour="horario" />
            </template>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import SubjectForm from "@/components/study/SubjectForm.vue";
import GradeHourForm from "@/components/study/GradeHourForm.vue";
import ListSubjectTable from "@/components/study/ListSubjectTable.vue";
const actions = {
  LIST: "list",
  NEW: "new",
  DELETE: "delete",
  HORARIO: "horario"
};

export default {
  components: {
    SubjectForm,
    GradeHourForm,
    ListSubjectTable
  },
  data() {
    return {
      action: "list",
      actions,
      gradeHour: {},
      listActions: [
        {
          title: "Novo",
          action: this.novo
        },
        {
          title: "Horario",
          action: this.horario
        },
        {
          title: "Listar",
          action: this.list
        }
      ]
    };
  },
  methods: {
    novo() {
      this.action = actions.NEW;
    },
    horario(item) {
      this.action = actions.HORARIO;
      this.gradeHour = item;
    },
    list() {
      this.action = actions.LIST;
    }
  }
};
</script>

<style>
</style>
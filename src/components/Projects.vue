<template>
  <v-container fluid fill-height>
    <v-layout row>
      <v-flex xs12 sm10 md10 offset-sm1>
        <v-card>
          <v-toolbar color="blue darken-3" dark>
            <!-- <v-toolbar-side-icon></v-toolbar-side-icon> -->

            <v-toolbar-title>Dashboard</v-toolbar-title>

            <v-spacer></v-spacer>

            <v-btn icon to="/add">
              <v-icon>add</v-icon>
            </v-btn>
            <!-- <v-btn icon @click="add()">
              <v-icon>code</v-icon>
            </v-btn> -->
          </v-toolbar>
          <v-dialog v-model="dialog" max-width="290">
            <v-card>
              <v-card-title class="headline">Wollen Sie das Projekt wirklich löschen?</v-card-title>

              <v-card-text>
                Gelöschte Projekte können später nicht wieder hergestellt werden!!!
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>

                <v-btn color="green darken-1" flat="flat" @click="dialog = false">
                  Nein
                </v-btn>

                <v-btn color="green darken-1" flat="flat" @click="deleteProject()">
                  Ja
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-list two-line>
            <v-subheader v-if="header" :key="header">{{ header }}</v-subheader>
            <template v-for="(project, index) in projects">
              <v-list-tile avatar ripple :key="project.id">
                <v-list-tile-content @click="toggle(index)">
                  <v-list-tile-title>{{ project.name }}</v-list-tile-title>
                  <keep-alive>
                    <v-list-tile-sub-title>{{ getProjectLeader(project.memberId) }} </v-list-tile-sub-title>
                  </keep-alive>
                </v-list-tile-content>

                <v-list-tile-action>
                  <v-btn icon @click="openDialog(index)">
                    <v-icon color="red darken-1">delete</v-icon>
                  </v-btn>
                </v-list-tile-action>
              </v-list-tile>
            </template>
          </v-list>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      dialog: false,
      header: 'Projekte',
      index: 0,
      projects: []
    };
  },
  mounted() {
    this.getProjects();
  },
  methods: {
    getProjectLeader: function(id) {
      console.log(id);

      axios
        .get(
          'http://localhost:3000/api/members/5b7c2d0727773120d0567caa?access_token=qNKF41zqYTTDNYi5JpLAcC9fecKU62WlGf4RgKWXek9Uy6YK15eQ5pfSNYz5DUYf'
        )
        .then(v => {
          name = v.data.name + ', ' + v.data.vorname;
        })
        .catch(error => {
          console.log(error);
        });
      return name;
    },

    openDialog: function(index) {
      this.dialog = true;
      this.index = index;
      console.log(index);
    },

    deleteProject: function() {
      // alert(index);
      console.log('Lösche Projekt mit der ID: ' + this.projects[this.index].id);
      axios
        .delete(
          'http://localhost:3000/api/project_groups/' +
            this.projects[this.index].id +
            '/feedbackForm'
        )
        .then(() => {
          console.log('FeedbackForm gelöscht');
        })
        .catch(error => console.log(error));

      axios
        .delete(
          'http://localhost:3000/api/project_groups/' +
            this.projects[this.index].id
        )
        .then(() => {
          this.projects = [];
          this.getProjects();
          this.dialog = false;
        })
        .catch(error => console.log(error));
    },

    getProjects: function() {
      axios.get('http://localhost:3000/api/project_groups').then(v => {
        this.projects = v.data;
      });
    },

    toggle: function(index) {
      console.log(this.projects[index]);
      this.$router.push('/addFeedback/' + this.projects[index].id);
    }
  }
};
</script>

<style scoped>
</style>

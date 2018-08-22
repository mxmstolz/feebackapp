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
          <v-dialog v-model="dialogMember" max-width="1000">
            <v-card>
              <v-card-title class="headline">Wählen Sie die Projektteilnehmer aus</v-card-title>
              <v-card-text>
                <v-autocomplete v-model="member" :items="names" box chips color="blue-grey lighten-2" label="Projektteilnehmer" item-text="names" item-value="names" multiple>
                  <template slot="selection" slot-scope="data">
                    <v-chip :selected="data.selected" close class="chip--select-multi" @input="data.parent.selectItem(data.item)">

                      {{ data.item }}
                    </v-chip>
                  </template>
                  <template slot="item" slot-scope="data">
                    <template v-if="typeof data.item !== 'object'">
                      <v-list-tile-content v-text="data.item"></v-list-tile-content>
                    </template>
                    <template v-else>
                      <v-list-tile-content>
                        <v-list-tile-title v-html="data.item.name"></v-list-tile-title>
                      </v-list-tile-content>
                    </template>
                  </template>
                </v-autocomplete>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>

                <v-btn color="green darken-1" flat="flat" @click="dialogMember = false">
                  Fertig
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
                    <v-list-tile-sub-title>{{ names[index] }} </v-list-tile-sub-title>
                  </keep-alive>
                </v-list-tile-content>
                <v-list-tile-action>
                  <v-btn icon @click="dialogMember = true">
                    <v-icon>edit</v-icon>
                  </v-btn>
                </v-list-tile-action>
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
      names: [],
      users: [],
      member: [],
      dialog: false,
      dialogMember: false,
      header: 'Projekte',
      index: 0,
      projects: []
    };
  },
  mounted() {
    setTimeout(() => {
      // this.names = [this.projects.length];
      this.projects.forEach(v => {
        this.users.forEach(v2 => {
          if (v2.id === v.memberId) {
            this.names.push(v2.name + ', ' + v2.vorname);
          }
        });
      });
      console.log(this.names);
    }, 100);
  },

  created() {
    this.getProjects();
    axios
      .get(
        'http://localhost:3000/api/members?access_token=qNKF41zqYTTDNYi5JpLAcC9fecKU62WlGf4RgKWXek9Uy6YK15eQ5pfSNYz5DUYf'
      )
      .then(v => {
        this.users = v.data;
      })
      .catch(error => console.log(error));
  },
  methods: {
    getProjectLeader: function(id) {
      console.log(this.projects);
      console.log(this.names);
      const names = [this.projects.length];
      this.projects.forEach(v => {
        this.users.forEach(v2 => {
          if (v2.id === v.memberId) {
            names.push(v2.name + ', ' + v2.vorname);
          }
        });
      });
      console.log(names);
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
    },

    edit: function(index) {
      this.$router.push('/edit/' + this.projects[index].id);
    }
  }
};
</script>

<style scoped>
</style>

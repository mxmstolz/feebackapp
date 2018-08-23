<template>
    <v-container fluid fill-height>
        <v-layout row>
            <v-flex xs12 sm10 md10 offset-sm1>
                <v-card>
                    <v-toolbar color="blue darken-3" dark>
                        <!-- <v-toolbar-side-icon></v-toolbar-side-icon> -->

                        <v-toolbar-title>Projekt {{ name }} bearbeiten</v-toolbar-title>

                        <v-spacer></v-spacer>

                        <v-btn icon to="/">
                            <v-icon>close</v-icon>
                        </v-btn>

                    </v-toolbar>
                </v-card>
                <!-- // hier beginnt das einfügen -->
                <v-card>
                    <v-card-text>
                        <v-autocomplete v-model="member" :items="names" box chips color="blue-grey lighten-2" label="Projektteilnehmer" item-text="names" item-value="names" multiple>
                            <template slot="selection" slot-scope="data">
                                <v-chip :selected="data.selected" close class="chip--select-multi" @input="data.parent.selectItem(data.item)">

                                    {{ data.item}}
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

                </v-card>
                <!-- // Hier endet das Einfügen -->
                <v-card>
                    <v-btn @click="text">Zeig herr</v-btn>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
export default {
  data() {
    return {
      id: this.$route.params.id,
      name: this.$route.params.title,
      users: [],
      member: [],
      names: []
    };
  },

  created() {
    axios
      .get(
        'http://localhost:3000/api/members?access_token=qNKF41zqYTTDNYi5JpLAcC9fecKU62WlGf4RgKWXek9Uy6YK15eQ5pfSNYz5DUYf'
      )
      .then(v => {
        this.users = v.data;
        this.users.forEach(v => {
          this.names.push(v.name + ', ' + v.vorname);
        });
      })
      .catch(error => console.log(error));
  },

  methods: {
    text: function() {
      alert(this.member);
    }
  }
};
</script>

<style scoped>
</style>

<template>
  <v-app id="inspire">
    <v-content>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md6>
            <v-card class="elevation-12">
              <v-toolbar dark color="primary">
                <v-toolbar-title>Login</v-toolbar-title>
                <v-spacer></v-spacer>
              </v-toolbar>
              <v-card-text>
                <v-form ref="form" v-model="valid" lazy-validation>
                  <v-text-field v-model="email" :rules="emailRules" prepend-icon="person" label="E-Mail" type="text"></v-text-field>
                  <v-text-field v-model="password" @keyup.enter="submit" :rules="[v => !!v || 'Passwort ist notwendig']" prepend-icon="lock" label="Passwort" type="password"></v-text-field>

                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-btn color=secondary to="/register">Registieren</v-btn>
                <v-spacer></v-spacer>
                <v-btn color="primary" :disabled="!valid" @click="submit">Login</v-btn>
                <!-- <v-btn color="primary" :disabled="!valid" @click="submit">Login</v-btn> -->
              </v-card-actions>

            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
export default {
  data: () => ({
    valid: false,
    email: '',
    emailRules: [
      v => !!v || 'E-mail ist notwendig',
      v => /.+@.+/.test(v) || 'E-mail muss gültig sein'
    ],
    password: ''
  }),
  methods: {
    login: function() {
      console.log(this.email);
      console.log(this.password);
    },
    submit() {
      if (this.$refs.form.validate()) {
        this.$store
          .dispatch('retrieveToken', {
            email: this.email,
            password: this.password
          })
          .then(response => {
            this.$router.push({ name: 'projects' });
          })
          .catch(error => alert(error));
      }
    }
  }
};
</script>

<style scoped>
</style>

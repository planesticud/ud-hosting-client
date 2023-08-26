<template>
  <v-container>
    <div>
      <h1>{{ title }}</h1>
    </div>
    <div class="row row--dense">
      <div v-for="(button, index) in buttons" :key="index" class="col-sm-8 col-lg-4 col-12">
        <v-card outlined>
          <a :disabled=button.disabled @click="createVulhub(button.text)" style="text-decoration: none;">
            <v-list-item three-line>
              <v-list-item-content>
                <v-icon large>
                  {{ button.icon }}
                </v-icon>

                <v-list-item-title class="text-h5 mb-1">
                  {{ button.text }}
                </v-list-item-title>
                <v-list-item-subtitle>{{ button.description }}</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </a>
        </v-card>

      </div>
    </div>

    <v-dialog v-model="dialog2" max-width="2000px">
      <v-card>
        <v-card-title>
          <h2>Nuevo entorno vulnerable</h2>
        </v-card-title>
        <v-card-text>
          <v-select v-model="model.env" :items="buttons" item-text="text" item-value="value" label="entorno" ></v-select>

          <v-select v-model="model.type" :items="types" :rules="[v => !!v || 'debe escoger un entorno']" label="Entorno"
            required></v-select>
          <v-text-field v-model="model.name" label="nombre" :rules="[v => !!v || 'debe escoger un nombre']"
            required></v-text-field>

          <v-btn small color="success" @click="submit()"> Crear entorno </v-btn>
          &nbsp;
          <div>
            <p></p>
            &nbsp; &nbsp;
            <v-card v-if="result.state" flat>
              <a :href="result.url" target="_blank">
                {{ result.text }}
              </a>
            </v-card>
          </div>
        </v-card-text>
        <v-card-actions>
          <v-btn color="primary" text @click="dialog2 = false">
            close
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

  </v-container>
</template>

<script>
import VulhubService from "../../services/vulhub";

export default {
  data() {
    return {
      dialog2: false,
      buttons: [],
      model: {},
      title: "Crear entorno vulnerable",
      result: { state: false },
      formOptions: {
        validateAfterLoad: false,
        validateAfterChanged: true,
        validateAsync: true,
      },
    }
  },
  methods: {
    submit() {
      if (this.model.type == "LOCAL") {
        let url = `https://github.com/planesticud/vulhub/blob/master/${this.model.env.toLowerCase()}`
        this.result = {
          text: "sigue las instrucciones del enlace",
          color: "green lighten-2",
          state: true,
          url: url,
        };
        window.open(url, '_blank');
      } else {
        VulhubService.createVulhub({ first_name: this.model.first_name, last_name: this.model.last_name, email: this.model.email, name: this.model.name, env: this.model.env, type: this.model.type, })
          .then(({ data }) => {
            this.result = {
              text: data.info,
              color: "green lighten-2",
              state: true,
              url: `https://pages.planestic.udistrital.edu.co/${this.model.page_name}`,
            };


          })
          .catch((e) => {
            this.result = {
              text: `error: ${e}`,
              color: "red lighten-2",
              state: true,
            };
          });
      }

    },
    createVulhub(env) {
      this.dialog2 = true
      this.model = { first_name: localStorage.name, last_name: localStorage.name, email: localStorage.email, vulhub_name: "", env: env }
    },
  },
  mounted() {
    this.types = [
      "LOCAL",
      "NUBE"
    ],
      this.buttons = [
        {
          text: "Wordpress",
          value: "wrdpress",
          description: "WordPress es un sistema de gestión de contenidos",
          icon: "mdi-wordpress",
          disabled: 0,
        },
        {
          text: "Joomla",
          value: "joomla",
          description: "Joomla! es un sistema de gestión de contenidos ",
          icon: "mdi-language-html5",
          disabled: 0,

        },
        {
          text: "php",
          value: "php",
          description: "PHP es un lenguaje de programación interpretado​ del lado del servidor y de uso general que se adapta especialmente al desarrollo web.",
          icon: "mdi-language-php",
          disabled: 0,

        },
        {
          text: "httpd",
          value: "httpd",
          description: "El servidor HTTP Apache es un servidor web HTTP de código abierto, para plataformas Unix (BSD, GNU/Linux, etc.), Microsoft Windows, Macintosh y otras, que implementa el protocolo HTTP/1.1",
          icon: "mdi-server",
          disabled: 0,

        },
        {
          text: "jupyter",
          value: "jupyter",
          description: "El Proyecto Jupyter es una organización sin ánimo de lucro creada para desarrollar software de código abierto, estándares abiertos y servicios para computación interactiva en docenas de lenguajes de programación.",
          icon: "mdi-language-python",
          disabled: 0,

        },
        {
          text: "log4j",
          value: "log4j",
          description: "Log4j es una biblioteca de código abierto desarrollada en Java por la Apache Software Foundation que permite a los desarrolladores de software escribir mensajes de registro, cuyo propósito es dejar constancia de una determinada transacción en tiempo de ejecución.",
          icon: "mdi-weight-kilogram",
          disabled: 0,

        },
        {
          text: "mysql",
          value: "mysql",
          description: "MySQL es un sistema de gestión de bases de datos relacional desarrollado bajo licencia dual: Licencia pública general/Licencia comercial por Oracle Corporation y está considerada como la base de datos de código abierto más popular del mundo",
          icon: "mdi-database",
          disabled: 0,
        }
      ];
  }
};
</script>

<style>
html {
  font-family: Tahoma;
  font-size: 14px;
}

body {
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
  font-size: 14px;
  line-height: 1.42857143;
  color: #333;
}

pre {
  overflow: auto;
}

pre .string {
  color: #885800;
}

pre .number {
  color: blue;
}

pre .boolean {
  color: magenta;
}

pre .null {
  color: red;
}

pre .key {
  color: green;
}

.container {
  max-width: 970px;
  padding-right: 15px;
  padding-left: 15px;
  margin-right: auto;
  margin-left: auto;
}

h1 {
  text-align: center;
  font-size: 36px;
  margin-top: 20px;
  margin-bottom: 10px;
  font-weight: 500;
}

fieldset {
  border: 0;
}

.panel {
  margin-bottom: 20px;
  background-color: #fff;
  border: 1px solid transparent;
  border-radius: 4px;
  -webkit-box-shadow: 0 1px 1px rgba(0, 0, 0, 0.05);
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.05);
  border-color: #ddd;
}

.panel-heading {
  color: #333;
  background-color: #f5f5f5;
  border-color: #ddd;

  padding: 10px 15px;
  border-bottom: 1px solid transparent;
  border-top-left-radius: 3px;
  border-top-right-radius: 3px;
}

.panel-body {
  padding: 15px;
}
</style>
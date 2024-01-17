<template>
  <v-container>
    <div>
      <h1>{{ maintitle }}</h1>
      <p></p>
      <v-divider color="warning"></v-divider>
      <p></p>
    </div>
    <div class="container2">
  <div class="icon-section">
    <!-- Repite este bloque para cada icono -->
    <div class="icon">
      <img src="../../assets/images/Laboratorio_vulnerabilidades-06.png" alt="Dominio">
      <div class="icon-text">
        <h3>Dominio</h3>
        <p>Escoja que tipo de ambiente sera local/nube.</p>
      </div>
    </div>
    <div class="icon">
      <img src="../../assets/images/Laboratorio_vulnerabilidades-05.png" alt="Dominio">
      <div class="icon-text">
        <h3>Servidor</h3>
        <p>Escoja que tipo de ambiente sera local/nube.</p>
      </div>
    </div>
    <div class="icon">
      <img src="../../assets/images/Laboratorio_vulnerabilidades-07.png" alt="Dominio">
      <div class="icon-text">
        <h3>Proyecto</h3>
        <p>Asigne un nombre para la simulación.</p>
      </div>
    </div>
    <div class="icon">
      <img src="../../assets/images/Laboratorio_vulnerabilidades-08.png" alt="Dominio">
      <div class="icon-text">
        <h3>Documentación</h3>
        <p>Sigue las instrucciones que se generará para empezar la simulación.</p>
      </div>
    </div>
    <!-- ... otros bloques de icono ... -->
  </div>
  <div class="image-section">
    <img src="../../assets/images/Laboratorio_vulnerabilidades-04.png" alt="Mujer con laptop">
  </div>
</div>
    <div>
      <h1>{{ title }}</h1>
      <v-divider color="warning"></v-divider>
    </div>
    <p></p>
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
          <h2 style="color: #8B1919;">Nuevo entorno vulnerable</h2>

        </v-card-title>
        <v-card-title>
          <v-divider color="warning"></v-divider>

        </v-card-title>
         
        <v-card-text>
          <v-select v-model="model.env" :items="buttons" item-text="text" item-value="value" label="Dominio" outlined></v-select>

          <v-select v-model="model.type" :items="types" :rules="[v => !!v || 'Este campo es obligatorio']" label="Servidor"
            required  outlined></v-select>
          <v-text-field v-model="model.name" label="Nombre" :rules="[v => !!v || 'Este campo es obligatorio']"
            required  outlined></v-text-field>

          <v-btn  color="red"  outlined @click="submit()"> Crear entorno </v-btn>
          &nbsp;
          <div>
            <p></p>
            &nbsp; &nbsp;
            <v-card v-if="result.state" flat>
              <h2>Siga las instrucciones:</h2>
              <h3>
                <a :href="result.url" target="_blank">
                  {{ result.text }}
                </a>
              </h3>
              <p>&nbsp;</p>
              <h3>
                <a :href="result.url2" target="_blank">
                  {{ result.text2 }}
                </a>
              </h3>
            </v-card>
          </div>
        </v-card-text>
        <v-card-actions>
          <v-btn color="gray" text @click="dialog2 = false" outlined>
            Cerrar
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
      maintitle: "Laboratorio de vulnerabilidades",
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
          text: "1. abre el enlace",
          color: "green lighten-2",
          state: true,
          url: url,
        };
        window.open(url, '_blank');
      } else {
        VulhubService.createVulhub({ first_name: this.model.first_name, last_name: this.model.last_name, email: this.model.email, name: this.model.name, env: this.model.env, type: this.model.type, })
          .then(({ data }) => {
            let url2 = `https://github.com/planesticud/vulhub/blob/master/${this.model.env.toLowerCase()}`

            this.result = {
              text: "1. abre tu entorno vulnerable ",
              url: data.ok,
              text2: "1. abre el enlace con las instrucciones para atacar el entorno",
              url2: url2,
              color: "green lighten-2",
              state: true,
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
          value: "wordpress",
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
        },
        {
          text: "docker",
          value: "docker",
          description: "Docker es un proyecto de código abierto que automatiza el despliegue de aplicaciones dentro de contenedores de software, proporcionando una capa adicional de abstracción y automatización de virtualización de aplicaciones en múltiples sistemas operativos.",
          icon: "mdi-docker",
          disabled: 0,
        },
        {
          text: "redis",
          value: "redis",
          description: "Redis es un motor de base de datos en memoria, basado en el almacenamiento en tablas de hashes (clave/valor) pero que opcionalmente puede ser usada como una base de datos durable o persistente.",
          icon: "mdi-cached",
          disabled: 0,
        },
        {
          text: "flask",
          value: "flask",
          description: "Flask es un framework minimalista escrito en Python que permite crear aplicaciones web rápidamente y con un mínimo número de líneas de código.",
          icon: "mdi-api",
          disabled: 0,
        },
        {
          text: "postgres",
          value: "postgres",
          description: "PostgreSQL, también llamado Postgres, es un sistema de gestión de bases de datos relacional orientado a objetos y de código abierto, publicado bajo la licencia PostgreSQL,similar a la BSD o la MIT.",
          icon: "mdi-database",
          disabled: 0,
        },
        {
          text: "git",
          value: "git",
          description: "Git es un software de control de versiones diseñado por Linus Torvalds, pensando en la eficiencia, la confiabilidad y compatibilidad del mantenimiento de versiones de aplicaciones cuando estas tienen un gran número de archivos de código fuente.",
          icon: "mdi-github",
          disabled: 0,
        },
        {
          text: "kafka",
          value: "kafka",
          description: "Apache Kafka es un proyecto de intermediación de mensajes de código abierto desarrollado por LinkedIn y donado a la Apache Software Foundation escrito en Java y Scala. ",
          icon: "mdi-arrow-right-bold-box",
          disabled: 0,
        },
        {
          text: "node",
          value: "node",
          description: "Node.js es un entorno en tiempo de ejecución multiplataforma, de código abierto, para la capa del servidor (pero no limitándose a ello) basado en el lenguaje de programación JavaScript, asíncrono, con E/S de datos en una arquitectura orientada a eventos y basado en el motor V8 de Google.",
          icon: "mdi-nodejs",
          disabled: 0,
        },
        {
          text: "metabase",
          value: "metabase",
          description: "Metabase es una herramienta de inteligencia empresarial de código abierto. Metabase le permite hacer preguntas sobre sus datos y muestra respuestas en formatos que tienen sentido, ya sea un gráfico de barras o una tabla detallada.",
          icon: "mdi-grid",
          disabled: 0,
        },
        {
          text: "ruby",
          value: "ruby",
          description: "Ruby es un lenguaje de programación interpretado, reflexivo y orientado a objetos, creado por el programador japonés Yukihiro Matz Matsumoto, quien comenzó a trabajar en Ruby en 1993, y lo presentó públicamente en 1995.",
          icon: "mdi-shape-plus",
          disabled: 0,
        },
        {
          text: "gitlab",
          value: "gitlab",
          description: "GitLab es una suite completa que permite gestionar, administrar, crear y conectar los repositorios con diferentes aplicaciones y hacer todo tipo de integraciones con ellas, ofreciendo un ambiente y una plataforma en cual se puede realizar las varias etapas de su SDLC/ADLC y DevOps.",
          icon: "mdi-git",
          disabled: 0,
        },
        {
          text: "grafana",
          value: "grafana",
          description: "Grafana es multiplataforma sin ninguna dependencia y también se puede implementar con Docker. Está escrito en lenguaje Go y tiene un HTTP API completo.6",
          icon: "mdi-calculator",
          disabled: 0,
        },
        {
          text: "java",
          value: "java",
          description: "Java es un lenguaje de programación y una plataforma informática que fue comercializada por primera vez en 1995 por Sun Microsystems.",
          icon: "mdi-led-on",
          disabled: 0,
        },
        {
          text: "jetty",
          value: "jetty",
          description: "Jetty es un servidor HTTP 100% basado en Java y un contenedor de Servlets escrito en Java. Jetty se publica como un proyecto de software libre bajo la licencia Apache 2.0.",
          icon: "mdi-robot",
          disabled: 0,
        },
        {
          text: "laravel",
          value: "laravel",
          description: "Laravel es un framework de código abierto para desarrollar aplicaciones y servicios web con PHP 5, PHP 7 y PHP 8. Su filosofía es desarrollar código PHP de forma elegante y simple, evitando el código espagueti. ",
          icon: "mdi-language-php",
          disabled: 0,
        },
        {
          text: "mongo-express",
          value: "mongo-express",
          description: "Express.js o simplemente Express es un entorno de trabajo para aplicaciones web para el programario Node.js, de código abierto y con licencia MIT. Se utiliza para desarrollar aplicaciones web y APIs. El autor original es TJ Holowaychuk y la primera versión se lanzó el 2010. Express.js forma parte del programario MEAN, juntamente con MongoDB, Angular.js y Node.js",
          icon: "mdi-database",
          disabled: 0,
        },
        {
          text: "openssh",
          value: "openssh",
          description: "OpenSSH (Open Secure Shell) es un conjunto de aplicaciones que permiten realizar comunicaciones cifradas a través de una red, usando el protocolo SSH. Fue creado como una alternativa libre y abierta al programa Secure Shell, que es software propietario. El proyecto está liderado por Theo de Raadt, residente en Calgary.",
          icon: "mdi-book-secure",
          disabled: 0,
        },
        {
          text: "phpmyadmin",
          value: "phpmyadmin",
          description: "phpMyAdmin es una herramienta escrita en PHP con la intención de manejar la administración de MySQL a través de páginas web, utilizando un navegador web.",
          icon: "mdi-database",
          disabled: 0,
        },
        {
          text: "spark",
          value: "spark",
          description: "Apache Spark es un framework de computación (entorno de trabajo) en clúster open-source. Fue desarrollada originariamente en la Universidad de California, en el AMPLab de Berkeley.",
          icon: "mdi-boombox",
          disabled: 0,
        },
        {
          text: "tomcat",
          value: "tomcat",
          description: "Apache Tomcat (también llamado Jakarta Tomcat o simplemente Tomcat) funciona como un contenedor de servlets desarrollado bajo el proyecto Jakarta en la Apache Software Foundation. Tomcat implementa las especificaciones de los servlets y de JavaServer Pages (JSP) de Oracle Corporation (aunque creado por Sun Microsystems).",
          icon: "mdi-cat",
          disabled: 0,
        },
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

.container2 {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 20px;
    background-color: #E7E7E7;
  }

  .icon-section {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }

  .icon {
    margin: 10px 0;
  }

  .icon img {
    width: 50px; /* Ajusta según el tamaño de tus iconos */
    height: auto;
  }

  .icon-text {
    margin-left: 15px;
  }

  .image-section {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .image-section img {
    max-width: 100%;
    height: auto;
  }
</style>
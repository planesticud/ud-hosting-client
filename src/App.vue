<template>
  <div>
    <div v-if="!isMobile" class="banner-all" :style="logoStyle">
      <img class="logo-planestic1" src="./assets/images/logo_planestic.png" />
      <div class="trapezoid">

       <h2 style="color: aliceblue; padding: 15px; ">Contacto</h2>
      </div>


      <v-dialog v-model="dialog" activator="parent" width="auto" style="background-color:#F5F5F5 ;">
        <v-card style="background-color:#F5F5F5 ;">
          <v-card-actions>

            <v-btn style="background-color: aliceblue; color: black;" icon="mdi-calendar" size="x-large"
              @click="dialog = false">X</v-btn>
          </v-card-actions>
          <v-card-text>

            <h2 style="color: aliceblue; padding: 15px; ">¡Únete y conoce todos los recursos que te ayudarán!</h2>
           
            <p style="color: aliceblue; padding: 10px; padding-left: 20%; font-size: 18px;">Comienza utilizando tu cuenta
              Microsoft</p>

            <a href="https://rdigital.planestic.udistrital.edu.co/api/microsoft" style="padding-left: 35%;">
              <v-btn v-if="!isLogin" rounded style="background-color: aliceblue;  " class="btn btn-ligh">
                <img class="ms-icon center" src="./assets/images/microsoftlogo.png" />

              </v-btn>
              <!--href="http://localhost:3000/google"-->
            </a>





          </v-card-text>

        </v-card>
      </v-dialog>
      <v-dialog v-model="dialog2" activator="parent" width="auto" style="background-color:#940611 ;">
        <v-card style="background-color:#940611 ;">
          <v-card-actions>
            <v-btn style="background-color: aliceblue; color: black;" icon="mdi-calendar" size="x-large"
              @click="dialog2 = false">X</v-btn>
          </v-card-actions>
          <v-card-text>

            <h2 style="color: aliceblue; padding: 15px;text-align: center; ">Crea tu cuenta</h2>
            <p style="color: aliceblue; padding: 10px;text-align: center; font-size: 18px;">Accede a nuestro contenido,
              publica y
              avanza en tu conocimiento.</p>
            <a href="https://rdigital.planestic.udistrital.edu.co/api/microsoft" style="padding-left: 35%;">
              <v-btn v-if="!isLogin" rounded style="background-color: aliceblue;  " class="btn btn-ligh">
                <img class="ms-icon center" src="./assets/images/microsoftlogo.png" />

              </v-btn>
              <!--href="http://localhost:3000/google"-->
            </a>
            <div style="text-align: center;padding-top: 2%;">
              <v-btn v-if="!isLogin" rounded style="background-color: aliceblue;" class="btn btn-ligh"
                @click="dialog3 = true">
                Conecta con correo
              </v-btn>
            </div>

            <v-btn v-if="isLogin" rounded style="background-color: aliceblue;" class="btn btn-light" @click="logout()">
              Cerrar sesion

            </v-btn>


          </v-card-text>
        </v-card>
      </v-dialog>
      <v-dialog v-model="dialog3" activator="parent" width="auto" style="background-color:#940611 ;">
        <v-card style="background-color:#940611 ;">
          <v-card-actions>
            <v-btn style="background-color: aliceblue; color: black;" icon="mdi-calendar" size="x-large"
              @click="dialog3 = false">X</v-btn>
          </v-card-actions>
          <v-card-text>

            <h2 style="color: aliceblue; padding: 15px;text-align: center; ">Completa tu registro
              llenando tus datos</h2>
            <v-form>
              <h3 style="color: aliceblue;padding-bottom: 2%;">Nombres y apellidos</h3>
              <v-text-field class="form"> </v-text-field>
              <h3 style="color: aliceblue;padding-bottom: 2%; padding-top: 4%;">Correo electrónico</h3>
              <v-text-field class="form"> </v-text-field>
              <h3 style="color: aliceblue;padding-bottom: 2%; padding-top: 4%;">Contraseña</h3>
              <v-text-field class="form"> </v-text-field>
              <h3 style="color: aliceblue;padding-bottom: 2%; padding-top: 4%;">Número de teléfono (opcional)</h3>
              <v-text-field class="form"> </v-text-field>

              <v-checkbox color="white" v-model="checkbox" :rules="[v => !!v || 'Debes aceptar para continuar!']"
                label="Autorizo el tratamiento de mis datos" required></v-checkbox>
              <v-checkbox color="white" v-model="checkbox" label="Deseo recibir actualizaciones" required></v-checkbox>
              <div style="text-align:center">
                <v-btn rounded style="background-color:  aliceblue; color:black;" class="btn btn-ligh">Continuar </v-btn>
              </div>

            </v-form>
          </v-card-text>
        </v-card>
      </v-dialog>




    </div>
    <v-app class="myFont">
      <v-app-bar app  style="position: absolute; background-color: #373435;">

        <v-menu left bottom v-if="isMobile">
          <template v-slot:activator="{ on, attrs }">
            <v-btn icon v-bind="attrs" v-on="on">
              <v-app-bar-nav-icon></v-app-bar-nav-icon>
            </v-btn>
          </template>

          <v-list>
            <v-list-item 
             :to="button.route"
              v-for="(button, index) in buttons"
              :key="index"
              text
            >
              <v-list-item-title style=" background-color: #ffffff;">{{ button.text }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
        <div v-else>
          <div v-if="token">
            <v-btn style=" color: #ffffff;"
              :to="button.route"
              v-for="(button, index) in buttons"
              :key="index"
              text
            >
              {{ button.text }}
            </v-btn>

          </div>
        </div>
        <div>

        </div>
        <div class="pull-right">
          <div class="pull-right" v-if="isLogin">
            <h3 style=" color: #ffffff;" >{{ name }} | <a style=" color: #ffffff;" @click="logout"> Cerrar sesión </a></h3>
            
          </div>
          <a
            class="pull-right"
            v-else
            href="https://desarrollo.planestic.udistrital.edu.co/api/microsoft"
          >
          
            Iniciar sesión
          </a>
        </div>
      </v-app-bar>

      <v-main>
        <router-view />
      </v-main>
    </v-app>
    <v-card dark padless>
        <v-row style="background-color: #8B1919;">
          <v-col sm="5">
            <h2 style="text-align: right;padding: 4%;">Síguenos en redes sociales</h2>
          </v-col>
          <v-col sm="6">
            <v-card flat tile color="#8b1919" class="white--text text-center" style="background-color: #8B1919;">
              <v-card-text style="padding-left: 0%;">
                <v-btn :href="lik.route" :target="lik.route" v-for="lik in linkk" :key="lik.icons"
                  class="mx-4 white--text" icon>
                  <v-hover v-slot="{ hover }" open-delay="200">
                    <v-icon :title="lik.des" :size="hover ? '64px' : '36px'" :class="{ 'on-hover': hover }">
                      {{ lik.icons }}
                    </v-icon>
                  </v-hover>
                </v-btn>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-card>
    <v-footer dark padless>

<div style="background-color:#373737; width:100%;">
  <v-row style="padding-top: 1%;font-size: 14px;padding-right: 10%;padding-left: 8%;">
    <v-col sm="4">
      <strong>Universidad Distrital Francisco José de Caldas</strong><br>
      <strong>NIT.899.999.230-7</strong><br><br>
      <p>Institución de Educación Superior sujeta
        a inspección y vigilancia por el
        Ministerio de Educación Nacional</p><br>
      <p>Acuerdo de creación N° 10 de 1948 del
        Concejo de Bogotá
        Acreditación Institucional de Alta
        Calidad - Resolución N° 23096 del 15 de
        diciembre del 2016</p>
    </v-col>
    <v-col>
      <strong>Nosotros</strong><br><br>

      <a v-for="nos in nosotros" :key="nos.name" style="color: aliceblue;" target="_blank" :href="nos.route"> {{
        nos.name }} <br><br>
      </a>
    </v-col>
    <v-col>
      <strong>Servicios</strong><br><br>
      <a v-for="servicio in servicios" :key="servicio.name" style="color: aliceblue;" target="_blank"
        :href="servicio.route"> {{ servicio.name }} <br><br>
      </a>
    </v-col>
    <v-col>
      <strong>Novedades</strong><br><br>
      <a v-for="novedad in novedades" :key="novedad.name" style="color: aliceblue;" target="_blank"
        :href="novedad.route"> {{ novedad.name }} <br><br>
      </a>
    </v-col>
    <v-col>
      <strong>Contáctenos</strong><br><br>
      <p>Coordinador<br>
        Carlos Enrique Montenegro Marín
        cemontenegrom@udistrital.edu.co</p><br>
      <p>Cl. 13 #31-75<br>
        Bogotá D.C. República de Colombia</p><br>
      <p>323 9300 ext: 6368<br>
        planesticud@udistrital.edu.co<br>
        Lunes a viernes de 8 a.m. a 5 p.m</p>
    </v-col>
  </v-row>
</div>


<div class="px-4 py-8 bg-black"></div>
</v-footer>
  </div>
</template>

<script>
export default {
  name: "app",
  data() {
    return {
      title: "Planestic-UD",
      isLogin: false,
      url_image: "",
      buttons: [],
      name: "",
      token: "",
      isMobile: false,
      theme: "dark",
      myStyle: {
        backgroundColor: "#17aa5c",
        width: 700,
      },
      backStyle: {
          "background-color": "#F3F3F3"
      },
      linkk: [
        {
          icons: "mdi-home",
          route: "/home",
          des: "Inicio",
        },
        {
          icons: "mdi-facebook",
          route: "https://www.facebook.com/PlanesticudUniversidadDistrital",
          des: "Facebook",
        },
        {
          icons: "mdi-twitter",
          route: "https://twitter.com/PlanEsTICUD",
          des: "Twitter",
        },
        {
          icons: "mdi-youtube",
          route:
            "https://www.youtube.com/channel/UCT75A2ENF7b0_NK9k0qrTVw/videos",
          des: "YouTube",
        },
        {
          icons: "mdi-instagram",
          route: "https://www.instagram.com/planesticud/",
          des: "Instagram",
        },
        {
          icons: "mdi-email",
          route: "https://planestic.udistrital.edu.co/contact",
          des: "Contacto",
        },
      ],
      nosotros: [
        {
          name: "Acerca de Planestic",
          route: "https://planestic.udistrital.edu.co/acerca-de-planestic",
        },
        {
          name: "Comité Planestic",
          route: "https://planestic.udistrital.edu.co/comite-planestic",
        },
        {
          name: "Grupo Planestic",
          route: "https://planestic.udistrital.edu.co/grupo_planestic",
        },
        {
          name: "Campos de Acción",
          route: "https://planestic.udistrital.edu.co/campos-de-accion",
        },
        {
          name: "Observatorio UD",
          route: "https://planestic.udistrital.edu.co/observatorio-ud",
        },
        {
          name: "Educación virtual",
          route: "https://planestic.udistrital.edu.co/educaci%C3%B3n_virtual",
        },
      ],

      servicios: [
        {
          name: "Solicitud Turnitin ",
          route: "https://planestic.udistrital.edu.co/form/turnitin",
        },
        {
          name: "Inscripción cursos ",
          route: "https://planestic.udistrital.edu.co/cursos",
        },
        {
          name: "Video tutoriales ",
          route: "https://planestic.udistrital.edu.co/video_tutoriales",
        },
        {
          name: "Centro de ayuda ",
          route: "https://planestic-ud.tawk.help/",
        },
        {
          name: "Facultades ",
          route: "https://planestic.udistrital.edu.co/facultades",
        },
        {
          name: "Portafolio de servicios",
          route: "https://planestic.udistrital.edu.co/portafolio-servicio",
        },
      ],
      novedades: [
        {
          name: "Noticias",
          route: "https://planestic.udistrital.edu.co/noticias",
        },
        {
          name: "Publicaciones",
          route: "https://planestic.udistrital.edu.co/publicaciones",
        },
        {
          name: "Galería",
          route: "https://planestic.udistrital.edu.co/galeria",
        },
        {
          name: "Blog",
          route: "https://planestic.udistrital.edu.co/blog",
        },
      ],
    };
  },
  beforeDestroy() {
    if (typeof window === "undefined") return;

    window.removeEventListener("resize", this.onResize, { passive: true });
  },
  methods: {
    image() {
      if (localStorage.name) {
        this.isLogin = true;
        this.url_image = localStorage.url_image;
      } else {
        this.isLogin = false;
      }
    },
    darkMode() {
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
      if (this.$vuetify.theme.dark) {
        localStorage.theme = "dark"
        this.backStyle = {
          "background-color": "#1e1e1e"
        }
      }
      else {
        localStorage.theme = "light"
        this.backStyle = {
          "background-color": "#F3F3F3"
        }
      }
    },
    logout() {
      
      let theme = localStorage.theme
      localStorage.clear();
      localStorage.theme = theme
      this.$router.push({ name: "login" });
      location.reload();
    },
    onResize() {
      this.isMobile = window.innerWidth < 800;
    },
  },
  mounted() {
    if (localStorage.theme == "dark") {
      this.$vuetify.theme.dark = true
    }
    if (localStorage.theme == "light") {
      this.$vuetify.theme.dark = false
    }

    if (localStorage.name) {
      this.name = localStorage.name;
    }
    if (localStorage.token) {
      this.token = localStorage.token;
      this.buttons = [
        { text: "Inicio | ", route: "/home" },
        { text: "Paginas | ", route: "/pages" },
        { text: "Vulhub", route: "/vulhub" },
      ];
    }
    this.image();
    this.onResize();

    window.addEventListener("resize", this.onResize, { passive: true });
  },
};
</script>
<style >

.pull-right {
  margin-left: auto;
}
.banner-all {
  background-color: #F5F5F5;
  max-height: 170px;
}

.logo-planestic1 {
  margin-left: 15px;
  width: 300px;
  height: 100px;
}
.logo-planestic2 {
  max-height: 100px;
  margin: auto;
  margin-top: 5px;
  float: right;
}
.my-font {
  background-color: #373435;
}

.trapezoid {
  border-bottom: 50px solid #8B1919;
  border-left: 25px solid transparent;
  height: 0;
  width: 200px;
  margin-top: 54px;
  float: right;
  color: #f3f3f3;
  font-family: "Roboto", sans-serif;
}
</style>
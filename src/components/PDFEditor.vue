<template>
  <div>
    <hr />
    <div style="position: sticky; top: 0; padding-top: 1em; z-index: 2;">
      <button @click="zoom(false)">Zoom In (+)</button>
      <button @click="zoom(true)">Zoom Out (-)</button>
      <button @click="save()">Save</button>
      <button @click="download()">Download</button>
    </div>
    <div ref="renderSection">
      <template v-if="canvas != undefined">
        <PDFFieldManager :fields="form.fields" :canvas="canvas" />
      </template>
      <canvas ref="canvas" width="1920" height="0"></canvas>
    </div>
  </div>
</template>

<script>
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";

import PDFFieldManager from "@/components/PDFFieldManager.vue";
import store from "@/store.js";

export default {
  name: "PDFEditor",
  components: { PDFFieldManager },
  data() {
    return {
      canvas: undefined,
      ctx: undefined,
      store,
    };
  },
  computed: {
    form() {
      return store.applications[store.applicationKey].forms[store.formKey];
    },
  },
  mounted() {
    this.canvas = this.$refs.canvas;
    this.ctx = this.canvas.getContext("2d");
    this.canvas.style.width = "100%";
    this.drawFiles();
  },
  methods: {
    resize(width, height) {
      var oldCanvas =
        this.canvas.width && this.canvas.height
          ? this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height)
          : new ImageData(1, 1);
      this.canvas.width = width;
      this.canvas.height = height;
      this.ctx.putImageData(oldCanvas, 0, 0);
    },
    drawImage(url, x = 0, y = 0) {
      var editor = this;
      var img = new Image();
      img.onload = function () {
        if (this.height + y > editor.canvas.height) {
          editor.resize(editor.canvas.width, this.height + y);
        }
        editor.ctx.drawImage(img, x, y, this.width, this.height);
      };
      img.src = url;
    },
    drawFiles() {
      this.form.files.forEach((file) => {
        this.resize(this.canvas.width, this.canvas.height + file.height);
        this.drawImage(
          require(`@/assets/pdf/${file.name}`),
          0,
          this.canvas.height - file.height
        );
      });
    },
    zoom(out) {
      if (out) {
        this.canvas.style.width = parseInt(this.canvas.style.width) - 5 + "%";
      } else {
        this.canvas.style.width = parseInt(this.canvas.style.width) + 5 + "%";
      }
      this.$emit("zoom", () => {});
    },
    save() {
      store.formFieldIndex.forEach((field, index) => {
        if (field != "") {
          store.users[store.userKey].commonFields[field] =
            store.formData[index];
        }
      });
      store.savePermanent("users");
    },
    download() {
      var oldWidth = this.canvas.style.width;
      this.canvas.style.width = "";
      this.$emit("zoom", () => {
        html2canvas(this.$refs.renderSection, {
          width: 1920,
        }).then((canvas) => {
          var ctx = canvas.getContext("2d");
          var doc = undefined;
          this.form.files.forEach((file, index) => {
            if (doc == undefined) {
              doc = new jsPDF({
                orientation: "portrait",
                unit: "px",
                format: [file.height, 1920],
              });
            } else {
              doc.addPage({
                orientation: "portrait",
                unit: "px",
                format: [file.height, 1920],
              });
            }
            var page = document.createElement("canvas");
            page.width = 1920;
            page.height = file.height;
            page
              .getContext("2d")
              .putImageData(
                ctx.getImageData(0, index * file.height, 1920, file.height),
                0,
                0
              );
            document.body.appendChild(page);

            doc.addImage(
              page.toDataURL("image/png"),
              "PNG",
              0,
              0,
              1920,
              file.height
            );
          });
          doc.save("application.pdf");
        });
        this.canvas.style.width = oldWidth;
        this.$emit("zoom", () => {});
      });
    },
  },
};
</script>

<style scoped>
div {
  text-align: center;
}

canvas {
  position: relative;
}

button {
  background: white;
}

div * button {
  margin-right: 1em;
  font-size: large;
}
</style>

<template>
  <div>
    <div class="container">
      <UserFormSelector />
    </div>
    <PDFEditor v-if="showForm" />
  </div>
</template>

<script>
import UserFormSelector from "@/components/UserFormSelector.vue";
import PDFEditor from "@/components/PDFEditor.vue";
import store from "@/store.js";

export default {
  name: "Applications",
  components: {
    UserFormSelector,
    PDFEditor,
  },
  computed: {
    showForm() {
      return store.showForm;
    },
  },
};
</script>

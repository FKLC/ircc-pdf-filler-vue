<template>
  <form @submit.prevent="sendFormData">
    <div class="row">
      <div class="four columns">
        <label for="applicationTypeInput">Application Type</label>
        <select class="u-full-width" id="applicationTypeInput" v-model="store.applicationKey">
          <option
            v-for="(_, applicationType) in store.applications"
            :value="applicationType"
            :key="applicationType"
          >{{ applicationType }}</option>
        </select>
      </div>
      <div class="four columns">
        <label for="formInput">Form Name</label>
        <select class="u-full-width" id="formInput" v-model="store.formKey">
          <option
            v-for="(_, formName) in store.applications[store.applicationKey].forms"
            :value="formName"
            :key="formName"
          >{{ formName }}</option>
        </select>
      </div>
      <div class="four columns">
        <label for="userInput">User</label>
        <select class="u-full-width" id="userInput" v-model="store.userKey">
          <option value>Add New User</option>
          <option
            v-for="(_, index) in store.users"
            :value="index"
            :key="index"
          >{{ getUsername(index) }}</option>
        </select>
      </div>
    </div>
    <button class="button-primary u-full-width">Continue</button>
  </form>
</template>

<script>
import store from "@/store.js";

export default {
  name: "UserFormSelector",
  data() {
    return {
      store,
    };
  },
  created() {
    for (var firstApplicationKey in store.applications) break;
    store.applicationKey = firstApplicationKey;

    for (var firstFormKey in store.applications[store.applicationKey].forms)
      break;
    store.formKey = firstFormKey;
  },
  methods: {
    sendFormData() {
      if (store.userKey === "") {
        store.userKey = store.users.push({ commonFields: {} }) - 1;
      }
      if (!(store.formKey in store.users[store.userKey])) {
        store.users[store.userKey][store.formKey] = [];
      }
      store.formData = store.users[store.userKey][store.formKey];
      store.formFieldIndex = store.applications[store.applicationKey].forms[
        store.formKey
      ].fields.map((f) => f.name);

      store.showForm = true;
    },
    getUsername(userKey) {
      var givenName = store.getCommonUserField(userKey, "GIVEN_NAME");
      var familyName = store.getCommonUserField(userKey, "FAMILY_NAME");
      if (givenName || familyName) {
        return `${familyName} ${givenName}`.trim();
      } else {
        return "Unnamed";
      }
    },
  },
};
</script>

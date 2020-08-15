import Vue from 'vue';
import applications from "@/assets/json/applications.json";

var store = Vue.observable({
    applicationKey: "",
    formKey: "",
    userKey: "",
    showForm: false,
    users: loadPermanent("users", []),
    formFieldIndex: [],
    formData: [],
    applications
});

store.savePermanent = (key) => {
    localStorage.setItem(key, JSON.stringify(store[key]));
}

function loadPermanent (key, orVal) {
    var value = localStorage.getItem(key);
    return value === null ? orVal : JSON.parse(value);
}
store.loadPermanent = loadPermanent;

store.getCommonUserField = (userKey, field) => {
    return store.users[userKey].commonFields[field];
}

export default store;
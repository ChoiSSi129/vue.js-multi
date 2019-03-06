<template>
  <div id="container">
      <div class="page-header">
         <h1 class="text-center">연락처 관리 애플리케이션</h1>
         <p>(Dynamic Component + EventBus + Axios) </p>
      </div>
      <component :is="currentView" :contact="contact"></component>
      <contactList :contactlist="contactlist"></contactList>
  </div>
</template>

<script>
import AddContact from "./components/AddContact";
import ContactList from "./components/ContactList";
import UpdateContact from "./components/UpdateContact";
import UpdatePhoto from "./components/UpdatePhoto";
import CONF from "./Config";
import eventBus from "./EventBus";

export default {
  name: 'app',
  components: {AddContact, ContactList, UpdateContact, UpdatePhoto},
  data: function(){
    return{
      currentView: null,
      contact: { no:0, name:"", tel:"", address:"", photo:"" },
      contactlist: { pageno:1, pagesize:CONF.PAGESIZE, totlacount:0, contacts:[] }
    }
  },
  mounted: function(){
    
  },
  methods: {
    
  }
}
</script>

<style scoped>
#container {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
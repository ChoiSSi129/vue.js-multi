import CONF from '../Config';

export default {
    currentView: null,
    mode: "add",
    contact: { no: 0, name: "", tel: "", address: "", photo: "" },
    contactlist: { pageno: 1, pagesize: CONF.PAGESIZE, totlacount: 0, contacts: [] }
}
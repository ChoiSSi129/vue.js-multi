import Constant from '../Constant';
import axios from 'axios';
import CONF from '../Config'

export default {
    [Constant.ADD_CONTACT_FORM] : (store)=> {
        store.commit(Constant.ADD_CONTACT_FORM);
    },
    [Constant.ADD_CONTACT] : (store)=> {
        axios.post(CONF.ADD, store.state.contact)
        .then((res) => {
            if(res.data.status === "success"){
                store.dispatch(Constant.CANCEL_FORM);
                store.dispatch(Constant.FETCH_CONTACTS, { pageno:1 });
            } else{
                console.log("연락처 추가 실패 : ", res.data);
            }
        })
    },
    [Constant.EDIT_CONTACT_FORM] : (store, payload) => {
        var contact = store.state.contactlist.contacts.find((c)=>{
            return c.no === payload.no;
        });

        store.commit(Constant.EDIT_CONTACT_FORM, { contact: {...contact} });

        // axios.get(CONF.FETCH_ONE.replace("${no}", payload.no))
        // .then((response)=> {
        //     store.commit(Constant.EDIT_CONTACT_FORM, { contact:response.data });
        // })
    },
    [Constant.UPDATE_CONTACT] : (store) => {
        var currentPageNo = store.state.contactlist.pageno;
        var contact = store.state.contact;
        axios.put(CONF.UPDATE.replace("${no}", contact.no), contact)
        .then((response)=> {
            if (response.data.status == "success") {
                store.dispatch(Constant.CANCEL_FORM);
                store.dispatch(Constant.FETCH_CONTACTS, { pageno: currentPageNo });
            } else {
                console.log("연락처 변경 실패 : " + response.data)
            }
        })
    },
    [Constant.EDIT_PHOTO_FORM] : (store, payload) => {
        axios.get(CONF.FETCH_ONE.replace("${no}", payload.no))
        .then((response)=> {
            store.commit(Constant.EDIT_PHOTO_FORM, { contact:response.data });
        })
    },
    [Constant.FETCH_CONTACTS] : (store, payload)=> {
        var pageno;
        if(typeof payload === "undefined"|| typeof payload.pageno === "undefined"){
            pageno = 1;
        } else{
            pageno = payload.pageno;
            var pagesize = store.state.contactlist.pagesize;
            axios.get(CONF.FETCH, {
                params: { pageno: pageno, pagesize: pagesize }
            }).then((res) => {
                store.commit(Constant.FETCH_CONTACTS, {contactlist: res.data});
            });
        }
    },
    [Constant.CANCEL_FORM] : (store) => {
        store.commit(Constant.CANCEL_FORM);
    },
    [Constant.DELETE_CONTACT] : (store, payload)=> {
        var currentPageNo = store.state.contactlist.pageno;
        axios.delete(CONF.DELETE.replace("${no}", payload.no))
        .then(()=> {
            store.dispatch(Constant.FETCH_CONTACTS, { pageno: currentPageNo });
        })
    }
}
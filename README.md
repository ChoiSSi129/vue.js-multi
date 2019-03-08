# MultiCampus Vue.js (2019-03-04  ~ 2019-03-08)

## 1일차
1. 환경 설정 및 목차소개
2. Vue.js 기본 개념 소개
3. Vue.js 인스턴스
4. 이벤트 처리

### 보간법
* {{}} 보간법 사용

        new Vue({
            delimiters: ["${", "}"], // 표현식 변경 가능
            el: "#element",
            data: {}
        });

### 가상 DOM
* 일반 브라우저 DOM Render
    - re-layout (reflow)
    - re-paint
    - 변경이 필요한 부분만 변경이 되지 않고 ajax 통신으로 들어오는 데이터 전체 갱신

* Vue.js
    - 가상 DOM Render
    - Snabb DOM (JS Object)
    - 저장된 Object와 변경된 Object 비교하여 필요한 부분만 갱신

### Vue.js 개발 도구
* VScode - vetur
* 크롬 익스텐션 Vue.js devtools

### 기본개념
* data
* computed (계산형 속성에서 사용하는 데이터가 변경될 경우에만 실행 비동기 지원 안함)
* methods (이벤트 함수)
* Watched Property 감시자 (비동기 지원)

        data: { x:0, y:0, z: { z1:0 } },
        watch:{ 
            x: function(to, from){}
            y: function(to, from){}
            ["z.z1"]: function(to, from){}
        }

* v-if (DOM 렌더링 하지 않음)
* v-show (DOM 렌더링 후 CSS로 제어)
* v-for (:key="obj" 고유 값 입력 index는 사용하지 않음)
* v-bind (:val 생략형)
* v-on (@event 생략형)

### 라이프 사이클
* beforeCreate
* ceated (데이터관찰 및 이벤트초기화 후 실행)
* beforeMount
* mounted (element 생성 후 실행)
* beforeUpdate
* updated (데이터가 변경 후 실행)
* beforeDestroyed
* destroyed (element 제거 후 실행)

### 이벤트 버블링  3단계
1. CAPTURE_PHASE
2. AT_TARGET
3. BUBBLING_PHASE

----------------------------

## 2일차
1. 스타일
2. Todo List 작성
3. 컴포넌트 기초
4. ES6

### 컴포넌트
* 부모 자식 관계로 트리 구조 형성
* 부모 -> 자식
    - 속성(props) 전달(props 입력시 camal case or cabab case 주의하여 작성)

            props: {
                message: {
                    type:String, 
                    required:true, 
                    default:{
                        type:Array,
                        default: function(){ // default value는 함수형태로 리턴
                            return ['코리아']
                        }
                    }
                }
            }

* 자식 -> 부모
    - 이벤트(event) 발신
* Event Bus를 활용한 부모 컴포넌트에 변경된 데이터 전달
* Event Bus 활용시 이벤트는 상수로 관리

        // 빈 Vue 인스턴스 생성
        var eventBus = new Vue();

        // 부모 컴포넌트에서 변경내용 받을 경우
        eventBus.$on("이벤트명", callback);

        // 자식 컴포넌트에서 변경내용 전달 할 경우
        eventBus.$emit("이벤트명", 전달 데이터); // 여러개 전달 가능

### ES6
* npm babel 설치
    - babel-cli
    - babel-preset-env // ES6 문법 정보
    - babel-preset-stage-2
* .babelrc or package.json에 presets: ["env", "stage2"] 등록 가능

* const, let, var
    - const 상수 개념으로 한번 선언하면 변경 불가
    - let 호이스팅 하지 않고 block scope 지원
    - var 호이스팅 하고 함수 scope만 지원

* 가변 파라미터

        function test(a1, ...a2){
            console.log(a2); // a1 이후 파라미터 배열로 반환
        }
        test("a1", "a2", "a3", "a4")
    
* 모듈
    - import, export를 사용하여 모듈화

        - module.js

                let a = 100;
                const add = function(b){
                    return a+b;
                }
                const multiply = function(b){
                    return a*b;
                }
                export {add, multiply};
                export default add; // 하나만 export 할 경우

        - main.js

                import { add, multiply } from "./module1";
                import add from "./module1"; // 하나만 import 할 경우
                import add, { add, multiply } from "./module1"; // 다중 import 할 경우

* Promise
    - axios, fetch, vue-resource, superagent 등이 promise 지원
    - IE 사용시 Polyfill 사용
    https://cdnjs.cloudflare.com/ajax/libs/es6-promise/4.1.1/es6-promise.auto.min.js

* 전개 연산자
    - 기존 객체의 속성이나 배열의 요소들을 포함하여 새로운 객체, 배열을 생성하고자 할 때 사용

            기존
            let obj1 = { name:"홍길동", age:30 };
            let obj2 = obj1;
            obj1 === obj2 // true
            obj2.name = "이몽룡"; // obj1.name도 같이 변경

            전개 연산자
            let obj1 = { name:"홍길동", age:30 };
            let obj2 = {...obj1};
            obj1 === obj2 // flase
            obj2.name = "이몽룡"; // obj2.name만 변경

----------------------------

## 3일차
1. Vue-CLI
2. 컴포넌트 심화
3. axios를 이용한 서버통신

### Vue-CLI
* 애플리캐이션을 빠르게 개발할 수 있는 관련된 기능을 모두 제공하는 Vue.js 개발 도구
    - CLI
    - CLI 서비스
    - CLI 플러그인

* 터미널에 익숙하지 않다면 vue ui 활용

### 컴포넌트 심화
* 단일 파일 컴포넌트
    - 전역 컴포넌트는 한 파일 안에 많은 내용들이 들어 있어 가독성에 좋지 않음
    - vue-loader 패키지가 단일 컴포넌트를 지원

            <template>

            </template>

            <script>
                export default {
                    name: "",
                    data: function(){
                        return{

                        }
                    },
                    methods: {
                        
                    }
                    
                }
            </script>

            <style>

            </style>

* 컴포넌트에서의 스타일
    1. scoped
        - IE에서 Attribute속성이 느리다는 단점
        - scoped 사용해도 자식 컴포넌트에는 스타일 상속

                <style scoped>
                    .main {....}
                </style>

    2. module
        - style에 module 추가하여 template class 바인딩 하여 사용

                <template>
                    <div>
                        <button :class="$style.hand">CSS Module을 적용한 버튼</button>
                    </div>
                </template>

                <script>
                    export default {
                        mounted: function(){
                            console.log(this.$style);
                        }
                    }
                </script>

                <style module>
                    .hand {cursor:pointer;background:purple;color:yellow;}
                </style>

    3. 공통 CSS 적용
        - 적용이 필요한 부분에서 import하여 사용

                import "./common.css";

* 슬롯
    1. 부모 컴포넌트와 자식컴포넌트 사이의 정보 교환 방법

            부모 컴포넌트
                <parent-component>
                    <div>
                        <p>
                            {{A.message}}
                        </p>
                    </div>
                </parent-component>

            자식 컴포넌트
                <div class="content">
                    <slot></slot>
                </div>
    
    2. 네임드 슬롯

            부모 컴포넌트
            <div id="app">
                <layout>
                    <header slot="header"></header>
                <layout>
            </div>

            자식 컴포넌트
            <div class="contents">
                <slot name="header"></slot>
            </div>

    3. 범위 슬롯(자식 -> 부모)
        - 자식 컴포넌트에서 데이터 바인딩
        - 부모 컴포넌트에서 scope로 받아 사용

                부모 컴포넌트
                <div id="app">
                    <layout>
                        <header slot="header" scope="p1"></header>
                    <layout>
                </div>

                자식 컴포넌트
                <div class="contents">
                    <slot name="header" :data="a.data"></slot>
                </div>

* 동적 컴포넌트
    - v-bind:is를 활용하여 작성
    - 정적 페이지의 경우 keep-alive로 캐싱 하여 사용 가능

            <template>
            <div>
            <ul>
                <li><a href="#" @click="changeMenu('home')">Home</a></li>
                <li><a href="#" @click="changeMenu('about')">About</a></li>
                <li><a href="#" @click="changeMenu('contact')">Contact</a></li>
            </ul>

            <div class="container">
                <!-- 정적 페이지의 경우 keep-alive 사용 -->
                <keep-alive include="about,home">
                <component v-bind:is="currentView"></component>
                </keep-alive>
            </div>
            </div>
            </template>
            <script>
            import Home from './components/Home.vue';
            import About from './components/About.vue';
            import Contact from './components/Contact.vue';
            export default {
            name: 'App',
            components : { Home, About, Contact },
            data() {
                return { currentView : 'home' }
            },
            methods : {
                changeMenu(view) {
                this.currentView = view;
                }
            }
            }
            </script>
            <style>
            </style>

* 재귀 컴포넌트
    - 템플릿에서 자기자신을 호출하는 컴포넌트
    - 반드시 name 옵션이 지정되어야 한다

            tree.vue
            <template>
                <ul>
                    <li v-for="item in subs" :class="item.type" :key="item.name">
                        {{item.name}}
                        <tree :subs="item.subs" />
                    </li>
                </ul>
            </template>

            <script>
            export default {
                name: "tree",
                props: ["subs"]
            }
            </script>

            <style>
            </style>

            About.vue
            <template>
                <div>
                    <h1>About</h1>
                    <h4>조직도</h4>
                    <tree :subs="orgcharts"></tree>
                </div>
            </template>
            <script>
            import Tree from './Tree.vue';
            export default {
            name : "about",
            components : { Tree },
            data : function() {
                return {
                orgcharts : [
                    {
                    name : "(주) OpenSG", type:"company", 
                    subs : [
                        { 
                            name: "SI 사업부", type:"division", 
                            subs : [
                                { name: "SI 1팀", type:"team" },
                                { name: "SI 2팀", type:"team" }
                            ] 
                        },
                        { name: "총무팀", type:"team" },
                        { name: "인사팀", type:"team" }
                    ]
                    }
                ]
                }
            }
            }
            </script>
            <style>
            </style>

### axios를 이용한 서버통신

* Cross Origin
    - 프론트 서버와 데이터 서버가 다를 경우 Cross Origin 발생
    - 데이터 서버에서 CORS 설정해 주는 방법
    - 개발서버에서 Proxy설정 하여 우회하는 방법
    - Node.js + express (http-proxy-middleware) 사용

* 전역 설정 방법

        import axios from "axios";
        Vue.prototype.$axios = axios; // Vue 인스턴스에 $axios 프로토타입 생성


----------------------------

## 4일차
1. Vuex

### Vuex를 이용한 상태관리
* flux 아키텍처 Vuex (React에서는 redux)
* 상태관리 라이브러리가 필요한 이유
    - 중앙 집중화된 상태 정보가 필요한경우
    - 상태 정보가 변경되는 상황과 시간을 추적 할 경우
    - 컴포넌트에서 상태 정보를 안전하게 접근하고 싶을 경우
* Action에서 외부 API사용
* Mutation에서 상태변경하여 State에 적용

        Constant.js
        export default {
            ADD_TODO: "addTodo",
        }

        store/index.js
        import Vue from "vue";
        import Vuex from "vuex";
        import Constant from "../Constant";

        // 모든 뷰 컴포넌트에서 Store 접근 가능
        // mutations에서 state(현재 상태)와 payload(변경된 상태) 2개의 인자 값으로 사용
        Vue.use(Vuex);

        const store = new Vuex.Store({
            state: {
                todolist: [
                    { id:1, todo:"영화보기", done:false },
                    { id:2, todo:"주말 산책", done:true },
                    { id:3, todo:"ES6 학습", done:false },
                    { id:4, todo:"잠실 야구장", done:false },
                ]
            },
            mutations: {
                [Constant.ADD_TODO]: (state, payload) => {
                    if(payload.todo !== ""){
                        state.todolist .push({ id: new Date().getTime(), todo: payload.todo, done: false });
                    }
                }
            }
        });
        export default store;

        InputTodo.vue
        methods: {
            addTodo: function(){
                this.$store.commit(Constant.ADD_TODO, {todo: this.todo}); // Store에 전달시 commit사용 하여 전달
            }
        }

* 헬퍼 메서드
    - mapState
    - mapMutations
    - mapActions
    - mapGetters

* 게터(Getters)
    - 중복되는 계산형 속성들에 대하여 하나의 함수로 지정하여 공통 사용 가능

* 액션(Actions)
    - 변이(mutation)의 경우 동기적인 작업만 수행 동기적 작업 수행하여 상태 추적가능하게 하려면 액션 기능 활용

----------------------------

## 5일차
1. strapi 개념 원리
2. vue-router

### Router
* URI(Uniform Resource Identifer) 경로에 따라 각각 다른 화면이 엔더링 되도록 만들어진 라이브러리
* 사용 방법

        main.js
        import VueRouter from 'vue-router'
        Vue.use(VueRouter); // Vue 인스턴스에 전역 객체로 등록

        App.vue
        <template>
            <router-link to="/home">Home</router-link> // router-link태그의 to속성으로 URI경로 등록
        </template>

        const router = new VueRouter({
            routes: [
                { path: "/", component: Home }, // path URI와 렌더링할 component 등록
            ]
        });

        export default {
        name: "app",
        router // router 주입
        }





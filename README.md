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


----------------------------

## 4일차


----------------------------

## 5일차




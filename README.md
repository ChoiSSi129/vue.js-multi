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
        el: ,
        data: {

        }
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

### 컴포넌트
* 부모 자식 관계로 트리 구조 형성
* 부모 -> 자식
- 속성(props) 전달
- props 입력시 camal case or cabab case 주의하여 작성
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

    


----------------------------

## 3일차


----------------------------

## 4일차


----------------------------

## 5일차




# MultiCampus Vue.js (2019-03-04  ~ 2019-03-08)

## 1일차
1. 환경 설정 및 목차소개
2. Vue.js 기본 개념 소개

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
    - VScode - vetur
    - 크롬 익스텐션 Vue.js devtools

### 기본개념
    - data
    - computed (계산형 속성에서 사용하는 데이터가 변경될 경우에만 실행 비동기 지원 안함)
    - methods (이벤트 함수)
    - Watched Property 감시자 (비동기 지원)
      data: {x:0, y:0},
      watch:{ 
          x:function(to, from){} 
      }

    - v-if (DOM 렌더링 하지 않음)
    - v-show (DOM 렌더링 후 CSS로 제어)
    - v-for (:key="obj" 고유 값 입력 index는 사용하지 않음)
    - v-bind (:val 생략형)
    - v-on (@event 생략형)
    

----------------------------

## 2일차


----------------------------

## 3일차


----------------------------

## 4일차


----------------------------

## 5일차




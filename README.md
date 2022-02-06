# Masonry Layout

## 1. Masonry
### 1-1. 사용법
```typescript
import React from 'react';
import MasonryLayout from 'react-masonry-layout';

const App: React.FC = () => {
  return (
    <MasonryLayout
      columnGap={16}
      rowGap={20}
      breakPointOption={{
        default: 5,
        1200: 4,
        780: 3,
        580: 2,
        380: 1
      }}
    >
      <div className="item1"></div>
      <div className="item2"></div>
      <div className="item3"></div>
      <div className="item4"></div>
      ...
    </MasonryLayout>
  );
};
```

### 1-2. Props 설정
|종류|필수값|default value|설명|
|---|---|:---:|---|
|`columnGap`|_optional_|20|column 사이의 간격을 나타낸다. (단위 px)|
|`rowGap`|_optional_|20|row 사이의 간격을 나타낸다. (단위 px)|
|`breakPointOption`|_optional_|`{ default: 5, 1200: 3, 780: 2, 510: 1 }`|break point마다 생성되는 칼럼의 개수이다. (기본 값을 예로들면 화면의 너비가 `0px~510px`일 때 칼럼의 개수는 1, `511px~780px`일 때 칼럼의 개수는 2, `781px~1200px`일 때 칼럼의 개수는 3), `1201px~`일 때 칼럼의 개수는 5이다.)|

## 2. Infinity scrolling
### 2-1. 사용법
[code sandbox 예시](https://codesandbox.io/s/awesome-chatelet-k1nop?file=/src/App.tsx)

### 2-2. Props 설정
다음은 Infinity scrolling 사용을 위해 설정해야 하는 `fetchMoreOption` prop 객체에 대한 설명입니다.
|종류|필수값|default value|설명|
|---|---|:---:|---|
|`dataLength`|__required__|-|추가적인 데이터를 받아왔다는 것을 감지하기 위한 값입니다.|
|`callback`|__required__|-|현재 스크롤 값이 `MasonryLayout` 컴포넌트 하단 높이보다 크다면 실행되는 함수입니다.|
|`threshold`|_optional_|0|콜백 함수가 실행되는 지점입니다.|
|`customLoader`|_optional_|`<h2 style={{ textAlign: 'center' }}>loading...</h2>`|새로운 데이터가 받아와지는 동안 하단에 나타나는 `Loader` 컴포넌트입니다.|
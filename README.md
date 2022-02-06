# Masonry Layout

### 목차
1-1 기본 사용법

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
|---|---|---|---|
|`columnGap`|optional|20|column 사이의 간격을 나타낸다. (단위 px)|
|`rowGap`|optional|20|row 사이의 간격을 나타낸다. (단위 px)|
|`breakPointOption`|optional|`{ default: 5, 1200: 3, 780: 2, 510: 1 }`|break point마다 생성되는 칼럼의 개수이다. (기본 값을 예로들면 화면의 너비가 0~510일 때 칼럼의 개수는 1, 511~780일 때 칼럼의 개수는 2, 781~1200일 때 칼럼의 개수는 3), 1201~일 때 칼럼의 개수는 5이다.)|


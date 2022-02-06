# Masonry Layout

## 사용법
```typescript
import React from 'react';
import MasonryLayout from 'react-masrony-layout';

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
***

## Props 설정
|종류|required|default value|
|---|---|---|
|`columnGap`|optional|20|
|`rowGap`|optional|20|
|`breakPointOption`|optional|`{ default: 5, 1200: 3, 780: 2, 510: 1 }`|

***

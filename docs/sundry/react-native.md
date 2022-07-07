---
title: React-Native
category: 知识分享
author: JQiue
---

## 搭建环境

+ 安装 Android Studio
+ 安装 SDK
+ 使用 wifi 调试真机
+ 在真机上设置电脑服务端 ip 和端口以最小代价启动开发

最好在真机上进行开发

## 最小示例

```js
import React from 'react';
import {View, Text} from 'react-native';

export default () => {
  return (
    <View>
      <Text>Hello, World</Text>
    </View>
  );
};
```

## 原生组件

需要从`react-native`模块引入

View：作为布局组件使用
Text：作为文本容
ScrollView：创建滚动视图

Button 创建一个按钮

```js
<Button onPress={()=>{}} title="点我！"/>
```

Image 创建一个图片组件

```js
```

## 样式代码

需要从`react-native`模块引入

```js
import {View, Text, StyleSheet} from 'react-native';

export default () => {
  return (
    <View>
      <Text style={styles.txt1} >Header</Text>
    </View>
  );
};

const styles = StyleSheet.create({
    txt1: {
        color: 'red'
    }
})
```

## 事件处理

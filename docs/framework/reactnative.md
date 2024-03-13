---
title: React Native
category: 框架
author: JQiue
article: false
---

::: tip
基于 ReactNative v0.73
:::

通过编写 JavaScript、HTML 和 CSS 的方式进行应用开发的方案大多使用 WebView 进行界面渲染，虽然可行，但是会导致性能损耗，同时无法达到原生平台的流畅性。相反 React Native 则将代码解析成真正原生的 UI 组件，接近原生平台，在不牺牲灵活性的前提下保持高性能

## 配置环境

+ JDK 17
+ [Android Studio](https://developer.android.com/studio?hl=zh-cn)
+ Android SDK

## 创建项目

```sh
npx react-native init my-project
```

+ 使用 wifi 调试真机
+ 在真机上设置服务端 ip 地址以最小代价启动开发

配置 Gradle 代理（非常重要），在 gradle.properties 添加如下内容：

```gradle
systemProp.http.proxyHost=127.0.0.1
systemProp.http.proxyPort=7890
systemProp.https.proxyHost=127.0.0.1
systemProp.https.proxyPort=7890
```

最小启动示例

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

一定要使用`yarn`作为包管理器

## 核心组件

在 React Native 中，所有的元素都将被平台特定的 React 组件所替换，需要从`react-native`模块引入

| React Native | Web    |
| ------------ | ------ |
| View         | div    |
| Text         | span   |
| ListView     | ul, li |
| Image        | img    |

```jsx
import { Button } from "react-native";
<Button title="点我！"/>
```

[官网](https://reactnative.dev/docs/button)提供了更多原始组件的用法

## 样式

React 和宿主平台之间的“桥接”包含了一个缩减版 CSS 子集的实现，这个 CSS 子集主要通过 flexbox 进行布局，做到了尽量简单化，而不是去实现所有的 CSS 规则，React 团队提倡使用内联样式

```jsx
const style = {
  color: 'red';
}

export default () => <Text style={style}>text</Text>
```

需要从`react-native`模块引入

```jsx
import {View, Text, StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  txt1: {
    color: 'red'
  }
});

export default () => {
  return (
    <Text style={styles.  }>Header</Text>
  )
};
```

## 事件处理

## 构建应用

构建 APP

```sh
cd android
./gradlew assembleRelease
```

### 同时安装 release 和 debug 包的办法

利于在同一设备进行调试，在`android\app\build.gradle`中加入

```gradle
buildTypes {
    debug {
        applicationIdSuffix "debug"
    }
}
```

### 根据 package.json 获取构建 APK 版本

自动化版本构建

```gradle
import groovy.json.JsonSlurper

/**
 * 获取 APP 构建版本
 */
def getAppVersion() {
    def inputFile = new File("../package.json")
    def packageJson = new JsonSlurper().parseText(inputFile.text)
    return packageJson["version"]
}

def appVersion = getAppVersion()

android {
    defaultConfig {
        versionName appVersion
    }
}
```

### 构建优化

为了减少构建体积，为`build.gradle`修改以下条目

```gradle
- ndk {
-   abiFilters "armeabi-v7a", "x86"
- }
- def enableSeparateBuildPerCPUArchitecture = false
+ def enableSeparateBuildPerCPUArchitecture = true
```

## expo

## 注意事项

Android 限制发送不安全的请求时，`AndroidManifest.xml`添加以下条目：

```xml
<application
  android:usesCleartextTraffic="true">
</application>
```

不允许读写存储时，`AndroidManifest.xml`添加以下条目

```xml
<uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE"/>
<uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE"/>
```

## 库

+ [React Native Paper](https://callstack.github.io/react-native-paper/docs/components/ActivityIndicator)

## 参考资料

+ 第一行代码（第3版）

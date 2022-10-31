---
title: React-Native
category: 框架
author: JQiue
article: false
---

::: tip
基于 ReactNative v0.70
:::

## 搭建环境

+ 安装 Android Studio
+ 安装 SDK
+ 使用 wifi 调试真机
+ 在真机上设置服务端 ip 地址以最小代价启动开发

创建 ReactNative 项目

```sh
npx react-native init my-project
```

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

## 配置 Gradle 代理（重要）

在 gradle.properties 加入如下内容：

```gradle
systemProp.http.proxyHost=127.0.0.1
systemProp.http.proxyPort=7890
systemProp.https.proxyHost=127.0.0.1
systemProp.https.proxyPort=7890
```

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

## 同时安装 release 和 debug 包的办法

利于在同一设备进行调试，在`android\app\build.gradle`中加入

```gradle
buildTypes {
    debug {
        applicationIdSuffix "debug"
    }
}
```

## 根据 package.json 获取构建 APK 版本

自动化版本构建

```gradle
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
        versionCode 1
        versionName appVersion
    }
}
```

## 构建 APP

```sh
cd android
./gradlew assembleRelease
```

## 构建优化

为了减少构建体积，为`build.gradle`修改以下条目

```gradle
- ndk {
-   abiFilters "armeabi-v7a", "x86"
- }
- def enableSeparateBuildPerCPUArchitecture = false
+ def enableSeparateBuildPerCPUArchitecture = true
```

## 参考资料

+ 第一行代码（第3版）

---
title: 线性结构：链表
author: JQiue
article: false
---

用一段地址连续的空间，依次存储线性表中的元素，编程语言中的数组就是开辟的一块连续空间

<CodeGroup>

<CodeGroupItem title="C" active>
```c
```
</CodeGroupItem>

<CodeGroupItem title="java">
```java
```
</CodeGroupItem>

<CodeGroupItem title="javascript">
```javascript
```
</CodeGroupItem>

<CodeGroupItem title="python">
```python
```
</CodeGroupItem>

</CodeGroup>

## C 语言实现

### 初始化

```c
#define CAPACITY 20

int size = 0;

void init(int *);

int main(void){
  int arr[CAPACITY];
  return 0;
}

void init(int *arr){
  for (int i = 0; i < 10; i++){
    arr[i] = i;
    size++;
  }
}
```

### 增：末尾插入

根据已有的元素个数在末尾添加

```c
void addLast(int *arr, int e){
  arr[size] = e;
  size++;
}
```

### 增：指定位置插入

将插入位置后的元素全部向后移动一位腾出空间插入，但是要注意从最末尾的元素开始移动

```c
void insert(int *arr, int index, int e){
  for (int i = size - 1; i >= index; i--){
    arr[i + 1] = arr[i];
  }
  arr[index] = e;
  size++;
}
```

### 增：表头插入

这还用想？直接复用 insert 函数的代码就行了

```c
void addFirst(int *arr, int e){
  insert(arr, 0, e)
}
```

### 删：删除指定位置的元素

```c
void delete(int *arr, int index){
  for (int i = index + 1; i < size; i++){
    arr[i - 1] = arr[i];
  }
  size--;
}
```

### 删：表头删除

复用 delete 函数就完事了

```c
void deleteFirst(int *arr){
  delete(arr, 0);
}
```

### 删：末尾删除

复用，复用，复用

```c

```

### 改

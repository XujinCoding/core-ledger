# Core Ledger API Documentation


**简介**:Core Ledger API Documentation


**HOST**:http://localhost:8080/code-ledger


**联系人**:Core Ledger Team


**Version**:1.0.0


**接口路径**:/code-ledger/v3/api-docs/core-ledger-api


[TOC]






# 商品分类管理


## 获取分类详情


**接口地址**:`/code-ledger/api/categories/{id}`


**请求方式**:`GET`


**请求数据类型**:`application/x-www-form-urlencoded`


**响应数据类型**:`*/*`


**接口描述**:<p>根据ID获取分类详情</p>



**请求参数**:


| 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|id||path|true|integer(int64)||


**响应状态**:


| 状态码 | 说明 | schema |
| -------- | -------- | ----- | 
|200|OK|ResultCategoryVO|
|400|Bad Request|ResultObject|
|401|Unauthorized|ResultObject|
|403|Forbidden|ResultObject|
|404|Not Found|ResultObject|
|405|Method Not Allowed|ResultObject|
|409|Conflict|ResultObject|
|500|Internal Server Error|ResultObject|


**响应状态码-200**:


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code|响应码|integer(int32)|integer(int32)|
|message|响应消息|string||
|data||CategoryVO|CategoryVO|
|&emsp;&emsp;id|分类ID|integer(int64)||
|&emsp;&emsp;parentId|父分类ID|integer(int64)||
|&emsp;&emsp;name|分类名称|string||
|&emsp;&emsp;level|分类层级|integer(int32)||
|&emsp;&emsp;sortOrder|排序序号|integer(int32)||
|&emsp;&emsp;iconUrl|分类图标URL|string||
|&emsp;&emsp;memo|备注|string||
|&emsp;&emsp;status|状态,可用值:0,1|string||
|&emsp;&emsp;createInstant|创建时间|string(date-time)||
|&emsp;&emsp;modifyInstant|修改时间|string(date-time)||
|timestamp|时间戳|integer(int64)|integer(int64)|
|success||boolean||


**响应示例**:
```javascript
{
	"code": 200,
	"message": "操作成功",
	"data": {
		"id": 0,
		"parentId": 0,
		"name": "",
		"level": 0,
		"sortOrder": 0,
		"iconUrl": "",
		"memo": "",
		"status": "",
		"createInstant": "",
		"modifyInstant": ""
	},
	"timestamp": 1700000000000,
	"success": true
}
```


**响应状态码-400**:


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code|响应码|integer(int32)|integer(int32)|
|message|响应消息|string||
|data|响应数据|object||
|timestamp|时间戳|integer(int64)|integer(int64)|
|success||boolean||


**响应示例**:
```javascript
{
	"code": 200,
	"message": "操作成功",
	"data": {},
	"timestamp": 1700000000000,
	"success": true
}
```


**响应状态码-401**:


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code|响应码|integer(int32)|integer(int32)|
|message|响应消息|string||
|data|响应数据|object||
|timestamp|时间戳|integer(int64)|integer(int64)|
|success||boolean||


**响应示例**:
```javascript
{
	"code": 200,
	"message": "操作成功",
	"data": {},
	"timestamp": 1700000000000,
	"success": true
}
```


**响应状态码-403**:


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code|响应码|integer(int32)|integer(int32)|
|message|响应消息|string||
|data|响应数据|object||
|timestamp|时间戳|integer(int64)|integer(int64)|
|success||boolean||


**响应示例**:
```javascript
{
	"code": 200,
	"message": "操作成功",
	"data": {},
	"timestamp": 1700000000000,
	"success": true
}
```


**响应状态码-404**:


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code|响应码|integer(int32)|integer(int32)|
|message|响应消息|string||
|data|响应数据|object||
|timestamp|时间戳|integer(int64)|integer(int64)|
|success||boolean||


**响应示例**:
```javascript
{
	"code": 200,
	"message": "操作成功",
	"data": {},
	"timestamp": 1700000000000,
	"success": true
}
```


**响应状态码-405**:


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code|响应码|integer(int32)|integer(int32)|
|message|响应消息|string||
|data|响应数据|object||
|timestamp|时间戳|integer(int64)|integer(int64)|
|success||boolean||


**响应示例**:
```javascript
{
	"code": 200,
	"message": "操作成功",
	"data": {},
	"timestamp": 1700000000000,
	"success": true
}
```


**响应状态码-409**:


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code|响应码|integer(int32)|integer(int32)|
|message|响应消息|string||
|data|响应数据|object||
|timestamp|时间戳|integer(int64)|integer(int64)|
|success||boolean||


**响应示例**:
```javascript
{
	"code": 200,
	"message": "操作成功",
	"data": {},
	"timestamp": 1700000000000,
	"success": true
}
```


**响应状态码-500**:


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code|响应码|integer(int32)|integer(int32)|
|message|响应消息|string||
|data|响应数据|object||
|timestamp|时间戳|integer(int64)|integer(int64)|
|success||boolean||


**响应示例**:
```javascript
{
	"code": 200,
	"message": "操作成功",
	"data": {},
	"timestamp": 1700000000000,
	"success": true
}
```


## 修改商品分类


**接口地址**:`/code-ledger/api/categories/{id}`


**请求方式**:`PUT`


**请求数据类型**:`application/x-www-form-urlencoded,application/json`


**响应数据类型**:`*/*`


**接口描述**:<p>修改分类基本信息</p>



**请求示例**:


```javascript
{
  "name": "水果",
  "sortOrder": 0,
  "iconUrl": "",
  "memo": ""
}
```


**请求参数**:


| 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|id||path|true|integer(int64)||
|categoryUpdateDTO|商品分类修改请求|body|true|CategoryUpdateDTO|CategoryUpdateDTO|
|&emsp;&emsp;name|分类名称||true|string||
|&emsp;&emsp;sortOrder|排序序号||false|integer(int32)||
|&emsp;&emsp;iconUrl|分类图标URL||false|string||
|&emsp;&emsp;memo|备注||false|string||


**响应状态**:


| 状态码 | 说明 | schema |
| -------- | -------- | ----- | 
|200|OK|ResultCategoryVO|
|400|Bad Request|ResultObject|
|401|Unauthorized|ResultObject|
|403|Forbidden|ResultObject|
|404|Not Found|ResultObject|
|405|Method Not Allowed|ResultObject|
|409|Conflict|ResultObject|
|500|Internal Server Error|ResultObject|


**响应状态码-200**:


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code|响应码|integer(int32)|integer(int32)|
|message|响应消息|string||
|data||CategoryVO|CategoryVO|
|&emsp;&emsp;id|分类ID|integer(int64)||
|&emsp;&emsp;parentId|父分类ID|integer(int64)||
|&emsp;&emsp;name|分类名称|string||
|&emsp;&emsp;level|分类层级|integer(int32)||
|&emsp;&emsp;sortOrder|排序序号|integer(int32)||
|&emsp;&emsp;iconUrl|分类图标URL|string||
|&emsp;&emsp;memo|备注|string||
|&emsp;&emsp;status|状态,可用值:0,1|string||
|&emsp;&emsp;createInstant|创建时间|string(date-time)||
|&emsp;&emsp;modifyInstant|修改时间|string(date-time)||
|timestamp|时间戳|integer(int64)|integer(int64)|
|success||boolean||


**响应示例**:
```javascript
{
	"code": 200,
	"message": "操作成功",
	"data": {
		"id": 0,
		"parentId": 0,
		"name": "",
		"level": 0,
		"sortOrder": 0,
		"iconUrl": "",
		"memo": "",
		"status": "",
		"createInstant": "",
		"modifyInstant": ""
	},
	"timestamp": 1700000000000,
	"success": true
}
```


**响应状态码-400**:


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code|响应码|integer(int32)|integer(int32)|
|message|响应消息|string||
|data|响应数据|object||
|timestamp|时间戳|integer(int64)|integer(int64)|
|success||boolean||


**响应示例**:
```javascript
{
	"code": 200,
	"message": "操作成功",
	"data": {},
	"timestamp": 1700000000000,
	"success": true
}
```


**响应状态码-401**:


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code|响应码|integer(int32)|integer(int32)|
|message|响应消息|string||
|data|响应数据|object||
|timestamp|时间戳|integer(int64)|integer(int64)|
|success||boolean||


**响应示例**:
```javascript
{
	"code": 200,
	"message": "操作成功",
	"data": {},
	"timestamp": 1700000000000,
	"success": true
}
```


**响应状态码-403**:


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code|响应码|integer(int32)|integer(int32)|
|message|响应消息|string||
|data|响应数据|object||
|timestamp|时间戳|integer(int64)|integer(int64)|
|success||boolean||


**响应示例**:
```javascript
{
	"code": 200,
	"message": "操作成功",
	"data": {},
	"timestamp": 1700000000000,
	"success": true
}
```


**响应状态码-404**:


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code|响应码|integer(int32)|integer(int32)|
|message|响应消息|string||
|data|响应数据|object||
|timestamp|时间戳|integer(int64)|integer(int64)|
|success||boolean||


**响应示例**:
```javascript
{
	"code": 200,
	"message": "操作成功",
	"data": {},
	"timestamp": 1700000000000,
	"success": true
}
```


**响应状态码-405**:


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code|响应码|integer(int32)|integer(int32)|
|message|响应消息|string||
|data|响应数据|object||
|timestamp|时间戳|integer(int64)|integer(int64)|
|success||boolean||


**响应示例**:
```javascript
{
	"code": 200,
	"message": "操作成功",
	"data": {},
	"timestamp": 1700000000000,
	"success": true
}
```


**响应状态码-409**:


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code|响应码|integer(int32)|integer(int32)|
|message|响应消息|string||
|data|响应数据|object||
|timestamp|时间戳|integer(int64)|integer(int64)|
|success||boolean||


**响应示例**:
```javascript
{
	"code": 200,
	"message": "操作成功",
	"data": {},
	"timestamp": 1700000000000,
	"success": true
}
```


**响应状态码-500**:


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code|响应码|integer(int32)|integer(int32)|
|message|响应消息|string||
|data|响应数据|object||
|timestamp|时间戳|integer(int64)|integer(int64)|
|success||boolean||


**响应示例**:
```javascript
{
	"code": 200,
	"message": "操作成功",
	"data": {},
	"timestamp": 1700000000000,
	"success": true
}
```


## 删除商品分类


**接口地址**:`/code-ledger/api/categories/{id}`


**请求方式**:`DELETE`


**请求数据类型**:`application/x-www-form-urlencoded`


**响应数据类型**:`*/*`


**接口描述**:<p>删除分类（不能有子分类和商品）</p>



**请求参数**:


| 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|id||path|true|integer(int64)||


**响应状态**:


| 状态码 | 说明 | schema |
| -------- | -------- | ----- | 
|200|OK|ResultVoid|
|400|Bad Request|ResultObject|
|401|Unauthorized|ResultObject|
|403|Forbidden|ResultObject|
|404|Not Found|ResultObject|
|405|Method Not Allowed|ResultObject|
|409|Conflict|ResultObject|
|500|Internal Server Error|ResultObject|


**响应状态码-200**:


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code|响应码|integer(int32)|integer(int32)|
|message|响应消息|string||
|data|响应数据|object||
|timestamp|时间戳|integer(int64)|integer(int64)|
|success||boolean||


**响应示例**:
```javascript
{
	"code": 200,
	"message": "操作成功",
	"data": {},
	"timestamp": 1700000000000,
	"success": true
}
```


**响应状态码-400**:


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code|响应码|integer(int32)|integer(int32)|
|message|响应消息|string||
|data|响应数据|object||
|timestamp|时间戳|integer(int64)|integer(int64)|
|success||boolean||


**响应示例**:
```javascript
{
	"code": 200,
	"message": "操作成功",
	"data": {},
	"timestamp": 1700000000000,
	"success": true
}
```


**响应状态码-401**:


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code|响应码|integer(int32)|integer(int32)|
|message|响应消息|string||
|data|响应数据|object||
|timestamp|时间戳|integer(int64)|integer(int64)|
|success||boolean||


**响应示例**:
```javascript
{
	"code": 200,
	"message": "操作成功",
	"data": {},
	"timestamp": 1700000000000,
	"success": true
}
```


**响应状态码-403**:


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code|响应码|integer(int32)|integer(int32)|
|message|响应消息|string||
|data|响应数据|object||
|timestamp|时间戳|integer(int64)|integer(int64)|
|success||boolean||


**响应示例**:
```javascript
{
	"code": 200,
	"message": "操作成功",
	"data": {},
	"timestamp": 1700000000000,
	"success": true
}
```


**响应状态码-404**:


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code|响应码|integer(int32)|integer(int32)|
|message|响应消息|string||
|data|响应数据|object||
|timestamp|时间戳|integer(int64)|integer(int64)|
|success||boolean||


**响应示例**:
```javascript
{
	"code": 200,
	"message": "操作成功",
	"data": {},
	"timestamp": 1700000000000,
	"success": true
}
```


**响应状态码-405**:


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code|响应码|integer(int32)|integer(int32)|
|message|响应消息|string||
|data|响应数据|object||
|timestamp|时间戳|integer(int64)|integer(int64)|
|success||boolean||


**响应示例**:
```javascript
{
	"code": 200,
	"message": "操作成功",
	"data": {},
	"timestamp": 1700000000000,
	"success": true
}
```


**响应状态码-409**:


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code|响应码|integer(int32)|integer(int32)|
|message|响应消息|string||
|data|响应数据|object||
|timestamp|时间戳|integer(int64)|integer(int64)|
|success||boolean||


**响应示例**:
```javascript
{
	"code": 200,
	"message": "操作成功",
	"data": {},
	"timestamp": 1700000000000,
	"success": true
}
```


**响应状态码-500**:


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code|响应码|integer(int32)|integer(int32)|
|message|响应消息|string||
|data|响应数据|object||
|timestamp|时间戳|integer(int64)|integer(int64)|
|success||boolean||


**响应示例**:
```javascript
{
	"code": 200,
	"message": "操作成功",
	"data": {},
	"timestamp": 1700000000000,
	"success": true
}
```


## 启用-禁用分类


**接口地址**:`/code-ledger/api/categories/{id}/status`


**请求方式**:`PUT`


**请求数据类型**:`application/x-www-form-urlencoded`


**响应数据类型**:`*/*`


**接口描述**:<p>修改分类状态</p>



**请求参数**:


| 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|id||path|true|integer(int64)||
|status|可用值:0,1|query|true|string||


**响应状态**:


| 状态码 | 说明 | schema |
| -------- | -------- | ----- | 
|200|OK|ResultCategoryVO|
|400|Bad Request|ResultObject|
|401|Unauthorized|ResultObject|
|403|Forbidden|ResultObject|
|404|Not Found|ResultObject|
|405|Method Not Allowed|ResultObject|
|409|Conflict|ResultObject|
|500|Internal Server Error|ResultObject|


**响应状态码-200**:


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code|响应码|integer(int32)|integer(int32)|
|message|响应消息|string||
|data||CategoryVO|CategoryVO|
|&emsp;&emsp;id|分类ID|integer(int64)||
|&emsp;&emsp;parentId|父分类ID|integer(int64)||
|&emsp;&emsp;name|分类名称|string||
|&emsp;&emsp;level|分类层级|integer(int32)||
|&emsp;&emsp;sortOrder|排序序号|integer(int32)||
|&emsp;&emsp;iconUrl|分类图标URL|string||
|&emsp;&emsp;memo|备注|string||
|&emsp;&emsp;status|状态,可用值:0,1|string||
|&emsp;&emsp;createInstant|创建时间|string(date-time)||
|&emsp;&emsp;modifyInstant|修改时间|string(date-time)||
|timestamp|时间戳|integer(int64)|integer(int64)|
|success||boolean||


**响应示例**:
```javascript
{
	"code": 200,
	"message": "操作成功",
	"data": {
		"id": 0,
		"parentId": 0,
		"name": "",
		"level": 0,
		"sortOrder": 0,
		"iconUrl": "",
		"memo": "",
		"status": "",
		"createInstant": "",
		"modifyInstant": ""
	},
	"timestamp": 1700000000000,
	"success": true
}
```


**响应状态码-400**:


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code|响应码|integer(int32)|integer(int32)|
|message|响应消息|string||
|data|响应数据|object||
|timestamp|时间戳|integer(int64)|integer(int64)|
|success||boolean||


**响应示例**:
```javascript
{
	"code": 200,
	"message": "操作成功",
	"data": {},
	"timestamp": 1700000000000,
	"success": true
}
```


**响应状态码-401**:


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code|响应码|integer(int32)|integer(int32)|
|message|响应消息|string||
|data|响应数据|object||
|timestamp|时间戳|integer(int64)|integer(int64)|
|success||boolean||


**响应示例**:
```javascript
{
	"code": 200,
	"message": "操作成功",
	"data": {},
	"timestamp": 1700000000000,
	"success": true
}
```


**响应状态码-403**:


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code|响应码|integer(int32)|integer(int32)|
|message|响应消息|string||
|data|响应数据|object||
|timestamp|时间戳|integer(int64)|integer(int64)|
|success||boolean||


**响应示例**:
```javascript
{
	"code": 200,
	"message": "操作成功",
	"data": {},
	"timestamp": 1700000000000,
	"success": true
}
```


**响应状态码-404**:


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code|响应码|integer(int32)|integer(int32)|
|message|响应消息|string||
|data|响应数据|object||
|timestamp|时间戳|integer(int64)|integer(int64)|
|success||boolean||


**响应示例**:
```javascript
{
	"code": 200,
	"message": "操作成功",
	"data": {},
	"timestamp": 1700000000000,
	"success": true
}
```


**响应状态码-405**:


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code|响应码|integer(int32)|integer(int32)|
|message|响应消息|string||
|data|响应数据|object||
|timestamp|时间戳|integer(int64)|integer(int64)|
|success||boolean||


**响应示例**:
```javascript
{
	"code": 200,
	"message": "操作成功",
	"data": {},
	"timestamp": 1700000000000,
	"success": true
}
```


**响应状态码-409**:


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code|响应码|integer(int32)|integer(int32)|
|message|响应消息|string||
|data|响应数据|object||
|timestamp|时间戳|integer(int64)|integer(int64)|
|success||boolean||


**响应示例**:
```javascript
{
	"code": 200,
	"message": "操作成功",
	"data": {},
	"timestamp": 1700000000000,
	"success": true
}
```


**响应状态码-500**:


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code|响应码|integer(int32)|integer(int32)|
|message|响应消息|string||
|data|响应数据|object||
|timestamp|时间戳|integer(int64)|integer(int64)|
|success||boolean||


**响应示例**:
```javascript
{
	"code": 200,
	"message": "操作成功",
	"data": {},
	"timestamp": 1700000000000,
	"success": true
}
```


## 移动分类


**接口地址**:`/code-ledger/api/categories/{id}/move`


**请求方式**:`PUT`


**请求数据类型**:`application/x-www-form-urlencoded`


**响应数据类型**:`*/*`


**接口描述**:<p>修改分类的父分类（会重新计算层级）</p>



**请求参数**:


| 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|id||path|true|integer(int64)||
|newParentId||query|true|integer(int64)||


**响应状态**:


| 状态码 | 说明 | schema |
| -------- | -------- | ----- | 
|200|OK|ResultCategoryVO|
|400|Bad Request|ResultObject|
|401|Unauthorized|ResultObject|
|403|Forbidden|ResultObject|
|404|Not Found|ResultObject|
|405|Method Not Allowed|ResultObject|
|409|Conflict|ResultObject|
|500|Internal Server Error|ResultObject|


**响应状态码-200**:


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code|响应码|integer(int32)|integer(int32)|
|message|响应消息|string||
|data||CategoryVO|CategoryVO|
|&emsp;&emsp;id|分类ID|integer(int64)||
|&emsp;&emsp;parentId|父分类ID|integer(int64)||
|&emsp;&emsp;name|分类名称|string||
|&emsp;&emsp;level|分类层级|integer(int32)||
|&emsp;&emsp;sortOrder|排序序号|integer(int32)||
|&emsp;&emsp;iconUrl|分类图标URL|string||
|&emsp;&emsp;memo|备注|string||
|&emsp;&emsp;status|状态,可用值:0,1|string||
|&emsp;&emsp;createInstant|创建时间|string(date-time)||
|&emsp;&emsp;modifyInstant|修改时间|string(date-time)||
|timestamp|时间戳|integer(int64)|integer(int64)|
|success||boolean||


**响应示例**:
```javascript
{
	"code": 200,
	"message": "操作成功",
	"data": {
		"id": 0,
		"parentId": 0,
		"name": "",
		"level": 0,
		"sortOrder": 0,
		"iconUrl": "",
		"memo": "",
		"status": "",
		"createInstant": "",
		"modifyInstant": ""
	},
	"timestamp": 1700000000000,
	"success": true
}
```


**响应状态码-400**:


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code|响应码|integer(int32)|integer(int32)|
|message|响应消息|string||
|data|响应数据|object||
|timestamp|时间戳|integer(int64)|integer(int64)|
|success||boolean||


**响应示例**:
```javascript
{
	"code": 200,
	"message": "操作成功",
	"data": {},
	"timestamp": 1700000000000,
	"success": true
}
```


**响应状态码-401**:


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code|响应码|integer(int32)|integer(int32)|
|message|响应消息|string||
|data|响应数据|object||
|timestamp|时间戳|integer(int64)|integer(int64)|
|success||boolean||


**响应示例**:
```javascript
{
	"code": 200,
	"message": "操作成功",
	"data": {},
	"timestamp": 1700000000000,
	"success": true
}
```


**响应状态码-403**:


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code|响应码|integer(int32)|integer(int32)|
|message|响应消息|string||
|data|响应数据|object||
|timestamp|时间戳|integer(int64)|integer(int64)|
|success||boolean||


**响应示例**:
```javascript
{
	"code": 200,
	"message": "操作成功",
	"data": {},
	"timestamp": 1700000000000,
	"success": true
}
```


**响应状态码-404**:


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code|响应码|integer(int32)|integer(int32)|
|message|响应消息|string||
|data|响应数据|object||
|timestamp|时间戳|integer(int64)|integer(int64)|
|success||boolean||


**响应示例**:
```javascript
{
	"code": 200,
	"message": "操作成功",
	"data": {},
	"timestamp": 1700000000000,
	"success": true
}
```


**响应状态码-405**:


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code|响应码|integer(int32)|integer(int32)|
|message|响应消息|string||
|data|响应数据|object||
|timestamp|时间戳|integer(int64)|integer(int64)|
|success||boolean||


**响应示例**:
```javascript
{
	"code": 200,
	"message": "操作成功",
	"data": {},
	"timestamp": 1700000000000,
	"success": true
}
```


**响应状态码-409**:


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code|响应码|integer(int32)|integer(int32)|
|message|响应消息|string||
|data|响应数据|object||
|timestamp|时间戳|integer(int64)|integer(int64)|
|success||boolean||


**响应示例**:
```javascript
{
	"code": 200,
	"message": "操作成功",
	"data": {},
	"timestamp": 1700000000000,
	"success": true
}
```


**响应状态码-500**:


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code|响应码|integer(int32)|integer(int32)|
|message|响应消息|string||
|data|响应数据|object||
|timestamp|时间戳|integer(int64)|integer(int64)|
|success||boolean||


**响应示例**:
```javascript
{
	"code": 200,
	"message": "操作成功",
	"data": {},
	"timestamp": 1700000000000,
	"success": true
}
```


## 获取分类列表


**接口地址**:`/code-ledger/api/categories`


**请求方式**:`GET`


**请求数据类型**:`application/x-www-form-urlencoded`


**响应数据类型**:`*/*`


**接口描述**:<p>获取分类列表（支持父分类筛选、分页）</p>



**请求参数**:


| 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|pageable||query|true|Pageable|Pageable|
|&emsp;&emsp;page|||false|integer(int32)||
|&emsp;&emsp;size|||false|integer(int32)||
|&emsp;&emsp;sort|||false|array|string|
|parentId||query|false|integer(int64)||


**响应状态**:


| 状态码 | 说明 | schema |
| -------- | -------- | ----- | 
|200|OK|ResultPageCategoryVO|
|400|Bad Request|ResultObject|
|401|Unauthorized|ResultObject|
|403|Forbidden|ResultObject|
|404|Not Found|ResultObject|
|405|Method Not Allowed|ResultObject|
|409|Conflict|ResultObject|
|500|Internal Server Error|ResultObject|


**响应状态码-200**:


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code|响应码|integer(int32)|integer(int32)|
|message|响应消息|string||
|data||PageCategoryVO|PageCategoryVO|
|&emsp;&emsp;totalPages||integer(int32)||
|&emsp;&emsp;totalElements||integer(int64)||
|&emsp;&emsp;size||integer(int32)||
|&emsp;&emsp;content|商品分类|array|CategoryVO|
|&emsp;&emsp;&emsp;&emsp;id|分类ID|integer||
|&emsp;&emsp;&emsp;&emsp;parentId|父分类ID|integer||
|&emsp;&emsp;&emsp;&emsp;name|分类名称|string||
|&emsp;&emsp;&emsp;&emsp;level|分类层级|integer||
|&emsp;&emsp;&emsp;&emsp;sortOrder|排序序号|integer||
|&emsp;&emsp;&emsp;&emsp;iconUrl|分类图标URL|string||
|&emsp;&emsp;&emsp;&emsp;memo|备注|string||
|&emsp;&emsp;&emsp;&emsp;status|状态,可用值:0,1|string||
|&emsp;&emsp;&emsp;&emsp;createInstant|创建时间|string||
|&emsp;&emsp;&emsp;&emsp;modifyInstant|修改时间|string||
|&emsp;&emsp;number||integer(int32)||
|&emsp;&emsp;sort||SortObject|SortObject|
|&emsp;&emsp;&emsp;&emsp;empty||boolean||
|&emsp;&emsp;&emsp;&emsp;sorted||boolean||
|&emsp;&emsp;&emsp;&emsp;unsorted||boolean||
|&emsp;&emsp;first||boolean||
|&emsp;&emsp;last||boolean||
|&emsp;&emsp;numberOfElements||integer(int32)||
|&emsp;&emsp;pageable||PageableObject|PageableObject|
|&emsp;&emsp;&emsp;&emsp;offset||integer||
|&emsp;&emsp;&emsp;&emsp;sort||SortObject|SortObject|
|&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;empty||boolean||
|&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;sorted||boolean||
|&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;unsorted||boolean||
|&emsp;&emsp;&emsp;&emsp;pageSize||integer||
|&emsp;&emsp;&emsp;&emsp;pageNumber||integer||
|&emsp;&emsp;&emsp;&emsp;paged||boolean||
|&emsp;&emsp;&emsp;&emsp;unpaged||boolean||
|&emsp;&emsp;empty||boolean||
|timestamp|时间戳|integer(int64)|integer(int64)|
|success||boolean||


**响应示例**:
```javascript
{
	"code": 200,
	"message": "操作成功",
	"data": {
		"totalPages": 0,
		"totalElements": 0,
		"size": 0,
		"content": [
			{
				"id": 0,
				"parentId": 0,
				"name": "",
				"level": 0,
				"sortOrder": 0,
				"iconUrl": "",
				"memo": "",
				"status": "",
				"createInstant": "",
				"modifyInstant": ""
			}
		],
		"number": 0,
		"sort": {
			"empty": true,
			"sorted": true,
			"unsorted": true
		},
		"first": true,
		"last": true,
		"numberOfElements": 0,
		"pageable": {
			"offset": 0,
			"sort": {
				"empty": true,
				"sorted": true,
				"unsorted": true
			},
			"pageSize": 0,
			"pageNumber": 0,
			"paged": true,
			"unpaged": true
		},
		"empty": true
	},
	"timestamp": 1700000000000,
	"success": true
}
```


**响应状态码-400**:


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code|响应码|integer(int32)|integer(int32)|
|message|响应消息|string||
|data|响应数据|object||
|timestamp|时间戳|integer(int64)|integer(int64)|
|success||boolean||


**响应示例**:
```javascript
{
	"code": 200,
	"message": "操作成功",
	"data": {},
	"timestamp": 1700000000000,
	"success": true
}
```


**响应状态码-401**:


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code|响应码|integer(int32)|integer(int32)|
|message|响应消息|string||
|data|响应数据|object||
|timestamp|时间戳|integer(int64)|integer(int64)|
|success||boolean||


**响应示例**:
```javascript
{
	"code": 200,
	"message": "操作成功",
	"data": {},
	"timestamp": 1700000000000,
	"success": true
}
```


**响应状态码-403**:


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code|响应码|integer(int32)|integer(int32)|
|message|响应消息|string||
|data|响应数据|object||
|timestamp|时间戳|integer(int64)|integer(int64)|
|success||boolean||


**响应示例**:
```javascript
{
	"code": 200,
	"message": "操作成功",
	"data": {},
	"timestamp": 1700000000000,
	"success": true
}
```


**响应状态码-404**:


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code|响应码|integer(int32)|integer(int32)|
|message|响应消息|string||
|data|响应数据|object||
|timestamp|时间戳|integer(int64)|integer(int64)|
|success||boolean||


**响应示例**:
```javascript
{
	"code": 200,
	"message": "操作成功",
	"data": {},
	"timestamp": 1700000000000,
	"success": true
}
```


**响应状态码-405**:


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code|响应码|integer(int32)|integer(int32)|
|message|响应消息|string||
|data|响应数据|object||
|timestamp|时间戳|integer(int64)|integer(int64)|
|success||boolean||


**响应示例**:
```javascript
{
	"code": 200,
	"message": "操作成功",
	"data": {},
	"timestamp": 1700000000000,
	"success": true
}
```


**响应状态码-409**:


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code|响应码|integer(int32)|integer(int32)|
|message|响应消息|string||
|data|响应数据|object||
|timestamp|时间戳|integer(int64)|integer(int64)|
|success||boolean||


**响应示例**:
```javascript
{
	"code": 200,
	"message": "操作成功",
	"data": {},
	"timestamp": 1700000000000,
	"success": true
}
```


**响应状态码-500**:


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code|响应码|integer(int32)|integer(int32)|
|message|响应消息|string||
|data|响应数据|object||
|timestamp|时间戳|integer(int64)|integer(int64)|
|success||boolean||


**响应示例**:
```javascript
{
	"code": 200,
	"message": "操作成功",
	"data": {},
	"timestamp": 1700000000000,
	"success": true
}
```


## 创建商品分类


**接口地址**:`/code-ledger/api/categories`


**请求方式**:`POST`


**请求数据类型**:`application/x-www-form-urlencoded,application/json`


**响应数据类型**:`*/*`


**接口描述**:<p>创建新的商品分类（自动计算层级）</p>



**请求示例**:


```javascript
{
  "parentId": 0,
  "name": "水果",
  "sortOrder": 0,
  "iconUrl": "",
  "memo": ""
}
```


**请求参数**:


| 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|categoryCreateDTO|商品分类创建请求|body|true|CategoryCreateDTO|CategoryCreateDTO|
|&emsp;&emsp;parentId|父分类ID（0表示顶级分类）||true|integer(int64)||
|&emsp;&emsp;name|分类名称||true|string||
|&emsp;&emsp;sortOrder|排序序号||false|integer(int32)||
|&emsp;&emsp;iconUrl|分类图标URL||false|string||
|&emsp;&emsp;memo|备注||false|string||


**响应状态**:


| 状态码 | 说明 | schema |
| -------- | -------- | ----- | 
|200|OK|ResultCategoryVO|
|400|Bad Request|ResultObject|
|401|Unauthorized|ResultObject|
|403|Forbidden|ResultObject|
|404|Not Found|ResultObject|
|405|Method Not Allowed|ResultObject|
|409|Conflict|ResultObject|
|500|Internal Server Error|ResultObject|


**响应状态码-200**:


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code|响应码|integer(int32)|integer(int32)|
|message|响应消息|string||
|data||CategoryVO|CategoryVO|
|&emsp;&emsp;id|分类ID|integer(int64)||
|&emsp;&emsp;parentId|父分类ID|integer(int64)||
|&emsp;&emsp;name|分类名称|string||
|&emsp;&emsp;level|分类层级|integer(int32)||
|&emsp;&emsp;sortOrder|排序序号|integer(int32)||
|&emsp;&emsp;iconUrl|分类图标URL|string||
|&emsp;&emsp;memo|备注|string||
|&emsp;&emsp;status|状态,可用值:0,1|string||
|&emsp;&emsp;createInstant|创建时间|string(date-time)||
|&emsp;&emsp;modifyInstant|修改时间|string(date-time)||
|timestamp|时间戳|integer(int64)|integer(int64)|
|success||boolean||


**响应示例**:
```javascript
{
	"code": 200,
	"message": "操作成功",
	"data": {
		"id": 0,
		"parentId": 0,
		"name": "",
		"level": 0,
		"sortOrder": 0,
		"iconUrl": "",
		"memo": "",
		"status": "",
		"createInstant": "",
		"modifyInstant": ""
	},
	"timestamp": 1700000000000,
	"success": true
}
```


**响应状态码-400**:


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code|响应码|integer(int32)|integer(int32)|
|message|响应消息|string||
|data|响应数据|object||
|timestamp|时间戳|integer(int64)|integer(int64)|
|success||boolean||


**响应示例**:
```javascript
{
	"code": 200,
	"message": "操作成功",
	"data": {},
	"timestamp": 1700000000000,
	"success": true
}
```


**响应状态码-401**:


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code|响应码|integer(int32)|integer(int32)|
|message|响应消息|string||
|data|响应数据|object||
|timestamp|时间戳|integer(int64)|integer(int64)|
|success||boolean||


**响应示例**:
```javascript
{
	"code": 200,
	"message": "操作成功",
	"data": {},
	"timestamp": 1700000000000,
	"success": true
}
```


**响应状态码-403**:


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code|响应码|integer(int32)|integer(int32)|
|message|响应消息|string||
|data|响应数据|object||
|timestamp|时间戳|integer(int64)|integer(int64)|
|success||boolean||


**响应示例**:
```javascript
{
	"code": 200,
	"message": "操作成功",
	"data": {},
	"timestamp": 1700000000000,
	"success": true
}
```


**响应状态码-404**:


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code|响应码|integer(int32)|integer(int32)|
|message|响应消息|string||
|data|响应数据|object||
|timestamp|时间戳|integer(int64)|integer(int64)|
|success||boolean||


**响应示例**:
```javascript
{
	"code": 200,
	"message": "操作成功",
	"data": {},
	"timestamp": 1700000000000,
	"success": true
}
```


**响应状态码-405**:


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code|响应码|integer(int32)|integer(int32)|
|message|响应消息|string||
|data|响应数据|object||
|timestamp|时间戳|integer(int64)|integer(int64)|
|success||boolean||


**响应示例**:
```javascript
{
	"code": 200,
	"message": "操作成功",
	"data": {},
	"timestamp": 1700000000000,
	"success": true
}
```


**响应状态码-409**:


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code|响应码|integer(int32)|integer(int32)|
|message|响应消息|string||
|data|响应数据|object||
|timestamp|时间戳|integer(int64)|integer(int64)|
|success||boolean||


**响应示例**:
```javascript
{
	"code": 200,
	"message": "操作成功",
	"data": {},
	"timestamp": 1700000000000,
	"success": true
}
```


**响应状态码-500**:


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code|响应码|integer(int32)|integer(int32)|
|message|响应消息|string||
|data|响应数据|object||
|timestamp|时间戳|integer(int64)|integer(int64)|
|success||boolean||


**响应示例**:
```javascript
{
	"code": 200,
	"message": "操作成功",
	"data": {},
	"timestamp": 1700000000000,
	"success": true
}
```


## 获取子分类


**接口地址**:`/code-ledger/api/categories/{id}/children`


**请求方式**:`GET`


**请求数据类型**:`application/x-www-form-urlencoded`


**响应数据类型**:`*/*`


**接口描述**:<p>获取指定分类的所有子分类</p>



**请求参数**:


| 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|id||path|true|integer(int64)||


**响应状态**:


| 状态码 | 说明 | schema |
| -------- | -------- | ----- | 
|200|OK|ResultListCategoryVO|
|400|Bad Request|ResultObject|
|401|Unauthorized|ResultObject|
|403|Forbidden|ResultObject|
|404|Not Found|ResultObject|
|405|Method Not Allowed|ResultObject|
|409|Conflict|ResultObject|
|500|Internal Server Error|ResultObject|


**响应状态码-200**:


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code|响应码|integer(int32)|integer(int32)|
|message|响应消息|string||
|data|响应数据|array|CategoryVO|
|&emsp;&emsp;id|分类ID|integer(int64)||
|&emsp;&emsp;parentId|父分类ID|integer(int64)||
|&emsp;&emsp;name|分类名称|string||
|&emsp;&emsp;level|分类层级|integer(int32)||
|&emsp;&emsp;sortOrder|排序序号|integer(int32)||
|&emsp;&emsp;iconUrl|分类图标URL|string||
|&emsp;&emsp;memo|备注|string||
|&emsp;&emsp;status|状态,可用值:0,1|string||
|&emsp;&emsp;createInstant|创建时间|string(date-time)||
|&emsp;&emsp;modifyInstant|修改时间|string(date-time)||
|timestamp|时间戳|integer(int64)|integer(int64)|
|success||boolean||


**响应示例**:
```javascript
{
	"code": 200,
	"message": "操作成功",
	"data": [
		{
			"id": 0,
			"parentId": 0,
			"name": "",
			"level": 0,
			"sortOrder": 0,
			"iconUrl": "",
			"memo": "",
			"status": "",
			"createInstant": "",
			"modifyInstant": ""
		}
	],
	"timestamp": 1700000000000,
	"success": true
}
```


**响应状态码-400**:


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code|响应码|integer(int32)|integer(int32)|
|message|响应消息|string||
|data|响应数据|object||
|timestamp|时间戳|integer(int64)|integer(int64)|
|success||boolean||


**响应示例**:
```javascript
{
	"code": 200,
	"message": "操作成功",
	"data": {},
	"timestamp": 1700000000000,
	"success": true
}
```


**响应状态码-401**:


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code|响应码|integer(int32)|integer(int32)|
|message|响应消息|string||
|data|响应数据|object||
|timestamp|时间戳|integer(int64)|integer(int64)|
|success||boolean||


**响应示例**:
```javascript
{
	"code": 200,
	"message": "操作成功",
	"data": {},
	"timestamp": 1700000000000,
	"success": true
}
```


**响应状态码-403**:


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code|响应码|integer(int32)|integer(int32)|
|message|响应消息|string||
|data|响应数据|object||
|timestamp|时间戳|integer(int64)|integer(int64)|
|success||boolean||


**响应示例**:
```javascript
{
	"code": 200,
	"message": "操作成功",
	"data": {},
	"timestamp": 1700000000000,
	"success": true
}
```


**响应状态码-404**:


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code|响应码|integer(int32)|integer(int32)|
|message|响应消息|string||
|data|响应数据|object||
|timestamp|时间戳|integer(int64)|integer(int64)|
|success||boolean||


**响应示例**:
```javascript
{
	"code": 200,
	"message": "操作成功",
	"data": {},
	"timestamp": 1700000000000,
	"success": true
}
```


**响应状态码-405**:


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code|响应码|integer(int32)|integer(int32)|
|message|响应消息|string||
|data|响应数据|object||
|timestamp|时间戳|integer(int64)|integer(int64)|
|success||boolean||


**响应示例**:
```javascript
{
	"code": 200,
	"message": "操作成功",
	"data": {},
	"timestamp": 1700000000000,
	"success": true
}
```


**响应状态码-409**:


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code|响应码|integer(int32)|integer(int32)|
|message|响应消息|string||
|data|响应数据|object||
|timestamp|时间戳|integer(int64)|integer(int64)|
|success||boolean||


**响应示例**:
```javascript
{
	"code": 200,
	"message": "操作成功",
	"data": {},
	"timestamp": 1700000000000,
	"success": true
}
```


**响应状态码-500**:


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code|响应码|integer(int32)|integer(int32)|
|message|响应消息|string||
|data|响应数据|object||
|timestamp|时间戳|integer(int64)|integer(int64)|
|success||boolean||


**响应示例**:
```javascript
{
	"code": 200,
	"message": "操作成功",
	"data": {},
	"timestamp": 1700000000000,
	"success": true
}
```


## 获取分类树


**接口地址**:`/code-ledger/api/categories/tree`


**请求方式**:`GET`


**请求数据类型**:`application/x-www-form-urlencoded`


**响应数据类型**:`*/*`


**接口描述**:<p>获取完整的分类树形结构</p>



**请求参数**:


暂无


**响应状态**:


| 状态码 | 说明 | schema |
| -------- | -------- | ----- | 
|200|OK|ResultListCategoryTreeVO|
|400|Bad Request|ResultObject|
|401|Unauthorized|ResultObject|
|403|Forbidden|ResultObject|
|404|Not Found|ResultObject|
|405|Method Not Allowed|ResultObject|
|409|Conflict|ResultObject|
|500|Internal Server Error|ResultObject|


**响应状态码-200**:


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code|响应码|integer(int32)|integer(int32)|
|message|响应消息|string||
|data|响应数据|array|CategoryTreeVO|
|&emsp;&emsp;id|分类ID|integer(int64)||
|&emsp;&emsp;parentId|父分类ID|integer(int64)||
|&emsp;&emsp;name|分类名称|string||
|&emsp;&emsp;level|分类层级|integer(int32)||
|&emsp;&emsp;sortOrder|排序序号|integer(int32)||
|&emsp;&emsp;iconUrl|分类图标URL|string||
|&emsp;&emsp;status|状态,可用值:0,1|string||
|&emsp;&emsp;children|子分类列表|array|CategoryTreeVO|
|timestamp|时间戳|integer(int64)|integer(int64)|
|success||boolean||


**响应示例**:
```javascript
{
	"code": 200,
	"message": "操作成功",
	"data": [
		{
			"id": 0,
			"parentId": 0,
			"name": "",
			"level": 0,
			"sortOrder": 0,
			"iconUrl": "",
			"status": "",
			"children": [
				{
					"id": 0,
					"parentId": 0,
					"name": "",
					"level": 0,
					"sortOrder": 0,
					"iconUrl": "",
					"status": "",
					"children": [
						{}
					]
				}
			]
		}
	],
	"timestamp": 1700000000000,
	"success": true
}
```


**响应状态码-400**:


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code|响应码|integer(int32)|integer(int32)|
|message|响应消息|string||
|data|响应数据|object||
|timestamp|时间戳|integer(int64)|integer(int64)|
|success||boolean||


**响应示例**:
```javascript
{
	"code": 200,
	"message": "操作成功",
	"data": {},
	"timestamp": 1700000000000,
	"success": true
}
```


**响应状态码-401**:


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code|响应码|integer(int32)|integer(int32)|
|message|响应消息|string||
|data|响应数据|object||
|timestamp|时间戳|integer(int64)|integer(int64)|
|success||boolean||


**响应示例**:
```javascript
{
	"code": 200,
	"message": "操作成功",
	"data": {},
	"timestamp": 1700000000000,
	"success": true
}
```


**响应状态码-403**:


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code|响应码|integer(int32)|integer(int32)|
|message|响应消息|string||
|data|响应数据|object||
|timestamp|时间戳|integer(int64)|integer(int64)|
|success||boolean||


**响应示例**:
```javascript
{
	"code": 200,
	"message": "操作成功",
	"data": {},
	"timestamp": 1700000000000,
	"success": true
}
```


**响应状态码-404**:


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code|响应码|integer(int32)|integer(int32)|
|message|响应消息|string||
|data|响应数据|object||
|timestamp|时间戳|integer(int64)|integer(int64)|
|success||boolean||


**响应示例**:
```javascript
{
	"code": 200,
	"message": "操作成功",
	"data": {},
	"timestamp": 1700000000000,
	"success": true
}
```


**响应状态码-405**:


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code|响应码|integer(int32)|integer(int32)|
|message|响应消息|string||
|data|响应数据|object||
|timestamp|时间戳|integer(int64)|integer(int64)|
|success||boolean||


**响应示例**:
```javascript
{
	"code": 200,
	"message": "操作成功",
	"data": {},
	"timestamp": 1700000000000,
	"success": true
}
```


**响应状态码-409**:


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code|响应码|integer(int32)|integer(int32)|
|message|响应消息|string||
|data|响应数据|object||
|timestamp|时间戳|integer(int64)|integer(int64)|
|success||boolean||


**响应示例**:
```javascript
{
	"code": 200,
	"message": "操作成功",
	"data": {},
	"timestamp": 1700000000000,
	"success": true
}
```


**响应状态码-500**:


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code|响应码|integer(int32)|integer(int32)|
|message|响应消息|string||
|data|响应数据|object||
|timestamp|时间戳|integer(int64)|integer(int64)|
|success||boolean||


**响应示例**:
```javascript
{
	"code": 200,
	"message": "操作成功",
	"data": {},
	"timestamp": 1700000000000,
	"success": true
}
```


# 商品管理


## 获取商品详情


**接口地址**:`/code-ledger/api/products/{id}`


**请求方式**:`GET`


**请求数据类型**:`application/x-www-form-urlencoded`


**响应数据类型**:`*/*`


**接口描述**:<p>获取商品详情（含属性和SKU）</p>



**请求参数**:


| 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|id||path|true|integer(int64)||


**响应状态**:


| 状态码 | 说明 | schema |
| -------- | -------- | ----- | 
|200|OK|ResultProductVO|
|400|Bad Request|ResultObject|
|401|Unauthorized|ResultObject|
|403|Forbidden|ResultObject|
|404|Not Found|ResultObject|
|405|Method Not Allowed|ResultObject|
|409|Conflict|ResultObject|
|500|Internal Server Error|ResultObject|


**响应状态码-200**:


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code|响应码|integer(int32)|integer(int32)|
|message|响应消息|string||
|data||ProductVO|ProductVO|
|&emsp;&emsp;id|商品ID|integer(int64)||
|&emsp;&emsp;categoryId|分类ID|integer(int64)||
|&emsp;&emsp;categoryName|分类名称|string||
|&emsp;&emsp;name|商品名称|string||
|&emsp;&emsp;imageUrl|商品主图URL|string||
|&emsp;&emsp;description|商品描述|string||
|&emsp;&emsp;price|标准价格|number||
|&emsp;&emsp;spec|规格型号|string||
|&emsp;&emsp;unit|单位|string||
|&emsp;&emsp;location|存放位置|string||
|&emsp;&emsp;memo|备注|string||
|&emsp;&emsp;status|状态,可用值:0,1|string||
|&emsp;&emsp;attrs|商品属性|array|ProductAttrVO|
|&emsp;&emsp;&emsp;&emsp;id|属性ID|integer||
|&emsp;&emsp;&emsp;&emsp;productId|商品ID|integer||
|&emsp;&emsp;&emsp;&emsp;attrName|属性名称|string||
|&emsp;&emsp;&emsp;&emsp;sortOrder|排序序号|integer||
|&emsp;&emsp;&emsp;&emsp;values|商品属性值|array|ProductAttrValueVO|
|&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;id|属性值ID|integer||
|&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;productAttrId|商品属性ID|integer||
|&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;value|属性值|string||
|&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;sortOrder|排序序号|integer||
|&emsp;&emsp;skus|商品SKU|array|ProductSkuVO|
|&emsp;&emsp;&emsp;&emsp;id|SKU ID|integer||
|&emsp;&emsp;&emsp;&emsp;productId|商品ID|integer||
|&emsp;&emsp;&emsp;&emsp;skuName|SKU名称|string||
|&emsp;&emsp;&emsp;&emsp;priceStatus|定价状态,可用值:0,1|string||
|&emsp;&emsp;&emsp;&emsp;price|SKU销售价格|number||
|&emsp;&emsp;&emsp;&emsp;imageUrl|SKU图片URL|string||
|&emsp;&emsp;&emsp;&emsp;sortOrder|排序序号|integer||
|&emsp;&emsp;&emsp;&emsp;status|状态,可用值:0,1|string||
|&emsp;&emsp;&emsp;&emsp;skuAttrs|商品SKU属性值|array|ProductSkuAttrVO|
|&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;attrName|属性名称|string||
|&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;attrValue|属性值|string||
|&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;sortOrder|排序序号|integer||
|&emsp;&emsp;createInstant|创建时间|string(date-time)||
|&emsp;&emsp;modifyInstant|修改时间|string(date-time)||
|timestamp|时间戳|integer(int64)|integer(int64)|
|success||boolean||


**响应示例**:
```javascript
{
	"code": 200,
	"message": "操作成功",
	"data": {
		"id": 0,
		"categoryId": 0,
		"categoryName": "",
		"name": "",
		"imageUrl": "",
		"description": "",
		"price": 0,
		"spec": "",
		"unit": "",
		"location": "",
		"memo": "",
		"status": "",
		"attrs": [
			{
				"id": 0,
				"productId": 0,
				"attrName": "",
				"sortOrder": 0,
				"values": [
					{
						"id": 0,
						"productAttrId": 0,
						"value": "",
						"sortOrder": 0
					}
				]
			}
		],
		"skus": [
			{
				"id": 0,
				"productId": 0,
				"skuName": "",
				"priceStatus": "",
				"price": 0,
				"imageUrl": "",
				"sortOrder": 0,
				"status": "",
				"skuAttrs": [
					{
						"attrName": "",
						"attrValue": "",
						"sortOrder": 0
					}
				]
			}
		],
		"createInstant": "",
		"modifyInstant": ""
	},
	"timestamp": 1700000000000,
	"success": true
}
```


**响应状态码-400**:


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code|响应码|integer(int32)|integer(int32)|
|message|响应消息|string||
|data|响应数据|object||
|timestamp|时间戳|integer(int64)|integer(int64)|
|success||boolean||


**响应示例**:
```javascript
{
	"code": 200,
	"message": "操作成功",
	"data": {},
	"timestamp": 1700000000000,
	"success": true
}
```


**响应状态码-401**:


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code|响应码|integer(int32)|integer(int32)|
|message|响应消息|string||
|data|响应数据|object||
|timestamp|时间戳|integer(int64)|integer(int64)|
|success||boolean||


**响应示例**:
```javascript
{
	"code": 200,
	"message": "操作成功",
	"data": {},
	"timestamp": 1700000000000,
	"success": true
}
```


**响应状态码-403**:


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code|响应码|integer(int32)|integer(int32)|
|message|响应消息|string||
|data|响应数据|object||
|timestamp|时间戳|integer(int64)|integer(int64)|
|success||boolean||


**响应示例**:
```javascript
{
	"code": 200,
	"message": "操作成功",
	"data": {},
	"timestamp": 1700000000000,
	"success": true
}
```


**响应状态码-404**:


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code|响应码|integer(int32)|integer(int32)|
|message|响应消息|string||
|data|响应数据|object||
|timestamp|时间戳|integer(int64)|integer(int64)|
|success||boolean||


**响应示例**:
```javascript
{
	"code": 200,
	"message": "操作成功",
	"data": {},
	"timestamp": 1700000000000,
	"success": true
}
```


**响应状态码-405**:


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code|响应码|integer(int32)|integer(int32)|
|message|响应消息|string||
|data|响应数据|object||
|timestamp|时间戳|integer(int64)|integer(int64)|
|success||boolean||


**响应示例**:
```javascript
{
	"code": 200,
	"message": "操作成功",
	"data": {},
	"timestamp": 1700000000000,
	"success": true
}
```


**响应状态码-409**:


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code|响应码|integer(int32)|integer(int32)|
|message|响应消息|string||
|data|响应数据|object||
|timestamp|时间戳|integer(int64)|integer(int64)|
|success||boolean||


**响应示例**:
```javascript
{
	"code": 200,
	"message": "操作成功",
	"data": {},
	"timestamp": 1700000000000,
	"success": true
}
```


**响应状态码-500**:


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code|响应码|integer(int32)|integer(int32)|
|message|响应消息|string||
|data|响应数据|object||
|timestamp|时间戳|integer(int64)|integer(int64)|
|success||boolean||


**响应示例**:
```javascript
{
	"code": 200,
	"message": "操作成功",
	"data": {},
	"timestamp": 1700000000000,
	"success": true
}
```


## 修改商品


**接口地址**:`/code-ledger/api/products/{id}`


**请求方式**:`PUT`


**请求数据类型**:`application/x-www-form-urlencoded,application/json`


**响应数据类型**:`*/*`


**接口描述**:<p>修改商品基本信息</p>



**请求示例**:


```javascript
{
  "name": "红富士苹果",
  "imageUrl": "",
  "description": "",
  "price": 30,
  "spec": "",
  "unit": "斤",
  "location": "A区3排5列",
  "categoryId": 1,
  "memo": ""
}
```


**请求参数**:


| 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|id||path|true|integer(int64)||
|productUpdateDTO|商品修改请求|body|true|ProductUpdateDTO|ProductUpdateDTO|
|&emsp;&emsp;name|商品名称||true|string||
|&emsp;&emsp;imageUrl|商品主图URL||false|string||
|&emsp;&emsp;description|商品描述||false|string||
|&emsp;&emsp;price|标准价格||false|number||
|&emsp;&emsp;spec|规格型号||false|string||
|&emsp;&emsp;unit|单位||false|string||
|&emsp;&emsp;location|存放位置||false|string||
|&emsp;&emsp;categoryId|商品分类标识||false|integer(int64)||
|&emsp;&emsp;memo|备注||false|string||


**响应状态**:


| 状态码 | 说明 | schema |
| -------- | -------- | ----- | 
|200|OK|ResultProductVO|
|400|Bad Request|ResultObject|
|401|Unauthorized|ResultObject|
|403|Forbidden|ResultObject|
|404|Not Found|ResultObject|
|405|Method Not Allowed|ResultObject|
|409|Conflict|ResultObject|
|500|Internal Server Error|ResultObject|


**响应状态码-200**:


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code|响应码|integer(int32)|integer(int32)|
|message|响应消息|string||
|data||ProductVO|ProductVO|
|&emsp;&emsp;id|商品ID|integer(int64)||
|&emsp;&emsp;categoryId|分类ID|integer(int64)||
|&emsp;&emsp;categoryName|分类名称|string||
|&emsp;&emsp;name|商品名称|string||
|&emsp;&emsp;imageUrl|商品主图URL|string||
|&emsp;&emsp;description|商品描述|string||
|&emsp;&emsp;price|标准价格|number||
|&emsp;&emsp;spec|规格型号|string||
|&emsp;&emsp;unit|单位|string||
|&emsp;&emsp;location|存放位置|string||
|&emsp;&emsp;memo|备注|string||
|&emsp;&emsp;status|状态,可用值:0,1|string||
|&emsp;&emsp;attrs|商品属性|array|ProductAttrVO|
|&emsp;&emsp;&emsp;&emsp;id|属性ID|integer||
|&emsp;&emsp;&emsp;&emsp;productId|商品ID|integer||
|&emsp;&emsp;&emsp;&emsp;attrName|属性名称|string||
|&emsp;&emsp;&emsp;&emsp;sortOrder|排序序号|integer||
|&emsp;&emsp;&emsp;&emsp;values|商品属性值|array|ProductAttrValueVO|
|&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;id|属性值ID|integer||
|&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;productAttrId|商品属性ID|integer||
|&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;value|属性值|string||
|&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;sortOrder|排序序号|integer||
|&emsp;&emsp;skus|商品SKU|array|ProductSkuVO|
|&emsp;&emsp;&emsp;&emsp;id|SKU ID|integer||
|&emsp;&emsp;&emsp;&emsp;productId|商品ID|integer||
|&emsp;&emsp;&emsp;&emsp;skuName|SKU名称|string||
|&emsp;&emsp;&emsp;&emsp;priceStatus|定价状态,可用值:0,1|string||
|&emsp;&emsp;&emsp;&emsp;price|SKU销售价格|number||
|&emsp;&emsp;&emsp;&emsp;imageUrl|SKU图片URL|string||
|&emsp;&emsp;&emsp;&emsp;sortOrder|排序序号|integer||
|&emsp;&emsp;&emsp;&emsp;status|状态,可用值:0,1|string||
|&emsp;&emsp;&emsp;&emsp;skuAttrs|商品SKU属性值|array|ProductSkuAttrVO|
|&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;attrName|属性名称|string||
|&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;attrValue|属性值|string||
|&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;sortOrder|排序序号|integer||
|&emsp;&emsp;createInstant|创建时间|string(date-time)||
|&emsp;&emsp;modifyInstant|修改时间|string(date-time)||
|timestamp|时间戳|integer(int64)|integer(int64)|
|success||boolean||


**响应示例**:
```javascript
{
	"code": 200,
	"message": "操作成功",
	"data": {
		"id": 0,
		"categoryId": 0,
		"categoryName": "",
		"name": "",
		"imageUrl": "",
		"description": "",
		"price": 0,
		"spec": "",
		"unit": "",
		"location": "",
		"memo": "",
		"status": "",
		"attrs": [
			{
				"id": 0,
				"productId": 0,
				"attrName": "",
				"sortOrder": 0,
				"values": [
					{
						"id": 0,
						"productAttrId": 0,
						"value": "",
						"sortOrder": 0
					}
				]
			}
		],
		"skus": [
			{
				"id": 0,
				"productId": 0,
				"skuName": "",
				"priceStatus": "",
				"price": 0,
				"imageUrl": "",
				"sortOrder": 0,
				"status": "",
				"skuAttrs": [
					{
						"attrName": "",
						"attrValue": "",
						"sortOrder": 0
					}
				]
			}
		],
		"createInstant": "",
		"modifyInstant": ""
	},
	"timestamp": 1700000000000,
	"success": true
}
```


**响应状态码-400**:


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code|响应码|integer(int32)|integer(int32)|
|message|响应消息|string||
|data|响应数据|object||
|timestamp|时间戳|integer(int64)|integer(int64)|
|success||boolean||


**响应示例**:
```javascript
{
	"code": 200,
	"message": "操作成功",
	"data": {},
	"timestamp": 1700000000000,
	"success": true
}
```


**响应状态码-401**:


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code|响应码|integer(int32)|integer(int32)|
|message|响应消息|string||
|data|响应数据|object||
|timestamp|时间戳|integer(int64)|integer(int64)|
|success||boolean||


**响应示例**:
```javascript
{
	"code": 200,
	"message": "操作成功",
	"data": {},
	"timestamp": 1700000000000,
	"success": true
}
```


**响应状态码-403**:


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code|响应码|integer(int32)|integer(int32)|
|message|响应消息|string||
|data|响应数据|object||
|timestamp|时间戳|integer(int64)|integer(int64)|
|success||boolean||


**响应示例**:
```javascript
{
	"code": 200,
	"message": "操作成功",
	"data": {},
	"timestamp": 1700000000000,
	"success": true
}
```


**响应状态码-404**:


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code|响应码|integer(int32)|integer(int32)|
|message|响应消息|string||
|data|响应数据|object||
|timestamp|时间戳|integer(int64)|integer(int64)|
|success||boolean||


**响应示例**:
```javascript
{
	"code": 200,
	"message": "操作成功",
	"data": {},
	"timestamp": 1700000000000,
	"success": true
}
```


**响应状态码-405**:


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code|响应码|integer(int32)|integer(int32)|
|message|响应消息|string||
|data|响应数据|object||
|timestamp|时间戳|integer(int64)|integer(int64)|
|success||boolean||


**响应示例**:
```javascript
{
	"code": 200,
	"message": "操作成功",
	"data": {},
	"timestamp": 1700000000000,
	"success": true
}
```


**响应状态码-409**:


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code|响应码|integer(int32)|integer(int32)|
|message|响应消息|string||
|data|响应数据|object||
|timestamp|时间戳|integer(int64)|integer(int64)|
|success||boolean||


**响应示例**:
```javascript
{
	"code": 200,
	"message": "操作成功",
	"data": {},
	"timestamp": 1700000000000,
	"success": true
}
```


**响应状态码-500**:


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code|响应码|integer(int32)|integer(int32)|
|message|响应消息|string||
|data|响应数据|object||
|timestamp|时间戳|integer(int64)|integer(int64)|
|success||boolean||


**响应示例**:
```javascript
{
	"code": 200,
	"message": "操作成功",
	"data": {},
	"timestamp": 1700000000000,
	"success": true
}
```


## 删除商品


**接口地址**:`/code-ledger/api/products/{id}`


**请求方式**:`DELETE`


**请求数据类型**:`application/x-www-form-urlencoded`


**响应数据类型**:`*/*`


**接口描述**:<p>删除商品及其属性和SKU</p>



**请求参数**:


| 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|id||path|true|integer(int64)||


**响应状态**:


| 状态码 | 说明 | schema |
| -------- | -------- | ----- | 
|200|OK|ResultVoid|
|400|Bad Request|ResultObject|
|401|Unauthorized|ResultObject|
|403|Forbidden|ResultObject|
|404|Not Found|ResultObject|
|405|Method Not Allowed|ResultObject|
|409|Conflict|ResultObject|
|500|Internal Server Error|ResultObject|


**响应状态码-200**:


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code|响应码|integer(int32)|integer(int32)|
|message|响应消息|string||
|data|响应数据|object||
|timestamp|时间戳|integer(int64)|integer(int64)|
|success||boolean||


**响应示例**:
```javascript
{
	"code": 200,
	"message": "操作成功",
	"data": {},
	"timestamp": 1700000000000,
	"success": true
}
```


**响应状态码-400**:


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code|响应码|integer(int32)|integer(int32)|
|message|响应消息|string||
|data|响应数据|object||
|timestamp|时间戳|integer(int64)|integer(int64)|
|success||boolean||


**响应示例**:
```javascript
{
	"code": 200,
	"message": "操作成功",
	"data": {},
	"timestamp": 1700000000000,
	"success": true
}
```


**响应状态码-401**:


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code|响应码|integer(int32)|integer(int32)|
|message|响应消息|string||
|data|响应数据|object||
|timestamp|时间戳|integer(int64)|integer(int64)|
|success||boolean||


**响应示例**:
```javascript
{
	"code": 200,
	"message": "操作成功",
	"data": {},
	"timestamp": 1700000000000,
	"success": true
}
```


**响应状态码-403**:


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code|响应码|integer(int32)|integer(int32)|
|message|响应消息|string||
|data|响应数据|object||
|timestamp|时间戳|integer(int64)|integer(int64)|
|success||boolean||


**响应示例**:
```javascript
{
	"code": 200,
	"message": "操作成功",
	"data": {},
	"timestamp": 1700000000000,
	"success": true
}
```


**响应状态码-404**:


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code|响应码|integer(int32)|integer(int32)|
|message|响应消息|string||
|data|响应数据|object||
|timestamp|时间戳|integer(int64)|integer(int64)|
|success||boolean||


**响应示例**:
```javascript
{
	"code": 200,
	"message": "操作成功",
	"data": {},
	"timestamp": 1700000000000,
	"success": true
}
```


**响应状态码-405**:


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code|响应码|integer(int32)|integer(int32)|
|message|响应消息|string||
|data|响应数据|object||
|timestamp|时间戳|integer(int64)|integer(int64)|
|success||boolean||


**响应示例**:
```javascript
{
	"code": 200,
	"message": "操作成功",
	"data": {},
	"timestamp": 1700000000000,
	"success": true
}
```


**响应状态码-409**:


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code|响应码|integer(int32)|integer(int32)|
|message|响应消息|string||
|data|响应数据|object||
|timestamp|时间戳|integer(int64)|integer(int64)|
|success||boolean||


**响应示例**:
```javascript
{
	"code": 200,
	"message": "操作成功",
	"data": {},
	"timestamp": 1700000000000,
	"success": true
}
```


**响应状态码-500**:


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code|响应码|integer(int32)|integer(int32)|
|message|响应消息|string||
|data|响应数据|object||
|timestamp|时间戳|integer(int64)|integer(int64)|
|success||boolean||


**响应示例**:
```javascript
{
	"code": 200,
	"message": "操作成功",
	"data": {},
	"timestamp": 1700000000000,
	"success": true
}
```


## 启用-禁用商品


**接口地址**:`/code-ledger/api/products/{id}/status`


**请求方式**:`PUT`


**请求数据类型**:`application/x-www-form-urlencoded`


**响应数据类型**:`*/*`


**接口描述**:<p>修改商品状态</p>



**请求参数**:


| 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|id||path|true|integer(int64)||
|status|可用值:0,1|query|true|string||


**响应状态**:


| 状态码 | 说明 | schema |
| -------- | -------- | ----- | 
|200|OK|ResultProductVO|
|400|Bad Request|ResultObject|
|401|Unauthorized|ResultObject|
|403|Forbidden|ResultObject|
|404|Not Found|ResultObject|
|405|Method Not Allowed|ResultObject|
|409|Conflict|ResultObject|
|500|Internal Server Error|ResultObject|


**响应状态码-200**:


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code|响应码|integer(int32)|integer(int32)|
|message|响应消息|string||
|data||ProductVO|ProductVO|
|&emsp;&emsp;id|商品ID|integer(int64)||
|&emsp;&emsp;categoryId|分类ID|integer(int64)||
|&emsp;&emsp;categoryName|分类名称|string||
|&emsp;&emsp;name|商品名称|string||
|&emsp;&emsp;imageUrl|商品主图URL|string||
|&emsp;&emsp;description|商品描述|string||
|&emsp;&emsp;price|标准价格|number||
|&emsp;&emsp;spec|规格型号|string||
|&emsp;&emsp;unit|单位|string||
|&emsp;&emsp;location|存放位置|string||
|&emsp;&emsp;memo|备注|string||
|&emsp;&emsp;status|状态,可用值:0,1|string||
|&emsp;&emsp;attrs|商品属性|array|ProductAttrVO|
|&emsp;&emsp;&emsp;&emsp;id|属性ID|integer||
|&emsp;&emsp;&emsp;&emsp;productId|商品ID|integer||
|&emsp;&emsp;&emsp;&emsp;attrName|属性名称|string||
|&emsp;&emsp;&emsp;&emsp;sortOrder|排序序号|integer||
|&emsp;&emsp;&emsp;&emsp;values|商品属性值|array|ProductAttrValueVO|
|&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;id|属性值ID|integer||
|&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;productAttrId|商品属性ID|integer||
|&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;value|属性值|string||
|&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;sortOrder|排序序号|integer||
|&emsp;&emsp;skus|商品SKU|array|ProductSkuVO|
|&emsp;&emsp;&emsp;&emsp;id|SKU ID|integer||
|&emsp;&emsp;&emsp;&emsp;productId|商品ID|integer||
|&emsp;&emsp;&emsp;&emsp;skuName|SKU名称|string||
|&emsp;&emsp;&emsp;&emsp;priceStatus|定价状态,可用值:0,1|string||
|&emsp;&emsp;&emsp;&emsp;price|SKU销售价格|number||
|&emsp;&emsp;&emsp;&emsp;imageUrl|SKU图片URL|string||
|&emsp;&emsp;&emsp;&emsp;sortOrder|排序序号|integer||
|&emsp;&emsp;&emsp;&emsp;status|状态,可用值:0,1|string||
|&emsp;&emsp;&emsp;&emsp;skuAttrs|商品SKU属性值|array|ProductSkuAttrVO|
|&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;attrName|属性名称|string||
|&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;attrValue|属性值|string||
|&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;sortOrder|排序序号|integer||
|&emsp;&emsp;createInstant|创建时间|string(date-time)||
|&emsp;&emsp;modifyInstant|修改时间|string(date-time)||
|timestamp|时间戳|integer(int64)|integer(int64)|
|success||boolean||


**响应示例**:
```javascript
{
	"code": 200,
	"message": "操作成功",
	"data": {
		"id": 0,
		"categoryId": 0,
		"categoryName": "",
		"name": "",
		"imageUrl": "",
		"description": "",
		"price": 0,
		"spec": "",
		"unit": "",
		"location": "",
		"memo": "",
		"status": "",
		"attrs": [
			{
				"id": 0,
				"productId": 0,
				"attrName": "",
				"sortOrder": 0,
				"values": [
					{
						"id": 0,
						"productAttrId": 0,
						"value": "",
						"sortOrder": 0
					}
				]
			}
		],
		"skus": [
			{
				"id": 0,
				"productId": 0,
				"skuName": "",
				"priceStatus": "",
				"price": 0,
				"imageUrl": "",
				"sortOrder": 0,
				"status": "",
				"skuAttrs": [
					{
						"attrName": "",
						"attrValue": "",
						"sortOrder": 0
					}
				]
			}
		],
		"createInstant": "",
		"modifyInstant": ""
	},
	"timestamp": 1700000000000,
	"success": true
}
```


**响应状态码-400**:


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code|响应码|integer(int32)|integer(int32)|
|message|响应消息|string||
|data|响应数据|object||
|timestamp|时间戳|integer(int64)|integer(int64)|
|success||boolean||


**响应示例**:
```javascript
{
	"code": 200,
	"message": "操作成功",
	"data": {},
	"timestamp": 1700000000000,
	"success": true
}
```


**响应状态码-401**:


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code|响应码|integer(int32)|integer(int32)|
|message|响应消息|string||
|data|响应数据|object||
|timestamp|时间戳|integer(int64)|integer(int64)|
|success||boolean||


**响应示例**:
```javascript
{
	"code": 200,
	"message": "操作成功",
	"data": {},
	"timestamp": 1700000000000,
	"success": true
}
```


**响应状态码-403**:


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code|响应码|integer(int32)|integer(int32)|
|message|响应消息|string||
|data|响应数据|object||
|timestamp|时间戳|integer(int64)|integer(int64)|
|success||boolean||


**响应示例**:
```javascript
{
	"code": 200,
	"message": "操作成功",
	"data": {},
	"timestamp": 1700000000000,
	"success": true
}
```


**响应状态码-404**:


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code|响应码|integer(int32)|integer(int32)|
|message|响应消息|string||
|data|响应数据|object||
|timestamp|时间戳|integer(int64)|integer(int64)|
|success||boolean||


**响应示例**:
```javascript
{
	"code": 200,
	"message": "操作成功",
	"data": {},
	"timestamp": 1700000000000,
	"success": true
}
```


**响应状态码-405**:


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code|响应码|integer(int32)|integer(int32)|
|message|响应消息|string||
|data|响应数据|object||
|timestamp|时间戳|integer(int64)|integer(int64)|
|success||boolean||


**响应示例**:
```javascript
{
	"code": 200,
	"message": "操作成功",
	"data": {},
	"timestamp": 1700000000000,
	"success": true
}
```


**响应状态码-409**:


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code|响应码|integer(int32)|integer(int32)|
|message|响应消息|string||
|data|响应数据|object||
|timestamp|时间戳|integer(int64)|integer(int64)|
|success||boolean||


**响应示例**:
```javascript
{
	"code": 200,
	"message": "操作成功",
	"data": {},
	"timestamp": 1700000000000,
	"success": true
}
```


**响应状态码-500**:


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code|响应码|integer(int32)|integer(int32)|
|message|响应消息|string||
|data|响应数据|object||
|timestamp|时间戳|integer(int64)|integer(int64)|
|success||boolean||


**响应示例**:
```javascript
{
	"code": 200,
	"message": "操作成功",
	"data": {},
	"timestamp": 1700000000000,
	"success": true
}
```


## 批量更新商品属性（推荐）


**接口地址**:`/code-ledger/api/products/{id}/attrs/batch`


**请求方式**:`PUT`


**请求数据类型**:`application/x-www-form-urlencoded,application/json`


**响应数据类型**:`*/*`


**接口描述**:<p>一次性提交所有属性和属性值，后端智能识别新增/修改/删除，增量更新SKU（保留未变化的SKU ID）</p>



**请求示例**:


```javascript
{
  "attrs": [
    {
      "id": 0,
      "attrName": "重量",
      "sortOrder": 0,
      "values": [
        {
          "id": 0,
          "value": "5斤",
          "sortOrder": 0
        }
      ]
    }
  ]
}
```


**请求参数**:


| 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|id||path|true|integer(int64)||
|productAttrBatchUpdateDTO|商品属性批量更新|body|true|ProductAttrBatchUpdateDTO|ProductAttrBatchUpdateDTO|
|&emsp;&emsp;attrs|属性项||true|array|AttrItem|
|&emsp;&emsp;&emsp;&emsp;id|属性ID（null=新增，非null=修改）||false|integer||
|&emsp;&emsp;&emsp;&emsp;attrName|属性名称||true|string||
|&emsp;&emsp;&emsp;&emsp;sortOrder|排序||true|integer||
|&emsp;&emsp;&emsp;&emsp;values|属性值项||true|array|AttrValueItem|
|&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;id|属性值ID（null=新增，非null=修改）||false|integer||
|&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;value|属性值||true|string||
|&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;sortOrder|排序||true|integer||


**响应状态**:


| 状态码 | 说明 | schema |
| -------- | -------- | ----- | 
|200|OK|ResultListProductAttrVO|
|400|Bad Request|ResultObject|
|401|Unauthorized|ResultObject|
|403|Forbidden|ResultObject|
|404|Not Found|ResultObject|
|405|Method Not Allowed|ResultObject|
|409|Conflict|ResultObject|
|500|Internal Server Error|ResultObject|


**响应状态码-200**:


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code|响应码|integer(int32)|integer(int32)|
|message|响应消息|string||
|data|响应数据|array|ProductAttrVO|
|&emsp;&emsp;id|属性ID|integer(int64)||
|&emsp;&emsp;productId|商品ID|integer(int64)||
|&emsp;&emsp;attrName|属性名称|string||
|&emsp;&emsp;sortOrder|排序序号|integer(int32)||
|&emsp;&emsp;values|商品属性值|array|ProductAttrValueVO|
|&emsp;&emsp;&emsp;&emsp;id|属性值ID|integer||
|&emsp;&emsp;&emsp;&emsp;productAttrId|商品属性ID|integer||
|&emsp;&emsp;&emsp;&emsp;value|属性值|string||
|&emsp;&emsp;&emsp;&emsp;sortOrder|排序序号|integer||
|timestamp|时间戳|integer(int64)|integer(int64)|
|success||boolean||


**响应示例**:
```javascript
{
	"code": 200,
	"message": "操作成功",
	"data": [
		{
			"id": 0,
			"productId": 0,
			"attrName": "",
			"sortOrder": 0,
			"values": [
				{
					"id": 0,
					"productAttrId": 0,
					"value": "",
					"sortOrder": 0
				}
			]
		}
	],
	"timestamp": 1700000000000,
	"success": true
}
```


**响应状态码-400**:


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code|响应码|integer(int32)|integer(int32)|
|message|响应消息|string||
|data|响应数据|object||
|timestamp|时间戳|integer(int64)|integer(int64)|
|success||boolean||


**响应示例**:
```javascript
{
	"code": 200,
	"message": "操作成功",
	"data": {},
	"timestamp": 1700000000000,
	"success": true
}
```


**响应状态码-401**:


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code|响应码|integer(int32)|integer(int32)|
|message|响应消息|string||
|data|响应数据|object||
|timestamp|时间戳|integer(int64)|integer(int64)|
|success||boolean||


**响应示例**:
```javascript
{
	"code": 200,
	"message": "操作成功",
	"data": {},
	"timestamp": 1700000000000,
	"success": true
}
```


**响应状态码-403**:


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code|响应码|integer(int32)|integer(int32)|
|message|响应消息|string||
|data|响应数据|object||
|timestamp|时间戳|integer(int64)|integer(int64)|
|success||boolean||


**响应示例**:
```javascript
{
	"code": 200,
	"message": "操作成功",
	"data": {},
	"timestamp": 1700000000000,
	"success": true
}
```


**响应状态码-404**:


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code|响应码|integer(int32)|integer(int32)|
|message|响应消息|string||
|data|响应数据|object||
|timestamp|时间戳|integer(int64)|integer(int64)|
|success||boolean||


**响应示例**:
```javascript
{
	"code": 200,
	"message": "操作成功",
	"data": {},
	"timestamp": 1700000000000,
	"success": true
}
```


**响应状态码-405**:


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code|响应码|integer(int32)|integer(int32)|
|message|响应消息|string||
|data|响应数据|object||
|timestamp|时间戳|integer(int64)|integer(int64)|
|success||boolean||


**响应示例**:
```javascript
{
	"code": 200,
	"message": "操作成功",
	"data": {},
	"timestamp": 1700000000000,
	"success": true
}
```


**响应状态码-409**:


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code|响应码|integer(int32)|integer(int32)|
|message|响应消息|string||
|data|响应数据|object||
|timestamp|时间戳|integer(int64)|integer(int64)|
|success||boolean||


**响应示例**:
```javascript
{
	"code": 200,
	"message": "操作成功",
	"data": {},
	"timestamp": 1700000000000,
	"success": true
}
```


**响应状态码-500**:


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code|响应码|integer(int32)|integer(int32)|
|message|响应消息|string||
|data|响应数据|object||
|timestamp|时间戳|integer(int64)|integer(int64)|
|success||boolean||


**响应示例**:
```javascript
{
	"code": 200,
	"message": "操作成功",
	"data": {},
	"timestamp": 1700000000000,
	"success": true
}
```


## 获取商品列表


**接口地址**:`/code-ledger/api/products`


**请求方式**:`GET`


**请求数据类型**:`application/x-www-form-urlencoded`


**响应数据类型**:`*/*`


**接口描述**:<p>获取商品列表（支持分类筛选、关键词搜索）</p>



**请求参数**:


| 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|pageable||query|true|Pageable|Pageable|
|&emsp;&emsp;page|||false|integer(int32)||
|&emsp;&emsp;size|||false|integer(int32)||
|&emsp;&emsp;sort|||false|array|string|
|categoryId||query|false|integer(int64)||
|keyword||query|false|string||


**响应状态**:


| 状态码 | 说明 | schema |
| -------- | -------- | ----- | 
|200|OK|ResultPageProductVO|
|400|Bad Request|ResultObject|
|401|Unauthorized|ResultObject|
|403|Forbidden|ResultObject|
|404|Not Found|ResultObject|
|405|Method Not Allowed|ResultObject|
|409|Conflict|ResultObject|
|500|Internal Server Error|ResultObject|


**响应状态码-200**:


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code|响应码|integer(int32)|integer(int32)|
|message|响应消息|string||
|data||PageProductVO|PageProductVO|
|&emsp;&emsp;totalPages||integer(int32)||
|&emsp;&emsp;totalElements||integer(int64)||
|&emsp;&emsp;size||integer(int32)||
|&emsp;&emsp;content|商品详情|array|ProductVO|
|&emsp;&emsp;&emsp;&emsp;id|商品ID|integer||
|&emsp;&emsp;&emsp;&emsp;categoryId|分类ID|integer||
|&emsp;&emsp;&emsp;&emsp;categoryName|分类名称|string||
|&emsp;&emsp;&emsp;&emsp;name|商品名称|string||
|&emsp;&emsp;&emsp;&emsp;imageUrl|商品主图URL|string||
|&emsp;&emsp;&emsp;&emsp;description|商品描述|string||
|&emsp;&emsp;&emsp;&emsp;price|标准价格|number||
|&emsp;&emsp;&emsp;&emsp;spec|规格型号|string||
|&emsp;&emsp;&emsp;&emsp;unit|单位|string||
|&emsp;&emsp;&emsp;&emsp;location|存放位置|string||
|&emsp;&emsp;&emsp;&emsp;memo|备注|string||
|&emsp;&emsp;&emsp;&emsp;status|状态,可用值:0,1|string||
|&emsp;&emsp;&emsp;&emsp;attrs|商品属性|array|ProductAttrVO|
|&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;id|属性ID|integer||
|&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;productId|商品ID|integer||
|&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;attrName|属性名称|string||
|&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;sortOrder|排序序号|integer||
|&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;values|商品属性值|array|ProductAttrValueVO|
|&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;id|属性值ID|integer||
|&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;productAttrId|商品属性ID|integer||
|&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;value|属性值|string||
|&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;sortOrder|排序序号|integer||
|&emsp;&emsp;&emsp;&emsp;skus|商品SKU|array|ProductSkuVO|
|&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;id|SKU ID|integer||
|&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;productId|商品ID|integer||
|&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;skuName|SKU名称|string||
|&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;priceStatus|定价状态,可用值:0,1|string||
|&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;price|SKU销售价格|number||
|&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;imageUrl|SKU图片URL|string||
|&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;sortOrder|排序序号|integer||
|&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;status|状态,可用值:0,1|string||
|&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;skuAttrs|商品SKU属性值|array|ProductSkuAttrVO|
|&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;attrName|属性名称|string||
|&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;attrValue|属性值|string||
|&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;sortOrder|排序序号|integer||
|&emsp;&emsp;&emsp;&emsp;createInstant|创建时间|string||
|&emsp;&emsp;&emsp;&emsp;modifyInstant|修改时间|string||
|&emsp;&emsp;number||integer(int32)||
|&emsp;&emsp;sort||SortObject|SortObject|
|&emsp;&emsp;&emsp;&emsp;empty||boolean||
|&emsp;&emsp;&emsp;&emsp;sorted||boolean||
|&emsp;&emsp;&emsp;&emsp;unsorted||boolean||
|&emsp;&emsp;first||boolean||
|&emsp;&emsp;last||boolean||
|&emsp;&emsp;numberOfElements||integer(int32)||
|&emsp;&emsp;pageable||PageableObject|PageableObject|
|&emsp;&emsp;&emsp;&emsp;offset||integer||
|&emsp;&emsp;&emsp;&emsp;sort||SortObject|SortObject|
|&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;empty||boolean||
|&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;sorted||boolean||
|&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;unsorted||boolean||
|&emsp;&emsp;&emsp;&emsp;pageSize||integer||
|&emsp;&emsp;&emsp;&emsp;pageNumber||integer||
|&emsp;&emsp;&emsp;&emsp;paged||boolean||
|&emsp;&emsp;&emsp;&emsp;unpaged||boolean||
|&emsp;&emsp;empty||boolean||
|timestamp|时间戳|integer(int64)|integer(int64)|
|success||boolean||


**响应示例**:
```javascript
{
	"code": 200,
	"message": "操作成功",
	"data": {
		"totalPages": 0,
		"totalElements": 0,
		"size": 0,
		"content": [
			{
				"id": 0,
				"categoryId": 0,
				"categoryName": "",
				"name": "",
				"imageUrl": "",
				"description": "",
				"price": 0,
				"spec": "",
				"unit": "",
				"location": "",
				"memo": "",
				"status": "",
				"attrs": [
					{
						"id": 0,
						"productId": 0,
						"attrName": "",
						"sortOrder": 0,
						"values": [
							{
								"id": 0,
								"productAttrId": 0,
								"value": "",
								"sortOrder": 0
							}
						]
					}
				],
				"skus": [
					{
						"id": 0,
						"productId": 0,
						"skuName": "",
						"priceStatus": "",
						"price": 0,
						"imageUrl": "",
						"sortOrder": 0,
						"status": "",
						"skuAttrs": [
							{
								"attrName": "",
								"attrValue": "",
								"sortOrder": 0
							}
						]
					}
				],
				"createInstant": "",
				"modifyInstant": ""
			}
		],
		"number": 0,
		"sort": {
			"empty": true,
			"sorted": true,
			"unsorted": true
		},
		"first": true,
		"last": true,
		"numberOfElements": 0,
		"pageable": {
			"offset": 0,
			"sort": {
				"empty": true,
				"sorted": true,
				"unsorted": true
			},
			"pageSize": 0,
			"pageNumber": 0,
			"paged": true,
			"unpaged": true
		},
		"empty": true
	},
	"timestamp": 1700000000000,
	"success": true
}
```


**响应状态码-400**:


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code|响应码|integer(int32)|integer(int32)|
|message|响应消息|string||
|data|响应数据|object||
|timestamp|时间戳|integer(int64)|integer(int64)|
|success||boolean||


**响应示例**:
```javascript
{
	"code": 200,
	"message": "操作成功",
	"data": {},
	"timestamp": 1700000000000,
	"success": true
}
```


**响应状态码-401**:


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code|响应码|integer(int32)|integer(int32)|
|message|响应消息|string||
|data|响应数据|object||
|timestamp|时间戳|integer(int64)|integer(int64)|
|success||boolean||


**响应示例**:
```javascript
{
	"code": 200,
	"message": "操作成功",
	"data": {},
	"timestamp": 1700000000000,
	"success": true
}
```


**响应状态码-403**:


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code|响应码|integer(int32)|integer(int32)|
|message|响应消息|string||
|data|响应数据|object||
|timestamp|时间戳|integer(int64)|integer(int64)|
|success||boolean||


**响应示例**:
```javascript
{
	"code": 200,
	"message": "操作成功",
	"data": {},
	"timestamp": 1700000000000,
	"success": true
}
```


**响应状态码-404**:


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code|响应码|integer(int32)|integer(int32)|
|message|响应消息|string||
|data|响应数据|object||
|timestamp|时间戳|integer(int64)|integer(int64)|
|success||boolean||


**响应示例**:
```javascript
{
	"code": 200,
	"message": "操作成功",
	"data": {},
	"timestamp": 1700000000000,
	"success": true
}
```


**响应状态码-405**:


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code|响应码|integer(int32)|integer(int32)|
|message|响应消息|string||
|data|响应数据|object||
|timestamp|时间戳|integer(int64)|integer(int64)|
|success||boolean||


**响应示例**:
```javascript
{
	"code": 200,
	"message": "操作成功",
	"data": {},
	"timestamp": 1700000000000,
	"success": true
}
```


**响应状态码-409**:


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code|响应码|integer(int32)|integer(int32)|
|message|响应消息|string||
|data|响应数据|object||
|timestamp|时间戳|integer(int64)|integer(int64)|
|success||boolean||


**响应示例**:
```javascript
{
	"code": 200,
	"message": "操作成功",
	"data": {},
	"timestamp": 1700000000000,
	"success": true
}
```


**响应状态码-500**:


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code|响应码|integer(int32)|integer(int32)|
|message|响应消息|string||
|data|响应数据|object||
|timestamp|时间戳|integer(int64)|integer(int64)|
|success||boolean||


**响应示例**:
```javascript
{
	"code": 200,
	"message": "操作成功",
	"data": {},
	"timestamp": 1700000000000,
	"success": true
}
```


## 创建商品


**接口地址**:`/code-ledger/api/products`


**请求方式**:`POST`


**请求数据类型**:`application/x-www-form-urlencoded,application/json`


**响应数据类型**:`*/*`


**接口描述**:<p>创建新商品</p>



**请求示例**:


```javascript
{
  "categoryId": 1,
  "name": "红富士苹果",
  "imageUrl": "",
  "description": "",
  "price": 30,
  "spec": "",
  "unit": "斤",
  "location": "A区3排5列",
  "memo": ""
}
```


**请求参数**:


| 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|productCreateDTO|商品创建请求|body|true|ProductCreateDTO|ProductCreateDTO|
|&emsp;&emsp;categoryId|分类ID||true|integer(int64)||
|&emsp;&emsp;name|商品名称||true|string||
|&emsp;&emsp;imageUrl|商品主图URL||false|string||
|&emsp;&emsp;description|商品描述||false|string||
|&emsp;&emsp;price|标准价格||true|number||
|&emsp;&emsp;spec|规格型号||false|string||
|&emsp;&emsp;unit|单位||true|string||
|&emsp;&emsp;location|存放位置||false|string||
|&emsp;&emsp;memo|备注||false|string||


**响应状态**:


| 状态码 | 说明 | schema |
| -------- | -------- | ----- | 
|200|OK|ResultProductVO|
|400|Bad Request|ResultObject|
|401|Unauthorized|ResultObject|
|403|Forbidden|ResultObject|
|404|Not Found|ResultObject|
|405|Method Not Allowed|ResultObject|
|409|Conflict|ResultObject|
|500|Internal Server Error|ResultObject|


**响应状态码-200**:


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code|响应码|integer(int32)|integer(int32)|
|message|响应消息|string||
|data||ProductVO|ProductVO|
|&emsp;&emsp;id|商品ID|integer(int64)||
|&emsp;&emsp;categoryId|分类ID|integer(int64)||
|&emsp;&emsp;categoryName|分类名称|string||
|&emsp;&emsp;name|商品名称|string||
|&emsp;&emsp;imageUrl|商品主图URL|string||
|&emsp;&emsp;description|商品描述|string||
|&emsp;&emsp;price|标准价格|number||
|&emsp;&emsp;spec|规格型号|string||
|&emsp;&emsp;unit|单位|string||
|&emsp;&emsp;location|存放位置|string||
|&emsp;&emsp;memo|备注|string||
|&emsp;&emsp;status|状态,可用值:0,1|string||
|&emsp;&emsp;attrs|商品属性|array|ProductAttrVO|
|&emsp;&emsp;&emsp;&emsp;id|属性ID|integer||
|&emsp;&emsp;&emsp;&emsp;productId|商品ID|integer||
|&emsp;&emsp;&emsp;&emsp;attrName|属性名称|string||
|&emsp;&emsp;&emsp;&emsp;sortOrder|排序序号|integer||
|&emsp;&emsp;&emsp;&emsp;values|商品属性值|array|ProductAttrValueVO|
|&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;id|属性值ID|integer||
|&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;productAttrId|商品属性ID|integer||
|&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;value|属性值|string||
|&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;sortOrder|排序序号|integer||
|&emsp;&emsp;skus|商品SKU|array|ProductSkuVO|
|&emsp;&emsp;&emsp;&emsp;id|SKU ID|integer||
|&emsp;&emsp;&emsp;&emsp;productId|商品ID|integer||
|&emsp;&emsp;&emsp;&emsp;skuName|SKU名称|string||
|&emsp;&emsp;&emsp;&emsp;priceStatus|定价状态,可用值:0,1|string||
|&emsp;&emsp;&emsp;&emsp;price|SKU销售价格|number||
|&emsp;&emsp;&emsp;&emsp;imageUrl|SKU图片URL|string||
|&emsp;&emsp;&emsp;&emsp;sortOrder|排序序号|integer||
|&emsp;&emsp;&emsp;&emsp;status|状态,可用值:0,1|string||
|&emsp;&emsp;&emsp;&emsp;skuAttrs|商品SKU属性值|array|ProductSkuAttrVO|
|&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;attrName|属性名称|string||
|&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;attrValue|属性值|string||
|&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;sortOrder|排序序号|integer||
|&emsp;&emsp;createInstant|创建时间|string(date-time)||
|&emsp;&emsp;modifyInstant|修改时间|string(date-time)||
|timestamp|时间戳|integer(int64)|integer(int64)|
|success||boolean||


**响应示例**:
```javascript
{
	"code": 200,
	"message": "操作成功",
	"data": {
		"id": 0,
		"categoryId": 0,
		"categoryName": "",
		"name": "",
		"imageUrl": "",
		"description": "",
		"price": 0,
		"spec": "",
		"unit": "",
		"location": "",
		"memo": "",
		"status": "",
		"attrs": [
			{
				"id": 0,
				"productId": 0,
				"attrName": "",
				"sortOrder": 0,
				"values": [
					{
						"id": 0,
						"productAttrId": 0,
						"value": "",
						"sortOrder": 0
					}
				]
			}
		],
		"skus": [
			{
				"id": 0,
				"productId": 0,
				"skuName": "",
				"priceStatus": "",
				"price": 0,
				"imageUrl": "",
				"sortOrder": 0,
				"status": "",
				"skuAttrs": [
					{
						"attrName": "",
						"attrValue": "",
						"sortOrder": 0
					}
				]
			}
		],
		"createInstant": "",
		"modifyInstant": ""
	},
	"timestamp": 1700000000000,
	"success": true
}
```


**响应状态码-400**:


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code|响应码|integer(int32)|integer(int32)|
|message|响应消息|string||
|data|响应数据|object||
|timestamp|时间戳|integer(int64)|integer(int64)|
|success||boolean||


**响应示例**:
```javascript
{
	"code": 200,
	"message": "操作成功",
	"data": {},
	"timestamp": 1700000000000,
	"success": true
}
```


**响应状态码-401**:


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code|响应码|integer(int32)|integer(int32)|
|message|响应消息|string||
|data|响应数据|object||
|timestamp|时间戳|integer(int64)|integer(int64)|
|success||boolean||


**响应示例**:
```javascript
{
	"code": 200,
	"message": "操作成功",
	"data": {},
	"timestamp": 1700000000000,
	"success": true
}
```


**响应状态码-403**:


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code|响应码|integer(int32)|integer(int32)|
|message|响应消息|string||
|data|响应数据|object||
|timestamp|时间戳|integer(int64)|integer(int64)|
|success||boolean||


**响应示例**:
```javascript
{
	"code": 200,
	"message": "操作成功",
	"data": {},
	"timestamp": 1700000000000,
	"success": true
}
```


**响应状态码-404**:


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code|响应码|integer(int32)|integer(int32)|
|message|响应消息|string||
|data|响应数据|object||
|timestamp|时间戳|integer(int64)|integer(int64)|
|success||boolean||


**响应示例**:
```javascript
{
	"code": 200,
	"message": "操作成功",
	"data": {},
	"timestamp": 1700000000000,
	"success": true
}
```


**响应状态码-405**:


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code|响应码|integer(int32)|integer(int32)|
|message|响应消息|string||
|data|响应数据|object||
|timestamp|时间戳|integer(int64)|integer(int64)|
|success||boolean||


**响应示例**:
```javascript
{
	"code": 200,
	"message": "操作成功",
	"data": {},
	"timestamp": 1700000000000,
	"success": true
}
```


**响应状态码-409**:


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code|响应码|integer(int32)|integer(int32)|
|message|响应消息|string||
|data|响应数据|object||
|timestamp|时间戳|integer(int64)|integer(int64)|
|success||boolean||


**响应示例**:
```javascript
{
	"code": 200,
	"message": "操作成功",
	"data": {},
	"timestamp": 1700000000000,
	"success": true
}
```


**响应状态码-500**:


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code|响应码|integer(int32)|integer(int32)|
|message|响应消息|string||
|data|响应数据|object||
|timestamp|时间戳|integer(int64)|integer(int64)|
|success||boolean||


**响应示例**:
```javascript
{
	"code": 200,
	"message": "操作成功",
	"data": {},
	"timestamp": 1700000000000,
	"success": true
}
```


## 获取商品属性


**接口地址**:`/code-ledger/api/products/{id}/attrs`


**请求方式**:`GET`


**请求数据类型**:`application/x-www-form-urlencoded`


**响应数据类型**:`*/*`


**接口描述**:<p>获取商品所有属性及其值</p>



**请求参数**:


| 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|id||path|true|integer(int64)||


**响应状态**:


| 状态码 | 说明 | schema |
| -------- | -------- | ----- | 
|200|OK|ResultListProductAttrVO|
|400|Bad Request|ResultObject|
|401|Unauthorized|ResultObject|
|403|Forbidden|ResultObject|
|404|Not Found|ResultObject|
|405|Method Not Allowed|ResultObject|
|409|Conflict|ResultObject|
|500|Internal Server Error|ResultObject|


**响应状态码-200**:


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code|响应码|integer(int32)|integer(int32)|
|message|响应消息|string||
|data|响应数据|array|ProductAttrVO|
|&emsp;&emsp;id|属性ID|integer(int64)||
|&emsp;&emsp;productId|商品ID|integer(int64)||
|&emsp;&emsp;attrName|属性名称|string||
|&emsp;&emsp;sortOrder|排序序号|integer(int32)||
|&emsp;&emsp;values|商品属性值|array|ProductAttrValueVO|
|&emsp;&emsp;&emsp;&emsp;id|属性值ID|integer||
|&emsp;&emsp;&emsp;&emsp;productAttrId|商品属性ID|integer||
|&emsp;&emsp;&emsp;&emsp;value|属性值|string||
|&emsp;&emsp;&emsp;&emsp;sortOrder|排序序号|integer||
|timestamp|时间戳|integer(int64)|integer(int64)|
|success||boolean||


**响应示例**:
```javascript
{
	"code": 200,
	"message": "操作成功",
	"data": [
		{
			"id": 0,
			"productId": 0,
			"attrName": "",
			"sortOrder": 0,
			"values": [
				{
					"id": 0,
					"productAttrId": 0,
					"value": "",
					"sortOrder": 0
				}
			]
		}
	],
	"timestamp": 1700000000000,
	"success": true
}
```


**响应状态码-400**:


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code|响应码|integer(int32)|integer(int32)|
|message|响应消息|string||
|data|响应数据|object||
|timestamp|时间戳|integer(int64)|integer(int64)|
|success||boolean||


**响应示例**:
```javascript
{
	"code": 200,
	"message": "操作成功",
	"data": {},
	"timestamp": 1700000000000,
	"success": true
}
```


**响应状态码-401**:


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code|响应码|integer(int32)|integer(int32)|
|message|响应消息|string||
|data|响应数据|object||
|timestamp|时间戳|integer(int64)|integer(int64)|
|success||boolean||


**响应示例**:
```javascript
{
	"code": 200,
	"message": "操作成功",
	"data": {},
	"timestamp": 1700000000000,
	"success": true
}
```


**响应状态码-403**:


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code|响应码|integer(int32)|integer(int32)|
|message|响应消息|string||
|data|响应数据|object||
|timestamp|时间戳|integer(int64)|integer(int64)|
|success||boolean||


**响应示例**:
```javascript
{
	"code": 200,
	"message": "操作成功",
	"data": {},
	"timestamp": 1700000000000,
	"success": true
}
```


**响应状态码-404**:


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code|响应码|integer(int32)|integer(int32)|
|message|响应消息|string||
|data|响应数据|object||
|timestamp|时间戳|integer(int64)|integer(int64)|
|success||boolean||


**响应示例**:
```javascript
{
	"code": 200,
	"message": "操作成功",
	"data": {},
	"timestamp": 1700000000000,
	"success": true
}
```


**响应状态码-405**:


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code|响应码|integer(int32)|integer(int32)|
|message|响应消息|string||
|data|响应数据|object||
|timestamp|时间戳|integer(int64)|integer(int64)|
|success||boolean||


**响应示例**:
```javascript
{
	"code": 200,
	"message": "操作成功",
	"data": {},
	"timestamp": 1700000000000,
	"success": true
}
```


**响应状态码-409**:


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code|响应码|integer(int32)|integer(int32)|
|message|响应消息|string||
|data|响应数据|object||
|timestamp|时间戳|integer(int64)|integer(int64)|
|success||boolean||


**响应示例**:
```javascript
{
	"code": 200,
	"message": "操作成功",
	"data": {},
	"timestamp": 1700000000000,
	"success": true
}
```


**响应状态码-500**:


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code|响应码|integer(int32)|integer(int32)|
|message|响应消息|string||
|data|响应数据|object||
|timestamp|时间戳|integer(int64)|integer(int64)|
|success||boolean||


**响应示例**:
```javascript
{
	"code": 200,
	"message": "操作成功",
	"data": {},
	"timestamp": 1700000000000,
	"success": true
}
```


# 客户管理


## 获取客户详情


**接口地址**:`/code-ledger/api/customers/{id}`


**请求方式**:`GET`


**请求数据类型**:`application/x-www-form-urlencoded`


**响应数据类型**:`*/*`


**接口描述**:<p>根据ID获取客户详情</p>



**请求参数**:


| 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|id||path|true|integer(int64)||


**响应状态**:


| 状态码 | 说明 | schema |
| -------- | -------- | ----- | 
|200|OK|ResultCustomerVO|
|400|Bad Request|ResultObject|
|401|Unauthorized|ResultObject|
|403|Forbidden|ResultObject|
|404|Not Found|ResultObject|
|405|Method Not Allowed|ResultObject|
|409|Conflict|ResultObject|
|500|Internal Server Error|ResultObject|


**响应状态码-200**:


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code|响应码|integer(int32)|integer(int32)|
|message|响应消息|string||
|data||CustomerVO|CustomerVO|
|&emsp;&emsp;id|客户ID|integer(int64)||
|&emsp;&emsp;name|客户姓名|string||
|&emsp;&emsp;phone|手机号|string||
|&emsp;&emsp;alias|别名/昵称|string||
|&emsp;&emsp;gender|性别,可用值:0,1,2|string||
|&emsp;&emsp;genderDesc|性别描述|string||
|&emsp;&emsp;age|年龄|integer(int32)||
|&emsp;&emsp;addressId|关联地址ID|integer(int64)||
|&emsp;&emsp;addressPath|地址完整路径|string||
|&emsp;&emsp;addressDetail|详细地址|string||
|&emsp;&emsp;customerType|客户类型,可用值:0,1|string||
|&emsp;&emsp;customerTypeDesc|客户类型描述|string||
|&emsp;&emsp;createInstant|创建时间|string(date-time)||
|&emsp;&emsp;modifyInstant|修改时间|string(date-time)||
|timestamp|时间戳|integer(int64)|integer(int64)|
|success||boolean||


**响应示例**:
```javascript
{
	"code": 200,
	"message": "操作成功",
	"data": {
		"id": 0,
		"name": "",
		"phone": "",
		"alias": "",
		"gender": "",
		"genderDesc": "",
		"age": 0,
		"addressId": 0,
		"addressPath": "",
		"addressDetail": "",
		"customerType": "",
		"customerTypeDesc": "",
		"createInstant": "",
		"modifyInstant": ""
	},
	"timestamp": 1700000000000,
	"success": true
}
```


**响应状态码-400**:


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code|响应码|integer(int32)|integer(int32)|
|message|响应消息|string||
|data|响应数据|object||
|timestamp|时间戳|integer(int64)|integer(int64)|
|success||boolean||


**响应示例**:
```javascript
{
	"code": 200,
	"message": "操作成功",
	"data": {},
	"timestamp": 1700000000000,
	"success": true
}
```


**响应状态码-401**:


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code|响应码|integer(int32)|integer(int32)|
|message|响应消息|string||
|data|响应数据|object||
|timestamp|时间戳|integer(int64)|integer(int64)|
|success||boolean||


**响应示例**:
```javascript
{
	"code": 200,
	"message": "操作成功",
	"data": {},
	"timestamp": 1700000000000,
	"success": true
}
```


**响应状态码-403**:


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code|响应码|integer(int32)|integer(int32)|
|message|响应消息|string||
|data|响应数据|object||
|timestamp|时间戳|integer(int64)|integer(int64)|
|success||boolean||


**响应示例**:
```javascript
{
	"code": 200,
	"message": "操作成功",
	"data": {},
	"timestamp": 1700000000000,
	"success": true
}
```


**响应状态码-404**:


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code|响应码|integer(int32)|integer(int32)|
|message|响应消息|string||
|data|响应数据|object||
|timestamp|时间戳|integer(int64)|integer(int64)|
|success||boolean||


**响应示例**:
```javascript
{
	"code": 200,
	"message": "操作成功",
	"data": {},
	"timestamp": 1700000000000,
	"success": true
}
```


**响应状态码-405**:


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code|响应码|integer(int32)|integer(int32)|
|message|响应消息|string||
|data|响应数据|object||
|timestamp|时间戳|integer(int64)|integer(int64)|
|success||boolean||


**响应示例**:
```javascript
{
	"code": 200,
	"message": "操作成功",
	"data": {},
	"timestamp": 1700000000000,
	"success": true
}
```


**响应状态码-409**:


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code|响应码|integer(int32)|integer(int32)|
|message|响应消息|string||
|data|响应数据|object||
|timestamp|时间戳|integer(int64)|integer(int64)|
|success||boolean||


**响应示例**:
```javascript
{
	"code": 200,
	"message": "操作成功",
	"data": {},
	"timestamp": 1700000000000,
	"success": true
}
```


**响应状态码-500**:


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code|响应码|integer(int32)|integer(int32)|
|message|响应消息|string||
|data|响应数据|object||
|timestamp|时间戳|integer(int64)|integer(int64)|
|success||boolean||


**响应示例**:
```javascript
{
	"code": 200,
	"message": "操作成功",
	"data": {},
	"timestamp": 1700000000000,
	"success": true
}
```


## 修改客户


**接口地址**:`/code-ledger/api/customers/{id}`


**请求方式**:`PUT`


**请求数据类型**:`application/x-www-form-urlencoded,application/json`


**响应数据类型**:`*/*`


**接口描述**:<p>修改客户基本信息（不包括地址）</p>



**请求示例**:


```javascript
{
  "name": "张三",
  "phone": "13800138000",
  "alias": "小张",
  "gender": "1",
  "age": 30,
  "customerType": "1"
}
```


**请求参数**:


| 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|id||path|true|integer(int64)||
|customerUpdateDTO|客户更新请求|body|true|CustomerUpdateDTO|CustomerUpdateDTO|
|&emsp;&emsp;name|客户姓名||false|string||
|&emsp;&emsp;phone|手机号||false|string||
|&emsp;&emsp;alias|别名/昵称||false|string||
|&emsp;&emsp;gender|性别: 1=男, 2=女, 0=未知,可用值:0,1,2||false|string||
|&emsp;&emsp;age|年龄||false|integer(int32)||
|&emsp;&emsp;customerType|客户类型: 1=活跃, 2=潜在, 3=流失,可用值:0,1||false|string||


**响应状态**:


| 状态码 | 说明 | schema |
| -------- | -------- | ----- | 
|200|OK|ResultCustomerVO|
|400|Bad Request|ResultObject|
|401|Unauthorized|ResultObject|
|403|Forbidden|ResultObject|
|404|Not Found|ResultObject|
|405|Method Not Allowed|ResultObject|
|409|Conflict|ResultObject|
|500|Internal Server Error|ResultObject|


**响应状态码-200**:


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code|响应码|integer(int32)|integer(int32)|
|message|响应消息|string||
|data||CustomerVO|CustomerVO|
|&emsp;&emsp;id|客户ID|integer(int64)||
|&emsp;&emsp;name|客户姓名|string||
|&emsp;&emsp;phone|手机号|string||
|&emsp;&emsp;alias|别名/昵称|string||
|&emsp;&emsp;gender|性别,可用值:0,1,2|string||
|&emsp;&emsp;genderDesc|性别描述|string||
|&emsp;&emsp;age|年龄|integer(int32)||
|&emsp;&emsp;addressId|关联地址ID|integer(int64)||
|&emsp;&emsp;addressPath|地址完整路径|string||
|&emsp;&emsp;addressDetail|详细地址|string||
|&emsp;&emsp;customerType|客户类型,可用值:0,1|string||
|&emsp;&emsp;customerTypeDesc|客户类型描述|string||
|&emsp;&emsp;createInstant|创建时间|string(date-time)||
|&emsp;&emsp;modifyInstant|修改时间|string(date-time)||
|timestamp|时间戳|integer(int64)|integer(int64)|
|success||boolean||


**响应示例**:
```javascript
{
	"code": 200,
	"message": "操作成功",
	"data": {
		"id": 0,
		"name": "",
		"phone": "",
		"alias": "",
		"gender": "",
		"genderDesc": "",
		"age": 0,
		"addressId": 0,
		"addressPath": "",
		"addressDetail": "",
		"customerType": "",
		"customerTypeDesc": "",
		"createInstant": "",
		"modifyInstant": ""
	},
	"timestamp": 1700000000000,
	"success": true
}
```


**响应状态码-400**:


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code|响应码|integer(int32)|integer(int32)|
|message|响应消息|string||
|data|响应数据|object||
|timestamp|时间戳|integer(int64)|integer(int64)|
|success||boolean||


**响应示例**:
```javascript
{
	"code": 200,
	"message": "操作成功",
	"data": {},
	"timestamp": 1700000000000,
	"success": true
}
```


**响应状态码-401**:


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code|响应码|integer(int32)|integer(int32)|
|message|响应消息|string||
|data|响应数据|object||
|timestamp|时间戳|integer(int64)|integer(int64)|
|success||boolean||


**响应示例**:
```javascript
{
	"code": 200,
	"message": "操作成功",
	"data": {},
	"timestamp": 1700000000000,
	"success": true
}
```


**响应状态码-403**:


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code|响应码|integer(int32)|integer(int32)|
|message|响应消息|string||
|data|响应数据|object||
|timestamp|时间戳|integer(int64)|integer(int64)|
|success||boolean||


**响应示例**:
```javascript
{
	"code": 200,
	"message": "操作成功",
	"data": {},
	"timestamp": 1700000000000,
	"success": true
}
```


**响应状态码-404**:


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code|响应码|integer(int32)|integer(int32)|
|message|响应消息|string||
|data|响应数据|object||
|timestamp|时间戳|integer(int64)|integer(int64)|
|success||boolean||


**响应示例**:
```javascript
{
	"code": 200,
	"message": "操作成功",
	"data": {},
	"timestamp": 1700000000000,
	"success": true
}
```


**响应状态码-405**:


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code|响应码|integer(int32)|integer(int32)|
|message|响应消息|string||
|data|响应数据|object||
|timestamp|时间戳|integer(int64)|integer(int64)|
|success||boolean||


**响应示例**:
```javascript
{
	"code": 200,
	"message": "操作成功",
	"data": {},
	"timestamp": 1700000000000,
	"success": true
}
```


**响应状态码-409**:


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code|响应码|integer(int32)|integer(int32)|
|message|响应消息|string||
|data|响应数据|object||
|timestamp|时间戳|integer(int64)|integer(int64)|
|success||boolean||


**响应示例**:
```javascript
{
	"code": 200,
	"message": "操作成功",
	"data": {},
	"timestamp": 1700000000000,
	"success": true
}
```


**响应状态码-500**:


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code|响应码|integer(int32)|integer(int32)|
|message|响应消息|string||
|data|响应数据|object||
|timestamp|时间戳|integer(int64)|integer(int64)|
|success||boolean||


**响应示例**:
```javascript
{
	"code": 200,
	"message": "操作成功",
	"data": {},
	"timestamp": 1700000000000,
	"success": true
}
```


## 删除客户


**接口地址**:`/code-ledger/api/customers/{id}`


**请求方式**:`DELETE`


**请求数据类型**:`application/x-www-form-urlencoded`


**响应数据类型**:`*/*`


**接口描述**:<p>物理删除客户（谨慎操作）</p>



**请求参数**:


| 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|id||path|true|integer(int64)||


**响应状态**:


| 状态码 | 说明 | schema |
| -------- | -------- | ----- | 
|200|OK|ResultVoid|
|400|Bad Request|ResultObject|
|401|Unauthorized|ResultObject|
|403|Forbidden|ResultObject|
|404|Not Found|ResultObject|
|405|Method Not Allowed|ResultObject|
|409|Conflict|ResultObject|
|500|Internal Server Error|ResultObject|


**响应状态码-200**:


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code|响应码|integer(int32)|integer(int32)|
|message|响应消息|string||
|data|响应数据|object||
|timestamp|时间戳|integer(int64)|integer(int64)|
|success||boolean||


**响应示例**:
```javascript
{
	"code": 200,
	"message": "操作成功",
	"data": {},
	"timestamp": 1700000000000,
	"success": true
}
```


**响应状态码-400**:


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code|响应码|integer(int32)|integer(int32)|
|message|响应消息|string||
|data|响应数据|object||
|timestamp|时间戳|integer(int64)|integer(int64)|
|success||boolean||


**响应示例**:
```javascript
{
	"code": 200,
	"message": "操作成功",
	"data": {},
	"timestamp": 1700000000000,
	"success": true
}
```


**响应状态码-401**:


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code|响应码|integer(int32)|integer(int32)|
|message|响应消息|string||
|data|响应数据|object||
|timestamp|时间戳|integer(int64)|integer(int64)|
|success||boolean||


**响应示例**:
```javascript
{
	"code": 200,
	"message": "操作成功",
	"data": {},
	"timestamp": 1700000000000,
	"success": true
}
```


**响应状态码-403**:


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code|响应码|integer(int32)|integer(int32)|
|message|响应消息|string||
|data|响应数据|object||
|timestamp|时间戳|integer(int64)|integer(int64)|
|success||boolean||


**响应示例**:
```javascript
{
	"code": 200,
	"message": "操作成功",
	"data": {},
	"timestamp": 1700000000000,
	"success": true
}
```


**响应状态码-404**:


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code|响应码|integer(int32)|integer(int32)|
|message|响应消息|string||
|data|响应数据|object||
|timestamp|时间戳|integer(int64)|integer(int64)|
|success||boolean||


**响应示例**:
```javascript
{
	"code": 200,
	"message": "操作成功",
	"data": {},
	"timestamp": 1700000000000,
	"success": true
}
```


**响应状态码-405**:


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code|响应码|integer(int32)|integer(int32)|
|message|响应消息|string||
|data|响应数据|object||
|timestamp|时间戳|integer(int64)|integer(int64)|
|success||boolean||


**响应示例**:
```javascript
{
	"code": 200,
	"message": "操作成功",
	"data": {},
	"timestamp": 1700000000000,
	"success": true
}
```


**响应状态码-409**:


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code|响应码|integer(int32)|integer(int32)|
|message|响应消息|string||
|data|响应数据|object||
|timestamp|时间戳|integer(int64)|integer(int64)|
|success||boolean||


**响应示例**:
```javascript
{
	"code": 200,
	"message": "操作成功",
	"data": {},
	"timestamp": 1700000000000,
	"success": true
}
```


**响应状态码-500**:


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code|响应码|integer(int32)|integer(int32)|
|message|响应消息|string||
|data|响应数据|object||
|timestamp|时间戳|integer(int64)|integer(int64)|
|success||boolean||


**响应示例**:
```javascript
{
	"code": 200,
	"message": "操作成功",
	"data": {},
	"timestamp": 1700000000000,
	"success": true
}
```


## 更新客户地址


**接口地址**:`/code-ledger/api/customers/{id}/address`


**请求方式**:`PUT`


**请求数据类型**:`application/x-www-form-urlencoded,application/json`


**响应数据类型**:`*/*`


**接口描述**:<p>修改客户的关联地址和详细地址</p>



**请求示例**:


```javascript
{
  "addressId": 1,
  "addressDetail": "XX街道XX号"
}
```


**请求参数**:


| 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|id||path|true|integer(int64)||
|customerAddressUpdateDTO|客户地址更新请求|body|true|CustomerAddressUpdateDTO|CustomerAddressUpdateDTO|
|&emsp;&emsp;addressId|关联地址ID（必须为村级地址）||true|integer(int64)||
|&emsp;&emsp;addressDetail|详细地址||false|string||


**响应状态**:


| 状态码 | 说明 | schema |
| -------- | -------- | ----- | 
|200|OK|ResultCustomerVO|
|400|Bad Request|ResultObject|
|401|Unauthorized|ResultObject|
|403|Forbidden|ResultObject|
|404|Not Found|ResultObject|
|405|Method Not Allowed|ResultObject|
|409|Conflict|ResultObject|
|500|Internal Server Error|ResultObject|


**响应状态码-200**:


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code|响应码|integer(int32)|integer(int32)|
|message|响应消息|string||
|data||CustomerVO|CustomerVO|
|&emsp;&emsp;id|客户ID|integer(int64)||
|&emsp;&emsp;name|客户姓名|string||
|&emsp;&emsp;phone|手机号|string||
|&emsp;&emsp;alias|别名/昵称|string||
|&emsp;&emsp;gender|性别,可用值:0,1,2|string||
|&emsp;&emsp;genderDesc|性别描述|string||
|&emsp;&emsp;age|年龄|integer(int32)||
|&emsp;&emsp;addressId|关联地址ID|integer(int64)||
|&emsp;&emsp;addressPath|地址完整路径|string||
|&emsp;&emsp;addressDetail|详细地址|string||
|&emsp;&emsp;customerType|客户类型,可用值:0,1|string||
|&emsp;&emsp;customerTypeDesc|客户类型描述|string||
|&emsp;&emsp;createInstant|创建时间|string(date-time)||
|&emsp;&emsp;modifyInstant|修改时间|string(date-time)||
|timestamp|时间戳|integer(int64)|integer(int64)|
|success||boolean||


**响应示例**:
```javascript
{
	"code": 200,
	"message": "操作成功",
	"data": {
		"id": 0,
		"name": "",
		"phone": "",
		"alias": "",
		"gender": "",
		"genderDesc": "",
		"age": 0,
		"addressId": 0,
		"addressPath": "",
		"addressDetail": "",
		"customerType": "",
		"customerTypeDesc": "",
		"createInstant": "",
		"modifyInstant": ""
	},
	"timestamp": 1700000000000,
	"success": true
}
```


**响应状态码-400**:


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code|响应码|integer(int32)|integer(int32)|
|message|响应消息|string||
|data|响应数据|object||
|timestamp|时间戳|integer(int64)|integer(int64)|
|success||boolean||


**响应示例**:
```javascript
{
	"code": 200,
	"message": "操作成功",
	"data": {},
	"timestamp": 1700000000000,
	"success": true
}
```


**响应状态码-401**:


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code|响应码|integer(int32)|integer(int32)|
|message|响应消息|string||
|data|响应数据|object||
|timestamp|时间戳|integer(int64)|integer(int64)|
|success||boolean||


**响应示例**:
```javascript
{
	"code": 200,
	"message": "操作成功",
	"data": {},
	"timestamp": 1700000000000,
	"success": true
}
```


**响应状态码-403**:


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code|响应码|integer(int32)|integer(int32)|
|message|响应消息|string||
|data|响应数据|object||
|timestamp|时间戳|integer(int64)|integer(int64)|
|success||boolean||


**响应示例**:
```javascript
{
	"code": 200,
	"message": "操作成功",
	"data": {},
	"timestamp": 1700000000000,
	"success": true
}
```


**响应状态码-404**:


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code|响应码|integer(int32)|integer(int32)|
|message|响应消息|string||
|data|响应数据|object||
|timestamp|时间戳|integer(int64)|integer(int64)|
|success||boolean||


**响应示例**:
```javascript
{
	"code": 200,
	"message": "操作成功",
	"data": {},
	"timestamp": 1700000000000,
	"success": true
}
```


**响应状态码-405**:


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code|响应码|integer(int32)|integer(int32)|
|message|响应消息|string||
|data|响应数据|object||
|timestamp|时间戳|integer(int64)|integer(int64)|
|success||boolean||


**响应示例**:
```javascript
{
	"code": 200,
	"message": "操作成功",
	"data": {},
	"timestamp": 1700000000000,
	"success": true
}
```


**响应状态码-409**:


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code|响应码|integer(int32)|integer(int32)|
|message|响应消息|string||
|data|响应数据|object||
|timestamp|时间戳|integer(int64)|integer(int64)|
|success||boolean||


**响应示例**:
```javascript
{
	"code": 200,
	"message": "操作成功",
	"data": {},
	"timestamp": 1700000000000,
	"success": true
}
```


**响应状态码-500**:


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code|响应码|integer(int32)|integer(int32)|
|message|响应消息|string||
|data|响应数据|object||
|timestamp|时间戳|integer(int64)|integer(int64)|
|success||boolean||


**响应示例**:
```javascript
{
	"code": 200,
	"message": "操作成功",
	"data": {},
	"timestamp": 1700000000000,
	"success": true
}
```


## 条件查询客户


**接口地址**:`/code-ledger/api/customers`


**请求方式**:`GET`


**请求数据类型**:`application/x-www-form-urlencoded`


**响应数据类型**:`*/*`


**接口描述**:<p>根据姓名、电话、地址ID查询客户（支持分页）</p>



**请求参数**:


| 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|searchDTO|客户查询请求DTO|query|true|CustomerSearchDTO|CustomerSearchDTO|
|&emsp;&emsp;name|客户姓名（模糊查询）||false|string||
|&emsp;&emsp;phone|客户电话（模糊查询）||false|string||
|&emsp;&emsp;addressId|地址ID（从地址树选择）||false|integer(int64)||
|pageable||query|true|Pageable|Pageable|
|&emsp;&emsp;page|||false|integer(int32)||
|&emsp;&emsp;size|||false|integer(int32)||
|&emsp;&emsp;sort|||false|array|string|


**响应状态**:


| 状态码 | 说明 | schema |
| -------- | -------- | ----- | 
|200|OK|ResultPageCustomerVO|
|400|Bad Request|ResultObject|
|401|Unauthorized|ResultObject|
|403|Forbidden|ResultObject|
|404|Not Found|ResultObject|
|405|Method Not Allowed|ResultObject|
|409|Conflict|ResultObject|
|500|Internal Server Error|ResultObject|


**响应状态码-200**:


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code|响应码|integer(int32)|integer(int32)|
|message|响应消息|string||
|data||PageCustomerVO|PageCustomerVO|
|&emsp;&emsp;totalPages||integer(int32)||
|&emsp;&emsp;totalElements||integer(int64)||
|&emsp;&emsp;size||integer(int32)||
|&emsp;&emsp;content|客户详情|array|CustomerVO|
|&emsp;&emsp;&emsp;&emsp;id|客户ID|integer||
|&emsp;&emsp;&emsp;&emsp;name|客户姓名|string||
|&emsp;&emsp;&emsp;&emsp;phone|手机号|string||
|&emsp;&emsp;&emsp;&emsp;alias|别名/昵称|string||
|&emsp;&emsp;&emsp;&emsp;gender|性别,可用值:0,1,2|string||
|&emsp;&emsp;&emsp;&emsp;genderDesc|性别描述|string||
|&emsp;&emsp;&emsp;&emsp;age|年龄|integer||
|&emsp;&emsp;&emsp;&emsp;addressId|关联地址ID|integer||
|&emsp;&emsp;&emsp;&emsp;addressPath|地址完整路径|string||
|&emsp;&emsp;&emsp;&emsp;addressDetail|详细地址|string||
|&emsp;&emsp;&emsp;&emsp;customerType|客户类型,可用值:0,1|string||
|&emsp;&emsp;&emsp;&emsp;customerTypeDesc|客户类型描述|string||
|&emsp;&emsp;&emsp;&emsp;createInstant|创建时间|string||
|&emsp;&emsp;&emsp;&emsp;modifyInstant|修改时间|string||
|&emsp;&emsp;number||integer(int32)||
|&emsp;&emsp;sort||SortObject|SortObject|
|&emsp;&emsp;&emsp;&emsp;empty||boolean||
|&emsp;&emsp;&emsp;&emsp;sorted||boolean||
|&emsp;&emsp;&emsp;&emsp;unsorted||boolean||
|&emsp;&emsp;first||boolean||
|&emsp;&emsp;last||boolean||
|&emsp;&emsp;numberOfElements||integer(int32)||
|&emsp;&emsp;pageable||PageableObject|PageableObject|
|&emsp;&emsp;&emsp;&emsp;offset||integer||
|&emsp;&emsp;&emsp;&emsp;sort||SortObject|SortObject|
|&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;empty||boolean||
|&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;sorted||boolean||
|&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;unsorted||boolean||
|&emsp;&emsp;&emsp;&emsp;pageSize||integer||
|&emsp;&emsp;&emsp;&emsp;pageNumber||integer||
|&emsp;&emsp;&emsp;&emsp;paged||boolean||
|&emsp;&emsp;&emsp;&emsp;unpaged||boolean||
|&emsp;&emsp;empty||boolean||
|timestamp|时间戳|integer(int64)|integer(int64)|
|success||boolean||


**响应示例**:
```javascript
{
	"code": 200,
	"message": "操作成功",
	"data": {
		"totalPages": 0,
		"totalElements": 0,
		"size": 0,
		"content": [
			{
				"id": 0,
				"name": "",
				"phone": "",
				"alias": "",
				"gender": "",
				"genderDesc": "",
				"age": 0,
				"addressId": 0,
				"addressPath": "",
				"addressDetail": "",
				"customerType": "",
				"customerTypeDesc": "",
				"createInstant": "",
				"modifyInstant": ""
			}
		],
		"number": 0,
		"sort": {
			"empty": true,
			"sorted": true,
			"unsorted": true
		},
		"first": true,
		"last": true,
		"numberOfElements": 0,
		"pageable": {
			"offset": 0,
			"sort": {
				"empty": true,
				"sorted": true,
				"unsorted": true
			},
			"pageSize": 0,
			"pageNumber": 0,
			"paged": true,
			"unpaged": true
		},
		"empty": true
	},
	"timestamp": 1700000000000,
	"success": true
}
```


**响应状态码-400**:


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code|响应码|integer(int32)|integer(int32)|
|message|响应消息|string||
|data|响应数据|object||
|timestamp|时间戳|integer(int64)|integer(int64)|
|success||boolean||


**响应示例**:
```javascript
{
	"code": 200,
	"message": "操作成功",
	"data": {},
	"timestamp": 1700000000000,
	"success": true
}
```


**响应状态码-401**:


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code|响应码|integer(int32)|integer(int32)|
|message|响应消息|string||
|data|响应数据|object||
|timestamp|时间戳|integer(int64)|integer(int64)|
|success||boolean||


**响应示例**:
```javascript
{
	"code": 200,
	"message": "操作成功",
	"data": {},
	"timestamp": 1700000000000,
	"success": true
}
```


**响应状态码-403**:


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code|响应码|integer(int32)|integer(int32)|
|message|响应消息|string||
|data|响应数据|object||
|timestamp|时间戳|integer(int64)|integer(int64)|
|success||boolean||


**响应示例**:
```javascript
{
	"code": 200,
	"message": "操作成功",
	"data": {},
	"timestamp": 1700000000000,
	"success": true
}
```


**响应状态码-404**:


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code|响应码|integer(int32)|integer(int32)|
|message|响应消息|string||
|data|响应数据|object||
|timestamp|时间戳|integer(int64)|integer(int64)|
|success||boolean||


**响应示例**:
```javascript
{
	"code": 200,
	"message": "操作成功",
	"data": {},
	"timestamp": 1700000000000,
	"success": true
}
```


**响应状态码-405**:


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code|响应码|integer(int32)|integer(int32)|
|message|响应消息|string||
|data|响应数据|object||
|timestamp|时间戳|integer(int64)|integer(int64)|
|success||boolean||


**响应示例**:
```javascript
{
	"code": 200,
	"message": "操作成功",
	"data": {},
	"timestamp": 1700000000000,
	"success": true
}
```


**响应状态码-409**:


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code|响应码|integer(int32)|integer(int32)|
|message|响应消息|string||
|data|响应数据|object||
|timestamp|时间戳|integer(int64)|integer(int64)|
|success||boolean||


**响应示例**:
```javascript
{
	"code": 200,
	"message": "操作成功",
	"data": {},
	"timestamp": 1700000000000,
	"success": true
}
```


**响应状态码-500**:


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code|响应码|integer(int32)|integer(int32)|
|message|响应消息|string||
|data|响应数据|object||
|timestamp|时间戳|integer(int64)|integer(int64)|
|success||boolean||


**响应示例**:
```javascript
{
	"code": 200,
	"message": "操作成功",
	"data": {},
	"timestamp": 1700000000000,
	"success": true
}
```


## 创建客户


**接口地址**:`/code-ledger/api/customers`


**请求方式**:`POST`


**请求数据类型**:`application/x-www-form-urlencoded,application/json`


**响应数据类型**:`*/*`


**接口描述**:<p>创建新客户（手机号不能重复，地址必须为村级）</p>



**请求示例**:


```javascript
{
  "name": "张三",
  "phone": "13800138000",
  "alias": "小张",
  "gender": "1",
  "age": 30,
  "addressId": 1,
  "addressDetail": "XX街道XX号",
  "customerType": "1"
}
```


**请求参数**:


| 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|customerCreateDTO|客户创建请求|body|true|CustomerCreateDTO|CustomerCreateDTO|
|&emsp;&emsp;name|客户姓名||true|string||
|&emsp;&emsp;phone|手机号||true|string||
|&emsp;&emsp;alias|别名/昵称||false|string||
|&emsp;&emsp;gender|性别: 1=男, 2=女, 0=未知,可用值:0,1,2||true|string||
|&emsp;&emsp;age|年龄||false|integer(int32)||
|&emsp;&emsp;addressId|关联地址ID（必须为村级地址）||true|integer(int64)||
|&emsp;&emsp;addressDetail|详细地址||false|string||
|&emsp;&emsp;customerType|客户类型: 1=活跃, 2=潜在, 3=流失,可用值:0,1||true|string||


**响应状态**:


| 状态码 | 说明 | schema |
| -------- | -------- | ----- | 
|200|OK|ResultCustomerVO|
|400|Bad Request|ResultObject|
|401|Unauthorized|ResultObject|
|403|Forbidden|ResultObject|
|404|Not Found|ResultObject|
|405|Method Not Allowed|ResultObject|
|409|Conflict|ResultObject|
|500|Internal Server Error|ResultObject|


**响应状态码-200**:


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code|响应码|integer(int32)|integer(int32)|
|message|响应消息|string||
|data||CustomerVO|CustomerVO|
|&emsp;&emsp;id|客户ID|integer(int64)||
|&emsp;&emsp;name|客户姓名|string||
|&emsp;&emsp;phone|手机号|string||
|&emsp;&emsp;alias|别名/昵称|string||
|&emsp;&emsp;gender|性别,可用值:0,1,2|string||
|&emsp;&emsp;genderDesc|性别描述|string||
|&emsp;&emsp;age|年龄|integer(int32)||
|&emsp;&emsp;addressId|关联地址ID|integer(int64)||
|&emsp;&emsp;addressPath|地址完整路径|string||
|&emsp;&emsp;addressDetail|详细地址|string||
|&emsp;&emsp;customerType|客户类型,可用值:0,1|string||
|&emsp;&emsp;customerTypeDesc|客户类型描述|string||
|&emsp;&emsp;createInstant|创建时间|string(date-time)||
|&emsp;&emsp;modifyInstant|修改时间|string(date-time)||
|timestamp|时间戳|integer(int64)|integer(int64)|
|success||boolean||


**响应示例**:
```javascript
{
	"code": 200,
	"message": "操作成功",
	"data": {
		"id": 0,
		"name": "",
		"phone": "",
		"alias": "",
		"gender": "",
		"genderDesc": "",
		"age": 0,
		"addressId": 0,
		"addressPath": "",
		"addressDetail": "",
		"customerType": "",
		"customerTypeDesc": "",
		"createInstant": "",
		"modifyInstant": ""
	},
	"timestamp": 1700000000000,
	"success": true
}
```


**响应状态码-400**:


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code|响应码|integer(int32)|integer(int32)|
|message|响应消息|string||
|data|响应数据|object||
|timestamp|时间戳|integer(int64)|integer(int64)|
|success||boolean||


**响应示例**:
```javascript
{
	"code": 200,
	"message": "操作成功",
	"data": {},
	"timestamp": 1700000000000,
	"success": true
}
```


**响应状态码-401**:


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code|响应码|integer(int32)|integer(int32)|
|message|响应消息|string||
|data|响应数据|object||
|timestamp|时间戳|integer(int64)|integer(int64)|
|success||boolean||


**响应示例**:
```javascript
{
	"code": 200,
	"message": "操作成功",
	"data": {},
	"timestamp": 1700000000000,
	"success": true
}
```


**响应状态码-403**:


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code|响应码|integer(int32)|integer(int32)|
|message|响应消息|string||
|data|响应数据|object||
|timestamp|时间戳|integer(int64)|integer(int64)|
|success||boolean||


**响应示例**:
```javascript
{
	"code": 200,
	"message": "操作成功",
	"data": {},
	"timestamp": 1700000000000,
	"success": true
}
```


**响应状态码-404**:


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code|响应码|integer(int32)|integer(int32)|
|message|响应消息|string||
|data|响应数据|object||
|timestamp|时间戳|integer(int64)|integer(int64)|
|success||boolean||


**响应示例**:
```javascript
{
	"code": 200,
	"message": "操作成功",
	"data": {},
	"timestamp": 1700000000000,
	"success": true
}
```


**响应状态码-405**:


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code|响应码|integer(int32)|integer(int32)|
|message|响应消息|string||
|data|响应数据|object||
|timestamp|时间戳|integer(int64)|integer(int64)|
|success||boolean||


**响应示例**:
```javascript
{
	"code": 200,
	"message": "操作成功",
	"data": {},
	"timestamp": 1700000000000,
	"success": true
}
```


**响应状态码-409**:


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code|响应码|integer(int32)|integer(int32)|
|message|响应消息|string||
|data|响应数据|object||
|timestamp|时间戳|integer(int64)|integer(int64)|
|success||boolean||


**响应示例**:
```javascript
{
	"code": 200,
	"message": "操作成功",
	"data": {},
	"timestamp": 1700000000000,
	"success": true
}
```


**响应状态码-500**:


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code|响应码|integer(int32)|integer(int32)|
|message|响应消息|string||
|data|响应数据|object||
|timestamp|时间戳|integer(int64)|integer(int64)|
|success||boolean||


**响应示例**:
```javascript
{
	"code": 200,
	"message": "操作成功",
	"data": {},
	"timestamp": 1700000000000,
	"success": true
}
```


# 地址管理


## 查询地址列表


**接口地址**:`/code-ledger/api/addresses`


**请求方式**:`GET`


**请求数据类型**:`application/x-www-form-urlencoded`


**响应数据类型**:`*/*`


**接口描述**:<p>优先按父级ID查询子级地址，如果父级ID为null则按层级查询，都为null则返回省份列表</p>



**请求参数**:


| 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|queryDTO|地址查询请求DTO|query|true|AddressQueryDTO|AddressQueryDTO|
|&emsp;&emsp;parentId|父级ID（0或null表示查询省份）||false|integer(int64)||
|&emsp;&emsp;level|地址层级（1=省, 2=市, 3=区县, 4=镇, 5=村）||false|integer(int32)||


**响应状态**:


| 状态码 | 说明 | schema |
| -------- | -------- | ----- | 
|200|OK|ResultListAddressVO|
|400|Bad Request|ResultObject|
|401|Unauthorized|ResultObject|
|403|Forbidden|ResultObject|
|404|Not Found|ResultObject|
|405|Method Not Allowed|ResultObject|
|409|Conflict|ResultObject|
|500|Internal Server Error|ResultObject|


**响应状态码-200**:


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code|响应码|integer(int32)|integer(int32)|
|message|响应消息|string||
|data|响应数据|array|AddressVO|
|&emsp;&emsp;id|地址ID|integer(int64)||
|&emsp;&emsp;parentId|父级ID（0表示顶级）|integer(int64)||
|&emsp;&emsp;name|地址名称|string||
|&emsp;&emsp;level|地址层级（1=省, 2=市, 3=区县, 4=镇, 5=村）|integer(int32)||
|&emsp;&emsp;levelDesc|地址层级描述|string||
|&emsp;&emsp;mergerName|全称路径|string||
|&emsp;&emsp;isTopLevel|是否为顶级|boolean||
|&emsp;&emsp;isVillageLevel|是否为村级及以上（可用于客户地址）|boolean||
|timestamp|时间戳|integer(int64)|integer(int64)|
|success||boolean||


**响应示例**:
```javascript
{
	"code": 200,
	"message": "操作成功",
	"data": [
		{
			"id": 1,
			"parentId": 0,
			"name": "广东省",
			"level": 1,
			"levelDesc": "省",
			"mergerName": "广东省-深圳市-南山区-西丽街道-留仙村",
			"isTopLevel": true,
			"isVillageLevel": false
		}
	],
	"timestamp": 1700000000000,
	"success": true
}
```


**响应状态码-400**:


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code|响应码|integer(int32)|integer(int32)|
|message|响应消息|string||
|data|响应数据|object||
|timestamp|时间戳|integer(int64)|integer(int64)|
|success||boolean||


**响应示例**:
```javascript
{
	"code": 200,
	"message": "操作成功",
	"data": {},
	"timestamp": 1700000000000,
	"success": true
}
```


**响应状态码-401**:


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code|响应码|integer(int32)|integer(int32)|
|message|响应消息|string||
|data|响应数据|object||
|timestamp|时间戳|integer(int64)|integer(int64)|
|success||boolean||


**响应示例**:
```javascript
{
	"code": 200,
	"message": "操作成功",
	"data": {},
	"timestamp": 1700000000000,
	"success": true
}
```


**响应状态码-403**:


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code|响应码|integer(int32)|integer(int32)|
|message|响应消息|string||
|data|响应数据|object||
|timestamp|时间戳|integer(int64)|integer(int64)|
|success||boolean||


**响应示例**:
```javascript
{
	"code": 200,
	"message": "操作成功",
	"data": {},
	"timestamp": 1700000000000,
	"success": true
}
```


**响应状态码-404**:


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code|响应码|integer(int32)|integer(int32)|
|message|响应消息|string||
|data|响应数据|object||
|timestamp|时间戳|integer(int64)|integer(int64)|
|success||boolean||


**响应示例**:
```javascript
{
	"code": 200,
	"message": "操作成功",
	"data": {},
	"timestamp": 1700000000000,
	"success": true
}
```


**响应状态码-405**:


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code|响应码|integer(int32)|integer(int32)|
|message|响应消息|string||
|data|响应数据|object||
|timestamp|时间戳|integer(int64)|integer(int64)|
|success||boolean||


**响应示例**:
```javascript
{
	"code": 200,
	"message": "操作成功",
	"data": {},
	"timestamp": 1700000000000,
	"success": true
}
```


**响应状态码-409**:


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code|响应码|integer(int32)|integer(int32)|
|message|响应消息|string||
|data|响应数据|object||
|timestamp|时间戳|integer(int64)|integer(int64)|
|success||boolean||


**响应示例**:
```javascript
{
	"code": 200,
	"message": "操作成功",
	"data": {},
	"timestamp": 1700000000000,
	"success": true
}
```


**响应状态码-500**:


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code|响应码|integer(int32)|integer(int32)|
|message|响应消息|string||
|data|响应数据|object||
|timestamp|时间戳|integer(int64)|integer(int64)|
|success||boolean||


**响应示例**:
```javascript
{
	"code": 200,
	"message": "操作成功",
	"data": {},
	"timestamp": 1700000000000,
	"success": true
}
```


## 创建地址


**接口地址**:`/code-ledger/api/addresses`


**请求方式**:`POST`


**请求数据类型**:`application/x-www-form-urlencoded,application/json`


**响应数据类型**:`*/*`


**接口描述**:<p>创建地址。parentId=0或null创建省级地址，指定parentId创建子级地址（自动计算层级和路径）</p>



**请求示例**:


```javascript
{
  "parentId": 1,
  "name": "深圳市"
}
```


**请求参数**:


| 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|addressCreateDTO|地址创建请求DTO|body|true|AddressCreateDTO|AddressCreateDTO|
|&emsp;&emsp;parentId|父级ID（0或null表示创建省级地址）||false|integer(int64)||
|&emsp;&emsp;name|地址名称||true|string||


**响应状态**:


| 状态码 | 说明 | schema |
| -------- | -------- | ----- | 
|200|OK|ResultAddressVO|
|400|Bad Request|ResultObject|
|401|Unauthorized|ResultObject|
|403|Forbidden|ResultObject|
|404|Not Found|ResultObject|
|405|Method Not Allowed|ResultObject|
|409|Conflict|ResultObject|
|500|Internal Server Error|ResultObject|


**响应状态码-200**:


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code|响应码|integer(int32)|integer(int32)|
|message|响应消息|string||
|data||AddressVO|AddressVO|
|&emsp;&emsp;id|地址ID|integer(int64)||
|&emsp;&emsp;parentId|父级ID（0表示顶级）|integer(int64)||
|&emsp;&emsp;name|地址名称|string||
|&emsp;&emsp;level|地址层级（1=省, 2=市, 3=区县, 4=镇, 5=村）|integer(int32)||
|&emsp;&emsp;levelDesc|地址层级描述|string||
|&emsp;&emsp;mergerName|全称路径|string||
|&emsp;&emsp;isTopLevel|是否为顶级|boolean||
|&emsp;&emsp;isVillageLevel|是否为村级及以上（可用于客户地址）|boolean||
|timestamp|时间戳|integer(int64)|integer(int64)|
|success||boolean||


**响应示例**:
```javascript
{
	"code": 200,
	"message": "操作成功",
	"data": {
		"id": 1,
		"parentId": 0,
		"name": "广东省",
		"level": 1,
		"levelDesc": "省",
		"mergerName": "广东省-深圳市-南山区-西丽街道-留仙村",
		"isTopLevel": true,
		"isVillageLevel": false
	},
	"timestamp": 1700000000000,
	"success": true
}
```


**响应状态码-400**:


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code|响应码|integer(int32)|integer(int32)|
|message|响应消息|string||
|data|响应数据|object||
|timestamp|时间戳|integer(int64)|integer(int64)|
|success||boolean||


**响应示例**:
```javascript
{
	"code": 200,
	"message": "操作成功",
	"data": {},
	"timestamp": 1700000000000,
	"success": true
}
```


**响应状态码-401**:


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code|响应码|integer(int32)|integer(int32)|
|message|响应消息|string||
|data|响应数据|object||
|timestamp|时间戳|integer(int64)|integer(int64)|
|success||boolean||


**响应示例**:
```javascript
{
	"code": 200,
	"message": "操作成功",
	"data": {},
	"timestamp": 1700000000000,
	"success": true
}
```


**响应状态码-403**:


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code|响应码|integer(int32)|integer(int32)|
|message|响应消息|string||
|data|响应数据|object||
|timestamp|时间戳|integer(int64)|integer(int64)|
|success||boolean||


**响应示例**:
```javascript
{
	"code": 200,
	"message": "操作成功",
	"data": {},
	"timestamp": 1700000000000,
	"success": true
}
```


**响应状态码-404**:


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code|响应码|integer(int32)|integer(int32)|
|message|响应消息|string||
|data|响应数据|object||
|timestamp|时间戳|integer(int64)|integer(int64)|
|success||boolean||


**响应示例**:
```javascript
{
	"code": 200,
	"message": "操作成功",
	"data": {},
	"timestamp": 1700000000000,
	"success": true
}
```


**响应状态码-405**:


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code|响应码|integer(int32)|integer(int32)|
|message|响应消息|string||
|data|响应数据|object||
|timestamp|时间戳|integer(int64)|integer(int64)|
|success||boolean||


**响应示例**:
```javascript
{
	"code": 200,
	"message": "操作成功",
	"data": {},
	"timestamp": 1700000000000,
	"success": true
}
```


**响应状态码-409**:


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code|响应码|integer(int32)|integer(int32)|
|message|响应消息|string||
|data|响应数据|object||
|timestamp|时间戳|integer(int64)|integer(int64)|
|success||boolean||


**响应示例**:
```javascript
{
	"code": 200,
	"message": "操作成功",
	"data": {},
	"timestamp": 1700000000000,
	"success": true
}
```


**响应状态码-500**:


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code|响应码|integer(int32)|integer(int32)|
|message|响应消息|string||
|data|响应数据|object||
|timestamp|时间戳|integer(int64)|integer(int64)|
|success||boolean||


**响应示例**:
```javascript
{
	"code": 200,
	"message": "操作成功",
	"data": {},
	"timestamp": 1700000000000,
	"success": true
}
```


## 获取地址详情


**接口地址**:`/code-ledger/api/addresses/{id}`


**请求方式**:`GET`


**请求数据类型**:`application/x-www-form-urlencoded`


**响应数据类型**:`*/*`


**接口描述**:<p>根据ID获取地址详情（含完整路径）</p>



**请求参数**:


| 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|id||path|true|integer(int64)||


**响应状态**:


| 状态码 | 说明 | schema |
| -------- | -------- | ----- | 
|200|OK|ResultAddressVO|
|400|Bad Request|ResultObject|
|401|Unauthorized|ResultObject|
|403|Forbidden|ResultObject|
|404|Not Found|ResultObject|
|405|Method Not Allowed|ResultObject|
|409|Conflict|ResultObject|
|500|Internal Server Error|ResultObject|


**响应状态码-200**:


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code|响应码|integer(int32)|integer(int32)|
|message|响应消息|string||
|data||AddressVO|AddressVO|
|&emsp;&emsp;id|地址ID|integer(int64)||
|&emsp;&emsp;parentId|父级ID（0表示顶级）|integer(int64)||
|&emsp;&emsp;name|地址名称|string||
|&emsp;&emsp;level|地址层级（1=省, 2=市, 3=区县, 4=镇, 5=村）|integer(int32)||
|&emsp;&emsp;levelDesc|地址层级描述|string||
|&emsp;&emsp;mergerName|全称路径|string||
|&emsp;&emsp;isTopLevel|是否为顶级|boolean||
|&emsp;&emsp;isVillageLevel|是否为村级及以上（可用于客户地址）|boolean||
|timestamp|时间戳|integer(int64)|integer(int64)|
|success||boolean||


**响应示例**:
```javascript
{
	"code": 200,
	"message": "操作成功",
	"data": {
		"id": 1,
		"parentId": 0,
		"name": "广东省",
		"level": 1,
		"levelDesc": "省",
		"mergerName": "广东省-深圳市-南山区-西丽街道-留仙村",
		"isTopLevel": true,
		"isVillageLevel": false
	},
	"timestamp": 1700000000000,
	"success": true
}
```


**响应状态码-400**:


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code|响应码|integer(int32)|integer(int32)|
|message|响应消息|string||
|data|响应数据|object||
|timestamp|时间戳|integer(int64)|integer(int64)|
|success||boolean||


**响应示例**:
```javascript
{
	"code": 200,
	"message": "操作成功",
	"data": {},
	"timestamp": 1700000000000,
	"success": true
}
```


**响应状态码-401**:


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code|响应码|integer(int32)|integer(int32)|
|message|响应消息|string||
|data|响应数据|object||
|timestamp|时间戳|integer(int64)|integer(int64)|
|success||boolean||


**响应示例**:
```javascript
{
	"code": 200,
	"message": "操作成功",
	"data": {},
	"timestamp": 1700000000000,
	"success": true
}
```


**响应状态码-403**:


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code|响应码|integer(int32)|integer(int32)|
|message|响应消息|string||
|data|响应数据|object||
|timestamp|时间戳|integer(int64)|integer(int64)|
|success||boolean||


**响应示例**:
```javascript
{
	"code": 200,
	"message": "操作成功",
	"data": {},
	"timestamp": 1700000000000,
	"success": true
}
```


**响应状态码-404**:


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code|响应码|integer(int32)|integer(int32)|
|message|响应消息|string||
|data|响应数据|object||
|timestamp|时间戳|integer(int64)|integer(int64)|
|success||boolean||


**响应示例**:
```javascript
{
	"code": 200,
	"message": "操作成功",
	"data": {},
	"timestamp": 1700000000000,
	"success": true
}
```


**响应状态码-405**:


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code|响应码|integer(int32)|integer(int32)|
|message|响应消息|string||
|data|响应数据|object||
|timestamp|时间戳|integer(int64)|integer(int64)|
|success||boolean||


**响应示例**:
```javascript
{
	"code": 200,
	"message": "操作成功",
	"data": {},
	"timestamp": 1700000000000,
	"success": true
}
```


**响应状态码-409**:


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code|响应码|integer(int32)|integer(int32)|
|message|响应消息|string||
|data|响应数据|object||
|timestamp|时间戳|integer(int64)|integer(int64)|
|success||boolean||


**响应示例**:
```javascript
{
	"code": 200,
	"message": "操作成功",
	"data": {},
	"timestamp": 1700000000000,
	"success": true
}
```


**响应状态码-500**:


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code|响应码|integer(int32)|integer(int32)|
|message|响应消息|string||
|data|响应数据|object||
|timestamp|时间戳|integer(int64)|integer(int64)|
|success||boolean||


**响应示例**:
```javascript
{
	"code": 200,
	"message": "操作成功",
	"data": {},
	"timestamp": 1700000000000,
	"success": true
}
```


## 查询村级地址


**接口地址**:`/code-ledger/api/addresses/village/{parentId}`


**请求方式**:`GET`


**请求数据类型**:`application/x-www-form-urlencoded`


**响应数据类型**:`*/*`


**接口描述**:<p>根据父级ID（镇/乡）查询村级地址，用于客户地址选择</p>



**请求参数**:


| 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|parentId||path|true|integer(int64)||


**响应状态**:


| 状态码 | 说明 | schema |
| -------- | -------- | ----- | 
|200|OK|ResultListAddressVO|
|400|Bad Request|ResultObject|
|401|Unauthorized|ResultObject|
|403|Forbidden|ResultObject|
|404|Not Found|ResultObject|
|405|Method Not Allowed|ResultObject|
|409|Conflict|ResultObject|
|500|Internal Server Error|ResultObject|


**响应状态码-200**:


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code|响应码|integer(int32)|integer(int32)|
|message|响应消息|string||
|data|响应数据|array|AddressVO|
|&emsp;&emsp;id|地址ID|integer(int64)||
|&emsp;&emsp;parentId|父级ID（0表示顶级）|integer(int64)||
|&emsp;&emsp;name|地址名称|string||
|&emsp;&emsp;level|地址层级（1=省, 2=市, 3=区县, 4=镇, 5=村）|integer(int32)||
|&emsp;&emsp;levelDesc|地址层级描述|string||
|&emsp;&emsp;mergerName|全称路径|string||
|&emsp;&emsp;isTopLevel|是否为顶级|boolean||
|&emsp;&emsp;isVillageLevel|是否为村级及以上（可用于客户地址）|boolean||
|timestamp|时间戳|integer(int64)|integer(int64)|
|success||boolean||


**响应示例**:
```javascript
{
	"code": 200,
	"message": "操作成功",
	"data": [
		{
			"id": 1,
			"parentId": 0,
			"name": "广东省",
			"level": 1,
			"levelDesc": "省",
			"mergerName": "广东省-深圳市-南山区-西丽街道-留仙村",
			"isTopLevel": true,
			"isVillageLevel": false
		}
	],
	"timestamp": 1700000000000,
	"success": true
}
```


**响应状态码-400**:


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code|响应码|integer(int32)|integer(int32)|
|message|响应消息|string||
|data|响应数据|object||
|timestamp|时间戳|integer(int64)|integer(int64)|
|success||boolean||


**响应示例**:
```javascript
{
	"code": 200,
	"message": "操作成功",
	"data": {},
	"timestamp": 1700000000000,
	"success": true
}
```


**响应状态码-401**:


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code|响应码|integer(int32)|integer(int32)|
|message|响应消息|string||
|data|响应数据|object||
|timestamp|时间戳|integer(int64)|integer(int64)|
|success||boolean||


**响应示例**:
```javascript
{
	"code": 200,
	"message": "操作成功",
	"data": {},
	"timestamp": 1700000000000,
	"success": true
}
```


**响应状态码-403**:


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code|响应码|integer(int32)|integer(int32)|
|message|响应消息|string||
|data|响应数据|object||
|timestamp|时间戳|integer(int64)|integer(int64)|
|success||boolean||


**响应示例**:
```javascript
{
	"code": 200,
	"message": "操作成功",
	"data": {},
	"timestamp": 1700000000000,
	"success": true
}
```


**响应状态码-404**:


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code|响应码|integer(int32)|integer(int32)|
|message|响应消息|string||
|data|响应数据|object||
|timestamp|时间戳|integer(int64)|integer(int64)|
|success||boolean||


**响应示例**:
```javascript
{
	"code": 200,
	"message": "操作成功",
	"data": {},
	"timestamp": 1700000000000,
	"success": true
}
```


**响应状态码-405**:


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code|响应码|integer(int32)|integer(int32)|
|message|响应消息|string||
|data|响应数据|object||
|timestamp|时间戳|integer(int64)|integer(int64)|
|success||boolean||


**响应示例**:
```javascript
{
	"code": 200,
	"message": "操作成功",
	"data": {},
	"timestamp": 1700000000000,
	"success": true
}
```


**响应状态码-409**:


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code|响应码|integer(int32)|integer(int32)|
|message|响应消息|string||
|data|响应数据|object||
|timestamp|时间戳|integer(int64)|integer(int64)|
|success||boolean||


**响应示例**:
```javascript
{
	"code": 200,
	"message": "操作成功",
	"data": {},
	"timestamp": 1700000000000,
	"success": true
}
```


**响应状态码-500**:


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code|响应码|integer(int32)|integer(int32)|
|message|响应消息|string||
|data|响应数据|object||
|timestamp|时间戳|integer(int64)|integer(int64)|
|success||boolean||


**响应示例**:
```javascript
{
	"code": 200,
	"message": "操作成功",
	"data": {},
	"timestamp": 1700000000000,
	"success": true
}
```


## 获取顶级地址


**接口地址**:`/code-ledger/api/addresses/top`


**请求方式**:`GET`


**请求数据类型**:`application/x-www-form-urlencoded`


**响应数据类型**:`*/*`


**接口描述**:<p>获取所有省份列表</p>



**请求参数**:


暂无


**响应状态**:


| 状态码 | 说明 | schema |
| -------- | -------- | ----- | 
|200|OK|ResultListAddressVO|
|400|Bad Request|ResultObject|
|401|Unauthorized|ResultObject|
|403|Forbidden|ResultObject|
|404|Not Found|ResultObject|
|405|Method Not Allowed|ResultObject|
|409|Conflict|ResultObject|
|500|Internal Server Error|ResultObject|


**响应状态码-200**:


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code|响应码|integer(int32)|integer(int32)|
|message|响应消息|string||
|data|响应数据|array|AddressVO|
|&emsp;&emsp;id|地址ID|integer(int64)||
|&emsp;&emsp;parentId|父级ID（0表示顶级）|integer(int64)||
|&emsp;&emsp;name|地址名称|string||
|&emsp;&emsp;level|地址层级（1=省, 2=市, 3=区县, 4=镇, 5=村）|integer(int32)||
|&emsp;&emsp;levelDesc|地址层级描述|string||
|&emsp;&emsp;mergerName|全称路径|string||
|&emsp;&emsp;isTopLevel|是否为顶级|boolean||
|&emsp;&emsp;isVillageLevel|是否为村级及以上（可用于客户地址）|boolean||
|timestamp|时间戳|integer(int64)|integer(int64)|
|success||boolean||


**响应示例**:
```javascript
{
	"code": 200,
	"message": "操作成功",
	"data": [
		{
			"id": 1,
			"parentId": 0,
			"name": "广东省",
			"level": 1,
			"levelDesc": "省",
			"mergerName": "广东省-深圳市-南山区-西丽街道-留仙村",
			"isTopLevel": true,
			"isVillageLevel": false
		}
	],
	"timestamp": 1700000000000,
	"success": true
}
```


**响应状态码-400**:


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code|响应码|integer(int32)|integer(int32)|
|message|响应消息|string||
|data|响应数据|object||
|timestamp|时间戳|integer(int64)|integer(int64)|
|success||boolean||


**响应示例**:
```javascript
{
	"code": 200,
	"message": "操作成功",
	"data": {},
	"timestamp": 1700000000000,
	"success": true
}
```


**响应状态码-401**:


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code|响应码|integer(int32)|integer(int32)|
|message|响应消息|string||
|data|响应数据|object||
|timestamp|时间戳|integer(int64)|integer(int64)|
|success||boolean||


**响应示例**:
```javascript
{
	"code": 200,
	"message": "操作成功",
	"data": {},
	"timestamp": 1700000000000,
	"success": true
}
```


**响应状态码-403**:


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code|响应码|integer(int32)|integer(int32)|
|message|响应消息|string||
|data|响应数据|object||
|timestamp|时间戳|integer(int64)|integer(int64)|
|success||boolean||


**响应示例**:
```javascript
{
	"code": 200,
	"message": "操作成功",
	"data": {},
	"timestamp": 1700000000000,
	"success": true
}
```


**响应状态码-404**:


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code|响应码|integer(int32)|integer(int32)|
|message|响应消息|string||
|data|响应数据|object||
|timestamp|时间戳|integer(int64)|integer(int64)|
|success||boolean||


**响应示例**:
```javascript
{
	"code": 200,
	"message": "操作成功",
	"data": {},
	"timestamp": 1700000000000,
	"success": true
}
```


**响应状态码-405**:


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code|响应码|integer(int32)|integer(int32)|
|message|响应消息|string||
|data|响应数据|object||
|timestamp|时间戳|integer(int64)|integer(int64)|
|success||boolean||


**响应示例**:
```javascript
{
	"code": 200,
	"message": "操作成功",
	"data": {},
	"timestamp": 1700000000000,
	"success": true
}
```


**响应状态码-409**:


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code|响应码|integer(int32)|integer(int32)|
|message|响应消息|string||
|data|响应数据|object||
|timestamp|时间戳|integer(int64)|integer(int64)|
|success||boolean||


**响应示例**:
```javascript
{
	"code": 200,
	"message": "操作成功",
	"data": {},
	"timestamp": 1700000000000,
	"success": true
}
```


**响应状态码-500**:


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code|响应码|integer(int32)|integer(int32)|
|message|响应消息|string||
|data|响应数据|object||
|timestamp|时间戳|integer(int64)|integer(int64)|
|success||boolean||


**响应示例**:
```javascript
{
	"code": 200,
	"message": "操作成功",
	"data": {},
	"timestamp": 1700000000000,
	"success": true
}
```


## 查询子级地址


**接口地址**:`/code-ledger/api/addresses/children/{parentId}`


**请求方式**:`GET`


**请求数据类型**:`application/x-www-form-urlencoded`


**响应数据类型**:`*/*`


**接口描述**:<p>根据父级ID查询下一级地址（用于级联选择）</p>



**请求参数**:


| 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|parentId||path|true|integer(int64)||


**响应状态**:


| 状态码 | 说明 | schema |
| -------- | -------- | ----- | 
|200|OK|ResultListAddressVO|
|400|Bad Request|ResultObject|
|401|Unauthorized|ResultObject|
|403|Forbidden|ResultObject|
|404|Not Found|ResultObject|
|405|Method Not Allowed|ResultObject|
|409|Conflict|ResultObject|
|500|Internal Server Error|ResultObject|


**响应状态码-200**:


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code|响应码|integer(int32)|integer(int32)|
|message|响应消息|string||
|data|响应数据|array|AddressVO|
|&emsp;&emsp;id|地址ID|integer(int64)||
|&emsp;&emsp;parentId|父级ID（0表示顶级）|integer(int64)||
|&emsp;&emsp;name|地址名称|string||
|&emsp;&emsp;level|地址层级（1=省, 2=市, 3=区县, 4=镇, 5=村）|integer(int32)||
|&emsp;&emsp;levelDesc|地址层级描述|string||
|&emsp;&emsp;mergerName|全称路径|string||
|&emsp;&emsp;isTopLevel|是否为顶级|boolean||
|&emsp;&emsp;isVillageLevel|是否为村级及以上（可用于客户地址）|boolean||
|timestamp|时间戳|integer(int64)|integer(int64)|
|success||boolean||


**响应示例**:
```javascript
{
	"code": 200,
	"message": "操作成功",
	"data": [
		{
			"id": 1,
			"parentId": 0,
			"name": "广东省",
			"level": 1,
			"levelDesc": "省",
			"mergerName": "广东省-深圳市-南山区-西丽街道-留仙村",
			"isTopLevel": true,
			"isVillageLevel": false
		}
	],
	"timestamp": 1700000000000,
	"success": true
}
```


**响应状态码-400**:


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code|响应码|integer(int32)|integer(int32)|
|message|响应消息|string||
|data|响应数据|object||
|timestamp|时间戳|integer(int64)|integer(int64)|
|success||boolean||


**响应示例**:
```javascript
{
	"code": 200,
	"message": "操作成功",
	"data": {},
	"timestamp": 1700000000000,
	"success": true
}
```


**响应状态码-401**:


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code|响应码|integer(int32)|integer(int32)|
|message|响应消息|string||
|data|响应数据|object||
|timestamp|时间戳|integer(int64)|integer(int64)|
|success||boolean||


**响应示例**:
```javascript
{
	"code": 200,
	"message": "操作成功",
	"data": {},
	"timestamp": 1700000000000,
	"success": true
}
```


**响应状态码-403**:


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code|响应码|integer(int32)|integer(int32)|
|message|响应消息|string||
|data|响应数据|object||
|timestamp|时间戳|integer(int64)|integer(int64)|
|success||boolean||


**响应示例**:
```javascript
{
	"code": 200,
	"message": "操作成功",
	"data": {},
	"timestamp": 1700000000000,
	"success": true
}
```


**响应状态码-404**:


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code|响应码|integer(int32)|integer(int32)|
|message|响应消息|string||
|data|响应数据|object||
|timestamp|时间戳|integer(int64)|integer(int64)|
|success||boolean||


**响应示例**:
```javascript
{
	"code": 200,
	"message": "操作成功",
	"data": {},
	"timestamp": 1700000000000,
	"success": true
}
```


**响应状态码-405**:


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code|响应码|integer(int32)|integer(int32)|
|message|响应消息|string||
|data|响应数据|object||
|timestamp|时间戳|integer(int64)|integer(int64)|
|success||boolean||


**响应示例**:
```javascript
{
	"code": 200,
	"message": "操作成功",
	"data": {},
	"timestamp": 1700000000000,
	"success": true
}
```


**响应状态码-409**:


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code|响应码|integer(int32)|integer(int32)|
|message|响应消息|string||
|data|响应数据|object||
|timestamp|时间戳|integer(int64)|integer(int64)|
|success||boolean||


**响应示例**:
```javascript
{
	"code": 200,
	"message": "操作成功",
	"data": {},
	"timestamp": 1700000000000,
	"success": true
}
```


**响应状态码-500**:


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code|响应码|integer(int32)|integer(int32)|
|message|响应消息|string||
|data|响应数据|object||
|timestamp|时间戳|integer(int64)|integer(int64)|
|success||boolean||


**响应示例**:
```javascript
{
	"code": 200,
	"message": "操作成功",
	"data": {},
	"timestamp": 1700000000000,
	"success": true
}
```


## 查询地址链


**接口地址**:`/code-ledger/api/addresses/chain/{addressId}`


**请求方式**:`GET`


**请求数据类型**:`application/x-www-form-urlencoded`


**响应数据类型**:`*/*`


**接口描述**:<p>根据地址ID向上查询完整地址链，用于客户编辑时回显地址级联选择器</p>



**请求参数**:


| 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|addressId||path|true|integer(int64)||


**响应状态**:


| 状态码 | 说明 | schema |
| -------- | -------- | ----- | 
|200|OK|ResultAddressChainVO|
|400|Bad Request|ResultObject|
|401|Unauthorized|ResultObject|
|403|Forbidden|ResultObject|
|404|Not Found|ResultObject|
|405|Method Not Allowed|ResultObject|
|409|Conflict|ResultObject|
|500|Internal Server Error|ResultObject|


**响应状态码-200**:


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code|响应码|integer(int32)|integer(int32)|
|message|响应消息|string||
|data||AddressChainVO|AddressChainVO|
|&emsp;&emsp;addressIds|地址ID数组（从省到当前地址）|array|integer(int64)|
|&emsp;&emsp;addressNames|地址名称数组|array|string|
|&emsp;&emsp;addressLevels|地址层级数组|array|integer(int32)|
|&emsp;&emsp;fullPath|完整地址路径|string||
|&emsp;&emsp;targetAddressId|最终地址ID|integer(int64)||
|&emsp;&emsp;targetAddressName|最终地址名称|string||
|timestamp|时间戳|integer(int64)|integer(int64)|
|success||boolean||


**响应示例**:
```javascript
{
	"code": 200,
	"message": "操作成功",
	"data": {
		"addressIds": "[1,101,1001,10001,100001]",
		"addressNames": "[\"广东省\",\"深圳市\",\"南山区\",\"西丽街道\",\"留仙村\"]",
		"addressLevels": "[1,2,3,4,5]",
		"fullPath": "广东省-深圳市-南山区-西丽街道-留仙村",
		"targetAddressId": 100001,
		"targetAddressName": "留仙村"
	},
	"timestamp": 1700000000000,
	"success": true
}
```


**响应状态码-400**:


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code|响应码|integer(int32)|integer(int32)|
|message|响应消息|string||
|data|响应数据|object||
|timestamp|时间戳|integer(int64)|integer(int64)|
|success||boolean||


**响应示例**:
```javascript
{
	"code": 200,
	"message": "操作成功",
	"data": {},
	"timestamp": 1700000000000,
	"success": true
}
```


**响应状态码-401**:


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code|响应码|integer(int32)|integer(int32)|
|message|响应消息|string||
|data|响应数据|object||
|timestamp|时间戳|integer(int64)|integer(int64)|
|success||boolean||


**响应示例**:
```javascript
{
	"code": 200,
	"message": "操作成功",
	"data": {},
	"timestamp": 1700000000000,
	"success": true
}
```


**响应状态码-403**:


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code|响应码|integer(int32)|integer(int32)|
|message|响应消息|string||
|data|响应数据|object||
|timestamp|时间戳|integer(int64)|integer(int64)|
|success||boolean||


**响应示例**:
```javascript
{
	"code": 200,
	"message": "操作成功",
	"data": {},
	"timestamp": 1700000000000,
	"success": true
}
```


**响应状态码-404**:


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code|响应码|integer(int32)|integer(int32)|
|message|响应消息|string||
|data|响应数据|object||
|timestamp|时间戳|integer(int64)|integer(int64)|
|success||boolean||


**响应示例**:
```javascript
{
	"code": 200,
	"message": "操作成功",
	"data": {},
	"timestamp": 1700000000000,
	"success": true
}
```


**响应状态码-405**:


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code|响应码|integer(int32)|integer(int32)|
|message|响应消息|string||
|data|响应数据|object||
|timestamp|时间戳|integer(int64)|integer(int64)|
|success||boolean||


**响应示例**:
```javascript
{
	"code": 200,
	"message": "操作成功",
	"data": {},
	"timestamp": 1700000000000,
	"success": true
}
```


**响应状态码-409**:


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code|响应码|integer(int32)|integer(int32)|
|message|响应消息|string||
|data|响应数据|object||
|timestamp|时间戳|integer(int64)|integer(int64)|
|success||boolean||


**响应示例**:
```javascript
{
	"code": 200,
	"message": "操作成功",
	"data": {},
	"timestamp": 1700000000000,
	"success": true
}
```


**响应状态码-500**:


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code|响应码|integer(int32)|integer(int32)|
|message|响应消息|string||
|data|响应数据|object||
|timestamp|时间戳|integer(int64)|integer(int64)|
|success||boolean||


**响应示例**:
```javascript
{
	"code": 200,
	"message": "操作成功",
	"data": {},
	"timestamp": 1700000000000,
	"success": true
}
```


# 商品SKU管理


## 启用-禁用SKU


**接口地址**:`/code-ledger/api/skus/{id}/status`


**请求方式**:`PUT`


**请求数据类型**:`application/x-www-form-urlencoded`


**响应数据类型**:`*/*`


**接口描述**:<p>修改SKU状态</p>



**请求参数**:


| 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|id||path|true|integer(int64)||
|status|可用值:0,1|query|true|string||


**响应状态**:


| 状态码 | 说明 | schema |
| -------- | -------- | ----- | 
|200|OK|ResultProductSkuVO|
|400|Bad Request|ResultObject|
|401|Unauthorized|ResultObject|
|403|Forbidden|ResultObject|
|404|Not Found|ResultObject|
|405|Method Not Allowed|ResultObject|
|409|Conflict|ResultObject|
|500|Internal Server Error|ResultObject|


**响应状态码-200**:


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code|响应码|integer(int32)|integer(int32)|
|message|响应消息|string||
|data||ProductSkuVO|ProductSkuVO|
|&emsp;&emsp;id|SKU ID|integer(int64)||
|&emsp;&emsp;productId|商品ID|integer(int64)||
|&emsp;&emsp;skuName|SKU名称|string||
|&emsp;&emsp;priceStatus|定价状态,可用值:0,1|string||
|&emsp;&emsp;price|SKU销售价格|number||
|&emsp;&emsp;imageUrl|SKU图片URL|string||
|&emsp;&emsp;sortOrder|排序序号|integer(int32)||
|&emsp;&emsp;status|状态,可用值:0,1|string||
|&emsp;&emsp;skuAttrs|商品SKU属性值|array|ProductSkuAttrVO|
|&emsp;&emsp;&emsp;&emsp;attrName|属性名称|string||
|&emsp;&emsp;&emsp;&emsp;attrValue|属性值|string||
|&emsp;&emsp;&emsp;&emsp;sortOrder|排序序号|integer||
|timestamp|时间戳|integer(int64)|integer(int64)|
|success||boolean||


**响应示例**:
```javascript
{
	"code": 200,
	"message": "操作成功",
	"data": {
		"id": 0,
		"productId": 0,
		"skuName": "",
		"priceStatus": "",
		"price": 0,
		"imageUrl": "",
		"sortOrder": 0,
		"status": "",
		"skuAttrs": [
			{
				"attrName": "",
				"attrValue": "",
				"sortOrder": 0
			}
		]
	},
	"timestamp": 1700000000000,
	"success": true
}
```


**响应状态码-400**:


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code|响应码|integer(int32)|integer(int32)|
|message|响应消息|string||
|data|响应数据|object||
|timestamp|时间戳|integer(int64)|integer(int64)|
|success||boolean||


**响应示例**:
```javascript
{
	"code": 200,
	"message": "操作成功",
	"data": {},
	"timestamp": 1700000000000,
	"success": true
}
```


**响应状态码-401**:


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code|响应码|integer(int32)|integer(int32)|
|message|响应消息|string||
|data|响应数据|object||
|timestamp|时间戳|integer(int64)|integer(int64)|
|success||boolean||


**响应示例**:
```javascript
{
	"code": 200,
	"message": "操作成功",
	"data": {},
	"timestamp": 1700000000000,
	"success": true
}
```


**响应状态码-403**:


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code|响应码|integer(int32)|integer(int32)|
|message|响应消息|string||
|data|响应数据|object||
|timestamp|时间戳|integer(int64)|integer(int64)|
|success||boolean||


**响应示例**:
```javascript
{
	"code": 200,
	"message": "操作成功",
	"data": {},
	"timestamp": 1700000000000,
	"success": true
}
```


**响应状态码-404**:


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code|响应码|integer(int32)|integer(int32)|
|message|响应消息|string||
|data|响应数据|object||
|timestamp|时间戳|integer(int64)|integer(int64)|
|success||boolean||


**响应示例**:
```javascript
{
	"code": 200,
	"message": "操作成功",
	"data": {},
	"timestamp": 1700000000000,
	"success": true
}
```


**响应状态码-405**:


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code|响应码|integer(int32)|integer(int32)|
|message|响应消息|string||
|data|响应数据|object||
|timestamp|时间戳|integer(int64)|integer(int64)|
|success||boolean||


**响应示例**:
```javascript
{
	"code": 200,
	"message": "操作成功",
	"data": {},
	"timestamp": 1700000000000,
	"success": true
}
```


**响应状态码-409**:


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code|响应码|integer(int32)|integer(int32)|
|message|响应消息|string||
|data|响应数据|object||
|timestamp|时间戳|integer(int64)|integer(int64)|
|success||boolean||


**响应示例**:
```javascript
{
	"code": 200,
	"message": "操作成功",
	"data": {},
	"timestamp": 1700000000000,
	"success": true
}
```


**响应状态码-500**:


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code|响应码|integer(int32)|integer(int32)|
|message|响应消息|string||
|data|响应数据|object||
|timestamp|时间戳|integer(int64)|integer(int64)|
|success||boolean||


**响应示例**:
```javascript
{
	"code": 200,
	"message": "操作成功",
	"data": {},
	"timestamp": 1700000000000,
	"success": true
}
```


## 修改SKU价格


**接口地址**:`/code-ledger/api/skus/{id}/price`


**请求方式**:`PUT`


**请求数据类型**:`application/x-www-form-urlencoded`


**响应数据类型**:`*/*`


**接口描述**:<p>修改单个SKU的价格（价格必须&gt;0）</p>



**请求参数**:


| 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|id||path|true|integer(int64)||
|price||query|true|number||


**响应状态**:


| 状态码 | 说明 | schema |
| -------- | -------- | ----- | 
|200|OK|ResultProductSkuVO|
|400|Bad Request|ResultObject|
|401|Unauthorized|ResultObject|
|403|Forbidden|ResultObject|
|404|Not Found|ResultObject|
|405|Method Not Allowed|ResultObject|
|409|Conflict|ResultObject|
|500|Internal Server Error|ResultObject|


**响应状态码-200**:


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code|响应码|integer(int32)|integer(int32)|
|message|响应消息|string||
|data||ProductSkuVO|ProductSkuVO|
|&emsp;&emsp;id|SKU ID|integer(int64)||
|&emsp;&emsp;productId|商品ID|integer(int64)||
|&emsp;&emsp;skuName|SKU名称|string||
|&emsp;&emsp;priceStatus|定价状态,可用值:0,1|string||
|&emsp;&emsp;price|SKU销售价格|number||
|&emsp;&emsp;imageUrl|SKU图片URL|string||
|&emsp;&emsp;sortOrder|排序序号|integer(int32)||
|&emsp;&emsp;status|状态,可用值:0,1|string||
|&emsp;&emsp;skuAttrs|商品SKU属性值|array|ProductSkuAttrVO|
|&emsp;&emsp;&emsp;&emsp;attrName|属性名称|string||
|&emsp;&emsp;&emsp;&emsp;attrValue|属性值|string||
|&emsp;&emsp;&emsp;&emsp;sortOrder|排序序号|integer||
|timestamp|时间戳|integer(int64)|integer(int64)|
|success||boolean||


**响应示例**:
```javascript
{
	"code": 200,
	"message": "操作成功",
	"data": {
		"id": 0,
		"productId": 0,
		"skuName": "",
		"priceStatus": "",
		"price": 0,
		"imageUrl": "",
		"sortOrder": 0,
		"status": "",
		"skuAttrs": [
			{
				"attrName": "",
				"attrValue": "",
				"sortOrder": 0
			}
		]
	},
	"timestamp": 1700000000000,
	"success": true
}
```


**响应状态码-400**:


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code|响应码|integer(int32)|integer(int32)|
|message|响应消息|string||
|data|响应数据|object||
|timestamp|时间戳|integer(int64)|integer(int64)|
|success||boolean||


**响应示例**:
```javascript
{
	"code": 200,
	"message": "操作成功",
	"data": {},
	"timestamp": 1700000000000,
	"success": true
}
```


**响应状态码-401**:


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code|响应码|integer(int32)|integer(int32)|
|message|响应消息|string||
|data|响应数据|object||
|timestamp|时间戳|integer(int64)|integer(int64)|
|success||boolean||


**响应示例**:
```javascript
{
	"code": 200,
	"message": "操作成功",
	"data": {},
	"timestamp": 1700000000000,
	"success": true
}
```


**响应状态码-403**:


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code|响应码|integer(int32)|integer(int32)|
|message|响应消息|string||
|data|响应数据|object||
|timestamp|时间戳|integer(int64)|integer(int64)|
|success||boolean||


**响应示例**:
```javascript
{
	"code": 200,
	"message": "操作成功",
	"data": {},
	"timestamp": 1700000000000,
	"success": true
}
```


**响应状态码-404**:


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code|响应码|integer(int32)|integer(int32)|
|message|响应消息|string||
|data|响应数据|object||
|timestamp|时间戳|integer(int64)|integer(int64)|
|success||boolean||


**响应示例**:
```javascript
{
	"code": 200,
	"message": "操作成功",
	"data": {},
	"timestamp": 1700000000000,
	"success": true
}
```


**响应状态码-405**:


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code|响应码|integer(int32)|integer(int32)|
|message|响应消息|string||
|data|响应数据|object||
|timestamp|时间戳|integer(int64)|integer(int64)|
|success||boolean||


**响应示例**:
```javascript
{
	"code": 200,
	"message": "操作成功",
	"data": {},
	"timestamp": 1700000000000,
	"success": true
}
```


**响应状态码-409**:


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code|响应码|integer(int32)|integer(int32)|
|message|响应消息|string||
|data|响应数据|object||
|timestamp|时间戳|integer(int64)|integer(int64)|
|success||boolean||


**响应示例**:
```javascript
{
	"code": 200,
	"message": "操作成功",
	"data": {},
	"timestamp": 1700000000000,
	"success": true
}
```


**响应状态码-500**:


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code|响应码|integer(int32)|integer(int32)|
|message|响应消息|string||
|data|响应数据|object||
|timestamp|时间戳|integer(int64)|integer(int64)|
|success||boolean||


**响应示例**:
```javascript
{
	"code": 200,
	"message": "操作成功",
	"data": {},
	"timestamp": 1700000000000,
	"success": true
}
```


## 批量定价SKU


**接口地址**:`/code-ledger/api/skus/batch-price`


**请求方式**:`PUT`


**请求数据类型**:`application/x-www-form-urlencoded,application/json`


**响应数据类型**:`*/*`


**接口描述**:<p>批量修改多个SKU的价格</p>



**请求示例**:


```javascript
{
  "skuPrices": [
    {
      "skuId": 1,
      "price": 25
    }
  ]
}
```


**请求参数**:


| 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|skuPriceUpdateDTO|SKU批量定价请求|body|true|SkuPriceUpdateDTO|SkuPriceUpdateDTO|
|&emsp;&emsp;skuPrices|SKU价格项||true|array|SkuPriceItem|
|&emsp;&emsp;&emsp;&emsp;skuId|SKU ID||true|integer||
|&emsp;&emsp;&emsp;&emsp;price|价格||true|number||


**响应状态**:


| 状态码 | 说明 | schema |
| -------- | -------- | ----- | 
|200|OK|ResultInteger|
|400|Bad Request|ResultObject|
|401|Unauthorized|ResultObject|
|403|Forbidden|ResultObject|
|404|Not Found|ResultObject|
|405|Method Not Allowed|ResultObject|
|409|Conflict|ResultObject|
|500|Internal Server Error|ResultObject|


**响应状态码-200**:


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code|响应码|integer(int32)|integer(int32)|
|message|响应消息|string||
|data|响应数据|integer(int32)|integer(int32)|
|timestamp|时间戳|integer(int64)|integer(int64)|
|success||boolean||


**响应示例**:
```javascript
{
	"code": 200,
	"message": "操作成功",
	"data": 0,
	"timestamp": 1700000000000,
	"success": true
}
```


**响应状态码-400**:


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code|响应码|integer(int32)|integer(int32)|
|message|响应消息|string||
|data|响应数据|object||
|timestamp|时间戳|integer(int64)|integer(int64)|
|success||boolean||


**响应示例**:
```javascript
{
	"code": 200,
	"message": "操作成功",
	"data": {},
	"timestamp": 1700000000000,
	"success": true
}
```


**响应状态码-401**:


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code|响应码|integer(int32)|integer(int32)|
|message|响应消息|string||
|data|响应数据|object||
|timestamp|时间戳|integer(int64)|integer(int64)|
|success||boolean||


**响应示例**:
```javascript
{
	"code": 200,
	"message": "操作成功",
	"data": {},
	"timestamp": 1700000000000,
	"success": true
}
```


**响应状态码-403**:


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code|响应码|integer(int32)|integer(int32)|
|message|响应消息|string||
|data|响应数据|object||
|timestamp|时间戳|integer(int64)|integer(int64)|
|success||boolean||


**响应示例**:
```javascript
{
	"code": 200,
	"message": "操作成功",
	"data": {},
	"timestamp": 1700000000000,
	"success": true
}
```


**响应状态码-404**:


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code|响应码|integer(int32)|integer(int32)|
|message|响应消息|string||
|data|响应数据|object||
|timestamp|时间戳|integer(int64)|integer(int64)|
|success||boolean||


**响应示例**:
```javascript
{
	"code": 200,
	"message": "操作成功",
	"data": {},
	"timestamp": 1700000000000,
	"success": true
}
```


**响应状态码-405**:


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code|响应码|integer(int32)|integer(int32)|
|message|响应消息|string||
|data|响应数据|object||
|timestamp|时间戳|integer(int64)|integer(int64)|
|success||boolean||


**响应示例**:
```javascript
{
	"code": 200,
	"message": "操作成功",
	"data": {},
	"timestamp": 1700000000000,
	"success": true
}
```


**响应状态码-409**:


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code|响应码|integer(int32)|integer(int32)|
|message|响应消息|string||
|data|响应数据|object||
|timestamp|时间戳|integer(int64)|integer(int64)|
|success||boolean||


**响应示例**:
```javascript
{
	"code": 200,
	"message": "操作成功",
	"data": {},
	"timestamp": 1700000000000,
	"success": true
}
```


**响应状态码-500**:


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code|响应码|integer(int32)|integer(int32)|
|message|响应消息|string||
|data|响应数据|object||
|timestamp|时间戳|integer(int64)|integer(int64)|
|success||boolean||


**响应示例**:
```javascript
{
	"code": 200,
	"message": "操作成功",
	"data": {},
	"timestamp": 1700000000000,
	"success": true
}
```


## 获取SKU详情


**接口地址**:`/code-ledger/api/skus/{id}`


**请求方式**:`GET`


**请求数据类型**:`application/x-www-form-urlencoded`


**响应数据类型**:`*/*`


**接口描述**:<p>根据ID获取SKU详细信息</p>



**请求参数**:


| 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|id||path|true|integer(int64)||


**响应状态**:


| 状态码 | 说明 | schema |
| -------- | -------- | ----- | 
|200|OK|ResultProductSkuVO|
|400|Bad Request|ResultObject|
|401|Unauthorized|ResultObject|
|403|Forbidden|ResultObject|
|404|Not Found|ResultObject|
|405|Method Not Allowed|ResultObject|
|409|Conflict|ResultObject|
|500|Internal Server Error|ResultObject|


**响应状态码-200**:


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code|响应码|integer(int32)|integer(int32)|
|message|响应消息|string||
|data||ProductSkuVO|ProductSkuVO|
|&emsp;&emsp;id|SKU ID|integer(int64)||
|&emsp;&emsp;productId|商品ID|integer(int64)||
|&emsp;&emsp;skuName|SKU名称|string||
|&emsp;&emsp;priceStatus|定价状态,可用值:0,1|string||
|&emsp;&emsp;price|SKU销售价格|number||
|&emsp;&emsp;imageUrl|SKU图片URL|string||
|&emsp;&emsp;sortOrder|排序序号|integer(int32)||
|&emsp;&emsp;status|状态,可用值:0,1|string||
|&emsp;&emsp;skuAttrs|商品SKU属性值|array|ProductSkuAttrVO|
|&emsp;&emsp;&emsp;&emsp;attrName|属性名称|string||
|&emsp;&emsp;&emsp;&emsp;attrValue|属性值|string||
|&emsp;&emsp;&emsp;&emsp;sortOrder|排序序号|integer||
|timestamp|时间戳|integer(int64)|integer(int64)|
|success||boolean||


**响应示例**:
```javascript
{
	"code": 200,
	"message": "操作成功",
	"data": {
		"id": 0,
		"productId": 0,
		"skuName": "",
		"priceStatus": "",
		"price": 0,
		"imageUrl": "",
		"sortOrder": 0,
		"status": "",
		"skuAttrs": [
			{
				"attrName": "",
				"attrValue": "",
				"sortOrder": 0
			}
		]
	},
	"timestamp": 1700000000000,
	"success": true
}
```


**响应状态码-400**:


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code|响应码|integer(int32)|integer(int32)|
|message|响应消息|string||
|data|响应数据|object||
|timestamp|时间戳|integer(int64)|integer(int64)|
|success||boolean||


**响应示例**:
```javascript
{
	"code": 200,
	"message": "操作成功",
	"data": {},
	"timestamp": 1700000000000,
	"success": true
}
```


**响应状态码-401**:


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code|响应码|integer(int32)|integer(int32)|
|message|响应消息|string||
|data|响应数据|object||
|timestamp|时间戳|integer(int64)|integer(int64)|
|success||boolean||


**响应示例**:
```javascript
{
	"code": 200,
	"message": "操作成功",
	"data": {},
	"timestamp": 1700000000000,
	"success": true
}
```


**响应状态码-403**:


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code|响应码|integer(int32)|integer(int32)|
|message|响应消息|string||
|data|响应数据|object||
|timestamp|时间戳|integer(int64)|integer(int64)|
|success||boolean||


**响应示例**:
```javascript
{
	"code": 200,
	"message": "操作成功",
	"data": {},
	"timestamp": 1700000000000,
	"success": true
}
```


**响应状态码-404**:


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code|响应码|integer(int32)|integer(int32)|
|message|响应消息|string||
|data|响应数据|object||
|timestamp|时间戳|integer(int64)|integer(int64)|
|success||boolean||


**响应示例**:
```javascript
{
	"code": 200,
	"message": "操作成功",
	"data": {},
	"timestamp": 1700000000000,
	"success": true
}
```


**响应状态码-405**:


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code|响应码|integer(int32)|integer(int32)|
|message|响应消息|string||
|data|响应数据|object||
|timestamp|时间戳|integer(int64)|integer(int64)|
|success||boolean||


**响应示例**:
```javascript
{
	"code": 200,
	"message": "操作成功",
	"data": {},
	"timestamp": 1700000000000,
	"success": true
}
```


**响应状态码-409**:


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code|响应码|integer(int32)|integer(int32)|
|message|响应消息|string||
|data|响应数据|object||
|timestamp|时间戳|integer(int64)|integer(int64)|
|success||boolean||


**响应示例**:
```javascript
{
	"code": 200,
	"message": "操作成功",
	"data": {},
	"timestamp": 1700000000000,
	"success": true
}
```


**响应状态码-500**:


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code|响应码|integer(int32)|integer(int32)|
|message|响应消息|string||
|data|响应数据|object||
|timestamp|时间戳|integer(int64)|integer(int64)|
|success||boolean||


**响应示例**:
```javascript
{
	"code": 200,
	"message": "操作成功",
	"data": {},
	"timestamp": 1700000000000,
	"success": true
}
```


## 删除SKU


**接口地址**:`/code-ledger/api/skus/{id}`


**请求方式**:`DELETE`


**请求数据类型**:`application/x-www-form-urlencoded`


**响应数据类型**:`*/*`


**接口描述**:<p>删除指定SKU</p>



**请求参数**:


| 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|id||path|true|integer(int64)||


**响应状态**:


| 状态码 | 说明 | schema |
| -------- | -------- | ----- | 
|200|OK|ResultVoid|
|400|Bad Request|ResultObject|
|401|Unauthorized|ResultObject|
|403|Forbidden|ResultObject|
|404|Not Found|ResultObject|
|405|Method Not Allowed|ResultObject|
|409|Conflict|ResultObject|
|500|Internal Server Error|ResultObject|


**响应状态码-200**:


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code|响应码|integer(int32)|integer(int32)|
|message|响应消息|string||
|data|响应数据|object||
|timestamp|时间戳|integer(int64)|integer(int64)|
|success||boolean||


**响应示例**:
```javascript
{
	"code": 200,
	"message": "操作成功",
	"data": {},
	"timestamp": 1700000000000,
	"success": true
}
```


**响应状态码-400**:


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code|响应码|integer(int32)|integer(int32)|
|message|响应消息|string||
|data|响应数据|object||
|timestamp|时间戳|integer(int64)|integer(int64)|
|success||boolean||


**响应示例**:
```javascript
{
	"code": 200,
	"message": "操作成功",
	"data": {},
	"timestamp": 1700000000000,
	"success": true
}
```


**响应状态码-401**:


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code|响应码|integer(int32)|integer(int32)|
|message|响应消息|string||
|data|响应数据|object||
|timestamp|时间戳|integer(int64)|integer(int64)|
|success||boolean||


**响应示例**:
```javascript
{
	"code": 200,
	"message": "操作成功",
	"data": {},
	"timestamp": 1700000000000,
	"success": true
}
```


**响应状态码-403**:


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code|响应码|integer(int32)|integer(int32)|
|message|响应消息|string||
|data|响应数据|object||
|timestamp|时间戳|integer(int64)|integer(int64)|
|success||boolean||


**响应示例**:
```javascript
{
	"code": 200,
	"message": "操作成功",
	"data": {},
	"timestamp": 1700000000000,
	"success": true
}
```


**响应状态码-404**:


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code|响应码|integer(int32)|integer(int32)|
|message|响应消息|string||
|data|响应数据|object||
|timestamp|时间戳|integer(int64)|integer(int64)|
|success||boolean||


**响应示例**:
```javascript
{
	"code": 200,
	"message": "操作成功",
	"data": {},
	"timestamp": 1700000000000,
	"success": true
}
```


**响应状态码-405**:


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code|响应码|integer(int32)|integer(int32)|
|message|响应消息|string||
|data|响应数据|object||
|timestamp|时间戳|integer(int64)|integer(int64)|
|success||boolean||


**响应示例**:
```javascript
{
	"code": 200,
	"message": "操作成功",
	"data": {},
	"timestamp": 1700000000000,
	"success": true
}
```


**响应状态码-409**:


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code|响应码|integer(int32)|integer(int32)|
|message|响应消息|string||
|data|响应数据|object||
|timestamp|时间戳|integer(int64)|integer(int64)|
|success||boolean||


**响应示例**:
```javascript
{
	"code": 200,
	"message": "操作成功",
	"data": {},
	"timestamp": 1700000000000,
	"success": true
}
```


**响应状态码-500**:


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code|响应码|integer(int32)|integer(int32)|
|message|响应消息|string||
|data|响应数据|object||
|timestamp|时间戳|integer(int64)|integer(int64)|
|success||boolean||


**响应示例**:
```javascript
{
	"code": 200,
	"message": "操作成功",
	"data": {},
	"timestamp": 1700000000000,
	"success": true
}
```


## 获取商品SKU列表


**接口地址**:`/code-ledger/api/skus/product/{productId}`


**请求方式**:`GET`


**请求数据类型**:`application/x-www-form-urlencoded`


**响应数据类型**:`*/*`


**接口描述**:<p>获取指定商品的所有SKU（支持定价状态筛选）</p>



**请求参数**:


| 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|productId||path|true|integer(int64)||
|priceStatus|可用值:0,1|query|false|string||


**响应状态**:


| 状态码 | 说明 | schema |
| -------- | -------- | ----- | 
|200|OK|ResultListProductSkuVO|
|400|Bad Request|ResultObject|
|401|Unauthorized|ResultObject|
|403|Forbidden|ResultObject|
|404|Not Found|ResultObject|
|405|Method Not Allowed|ResultObject|
|409|Conflict|ResultObject|
|500|Internal Server Error|ResultObject|


**响应状态码-200**:


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code|响应码|integer(int32)|integer(int32)|
|message|响应消息|string||
|data|响应数据|array|ProductSkuVO|
|&emsp;&emsp;id|SKU ID|integer(int64)||
|&emsp;&emsp;productId|商品ID|integer(int64)||
|&emsp;&emsp;skuName|SKU名称|string||
|&emsp;&emsp;priceStatus|定价状态,可用值:0,1|string||
|&emsp;&emsp;price|SKU销售价格|number||
|&emsp;&emsp;imageUrl|SKU图片URL|string||
|&emsp;&emsp;sortOrder|排序序号|integer(int32)||
|&emsp;&emsp;status|状态,可用值:0,1|string||
|&emsp;&emsp;skuAttrs|商品SKU属性值|array|ProductSkuAttrVO|
|&emsp;&emsp;&emsp;&emsp;attrName|属性名称|string||
|&emsp;&emsp;&emsp;&emsp;attrValue|属性值|string||
|&emsp;&emsp;&emsp;&emsp;sortOrder|排序序号|integer||
|timestamp|时间戳|integer(int64)|integer(int64)|
|success||boolean||


**响应示例**:
```javascript
{
	"code": 200,
	"message": "操作成功",
	"data": [
		{
			"id": 0,
			"productId": 0,
			"skuName": "",
			"priceStatus": "",
			"price": 0,
			"imageUrl": "",
			"sortOrder": 0,
			"status": "",
			"skuAttrs": [
				{
					"attrName": "",
					"attrValue": "",
					"sortOrder": 0
				}
			]
		}
	],
	"timestamp": 1700000000000,
	"success": true
}
```


**响应状态码-400**:


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code|响应码|integer(int32)|integer(int32)|
|message|响应消息|string||
|data|响应数据|object||
|timestamp|时间戳|integer(int64)|integer(int64)|
|success||boolean||


**响应示例**:
```javascript
{
	"code": 200,
	"message": "操作成功",
	"data": {},
	"timestamp": 1700000000000,
	"success": true
}
```


**响应状态码-401**:


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code|响应码|integer(int32)|integer(int32)|
|message|响应消息|string||
|data|响应数据|object||
|timestamp|时间戳|integer(int64)|integer(int64)|
|success||boolean||


**响应示例**:
```javascript
{
	"code": 200,
	"message": "操作成功",
	"data": {},
	"timestamp": 1700000000000,
	"success": true
}
```


**响应状态码-403**:


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code|响应码|integer(int32)|integer(int32)|
|message|响应消息|string||
|data|响应数据|object||
|timestamp|时间戳|integer(int64)|integer(int64)|
|success||boolean||


**响应示例**:
```javascript
{
	"code": 200,
	"message": "操作成功",
	"data": {},
	"timestamp": 1700000000000,
	"success": true
}
```


**响应状态码-404**:


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code|响应码|integer(int32)|integer(int32)|
|message|响应消息|string||
|data|响应数据|object||
|timestamp|时间戳|integer(int64)|integer(int64)|
|success||boolean||


**响应示例**:
```javascript
{
	"code": 200,
	"message": "操作成功",
	"data": {},
	"timestamp": 1700000000000,
	"success": true
}
```


**响应状态码-405**:


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code|响应码|integer(int32)|integer(int32)|
|message|响应消息|string||
|data|响应数据|object||
|timestamp|时间戳|integer(int64)|integer(int64)|
|success||boolean||


**响应示例**:
```javascript
{
	"code": 200,
	"message": "操作成功",
	"data": {},
	"timestamp": 1700000000000,
	"success": true
}
```


**响应状态码-409**:


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code|响应码|integer(int32)|integer(int32)|
|message|响应消息|string||
|data|响应数据|object||
|timestamp|时间戳|integer(int64)|integer(int64)|
|success||boolean||


**响应示例**:
```javascript
{
	"code": 200,
	"message": "操作成功",
	"data": {},
	"timestamp": 1700000000000,
	"success": true
}
```


**响应状态码-500**:


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code|响应码|integer(int32)|integer(int32)|
|message|响应消息|string||
|data|响应数据|object||
|timestamp|时间戳|integer(int64)|integer(int64)|
|success||boolean||


**响应示例**:
```javascript
{
	"code": 200,
	"message": "操作成功",
	"data": {},
	"timestamp": 1700000000000,
	"success": true
}
```


## 获取未定价SKU


**接口地址**:`/code-ledger/api/skus/product/{productId}/unpriced`


**请求方式**:`GET`


**请求数据类型**:`application/x-www-form-urlencoded`


**响应数据类型**:`*/*`


**接口描述**:<p>获取商品的未定价SKU（定价管理专用）</p>



**请求参数**:


| 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|productId||path|true|integer(int64)||


**响应状态**:


| 状态码 | 说明 | schema |
| -------- | -------- | ----- | 
|200|OK|ResultListProductSkuVO|
|400|Bad Request|ResultObject|
|401|Unauthorized|ResultObject|
|403|Forbidden|ResultObject|
|404|Not Found|ResultObject|
|405|Method Not Allowed|ResultObject|
|409|Conflict|ResultObject|
|500|Internal Server Error|ResultObject|


**响应状态码-200**:


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code|响应码|integer(int32)|integer(int32)|
|message|响应消息|string||
|data|响应数据|array|ProductSkuVO|
|&emsp;&emsp;id|SKU ID|integer(int64)||
|&emsp;&emsp;productId|商品ID|integer(int64)||
|&emsp;&emsp;skuName|SKU名称|string||
|&emsp;&emsp;priceStatus|定价状态,可用值:0,1|string||
|&emsp;&emsp;price|SKU销售价格|number||
|&emsp;&emsp;imageUrl|SKU图片URL|string||
|&emsp;&emsp;sortOrder|排序序号|integer(int32)||
|&emsp;&emsp;status|状态,可用值:0,1|string||
|&emsp;&emsp;skuAttrs|商品SKU属性值|array|ProductSkuAttrVO|
|&emsp;&emsp;&emsp;&emsp;attrName|属性名称|string||
|&emsp;&emsp;&emsp;&emsp;attrValue|属性值|string||
|&emsp;&emsp;&emsp;&emsp;sortOrder|排序序号|integer||
|timestamp|时间戳|integer(int64)|integer(int64)|
|success||boolean||


**响应示例**:
```javascript
{
	"code": 200,
	"message": "操作成功",
	"data": [
		{
			"id": 0,
			"productId": 0,
			"skuName": "",
			"priceStatus": "",
			"price": 0,
			"imageUrl": "",
			"sortOrder": 0,
			"status": "",
			"skuAttrs": [
				{
					"attrName": "",
					"attrValue": "",
					"sortOrder": 0
				}
			]
		}
	],
	"timestamp": 1700000000000,
	"success": true
}
```


**响应状态码-400**:


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code|响应码|integer(int32)|integer(int32)|
|message|响应消息|string||
|data|响应数据|object||
|timestamp|时间戳|integer(int64)|integer(int64)|
|success||boolean||


**响应示例**:
```javascript
{
	"code": 200,
	"message": "操作成功",
	"data": {},
	"timestamp": 1700000000000,
	"success": true
}
```


**响应状态码-401**:


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code|响应码|integer(int32)|integer(int32)|
|message|响应消息|string||
|data|响应数据|object||
|timestamp|时间戳|integer(int64)|integer(int64)|
|success||boolean||


**响应示例**:
```javascript
{
	"code": 200,
	"message": "操作成功",
	"data": {},
	"timestamp": 1700000000000,
	"success": true
}
```


**响应状态码-403**:


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code|响应码|integer(int32)|integer(int32)|
|message|响应消息|string||
|data|响应数据|object||
|timestamp|时间戳|integer(int64)|integer(int64)|
|success||boolean||


**响应示例**:
```javascript
{
	"code": 200,
	"message": "操作成功",
	"data": {},
	"timestamp": 1700000000000,
	"success": true
}
```


**响应状态码-404**:


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code|响应码|integer(int32)|integer(int32)|
|message|响应消息|string||
|data|响应数据|object||
|timestamp|时间戳|integer(int64)|integer(int64)|
|success||boolean||


**响应示例**:
```javascript
{
	"code": 200,
	"message": "操作成功",
	"data": {},
	"timestamp": 1700000000000,
	"success": true
}
```


**响应状态码-405**:


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code|响应码|integer(int32)|integer(int32)|
|message|响应消息|string||
|data|响应数据|object||
|timestamp|时间戳|integer(int64)|integer(int64)|
|success||boolean||


**响应示例**:
```javascript
{
	"code": 200,
	"message": "操作成功",
	"data": {},
	"timestamp": 1700000000000,
	"success": true
}
```


**响应状态码-409**:


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code|响应码|integer(int32)|integer(int32)|
|message|响应消息|string||
|data|响应数据|object||
|timestamp|时间戳|integer(int64)|integer(int64)|
|success||boolean||


**响应示例**:
```javascript
{
	"code": 200,
	"message": "操作成功",
	"data": {},
	"timestamp": 1700000000000,
	"success": true
}
```


**响应状态码-500**:


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code|响应码|integer(int32)|integer(int32)|
|message|响应消息|string||
|data|响应数据|object||
|timestamp|时间戳|integer(int64)|integer(int64)|
|success||boolean||


**响应示例**:
```javascript
{
	"code": 200,
	"message": "操作成功",
	"data": {},
	"timestamp": 1700000000000,
	"success": true
}
```


## 获取已定价SKU


**接口地址**:`/code-ledger/api/skus/product/{productId}/priced`


**请求方式**:`GET`


**请求数据类型**:`application/x-www-form-urlencoded`


**响应数据类型**:`*/*`


**接口描述**:<p>获取商品的已定价SKU（业务专用）</p>



**请求参数**:


| 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|productId||path|true|integer(int64)||


**响应状态**:


| 状态码 | 说明 | schema |
| -------- | -------- | ----- | 
|200|OK|ResultListProductSkuVO|
|400|Bad Request|ResultObject|
|401|Unauthorized|ResultObject|
|403|Forbidden|ResultObject|
|404|Not Found|ResultObject|
|405|Method Not Allowed|ResultObject|
|409|Conflict|ResultObject|
|500|Internal Server Error|ResultObject|


**响应状态码-200**:


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code|响应码|integer(int32)|integer(int32)|
|message|响应消息|string||
|data|响应数据|array|ProductSkuVO|
|&emsp;&emsp;id|SKU ID|integer(int64)||
|&emsp;&emsp;productId|商品ID|integer(int64)||
|&emsp;&emsp;skuName|SKU名称|string||
|&emsp;&emsp;priceStatus|定价状态,可用值:0,1|string||
|&emsp;&emsp;price|SKU销售价格|number||
|&emsp;&emsp;imageUrl|SKU图片URL|string||
|&emsp;&emsp;sortOrder|排序序号|integer(int32)||
|&emsp;&emsp;status|状态,可用值:0,1|string||
|&emsp;&emsp;skuAttrs|商品SKU属性值|array|ProductSkuAttrVO|
|&emsp;&emsp;&emsp;&emsp;attrName|属性名称|string||
|&emsp;&emsp;&emsp;&emsp;attrValue|属性值|string||
|&emsp;&emsp;&emsp;&emsp;sortOrder|排序序号|integer||
|timestamp|时间戳|integer(int64)|integer(int64)|
|success||boolean||


**响应示例**:
```javascript
{
	"code": 200,
	"message": "操作成功",
	"data": [
		{
			"id": 0,
			"productId": 0,
			"skuName": "",
			"priceStatus": "",
			"price": 0,
			"imageUrl": "",
			"sortOrder": 0,
			"status": "",
			"skuAttrs": [
				{
					"attrName": "",
					"attrValue": "",
					"sortOrder": 0
				}
			]
		}
	],
	"timestamp": 1700000000000,
	"success": true
}
```


**响应状态码-400**:


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code|响应码|integer(int32)|integer(int32)|
|message|响应消息|string||
|data|响应数据|object||
|timestamp|时间戳|integer(int64)|integer(int64)|
|success||boolean||


**响应示例**:
```javascript
{
	"code": 200,
	"message": "操作成功",
	"data": {},
	"timestamp": 1700000000000,
	"success": true
}
```


**响应状态码-401**:


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code|响应码|integer(int32)|integer(int32)|
|message|响应消息|string||
|data|响应数据|object||
|timestamp|时间戳|integer(int64)|integer(int64)|
|success||boolean||


**响应示例**:
```javascript
{
	"code": 200,
	"message": "操作成功",
	"data": {},
	"timestamp": 1700000000000,
	"success": true
}
```


**响应状态码-403**:


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code|响应码|integer(int32)|integer(int32)|
|message|响应消息|string||
|data|响应数据|object||
|timestamp|时间戳|integer(int64)|integer(int64)|
|success||boolean||


**响应示例**:
```javascript
{
	"code": 200,
	"message": "操作成功",
	"data": {},
	"timestamp": 1700000000000,
	"success": true
}
```


**响应状态码-404**:


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code|响应码|integer(int32)|integer(int32)|
|message|响应消息|string||
|data|响应数据|object||
|timestamp|时间戳|integer(int64)|integer(int64)|
|success||boolean||


**响应示例**:
```javascript
{
	"code": 200,
	"message": "操作成功",
	"data": {},
	"timestamp": 1700000000000,
	"success": true
}
```


**响应状态码-405**:


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code|响应码|integer(int32)|integer(int32)|
|message|响应消息|string||
|data|响应数据|object||
|timestamp|时间戳|integer(int64)|integer(int64)|
|success||boolean||


**响应示例**:
```javascript
{
	"code": 200,
	"message": "操作成功",
	"data": {},
	"timestamp": 1700000000000,
	"success": true
}
```


**响应状态码-409**:


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code|响应码|integer(int32)|integer(int32)|
|message|响应消息|string||
|data|响应数据|object||
|timestamp|时间戳|integer(int64)|integer(int64)|
|success||boolean||


**响应示例**:
```javascript
{
	"code": 200,
	"message": "操作成功",
	"data": {},
	"timestamp": 1700000000000,
	"success": true
}
```


**响应状态码-500**:


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code|响应码|integer(int32)|integer(int32)|
|message|响应消息|string||
|data|响应数据|object||
|timestamp|时间戳|integer(int64)|integer(int64)|
|success||boolean||


**响应示例**:
```javascript
{
	"code": 200,
	"message": "操作成功",
	"data": {},
	"timestamp": 1700000000000,
	"success": true
}
```


# 认证管理


## 微信小程序登录


**接口地址**:`/code-ledger/api/auth/wechat-login`


**请求方式**:`POST`


**请求数据类型**:`application/x-www-form-urlencoded,application/json`


**响应数据类型**:`*/*`


**接口描述**:<p>通过微信code登录，根据返回的needSupplement和isNewUser判断是否需要补充信息或注册</p>



**请求示例**:


```javascript
{
  "code": "071Ab2Ga1n8YYJ0MJVIa1Ht9Ga1Ab2G5",
  "encryptedData": "CiyLU1Aw2KjvrjMdj8YKliAjtP4gsMZM...",
  "iv": "r7BXXKkLb8qrSNn05n0qiA==",
  "nickname": "张三",
  "avatarUrl": "https://thirdwx.qlogo.cn/..."
}
```


**请求参数**:


| 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|wechatLoginDTO|微信小程序登录请求|body|true|WechatLoginDTO|WechatLoginDTO|
|&emsp;&emsp;code|微信登录凭证code||true|string||
|&emsp;&emsp;encryptedData|加密数据||false|string||
|&emsp;&emsp;iv|加密算法的初始向量||false|string||
|&emsp;&emsp;nickname|微信昵称||false|string||
|&emsp;&emsp;avatarUrl|微信头像URL||false|string||


**响应状态**:


| 状态码 | 说明 | schema |
| -------- | -------- | ----- | 
|200|OK|ResultLoginVO|
|400|Bad Request|ResultObject|
|401|Unauthorized|ResultObject|
|403|Forbidden|ResultObject|
|404|Not Found|ResultObject|
|405|Method Not Allowed|ResultObject|
|409|Conflict|ResultObject|
|500|Internal Server Error|ResultObject|


**响应状态码-200**:


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code|响应码|integer(int32)|integer(int32)|
|message|响应消息|string||
|data||LoginVO|LoginVO|
|&emsp;&emsp;token|访问令牌|string||
|&emsp;&emsp;userInfo|用户信息|UserInfoVO|UserInfoVO|
|&emsp;&emsp;&emsp;&emsp;id|用户ID|integer||
|&emsp;&emsp;&emsp;&emsp;username|用户名|string||
|&emsp;&emsp;&emsp;&emsp;phone|手机号|string||
|&emsp;&emsp;&emsp;&emsp;role|角色|integer||
|&emsp;&emsp;&emsp;&emsp;roleDesc|角色描述|string||
|&emsp;&emsp;&emsp;&emsp;wxNickname|微信昵称|string||
|&emsp;&emsp;&emsp;&emsp;wxAvatarUrl|微信头像URL|string||
|&emsp;&emsp;needSupplement|是否需要补充信息|boolean||
|&emsp;&emsp;isNewUser|是否为新用户|boolean||
|&emsp;&emsp;tempOpenid|临时OpenID|string||
|&emsp;&emsp;expireTime|Token过期时间|string(date-time)||
|timestamp|时间戳|integer(int64)|integer(int64)|
|success||boolean||


**响应示例**:
```javascript
{
	"code": 200,
	"message": "操作成功",
	"data": {
		"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
		"userInfo": {
			"id": 1,
			"username": "admin",
			"phone": "13800138000",
			"role": 0,
			"roleDesc": "普通用户",
			"wxNickname": "张三",
			"wxAvatarUrl": "https://thirdwx.qlogo.cn/..."
		},
		"needSupplement": false,
		"isNewUser": false,
		"tempOpenid": "oUpF8uMuAJO_M2pxb1Q9zNjWeS6o",
		"expireTime": ""
	},
	"timestamp": 1700000000000,
	"success": true
}
```


**响应状态码-400**:


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code|响应码|integer(int32)|integer(int32)|
|message|响应消息|string||
|data|响应数据|object||
|timestamp|时间戳|integer(int64)|integer(int64)|
|success||boolean||


**响应示例**:
```javascript
{
	"code": 200,
	"message": "操作成功",
	"data": {},
	"timestamp": 1700000000000,
	"success": true
}
```


**响应状态码-401**:


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code|响应码|integer(int32)|integer(int32)|
|message|响应消息|string||
|data|响应数据|object||
|timestamp|时间戳|integer(int64)|integer(int64)|
|success||boolean||


**响应示例**:
```javascript
{
	"code": 200,
	"message": "操作成功",
	"data": {},
	"timestamp": 1700000000000,
	"success": true
}
```


**响应状态码-403**:


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code|响应码|integer(int32)|integer(int32)|
|message|响应消息|string||
|data|响应数据|object||
|timestamp|时间戳|integer(int64)|integer(int64)|
|success||boolean||


**响应示例**:
```javascript
{
	"code": 200,
	"message": "操作成功",
	"data": {},
	"timestamp": 1700000000000,
	"success": true
}
```


**响应状态码-404**:


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code|响应码|integer(int32)|integer(int32)|
|message|响应消息|string||
|data|响应数据|object||
|timestamp|时间戳|integer(int64)|integer(int64)|
|success||boolean||


**响应示例**:
```javascript
{
	"code": 200,
	"message": "操作成功",
	"data": {},
	"timestamp": 1700000000000,
	"success": true
}
```


**响应状态码-405**:


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code|响应码|integer(int32)|integer(int32)|
|message|响应消息|string||
|data|响应数据|object||
|timestamp|时间戳|integer(int64)|integer(int64)|
|success||boolean||


**响应示例**:
```javascript
{
	"code": 200,
	"message": "操作成功",
	"data": {},
	"timestamp": 1700000000000,
	"success": true
}
```


**响应状态码-409**:


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code|响应码|integer(int32)|integer(int32)|
|message|响应消息|string||
|data|响应数据|object||
|timestamp|时间戳|integer(int64)|integer(int64)|
|success||boolean||


**响应示例**:
```javascript
{
	"code": 200,
	"message": "操作成功",
	"data": {},
	"timestamp": 1700000000000,
	"success": true
}
```


**响应状态码-500**:


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code|响应码|integer(int32)|integer(int32)|
|message|响应消息|string||
|data|响应数据|object||
|timestamp|时间戳|integer(int64)|integer(int64)|
|success||boolean||


**响应示例**:
```javascript
{
	"code": 200,
	"message": "操作成功",
	"data": {},
	"timestamp": 1700000000000,
	"success": true
}
```


## 补充用户信息


**接口地址**:`/code-ledger/api/auth/supplement-info`


**请求方式**:`POST`


**请求数据类型**:`application/x-www-form-urlencoded,application/json`


**响应数据类型**:`*/*`


**接口描述**:<p>已存在用户补充手机号等信息</p>



**请求示例**:


```javascript
{
  "openid": "oUpF8uMuAJO_M2pxb1Q9zNjWeS6o",
  "phone": "13800138000",
  "nickname": "张三",
  "avatarUrl": "https://thirdwx.qlogo.cn/...",
  "username": "zhangsan"
}
```


**请求参数**:


| 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|supplementUserInfoDTO|补充用户信息请求|body|true|SupplementUserInfoDTO|SupplementUserInfoDTO|
|&emsp;&emsp;openid|微信OpenID||true|string||
|&emsp;&emsp;phone|手机号||true|string||
|&emsp;&emsp;nickname|微信昵称||false|string||
|&emsp;&emsp;avatarUrl|微信头像URL||false|string||
|&emsp;&emsp;username|用户名||false|string||


**响应状态**:


| 状态码 | 说明 | schema |
| -------- | -------- | ----- | 
|200|OK|ResultLoginVO|
|400|Bad Request|ResultObject|
|401|Unauthorized|ResultObject|
|403|Forbidden|ResultObject|
|404|Not Found|ResultObject|
|405|Method Not Allowed|ResultObject|
|409|Conflict|ResultObject|
|500|Internal Server Error|ResultObject|


**响应状态码-200**:


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code|响应码|integer(int32)|integer(int32)|
|message|响应消息|string||
|data||LoginVO|LoginVO|
|&emsp;&emsp;token|访问令牌|string||
|&emsp;&emsp;userInfo|用户信息|UserInfoVO|UserInfoVO|
|&emsp;&emsp;&emsp;&emsp;id|用户ID|integer||
|&emsp;&emsp;&emsp;&emsp;username|用户名|string||
|&emsp;&emsp;&emsp;&emsp;phone|手机号|string||
|&emsp;&emsp;&emsp;&emsp;role|角色|integer||
|&emsp;&emsp;&emsp;&emsp;roleDesc|角色描述|string||
|&emsp;&emsp;&emsp;&emsp;wxNickname|微信昵称|string||
|&emsp;&emsp;&emsp;&emsp;wxAvatarUrl|微信头像URL|string||
|&emsp;&emsp;needSupplement|是否需要补充信息|boolean||
|&emsp;&emsp;isNewUser|是否为新用户|boolean||
|&emsp;&emsp;tempOpenid|临时OpenID|string||
|&emsp;&emsp;expireTime|Token过期时间|string(date-time)||
|timestamp|时间戳|integer(int64)|integer(int64)|
|success||boolean||


**响应示例**:
```javascript
{
	"code": 200,
	"message": "操作成功",
	"data": {
		"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
		"userInfo": {
			"id": 1,
			"username": "admin",
			"phone": "13800138000",
			"role": 0,
			"roleDesc": "普通用户",
			"wxNickname": "张三",
			"wxAvatarUrl": "https://thirdwx.qlogo.cn/..."
		},
		"needSupplement": false,
		"isNewUser": false,
		"tempOpenid": "oUpF8uMuAJO_M2pxb1Q9zNjWeS6o",
		"expireTime": ""
	},
	"timestamp": 1700000000000,
	"success": true
}
```


**响应状态码-400**:


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code|响应码|integer(int32)|integer(int32)|
|message|响应消息|string||
|data|响应数据|object||
|timestamp|时间戳|integer(int64)|integer(int64)|
|success||boolean||


**响应示例**:
```javascript
{
	"code": 200,
	"message": "操作成功",
	"data": {},
	"timestamp": 1700000000000,
	"success": true
}
```


**响应状态码-401**:


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code|响应码|integer(int32)|integer(int32)|
|message|响应消息|string||
|data|响应数据|object||
|timestamp|时间戳|integer(int64)|integer(int64)|
|success||boolean||


**响应示例**:
```javascript
{
	"code": 200,
	"message": "操作成功",
	"data": {},
	"timestamp": 1700000000000,
	"success": true
}
```


**响应状态码-403**:


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code|响应码|integer(int32)|integer(int32)|
|message|响应消息|string||
|data|响应数据|object||
|timestamp|时间戳|integer(int64)|integer(int64)|
|success||boolean||


**响应示例**:
```javascript
{
	"code": 200,
	"message": "操作成功",
	"data": {},
	"timestamp": 1700000000000,
	"success": true
}
```


**响应状态码-404**:


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code|响应码|integer(int32)|integer(int32)|
|message|响应消息|string||
|data|响应数据|object||
|timestamp|时间戳|integer(int64)|integer(int64)|
|success||boolean||


**响应示例**:
```javascript
{
	"code": 200,
	"message": "操作成功",
	"data": {},
	"timestamp": 1700000000000,
	"success": true
}
```


**响应状态码-405**:


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code|响应码|integer(int32)|integer(int32)|
|message|响应消息|string||
|data|响应数据|object||
|timestamp|时间戳|integer(int64)|integer(int64)|
|success||boolean||


**响应示例**:
```javascript
{
	"code": 200,
	"message": "操作成功",
	"data": {},
	"timestamp": 1700000000000,
	"success": true
}
```


**响应状态码-409**:


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code|响应码|integer(int32)|integer(int32)|
|message|响应消息|string||
|data|响应数据|object||
|timestamp|时间戳|integer(int64)|integer(int64)|
|success||boolean||


**响应示例**:
```javascript
{
	"code": 200,
	"message": "操作成功",
	"data": {},
	"timestamp": 1700000000000,
	"success": true
}
```


**响应状态码-500**:


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code|响应码|integer(int32)|integer(int32)|
|message|响应消息|string||
|data|响应数据|object||
|timestamp|时间戳|integer(int64)|integer(int64)|
|success||boolean||


**响应示例**:
```javascript
{
	"code": 200,
	"message": "操作成功",
	"data": {},
	"timestamp": 1700000000000,
	"success": true
}
```


## 注册新用户


**接口地址**:`/code-ledger/api/auth/register`


**请求方式**:`POST`


**请求数据类型**:`application/x-www-form-urlencoded,application/json`


**响应数据类型**:`*/*`


**接口描述**:<p>新用户注册并补充信息</p>



**请求示例**:


```javascript
{
  "openid": "oUpF8uMuAJO_M2pxb1Q9zNjWeS6o",
  "phone": "13800138000",
  "nickname": "张三",
  "avatarUrl": "https://thirdwx.qlogo.cn/...",
  "username": "zhangsan"
}
```


**请求参数**:


| 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|supplementUserInfoDTO|补充用户信息请求|body|true|SupplementUserInfoDTO|SupplementUserInfoDTO|
|&emsp;&emsp;openid|微信OpenID||true|string||
|&emsp;&emsp;phone|手机号||true|string||
|&emsp;&emsp;nickname|微信昵称||false|string||
|&emsp;&emsp;avatarUrl|微信头像URL||false|string||
|&emsp;&emsp;username|用户名||false|string||


**响应状态**:


| 状态码 | 说明 | schema |
| -------- | -------- | ----- | 
|200|OK|ResultLoginVO|
|400|Bad Request|ResultObject|
|401|Unauthorized|ResultObject|
|403|Forbidden|ResultObject|
|404|Not Found|ResultObject|
|405|Method Not Allowed|ResultObject|
|409|Conflict|ResultObject|
|500|Internal Server Error|ResultObject|


**响应状态码-200**:


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code|响应码|integer(int32)|integer(int32)|
|message|响应消息|string||
|data||LoginVO|LoginVO|
|&emsp;&emsp;token|访问令牌|string||
|&emsp;&emsp;userInfo|用户信息|UserInfoVO|UserInfoVO|
|&emsp;&emsp;&emsp;&emsp;id|用户ID|integer||
|&emsp;&emsp;&emsp;&emsp;username|用户名|string||
|&emsp;&emsp;&emsp;&emsp;phone|手机号|string||
|&emsp;&emsp;&emsp;&emsp;role|角色|integer||
|&emsp;&emsp;&emsp;&emsp;roleDesc|角色描述|string||
|&emsp;&emsp;&emsp;&emsp;wxNickname|微信昵称|string||
|&emsp;&emsp;&emsp;&emsp;wxAvatarUrl|微信头像URL|string||
|&emsp;&emsp;needSupplement|是否需要补充信息|boolean||
|&emsp;&emsp;isNewUser|是否为新用户|boolean||
|&emsp;&emsp;tempOpenid|临时OpenID|string||
|&emsp;&emsp;expireTime|Token过期时间|string(date-time)||
|timestamp|时间戳|integer(int64)|integer(int64)|
|success||boolean||


**响应示例**:
```javascript
{
	"code": 200,
	"message": "操作成功",
	"data": {
		"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
		"userInfo": {
			"id": 1,
			"username": "admin",
			"phone": "13800138000",
			"role": 0,
			"roleDesc": "普通用户",
			"wxNickname": "张三",
			"wxAvatarUrl": "https://thirdwx.qlogo.cn/..."
		},
		"needSupplement": false,
		"isNewUser": false,
		"tempOpenid": "oUpF8uMuAJO_M2pxb1Q9zNjWeS6o",
		"expireTime": ""
	},
	"timestamp": 1700000000000,
	"success": true
}
```


**响应状态码-400**:


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code|响应码|integer(int32)|integer(int32)|
|message|响应消息|string||
|data|响应数据|object||
|timestamp|时间戳|integer(int64)|integer(int64)|
|success||boolean||


**响应示例**:
```javascript
{
	"code": 200,
	"message": "操作成功",
	"data": {},
	"timestamp": 1700000000000,
	"success": true
}
```


**响应状态码-401**:


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code|响应码|integer(int32)|integer(int32)|
|message|响应消息|string||
|data|响应数据|object||
|timestamp|时间戳|integer(int64)|integer(int64)|
|success||boolean||


**响应示例**:
```javascript
{
	"code": 200,
	"message": "操作成功",
	"data": {},
	"timestamp": 1700000000000,
	"success": true
}
```


**响应状态码-403**:


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code|响应码|integer(int32)|integer(int32)|
|message|响应消息|string||
|data|响应数据|object||
|timestamp|时间戳|integer(int64)|integer(int64)|
|success||boolean||


**响应示例**:
```javascript
{
	"code": 200,
	"message": "操作成功",
	"data": {},
	"timestamp": 1700000000000,
	"success": true
}
```


**响应状态码-404**:


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code|响应码|integer(int32)|integer(int32)|
|message|响应消息|string||
|data|响应数据|object||
|timestamp|时间戳|integer(int64)|integer(int64)|
|success||boolean||


**响应示例**:
```javascript
{
	"code": 200,
	"message": "操作成功",
	"data": {},
	"timestamp": 1700000000000,
	"success": true
}
```


**响应状态码-405**:


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code|响应码|integer(int32)|integer(int32)|
|message|响应消息|string||
|data|响应数据|object||
|timestamp|时间戳|integer(int64)|integer(int64)|
|success||boolean||


**响应示例**:
```javascript
{
	"code": 200,
	"message": "操作成功",
	"data": {},
	"timestamp": 1700000000000,
	"success": true
}
```


**响应状态码-409**:


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code|响应码|integer(int32)|integer(int32)|
|message|响应消息|string||
|data|响应数据|object||
|timestamp|时间戳|integer(int64)|integer(int64)|
|success||boolean||


**响应示例**:
```javascript
{
	"code": 200,
	"message": "操作成功",
	"data": {},
	"timestamp": 1700000000000,
	"success": true
}
```


**响应状态码-500**:


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code|响应码|integer(int32)|integer(int32)|
|message|响应消息|string||
|data|响应数据|object||
|timestamp|时间戳|integer(int64)|integer(int64)|
|success||boolean||


**响应示例**:
```javascript
{
	"code": 200,
	"message": "操作成功",
	"data": {},
	"timestamp": 1700000000000,
	"success": true
}
```


## 登出


**接口地址**:`/code-ledger/api/auth/logout`


**请求方式**:`POST`


**请求数据类型**:`application/x-www-form-urlencoded`


**响应数据类型**:`*/*`


**接口描述**:<p>退出登录，清除Token</p>



**请求参数**:


| 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|Authorization||header|false|string||


**响应状态**:


| 状态码 | 说明 | schema |
| -------- | -------- | ----- | 
|200|OK|ResultVoid|
|400|Bad Request|ResultObject|
|401|Unauthorized|ResultObject|
|403|Forbidden|ResultObject|
|404|Not Found|ResultObject|
|405|Method Not Allowed|ResultObject|
|409|Conflict|ResultObject|
|500|Internal Server Error|ResultObject|


**响应状态码-200**:


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code|响应码|integer(int32)|integer(int32)|
|message|响应消息|string||
|data|响应数据|object||
|timestamp|时间戳|integer(int64)|integer(int64)|
|success||boolean||


**响应示例**:
```javascript
{
	"code": 200,
	"message": "操作成功",
	"data": {},
	"timestamp": 1700000000000,
	"success": true
}
```


**响应状态码-400**:


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code|响应码|integer(int32)|integer(int32)|
|message|响应消息|string||
|data|响应数据|object||
|timestamp|时间戳|integer(int64)|integer(int64)|
|success||boolean||


**响应示例**:
```javascript
{
	"code": 200,
	"message": "操作成功",
	"data": {},
	"timestamp": 1700000000000,
	"success": true
}
```


**响应状态码-401**:


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code|响应码|integer(int32)|integer(int32)|
|message|响应消息|string||
|data|响应数据|object||
|timestamp|时间戳|integer(int64)|integer(int64)|
|success||boolean||


**响应示例**:
```javascript
{
	"code": 200,
	"message": "操作成功",
	"data": {},
	"timestamp": 1700000000000,
	"success": true
}
```


**响应状态码-403**:


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code|响应码|integer(int32)|integer(int32)|
|message|响应消息|string||
|data|响应数据|object||
|timestamp|时间戳|integer(int64)|integer(int64)|
|success||boolean||


**响应示例**:
```javascript
{
	"code": 200,
	"message": "操作成功",
	"data": {},
	"timestamp": 1700000000000,
	"success": true
}
```


**响应状态码-404**:


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code|响应码|integer(int32)|integer(int32)|
|message|响应消息|string||
|data|响应数据|object||
|timestamp|时间戳|integer(int64)|integer(int64)|
|success||boolean||


**响应示例**:
```javascript
{
	"code": 200,
	"message": "操作成功",
	"data": {},
	"timestamp": 1700000000000,
	"success": true
}
```


**响应状态码-405**:


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code|响应码|integer(int32)|integer(int32)|
|message|响应消息|string||
|data|响应数据|object||
|timestamp|时间戳|integer(int64)|integer(int64)|
|success||boolean||


**响应示例**:
```javascript
{
	"code": 200,
	"message": "操作成功",
	"data": {},
	"timestamp": 1700000000000,
	"success": true
}
```


**响应状态码-409**:


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code|响应码|integer(int32)|integer(int32)|
|message|响应消息|string||
|data|响应数据|object||
|timestamp|时间戳|integer(int64)|integer(int64)|
|success||boolean||


**响应示例**:
```javascript
{
	"code": 200,
	"message": "操作成功",
	"data": {},
	"timestamp": 1700000000000,
	"success": true
}
```


**响应状态码-500**:


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code|响应码|integer(int32)|integer(int32)|
|message|响应消息|string||
|data|响应数据|object||
|timestamp|时间戳|integer(int64)|integer(int64)|
|success||boolean||


**响应示例**:
```javascript
{
	"code": 200,
	"message": "操作成功",
	"data": {},
	"timestamp": 1700000000000,
	"success": true
}
```


## 手机号密码登录


**接口地址**:`/code-ledger/api/auth/login`


**请求方式**:`POST`


**请求数据类型**:`application/x-www-form-urlencoded,application/json`


**响应数据类型**:`*/*`


**接口描述**:<p>使用手机号和密码登录（管理后台）</p>



**请求示例**:


```javascript
{
  "phone": "13800138000",
  "password": "admin123"
}
```


**请求参数**:


| 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|passwordLoginDTO|手机号密码登录请求|body|true|PasswordLoginDTO|PasswordLoginDTO|
|&emsp;&emsp;phone|手机号||true|string||
|&emsp;&emsp;password|密码||true|string||


**响应状态**:


| 状态码 | 说明 | schema |
| -------- | -------- | ----- | 
|200|OK|ResultLoginVO|
|400|Bad Request|ResultObject|
|401|Unauthorized|ResultObject|
|403|Forbidden|ResultObject|
|404|Not Found|ResultObject|
|405|Method Not Allowed|ResultObject|
|409|Conflict|ResultObject|
|500|Internal Server Error|ResultObject|


**响应状态码-200**:


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code|响应码|integer(int32)|integer(int32)|
|message|响应消息|string||
|data||LoginVO|LoginVO|
|&emsp;&emsp;token|访问令牌|string||
|&emsp;&emsp;userInfo|用户信息|UserInfoVO|UserInfoVO|
|&emsp;&emsp;&emsp;&emsp;id|用户ID|integer||
|&emsp;&emsp;&emsp;&emsp;username|用户名|string||
|&emsp;&emsp;&emsp;&emsp;phone|手机号|string||
|&emsp;&emsp;&emsp;&emsp;role|角色|integer||
|&emsp;&emsp;&emsp;&emsp;roleDesc|角色描述|string||
|&emsp;&emsp;&emsp;&emsp;wxNickname|微信昵称|string||
|&emsp;&emsp;&emsp;&emsp;wxAvatarUrl|微信头像URL|string||
|&emsp;&emsp;needSupplement|是否需要补充信息|boolean||
|&emsp;&emsp;isNewUser|是否为新用户|boolean||
|&emsp;&emsp;tempOpenid|临时OpenID|string||
|&emsp;&emsp;expireTime|Token过期时间|string(date-time)||
|timestamp|时间戳|integer(int64)|integer(int64)|
|success||boolean||


**响应示例**:
```javascript
{
	"code": 200,
	"message": "操作成功",
	"data": {
		"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
		"userInfo": {
			"id": 1,
			"username": "admin",
			"phone": "13800138000",
			"role": 0,
			"roleDesc": "普通用户",
			"wxNickname": "张三",
			"wxAvatarUrl": "https://thirdwx.qlogo.cn/..."
		},
		"needSupplement": false,
		"isNewUser": false,
		"tempOpenid": "oUpF8uMuAJO_M2pxb1Q9zNjWeS6o",
		"expireTime": ""
	},
	"timestamp": 1700000000000,
	"success": true
}
```


**响应状态码-400**:


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code|响应码|integer(int32)|integer(int32)|
|message|响应消息|string||
|data|响应数据|object||
|timestamp|时间戳|integer(int64)|integer(int64)|
|success||boolean||


**响应示例**:
```javascript
{
	"code": 200,
	"message": "操作成功",
	"data": {},
	"timestamp": 1700000000000,
	"success": true
}
```


**响应状态码-401**:


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code|响应码|integer(int32)|integer(int32)|
|message|响应消息|string||
|data|响应数据|object||
|timestamp|时间戳|integer(int64)|integer(int64)|
|success||boolean||


**响应示例**:
```javascript
{
	"code": 200,
	"message": "操作成功",
	"data": {},
	"timestamp": 1700000000000,
	"success": true
}
```


**响应状态码-403**:


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code|响应码|integer(int32)|integer(int32)|
|message|响应消息|string||
|data|响应数据|object||
|timestamp|时间戳|integer(int64)|integer(int64)|
|success||boolean||


**响应示例**:
```javascript
{
	"code": 200,
	"message": "操作成功",
	"data": {},
	"timestamp": 1700000000000,
	"success": true
}
```


**响应状态码-404**:


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code|响应码|integer(int32)|integer(int32)|
|message|响应消息|string||
|data|响应数据|object||
|timestamp|时间戳|integer(int64)|integer(int64)|
|success||boolean||


**响应示例**:
```javascript
{
	"code": 200,
	"message": "操作成功",
	"data": {},
	"timestamp": 1700000000000,
	"success": true
}
```


**响应状态码-405**:


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code|响应码|integer(int32)|integer(int32)|
|message|响应消息|string||
|data|响应数据|object||
|timestamp|时间戳|integer(int64)|integer(int64)|
|success||boolean||


**响应示例**:
```javascript
{
	"code": 200,
	"message": "操作成功",
	"data": {},
	"timestamp": 1700000000000,
	"success": true
}
```


**响应状态码-409**:


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code|响应码|integer(int32)|integer(int32)|
|message|响应消息|string||
|data|响应数据|object||
|timestamp|时间戳|integer(int64)|integer(int64)|
|success||boolean||


**响应示例**:
```javascript
{
	"code": 200,
	"message": "操作成功",
	"data": {},
	"timestamp": 1700000000000,
	"success": true
}
```


**响应状态码-500**:


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code|响应码|integer(int32)|integer(int32)|
|message|响应消息|string||
|data|响应数据|object||
|timestamp|时间戳|integer(int64)|integer(int64)|
|success||boolean||


**响应示例**:
```javascript
{
	"code": 200,
	"message": "操作成功",
	"data": {},
	"timestamp": 1700000000000,
	"success": true
}
```


## 获取当前用户信息


**接口地址**:`/code-ledger/api/auth/current-user`


**请求方式**:`GET`


**请求数据类型**:`application/x-www-form-urlencoded`


**响应数据类型**:`*/*`


**接口描述**:<p>根据Token获取当前登录用户信息</p>



**请求参数**:


| 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|Authorization||header|true|string||


**响应状态**:


| 状态码 | 说明 | schema |
| -------- | -------- | ----- | 
|200|OK|ResultUserInfoVO|
|400|Bad Request|ResultObject|
|401|Unauthorized|ResultObject|
|403|Forbidden|ResultObject|
|404|Not Found|ResultObject|
|405|Method Not Allowed|ResultObject|
|409|Conflict|ResultObject|
|500|Internal Server Error|ResultObject|


**响应状态码-200**:


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code|响应码|integer(int32)|integer(int32)|
|message|响应消息|string||
|data||UserInfoVO|UserInfoVO|
|&emsp;&emsp;id|用户ID|integer(int64)||
|&emsp;&emsp;username|用户名|string||
|&emsp;&emsp;phone|手机号|string||
|&emsp;&emsp;role|角色|integer(int32)||
|&emsp;&emsp;roleDesc|角色描述|string||
|&emsp;&emsp;wxNickname|微信昵称|string||
|&emsp;&emsp;wxAvatarUrl|微信头像URL|string||
|timestamp|时间戳|integer(int64)|integer(int64)|
|success||boolean||


**响应示例**:
```javascript
{
	"code": 200,
	"message": "操作成功",
	"data": {
		"id": 1,
		"username": "admin",
		"phone": "13800138000",
		"role": 0,
		"roleDesc": "普通用户",
		"wxNickname": "张三",
		"wxAvatarUrl": "https://thirdwx.qlogo.cn/..."
	},
	"timestamp": 1700000000000,
	"success": true
}
```


**响应状态码-400**:


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code|响应码|integer(int32)|integer(int32)|
|message|响应消息|string||
|data|响应数据|object||
|timestamp|时间戳|integer(int64)|integer(int64)|
|success||boolean||


**响应示例**:
```javascript
{
	"code": 200,
	"message": "操作成功",
	"data": {},
	"timestamp": 1700000000000,
	"success": true
}
```


**响应状态码-401**:


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code|响应码|integer(int32)|integer(int32)|
|message|响应消息|string||
|data|响应数据|object||
|timestamp|时间戳|integer(int64)|integer(int64)|
|success||boolean||


**响应示例**:
```javascript
{
	"code": 200,
	"message": "操作成功",
	"data": {},
	"timestamp": 1700000000000,
	"success": true
}
```


**响应状态码-403**:


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code|响应码|integer(int32)|integer(int32)|
|message|响应消息|string||
|data|响应数据|object||
|timestamp|时间戳|integer(int64)|integer(int64)|
|success||boolean||


**响应示例**:
```javascript
{
	"code": 200,
	"message": "操作成功",
	"data": {},
	"timestamp": 1700000000000,
	"success": true
}
```


**响应状态码-404**:


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code|响应码|integer(int32)|integer(int32)|
|message|响应消息|string||
|data|响应数据|object||
|timestamp|时间戳|integer(int64)|integer(int64)|
|success||boolean||


**响应示例**:
```javascript
{
	"code": 200,
	"message": "操作成功",
	"data": {},
	"timestamp": 1700000000000,
	"success": true
}
```


**响应状态码-405**:


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code|响应码|integer(int32)|integer(int32)|
|message|响应消息|string||
|data|响应数据|object||
|timestamp|时间戳|integer(int64)|integer(int64)|
|success||boolean||


**响应示例**:
```javascript
{
	"code": 200,
	"message": "操作成功",
	"data": {},
	"timestamp": 1700000000000,
	"success": true
}
```


**响应状态码-409**:


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code|响应码|integer(int32)|integer(int32)|
|message|响应消息|string||
|data|响应数据|object||
|timestamp|时间戳|integer(int64)|integer(int64)|
|success||boolean||


**响应示例**:
```javascript
{
	"code": 200,
	"message": "操作成功",
	"data": {},
	"timestamp": 1700000000000,
	"success": true
}
```


**响应状态码-500**:


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code|响应码|integer(int32)|integer(int32)|
|message|响应消息|string||
|data|响应数据|object||
|timestamp|时间戳|integer(int64)|integer(int64)|
|success||boolean||


**响应示例**:
```javascript
{
	"code": 200,
	"message": "操作成功",
	"data": {},
	"timestamp": 1700000000000,
	"success": true
}
```
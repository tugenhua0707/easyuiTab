
### easyui 动态添加tab
####  HTML使用方式如下代码:
    <div id="tabContent1" style="display: none;"><div>adsasddasdasadsadsads</div></div>
    <div id="tabContent2" style="display: none;"><div>啊啊啊啊所大多所多撒奥多所无</div></div>
    <div id="tabContent3" style="display: none;"><div>adsasdqweqweqwwrrdfggffggf</div></div>
    <div style="margin-bottom:10px" id='testId'>
      <a href="#" class="easyui-linkbutton J_Tabs" data-title='2015测试' data-value='1'>2015</a>
      <a href="#" class="easyui-linkbutton J_Tabs" data-title='2016测试' data-value='2'>2016</a>
      <a href="#" class="easyui-linkbutton J_Tabs" data-title='2017测试' data-value='3'>2017</a>
    </div>
    <div id="containerId" class="easyui-tabs hidden" style="width:400px;height:250px;"></div>
#### javascript调用方式如下：
#### 外部点击调用 
    $("#testId").on('click', '.J_Tabs', function(){
      var title = $(this).attr('data-title');
      var value = $(this).attr('data-value');
      var content = $('#tabContent'+value).html();
      new AddTabs({
        title: title,
        content: content,
        container: '#containerId'
      });
    });
#### 内部调用 (已封装点击事件)
    new AddTabs({
      tabItem: '.J_Tabs',
      container: '#containerId',
      closedItemCallBack: function(title, index, len) {
        console.log(title);
        console.log(index);
        console.log(len)
      }
    });
<p>如上调用即可初始化。</p>
<h3>Javascript 相对应的API如下：</h3>

####  组件API
|      属性      |             说明                               |     类型        |     默认值     |
| --------------|:--------------------------------------------:  |   :-----------:| :-------------:|
|   container   |  tab项的容器[必须的参数]                          | [String]      |  ''             |
|   title       |  tab某项的标题(可选)                             | [String]       |  ''            |
|   content    |   tab项需要显示的内容(可选)                        | [String]       |  ''            |
|   tabItem    |  tab的某一项传class                               | String         |  ''          |

####  回调方法
|     方法名           |         说明         |     返回参数                                           | 
| --------------------|:-------------------------:  |:--------------------------------------------: |
| closedItemCallBack  |  关闭tan某一项的回调          | title(被关闭标题), index(被关闭的索引), length(剩下多个个tab项标签) | 

### 页面查看效果 预览如下地址
<p><a href="https://tugenhua0707.github.io/easyuiTab/index.html" target="_blank">https://tugenhua0707.github.io/easyuiTab/index.html</a></p>
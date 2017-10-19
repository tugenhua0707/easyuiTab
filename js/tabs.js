
/*
 * easyui 动态增加tab项
*/
function AddTabs(cfg) {

  /*
    tab点击的某一项，支持传 tabItem 配置项，如果有该项 代码内部处理点击事件
    // 比如如下html代码：
    <a href="#" class="easyui-linkbutton J_Tabs" data-title='2015测试' data-value='1'>2015</a>
    <a href="#" class="easyui-linkbutton J_Tabs" data-title='2016测试' data-value='2'>2016</a>
    <a href="#" class="easyui-linkbutton J_Tabs" data-title='2017测试' data-value='3'>2017</a>
    注意： 内部点击 需要传入 data-title 和 data-value 
    1. data-title 是指tab项的标题。
    2. data-value="1" 是指tab项内容的索引 比如 tabContent1；那么在页面上会有 id为 tabContent1，那么我会根据该id获取所有的html
    动态的渲染内容。
   */ 

  // tab需要点击的某一项
  this.tabItem = cfg.tabItem || null;

  // tab 某一项的标题
  this.title = cfg.title || '';

  // tab某一项需要的显示的内容
  this.content = cfg.content || '';

  // tab项的容器
  this.container = cfg.container;

  // 关闭一项的回调
  this.closedItemCallBack = cfg.closedItemCallBack || null;

  if (!cfg.container) {
    throw new Error('tab项的容器不能为空');
    return;
  }
  if (this.tabItem) {
    this.bindEnv();
  } else {
    if (!cfg.title) {
      throw new Error('tab项的标题不能为空');
      return;
    }
    if (!cfg.content) {
      throw new Error('tab项的内容不能为空');
      return;
    }
    var container = $(this.container);
    var title = this.title;
    var content = this.content;
    this.addTabs(title, content, container);
  }
}

AddTabs.prototype = {
  addTabs: function(title, content, container) {
    var self = this;
    if ($(container).tabs('exists', title)) {
      $(container).tabs('select', title);
    } else {
      $(container).removeClass('hidden');
      $(container).tabs({
        onAdd: function() {
          var $this = $(this);
          console.log($this)
          if($this.find('.tabs-wrap .arrow_icon').length < 1) {
            $this.find('.tabs-wrap').append('<i class="arrow_icon"></i>');
          }
          // 面板的展开与收缩
          self.panelUpAndDown($this);
        },
        onClose: function(title, index){
          if ($(container).tabs('tabs').length === 0) {
            $(container).addClass('hidden');
          }
          self.closedItemCallBack && $.isFunction(self.closedItemCallBack) && self.closedItemCallBack(title, index, $(container).tabs('tabs').length);
        }
      });
      $(container).tabs('add', {
        title: title,
        content: content,
        closable: true
      });
    }
  },
  bindEnv() {
    var self = this;
    var container = $(this.container);
    $(this.tabItem).each(function(index, item){
      $(item).click(function(){
        var title = $(this).attr('data-title');
        var value = $(this).attr('data-value');
        var content = $('#tabContent'+value).html();
        self.addTabs(title, content, container);
      });
    });
  },
  panelUpAndDown($this) {
    // 面板收缩与展开
    $this.find('.arrow_icon').unbind('click').bind('click', function(){
      var $$this = $(this);
      if (!$$this.hasClass('up')) {
        $$this.addClass('up');
        $this.find('.tabs-panels').slideUp('normal', function(){});
      } else {
        $$this.removeClass('up');
        $this.find('.tabs-panels').slideDown('normal', function(){});
      }
    });
  }
};
window.AddTabs = AddTabs;
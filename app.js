
var itemIndex = 0;

function GetFreeItemIndex() {
	itemIndex++;
	return itemIndex;
}

var testData = [
	{ Id: GetFreeItemIndex(), Text: "Lorem ipsum dolor sit amet", IsDone: false },
	{ Id: GetFreeItemIndex(), Text: "Sed fringilla tellus nec finibus maximus. Duis venenatis risus purus. Duis magna odio, eleifend vitae dignissim gravida, semper volutpat nisl", IsDone: false },
	{ Id: GetFreeItemIndex(), Text: "Ut nec erat non nulla ultricies condimentum", IsDone: true }
];

var todoListApp = new Vue({
	
	el: '#app-todolist',
	
	data: {
		todoItems: testData,
        newTodoText: ""
	},

	methods: {
		
		addTodo: function() {
			
			if (this.newTodoText.trim() === "")
				return;
			
			this.todoItems.push({ Id: GetFreeItemIndex(), Text: this.newTodoText, IsDone: false});
			this.newTodoText = "";
			
		},
		
		removeTodo: function(todo) {
			this.todoItems.splice(this.todoItems.indexOf(todo), 1);
		}
	}
});

/*test */
Vue.component('nav-header', {
    props:['color', 'header', 'fs'],
    template:
    '<div class="header" :style="{ color:color, \'font-size\': fs }">{{header}}</div>',
    
  })
  
  Vue.component('nav-list', {
    props:['list', 'color','menutext', 'bg', 'hl'],
    template: '<div>' + 
      '<ul :style="{background:bg}">'+
        '<li :style="{color:currentColor}" v-for="(link, label) in list">'+
          '<div class="side-nav-link" :style="{ \'padding-top\': open ? \'20px\' : \'0px\'}" @mouseover="open ? \'\' : highlight($event)" @mouseout="open ? \'\' : unhighlight($event)">{{ label }}</div>'+
        '</li>'+
      '</ul>'+
    '</div>',
    data:function(){
      return {
        reserveColor: null,
        currentColor: null,
        open: false
      }
    },
    mounted:function(){
      this.currentColor = this.color;
      var self = this;
      this.$root.$on('toggleMenu', function(){
        this.open ^= true
         setTimeout(function(){
           self.currentColor = self.currentColor == self.color ? self.menutext : self.color;
         },200)
      })
    },
    methods:{
      navigate:function(url){
        window.location.href = url;
      },
      highlight:function(ev){
         ev.currentTarget.style.backgroundColor = this.hl;
      },
      unhighlight:function(ev){
        ev.currentTarget.style.backgroundColor = this.bg;
      }
    },
  })
  
  Vue.component('nav-icon', {
    props:['color'],
    template: 
       '<div class="nav-icon left-arrow">' +
            '<div :style="{ background:color }" class="span"></div>' +
        '</div>',
    mounted:function(){
      var name;
      
      var self = this;
      
      this.$el.onclick = function(e){
        
        name = e.currentTarget.className;
        
        if(name.indexOf('active') == -1) {
          e.currentTarget.className += ' active';
          e.currentTarget.parentNode.children[1].children[0].style.left = '0px';
          
        } else {
          e.currentTarget.className = name.slice(0, name.indexOf(' active'))
          e.currentTarget.parentNode.children[1].children[0].style.left = '-100%';
        }
        vue.$emit('toggleMenu')
      }
      
    }
  })
  
  Vue.component('responsive-nav', {
    props:['bg', 'iclr','header', 'menutext', 'resbg', 'rhl', 'fs'],
    template: 
      '<div class="responsive-nav" :style="{ background: bg }">'+
        '<nav-header :color="iclr" :header="header" :fs="fs"></nav-header>'+
        '<nav-list :hl="rhl" :color="iclr" :list="list" :menutext="menutext" :bg="resbg"></nav-list>' +
        '<nav-icon :color="iclr"></nav-icon>' +
      '</div>',
    data: () => ({
      list: {}
    }),
    mounted () {
      this.list = this.$root.list
    }
  })
  
  var vue = new Vue({
    el:'#app',
    data: {
      element:{},
      list: {//add pages here with their links as the value and name as the key
        'todo list':'#',
        'About':'#',
        'Store':'#',
      }
    }
  })
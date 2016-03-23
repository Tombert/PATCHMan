var blessed = require("blessed");
var request = require('request');
var screen = blessed.screen({
  smartCSR: true
});

screen.title = 'my window title';
var form = blessed.form({
      parent: screen,
      width: '90%',
      height: '90%',
      border: {
        type: 'line'
      },
      keys: true,
      tags: true,
      top: 'center',
      left: 'center'
    });
var output = blessed.text({
  parent: form, 
  width: '80%',
  height: '60%',
  top: '30%',
  left: 'center',
  scrollable: true, 
scrollbar: {
      bg: 'blue'
    },
  mouse: true,
 alwaysScroll: true,
  border: {type:'line'}
})
var methodBox = blessed.list({
	parent: form, 
    width: '15%',
    left: '10%',
    height: '10%',
    mouse:true, 
    top: '7%',
  border: {
    type: 'line'
  },
  selectedBg: 'green'
    
}); 

methodBox.setItems(["GET","POST", "PATCH", "DELETE", "PUT"]);

var url = blessed.textbox({
  parent: form,
  width: '60%',
  height: 3,
  border: {type: 'line'},
  keys: true, 
  tags: true,
  top: '7%',
  left: '30%',
  style: {
    focus: {
       bg: 'blue',
       fg: 'white'
    },
    hover: {
      bg: 'blue',
      fg: 'white'
    }
  }
})

var cancel = blessed.button({
  parent: form,
  mouse: true,
  keys: true,
  shrink: true,
  padding: {
    left: 1,
    right: 1
  },
  left: 48,
  width: 12,
  top: '15%',
  name: 'cancel',
  content: 'cancel',
  style: {
    focus: {
       bg: 'blue',
       fg: 'white'
    },
    hover: {
      bg: 'blue',
      fg: 'white'
    }
  },
  border: {
    type: 'line'
  }
});
var killProgram = function() {
  process.exit(0)
}

cancel.on('click',  killProgram);
cancel.on('press', killProgram);

var submit = blessed.button({
  parent: form,
  mouse: true,
  keys: true,
  shrink: true,
  padding: {
    left: 1,
    right: 1
  },
  left: 35,
  width: 12,
  top: '15%',
  name: 'submit',
  content: 'submit',
  style: {
    focus: {
       bg: 'blue',
       fg: 'white'
    },
    hover: {
      bg: 'blue',
      fg: 'white'
    }
  },
  border: {
    type: 'line'
  }
});

var submitForm = function(e){
	var myUrl = url.getValue();
        request(myUrl, function (error, response, body) {
    output.setContent(JSON.stringify(body, null, 4)) 	
	})
}

submit.on('press', submitForm)


screen.append(form);
url.focus();
screen.render();

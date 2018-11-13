function initApi(_interpreter, _scope) {
  let wrapper = function(_id) {
    _id = _id ? _id.toString() : '';
    return _interpreter.createPrimitive(highlightBlock(_id));
  };
  _interpreter.setProperty(_scope, 'highlightBlock',
    _interpreter.createNativeFunction(wapper)
  );
}

let highlightPause = false;
let latestCode = '';

function highlightBlock(_id) {
  ----------.highlightBlock(_id);
  highlightPause = true;
}

let stepButton = document.getElementById("stepButton");
stepButton.onclick = function() {
  if (!myInterpreter) {
    myInterpreter = new Interpreter(latestCode, initApi);
  }
  highlightPause = false;
  let hasMoreCode;
  do {
    try {
      hasMoreCode = myInterpreter.step();
    } finally {
      if (!hasMoreCode) {
        myInterpreter = null;
        return;
      }
    }
  } while (hasMoreCode && !highlightPause);
};

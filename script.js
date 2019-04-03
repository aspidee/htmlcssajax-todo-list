
function clearCard() {

  var cardList = $(".card");

  cardList.remove();
}



function deleteCard() {

  var me = $(this);
  var cardId = me.siblings(".card_id");

  var id = cardId.text();


  $.ajax({

    url : "http://157.230.17.132:3014/todos/" + id,
    method : "DELETE",
    success : function(inData) {

      console.log(inData);

      loadCard();
    },
    error : function() {},
  });
}


function addCard() {

  var inpVal = $(".input");

  var outData = {

    text : inpVal.val()
  }

  inpVal.val("");
  $.ajax({

    url : "http://157.230.17.132:3014/todos",
    method : "POST",
    data : outData,
    success : function(inData) {

      var template = $("#card_template").html();
      var compiled = Handlebars.compile(template)

      var container = $(".card-container");
      var html = compiled();
      container.append(html);

      loadCard();
    },
    error : function() {},
  });
}


function loadCard() {

  clearCard();

  $.ajax({

    url : "http://157.230.17.132:3014/todos",
    method : "GET",
    success : function(inData) {

      var container = $(".card-container");

      var template = $("#card_template").html();
      var compiled = Handlebars.compile(template)
      for (var i = 0; i < inData.length; i++) {

        var cardData = inData[i];
        var text = cardData.text;
        var id = cardData.id;

        var dataIn = {

          cardId : id,
          cardTxt : text,
        }

        var html = compiled(dataIn);
        container.append(html);
      }

    },
    error : function() {},
  });
}


function putCard() {

  var me = $(this);
  var cardId = me.siblings(".card_id");

  var edit = prompt("Inserisci la modifica");

  var outData = {

    text: edit,
  }

  $.ajax({

    url : "http://157.230.17.132:3014/todos/" + id,
    method : "PUT",
    data: outData,
    success : function(inData) {

      addCard();

    },
    error : function() {},
  });
}


function postCard() {

  var input = $(".input").val("");
}

function keyAction(e) {

  if (e.which == 13) {
    addCard();
  }
}


function init() {


  $(document).on("click", "li.card_delete", deleteCard);
  $(document).on("click", ".btn", addCard);
  // $(document).on("click", ".card_edit", putCard);

  loadCard();

  var input = $(".input");
  input.keyup(keyAction);
}

$(document).ready(init);

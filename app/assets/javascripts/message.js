$(function(){

  function buildHTML(message){
    if ( message.image ) {
      var html =
       `<div class="chat-main__body__message" data-message-id=${message.id}>
          <div class="chat-main__body__message__list">
            ${message.user_name}
          </div>
          <div class="chat-main__body__message__time">
            ${message.created_at}
          </div>
        </div>
        <div class="chat-main__body__message-text">
          <p class="chat-main__body__message-text__content">
            ${message.body}
          </p>
        </div>
        <img src=${message.image} >
      </div>`
      return html;
    } else {
      var html =
       `<div class="chat-main__body__message" data-message-id=${message.id}>
          <div class="chat-main__body__message__list">
            ${message.user_name}
          </div>
          <div class="chat-main__body__message__time">
            ${message.created_at}
          </div>
        </div>
        <div class="chat-main__body__message-text">
          <p class="chat-main__body__message-text__content">
            ${message.body}
          </p>
        </div>
      </div>`
      return html;
    };
  }
  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.chat-main__body').append(html);
      $('.chat-main__body').animate({ scrollTop: $('.chat-main__body')[0].scrollHeight});
      $('form')[0].reset();
    })
    .fail(function(){
      alert("メッセージ送信に失敗しました")
    })
    .always(function(){
      $('form')[0].reset();
    });
  });
  var reloadMessages = function(){
    var last_message_id = $('.chat-main__body__message:last').data("message-id");
    $.ajax({
      url: "api/messages",
      type: 'get',
      dataType: 'json',
      data: {id: last_message_id}
    })
    .done(function(messages) {
      if (messages.length !== 0) {
        var insertHTML = '';
        $.each(messages, function(i, message) {
          insertHTML += buildHTML(message)
        });
        $('.chat-main__body').append(insertHTML);
        $('.chat-main__body').animate({ scrollTop: $('.chat-main__body')[0].scrollHeight});
      }
    })
    .fail(function() {
      alert('error');
    });
  };
  if (document.location.href.match(/\/groups\/\d+\/messages/)) {
    setInterval(reloadMessages, 7000);
  }
});
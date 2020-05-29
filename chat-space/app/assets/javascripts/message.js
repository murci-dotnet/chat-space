$(function(){
  function buildHTML(message){
    if ( message.image ) {
      var html =
       `<div class="chat-main__body__message">
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
       `<div class="chat-main__body__message">
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
      $('form')[0].reset();
    })
    .fail(function(){
      alert("メッセージ送信に失敗しました")
    })
    .always(function(){
      $('form')[0].reset();
    });
  });
});
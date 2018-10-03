window.localization = window.localization || {},
function(n) {
    localization.translate = {

      menu: function() {
        $('#welcome-menu').text(i18n.__('Welcome'));
        $('#whoweare-menu').text(i18n.__('Who we are'));
        $('#whatwedo-menu').text(i18n.__('What we do'));
        $('#getintouch-menu').text(i18n.__('Get in touch'));

      },

      welcome: function() {
        $('#welcome .inner p').text(i18n.__('To free the bits, create a new wallet or import an existing one.'));
      },

      init: function() {
        this.welcome();
        this.menu();
      }
    };

    n(function() {
        localization.translate.init();
    })

}(jQuery);

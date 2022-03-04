(function ($) {
  // Document ready
  $(function () {
    // Ajax form submit / Аякс форма настраивается тут
    $(".ajax-contact-form").on("submit", function (e) {
      e.preventDefault();
      const url = $(this).attr("action");
      const method = $(this).attr("method");
      const dataType = $(this).data("type") || null;
      const serializedArray = $(this).serializeArray();
      const self = $(this);

      let requestObj = {};
      serializedArray.forEach((item) => {
        requestObj[item.name] = item.value;
      });

      $(".form-success-message").addClass("d-none");

      $.ajax({
        url,
        type: method,
        dataType: dataType,
        data: {
          ...requestObj,
        },
        success: function (data) {
          // Clear inputs
          self
            .find(
              "input[type='text'], input[type='number'], input[type='tel'], input[type='email'], input[type='password'], textarea",
            )
            .val("");

          // Success message
          self.find(".form-success-message").removeClass("d-none");
        },
        error: function (data) {
          // Basic error handling
          alert("Ошибка, повторите позднее");
          console.error(data);
        },
      });
    });

    // Animation on scroll plugin
    AOS.init({
      duration: 600,
      once: true,
    });

    // Simple phone input mask
    $(".phone-input-mask").on("keypress paste", function (evt) {
      // ^(\([0-9]{3}\)|[0-9]{3}-)[0-9]{3}-[0-9]{4}$
      var theEvent = evt || window.event;

      var key = null;
      // Handle paste
      if (theEvent.type === "paste") {
        key = event.clipboardData.getData("text/plain");
      } else {
        // Handle key press
        key = theEvent.keyCode || theEvent.which;
        key = String.fromCharCode(key);
      }
      var regex = /([0-9() +-])/;
      if (!regex.test(key)) {
        theEvent.returnValue = false;
        if (theEvent.preventDefault) theEvent.preventDefault();
      }
    });

    // Mobile menu
    $(".burger-btn").on("click", function () {
      if (!$(this).hasClass("active")) {
        $(this).addClass("active");
        $(".mobile-menu-overlay").addClass("open");
        $("body").addClass("overflow-hidden");
      } else {
        $(this).removeClass("active");
        $(".mobile-menu-overlay").removeClass("open");
        $("body").removeClass("overflow-hidden");
      }
    });

    // Sticky header
    if ($(".main-header").length) {
      // let sticky = $(".main-header").height();
      let sticky = $(".section:eq(0)").height();
      let wwidth = $(window).outerWidth(true);
      if (wwidth <= 992) {
        $(".main-header").addClass("sticky main-header--sticky-dark animated");
        return;
      }

      if (window.pageYOffset > sticky) {
        $(".main-header").addClass("sticky main-header--sticky-dark");
        setTimeout(() => {
          $(".main-header").addClass("animated");
        }, 0);
      } else {
        $(".main-header").removeClass(
          "sticky animated main-header--sticky-dark",
        );
      }
    }
    $(window).on("resize", function () {
      let wwidth = $(window).outerWidth(true);
      if (wwidth <= 992) {
        $(".main-header").addClass("sticky main-header--sticky-dark animated");
      } else {
        if ($(".mobile-menu-overlay").hasClass("open")) {
          $(".burger-btn").removeClass("active");
          $(".mobile-menu-overlay").removeClass("open");
          $("body").removeClass("overflow-hidden");
        }
      }
    });
    $(document).on("scroll", function () {
      // Sticky header
      if ($(".main-header").length) {
        // let sticky = $(".main-header").height();
        let sticky = $(".section:eq(0)").height();
        let wwidth = $(window).outerWidth(true);
        if (wwidth <= 992) {
          $(".main-header").addClass(
            "sticky main-header--sticky-dark animated",
          );
          return;
        }

        if (window.pageYOffset > sticky) {
          $(".main-header").addClass("sticky main-header--sticky-dark");
          setTimeout(() => {
            $(".main-header").addClass("animated");
          }, 0);
        } else {
          $(".main-header").removeClass(
            "sticky animated main-header--sticky-dark",
          );
        }
      }
    });
  });
})(jQuery);

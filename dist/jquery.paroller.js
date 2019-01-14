/**
 * Forked from:
 * jQuery plugin paroller.js v1.4.4
 * https://github.com/tgomilar/paroller.js
 * preview: https://tgomilar.github.io/paroller/
 * 
 * Now includes responsive overrides and scroll action prevention
 **/
(function (factory) {
  'use strict';
  if (typeof define === 'function' && define.amd) {
    define('parollerjs', ['jquery'], factory);
  } else if (typeof module === 'object' && typeof module.exports === 'object') {
    module.exports = factory(require('jquery'));
  }
  else {
    factory(jQuery);
  }
})(function ($) {
  'use strict';

  var working = false;
  var scrollAction = function() {
    working = false;
  };

  var setDirection = {
    bgVertical: function (elem, bgOffset) {
      return elem.css({'background-position': 'center ' + -bgOffset + 'px'});
    },
    bgHorizontal: function (elem, bgOffset) {
      return elem.css({'background-position': -bgOffset + 'px' + ' center'});
    },
    vertical: function (elem, elemOffset, oldTransform) {
      (oldTransform === 'none' ? oldTransform = '' : true);
      return elem.css({
        '-webkit-transform': 'translateY(' + elemOffset + 'px)' + oldTransform,
        '-moz-transform': 'translateY(' + elemOffset + 'px)' + oldTransform,
        'transform': 'translateY(' + elemOffset + 'px)' + oldTransform,
        'transition': 'transform linear',
        'will-change': 'transform'
      });
    },
    horizontal: function (elem, elemOffset, oldTransform) {
      (oldTransform === 'none' ? oldTransform = '' : true);
      return elem.css({
        '-webkit-transform': 'translateX(' + elemOffset + 'px)' + oldTransform,
        '-moz-transform': 'translateX(' + elemOffset + 'px)' + oldTransform,
        'transform': 'translateX(' + elemOffset + 'px)' + oldTransform,
        'transition': 'transform linear',
        'will-change': 'transform'
      });
    }
  };

  var setMovement = {
    factor: function (elem, width, options) {
      var factor = (typeof elem.data('paroller-factor') !== 'undefined') ? elem.data('paroller-factor') : options.factor,
        factorXs = (typeof elem.data('paroller-factor-xs') !== 'undefined') ? elem.data('paroller-factor-xs') : options.factorXs,
        factorSm = (typeof elem.data('paroller-factor-sm') !== 'undefined') ? elem.data('paroller-factor-sm') : options.factorSm,
        factorMd = (typeof elem.data('paroller-factor-md') !== 'undefined') ? elem.data('paroller-factor-md') : options.factorMd,
        factorLg = (typeof elem.data('paroller-factor-lg') !== 'undefined') ? elem.data('paroller-factor-lg') : options.factorLg,
        factorXl = (typeof elem.data('paroller-factor-xl') !== 'undefined') ? elem.data('paroller-factor-xl') : options.factorXl;

      if (width < 576 && factorXs !== false) {
        return factorXs;
      }
      else if (width <= 768 && factorSm !== false) {
        return factorSm;
      }
      else if (width <= 1024 && factorMd !== false) {
        return factorMd;
      }
      else if (width <= 1200 && factorLg !== false) {
        return factorLg;
      }
      else if (width <= 1920 && factorXl !== false) {
        return factorXl;
      }
      else {
        return factor;
      }
    },
    bgOffset: function (offset, factor) {
      return Math.round(offset * factor);
    },
    transform: function (offset, factor, windowHeight, height) {
      return Math.round((offset - (windowHeight / 2) + height) * factor);
    }
  };

  var clearPositions = {
    background: function (elem) {
      return elem.css({'background-position': 'unset'});
    },
    foreground: function (elem) {
      return elem.css({
        'transform' : 'unset',
        'transition' : 'unset'
      });
    }
  };

  $.fn.paroller = function (options) {
    var windowHeight = $(window).height();
    var documentHeight = $(document).height();

    // default options
    var options = $.extend({
      factor: 0, // - to +
      factorXs: false, // - to +
      factorSm: false, // - to +
      factorMd: false, // - to +
      factorLg: false, // - to +
      factorXl: false, // - to +
      type: 'background', // foreground
      direction: 'vertical' // horizontal
    }, options);

    return this.each(function () {
      var $this = $(this);
      var width = $(window).width();
      var offset = $this.offset().top;
      var height = $this.outerHeight();

      var dataType = $this.data('paroller-type');
      var dataDirection = $this.data('paroller-direction');
      var oldTransform = $this.css('transform');

      var type = (dataType) ? dataType : options.type;
      var direction = (dataDirection) ? dataDirection : options.direction;
      var factor = setMovement.factor($this, width, options);
      var bgOffset = setMovement.bgOffset(offset, factor);
      var transform = setMovement.transform(offset, factor, windowHeight, height);

      if (type === 'background') {
        if (direction === 'vertical') {
          setDirection.bgVertical($this, bgOffset);
        }
        else if (direction === 'horizontal') {
          setDirection.bgHorizontal($this, bgOffset);
        }
      }
      else if (type === 'foreground') {
        if (direction === 'vertical') {
          setDirection.vertical($this, transform, oldTransform);
        }
        else if (direction === 'horizontal') {
          setDirection.horizontal($this, transform, oldTransform);
        }
      }

      $(window).on('resize', function () {
        var scrolling = $(this).scrollTop();
        width = $(window).width();
        offset = $this.offset().top;
        height = $this.outerHeight();
        factor = setMovement.factor($this, width, options);

        bgOffset = Math.round(offset * factor);
        transform = Math.round((offset - (windowHeight / 2) + height) * factor);
        
        if (! working) {
          window.requestAnimationFrame(scrollAction);
          working = true;
        }

        if (type === 'background') {
          clearPositions.background($this);
          if (direction === 'vertical') {
            setDirection.bgVertical($this, bgOffset);
          }
          else if (direction === 'horizontal') {
            setDirection.bgHorizontal($this, bgOffset);
          }
        }
        else if ((type === 'foreground') && (scrolling <= documentHeight)) {
          clearPositions.foreground($this);
          if (direction === 'vertical') {
            setDirection.vertical($this, transform);
          }
          else if (direction === 'horizontal') {
            setDirection.horizontal($this, transform);
          }
        }
      });
        
      $(window).on('scroll', function x() {
        if (factor) {
          var scrolling = $(this).scrollTop();
          documentHeight = $(document).height();

          bgOffset = Math.round((offset - scrolling) * factor);
          transform = Math.round(((offset - (windowHeight / 2) + height) - scrolling) * factor);

          if (! working) {
            window.requestAnimationFrame(scrollAction);
            working = true;
          }

          if (type === 'background') {
            if (direction === 'vertical') {
              setDirection.bgVertical($this, bgOffset);
            }
            else if (direction === 'horizontal') {
              setDirection.bgHorizontal($this, bgOffset);
            }
          }
          else if ((type === 'foreground') && (scrolling <= documentHeight)) {
            if (direction === 'vertical') {
              setDirection.vertical($this, transform, oldTransform);
            }
            else if (direction === 'horizontal') {
              setDirection.horizontal($this, transform, oldTransform);
            }
          }
        }
      });
    });
  };
});

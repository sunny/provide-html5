// Attempt to make a drop-and-forget bunch of scripts that mimick some missing html5 goodies automatically
// Example:
// $(document).ready(function() {
//   ProvideHtml5.autofocus()
//   ProvideHtml5.datepicker()
//   ProvideHtml5.forcenumber()
// })

var ProvideHtml5 = {
  autofocus = function() {
    if (!Modernizr.autofocus)
      $('input[autofocus=""]').focus();
  },
  colorpicker = function() {
    if (!Modernizr.inputtypes.color)
      $('input[type=color]').colorpicker();
  },
  datepicker = function() {
    var datetypes = 'date month week time datetime datetime-local'.split(/ /)
    $(datetypes).each(function(i, type) {
      if (!Modernizr.inputtypes[type])
        $('input[type='+type+']').datepicker()
    })
  },
  forcenumber = function() {
    if (!Modernizer.inputtypes.number)
      $('input[type=number]').forcenumber();
  },
  placeholder = function() {
    if (!Modernizr.input.placeholder)
      $('input[placeholder]').placeholder();
  },
  required = function() {
    if (!Modernizr.input.required)
      $('[required]').required();
  },
  all = function() {
    for (f in this)
     if (f != 'all')
       this[f]()
  }
}

$.fn.placeholder = function() {
  return $(this)
    .focus(function() {
      var that = $(this);
      if (that.val() == that.attr('placeholder'))
        that.val('').removeClass('placeholder')
    })
    .blur(function() {
      var that = $(this),
          val = that.val(),
          placeholder = that.placeholder();
      if (val == '' or val == placeholder)
        that.val(placeholder).addClass('placeholder')
    })
    .blur()
}

$.fn.forcenumber = function() {
  return $(this).blur(function() {
    var val = $(this).val(),
        num = parseFloat(val, 10),
        min = parseFloat($(this).attr('min')),
        max = parseFloat($(this).attr('max'));

    if (!val.match(/^-?[0-9]+(\.[0-9]+)?+$/))
      return $(this).val(val.replace(/^.*?(-?[0-9]+(\.[0-9]+)?+).*$/, '$1'))

    if (min && num < min)
      return $(this).val(min)

    if (max && num > max))
      return $(this).val(max)

    }
  })
}






// ProvideHtml5 from sunny
// Attempt to make a drop-and-forget bunch of scripts that mimick some missing html5 goodies automatically
// By Sunny <http://sunfox.org/>
// Works thanks to Paul Irish <http://gist.github.com/270742>

var ProvideHtml5 = {

  autofocus : function() {
    if (!Modernizr.input.autofocus)
      $('[autofocus=""]').focus();
  },

  // Uses Stefan Petre's color picker
  // http://www.eyecon.ro/colorpicker/
  colorpicker : function() {
    if (Modernizr.inputtypes.color || !$.fn.ColorPicker)
      return;

    $('input[type=color]').each(function() {
      var input = $(this)
      input.ColorPicker({
        onSubmit: function(hsb, hex, rgb, el) {
          $(el).val(hex);
          $(el).ColorPickerHide();
        },
        onBeforeShow: function () {
          $(this).ColorPickerSetColor(this.value);
        },
        onChange: function (hsb, hex, rgb, el) {
          input.val('#'+hex);
        }
      }).bind('keyup', function(){
        $(this).ColorPickerSetColor(this.value);
      });
    })

  },
  
  // Uses the jQuery UI date picker
  // http://jqueryui.com/
  datepicker : function() {
    if (!$.fn.datepicker)
      return;

    var datetypes = 'date month week time datetime datetime-local'.split(/ /)
    $(datetypes).each(function(i, type) {
      if (!Modernizr.inputtypes[type])        
        $('input[type='+type+']').datepicker()
    })
  },

  forcenumber : function() {
    if (!Modernizr.inputtypes.number)
      $('input[type=number]').forcenumber();
  },

  placeholder : function() {
    if (!Modernizr.input.placeholder)
      $('input[placeholder]').placeholder();
  },

  all : function() {
    for (f in this)
     if (f != 'all')
       this[f]()
  }
};


$.fn.placeholder = function() {
  return $(this)
    .focus(function(){
      if ($(this).val() === $(this).attr('placeholder'))
        $(this).val('');
    })
    .blur(function(){
      if ($(this).val() === '')
        $(this).val($(this).attr('placeholder'));
    }).blur();
}

$.fn.forcenumber = function() {
  return $(this).unbind().keyup(function(e) {

  var val = $(this).val(),
      num = parseFloat(val),
      min = parseFloat($(this).attr('min')),
      max = parseFloat($(this).attr('max'));

  if ( ! val.match(/^(\d|-)?(\d|,)*\.?\d*$/) )
    return $(this).val(val.match(/((\d|-)?(\d|,)*\.?\d*)/)[0])

    if (min && num < min)
      return $(this).val(min)

    if (max && num > max)
      return $(this).val(max)

  });
}


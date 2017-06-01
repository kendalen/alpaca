(function($) {

    var Alpaca = $.alpaca;

    Alpaca.Fields.SliderField = $.alpaca.Fields.TextField.extend({
	    setup: function() {
	        this.base();

	        if (!this.options.ranged) this.inputType = "number";
	    },

	    getFieldType: function() {
	        return "slider";
	    },

	    getTitle: function() {
	        return "Slider";
	    },

	    getDescription: function() {
	        return "Provides an instance of a bootstrap-slider.js control.";
	    },

	    onChange: function(e) {
	        this.base();

	        if (!this.isRanged && this.control && this.control.slider)
	        	this.control.slider("setValue", this.control.val());
	    },

	    postRender: function(callback) {
	        var self = this;

	        this.base(function() {

	            if (!Alpaca.isEmpty(self.schema.maximum) && !Alpaca.isEmpty(self.schema.minimum)) {
	                self.options.measureUnitPosition = self.options.measureUnitPosition ? self.options.measureUnitPosition : "after";
	                self._manageMeasureUnit("Before");
	            	$("<br/><b>" + self.schema.minimum + "&nbsp;&nbsp;&nbsp;</b>").insertBefore(self.control);
	                var val = self.getValue(), commaIdx = val.indexOf(",");
	                self.isRanged = commaIdx > 0  || Alpaca.isArray(val) || self.options.ranged;
	                if (self.isRanged) {
	                    if (!commaIdx) val += "," + val;
	                    val = Alpaca.isArray(val) ? val : val.split(",");
	                    for (var i=0; i<val.length; i++)
	                        val[i] = parseInt(val[i]);
	                };
	                self.bootstrapSlider = self.control.slider({
	                	value: val,
	                    min: self.schema.minimum,
	                    max: self.schema.maximum
	                });
	                $("<b>&nbsp;&nbsp;&nbsp;" + self.schema.maximum + "</b>").insertBefore(self.control);
	                if (!self.isRanged && self.options.showInputField) self.control.css("display", "block");
	                self._manageMeasureUnit("After");
	            }
	            callback();
	        });
	    },

	    _manageMeasureUnit: function(position) {
	        if (this.options.measureUnitType && this.options.measureUnitPosition && this.options.measureUnitPosition.toUpperCase()==position.toUpperCase()) 
	            $('<span class="wedoo-measureUnit wedoo-measureUnitType-' + this.options.measureUnitType + '"></span>')["insert"+position](this.control);
	    },

	    getSchemaOfOptions: function() {
	        return Alpaca.merge(this.base(), {
	            "properties": {
	                "measureUnitType": {
	                    "title": "Measure Unit Type",
	                    "description": "Generate measure unit container if valued.",
	                    "type": "string"
	                },
	                "measureUnitPosition": {
	                    "title": "Measure Unit Position",
	                    "description": "Set position for measure unit (afetr or before control).",
	                    "type": "string"
	                },
	                "showInputField": {
	                    "title": "Show Input Field",
	                    "description": "Shows the input field after the slider.",
	                    "type": "boolean",
	                    "default": true
	                },
	                "ranged": {
	                    "title": "Ranged",
	                    "description": "Manage min and max in the same field.",
	                    "type": "boolean",
	                    "default": false
	                }
	            }
	        });
	    },

	    getOptionsForOptions: function() {
	        return Alpaca.merge(this.base(), {
	            "fields": {
	                "measureUnitType": {
	                    "rightLabel": "Measure Unit Type",
	                    "helper": "Generate measure unit container if valued.",
	                    "type": "textfield"
	                },
	                "measureUnitPosition": {
	                    "title": "Measure Unit Position",
	                    "description": "Set position for measure unit (afetr or before control).",
	                    "type": "textfield"
	                },
	                "showInputField": {
	                    "rightLabel": "Show Input Field",
	                    "helper": "Shows the input field after the slider.",
	                    "type": "checkbox"
	                },
	                "ranged": {
	                    "rightLabel": "Ranged",
	                    "helper": "Manage min and max in the same field.",
	                    "type": "checkbox"
	                }
	            }
	        });
	    }
	});
	Alpaca.registerFieldClass("slider", Alpaca.Fields.SliderField);

})(jQuery);
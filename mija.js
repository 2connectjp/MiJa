(function(window) {

    window.Mija     = Mija;

    function Mija(source, target) {

        this.iteration  = 0;
        this.EOL        = '\r\n';

        this.source = source || null;
        this.target = target || null;

    }

    Mija.prototype.setSource = function(element) {

        this.source = element;

    };

    Mija.prototype.setTarget= function(element) {

        this.target = element;

    };

    Mija.prototype.toJavascript = function () {

        this.getChildren(this.stringToDom());
        this.iteration = 0;

    };

    Mija.prototype.stringToDom = function () {

        var tempElm         = document.createElement('div');
        tempElm.innerHTML   = this.source.value;

        return tempElm;

    };

    Mija.prototype.getChildren = function (elm, parent) {

        var cLength = elm.children.length;

        for(var i = 0; i < cLength; i++) {

            var child       = elm.children[i];
            var elmName     = child.dataset.mijaname || "elm" + this.iteration;

            this.appendOutput("var " + elmName + " = document.createElement('" + child.tagName.toLowerCase() + "');");

            if(child.id) {

                this.appendOutput(elmName + ".id = '" + child.id + "';");

            }

            if(child.className) {

                this.appendOutput(elmName + ".className = '" + child.className + "';");

            }

            if(parent !== undefined) {

                this.appendOutput(parent + ".appendChild(" + elmName + ");");

            }

            this.iteration++;
            this.getChildren(elm.children[i], elmName);

        }

    };

    Mija.prototype.appendOutput = function (string) {

        this.target.value += string + this.EOL;

    };

})(window);
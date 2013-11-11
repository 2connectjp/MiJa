(function (window) {


    function Mija() {

        this.EOL        = '\r\n';
        this.source     = null;
        this.javascript = "";
        this.iteration  = 0;

    }

    Mija.prototype.setSource = function(source) {

        this.source = source;

    };


    Mija.prototype.toJavascript = function () {

        this.getChildren(this.stringToDom());

    };

    Mija.prototype.stringToDom = function () {

        var tempElm         = document.createElement('div');
        tempElm.innerHTML   = this.source;

        return tempElm;

    };

    Mija.prototype.getChildren = function (elm, parent) {

        var cLength = elm.children.length;

        for (var i = 0; i < cLength; i++) {

            var child       = elm.children[i];
            var elmName     = child.dataset.mijaname || "elm" + this.iteration;
            var attrs       = child.attributes;

            this.appendOutput("var " + elmName + " = document.createElement('" + child.tagName.toLowerCase() + "');");

            if (child.textContent) {

                this.appendOutput(elmName + ".textContent = " + child.textContent + ";");

            }

            for (var j = 0; j < attrs.length; j++) {

                if(attrs[j].nodeName !== "data-mijaname") {

                    this.appendOutput(elmName + ".setAttribute('" + attrs[j].nodeName + "', '" + attrs[j].nodeValue + "');");

                }

            }

            if (parent !== undefined) {

                this.appendOutput(parent + ".appendChild(" + elmName + ");");

            }

            //Insure unique element name. FOREVER.
            this.iteration++;
            this.getChildren(elm.children[i], elmName);

        }

    };

    Mija.prototype.appendOutput = function (string) {

        this.javascript += string + this.EOL;

    };

    window.Mija     = Mija;

}(window));

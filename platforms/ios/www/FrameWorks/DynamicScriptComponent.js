
function DynamicScriptComponent() {

    this.LoadCustomTemplateHTML = function ($scope, $compile, HTML, DivId) {
        try {
            if (HTML != "") {
                var _oOneViewCompiler = new OneViewCompiler();
                _oOneViewCompiler.CompileAndApeend($scope, $compile, HTML, DivId);
            }
        }

        catch (Excep) {

           // alert('DynamicScriptComponent.LoadCustomTemplateHTML Excep : ' + JSON.stringify(Excep));
            throw oOneViewExceptionHandler.Create("FrameWork", "DynamicScriptComponent.LoadCustomTemplateHTML", Excep);
        }
    }



    this.LoadCustomTemplateScript = function (JSFile) {
        try {
            var oScript = document.createElement("script");
            var oScriptText = document.createTextNode(JSFile);
            oScript.appendChild(oScriptText);
            document.body.appendChild(oScript);
        }

        catch (Excep) {
           // alert('DynamicScriptComponent.LoadCustomTemplateScript Excep : ' + JSON.stringify(Excep));
            throw oOneViewExceptionHandler.Create("FrameWork", "DynamicScriptComponent.LoadCustomTemplateScript", Excep);
        }
    }


}
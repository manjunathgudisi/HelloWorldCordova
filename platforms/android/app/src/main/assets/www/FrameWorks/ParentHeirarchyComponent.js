
var ParentPlaceHeirarchy = [];

function ParentHeirarchyComponent() {

    var MyInstance = this;
    var _OneViewSqlitePlugin = new OneViewSqlitePlugin();

    this.Init = function () {

        try {
            OneViewConsole.Debug("Init Start", "ParentHeirarchyComponent.Init");

            var DcPlaceId = OneViewSessionStorage.Get("DcPlaceId");

            if(DcPlaceId != null){

                var DcPlaceQuery = "SELECT Left,Right FROM OrganizationAssetsNode WHERE ServerId = " + DcPlaceId;              
                var DcPlaceResult = _OneViewSqlitePlugin.ExcecuteSqlReader(DcPlaceQuery);
                
                if (DcPlaceResult.length > 0) {

                    var DcPlaceParentHeirarchyQuery = "SELECT ServerId,ChildDbelementType,ChildDbElementName FROM OrganizationAssetsNode WHERE Left <= " + DcPlaceResult[0].Left + " And Right >= " + DcPlaceResult[0].Right + " Order By Left";                   
                    var DcPlaceParentHeirarchyResult = _OneViewSqlitePlugin.ExcecuteSqlReader(DcPlaceParentHeirarchyQuery);

                    OneViewSessionStorage.Save("ParentPlaceHeirarchy", JSON.stringify(DcPlaceParentHeirarchyResult));
                }
            }

            OneViewConsole.Debug("Init End", "ParentHeirarchyComponent.Init");
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("FrameWork", "ParentHeirarchyComponent.Init", Excep);
        }
        finally {
            DcPlaceQuery = null;
            DcPlaceResult = null;
            DcPlaceParentHeirarchyQuery = null;
            DcPlaceParentHeirarchyResult = null;
        }
    }

    this.GetFormatedParentPlaceHeirarchy = function (Separator) {

        try {
            OneViewConsole.Debug("GetFormatedParentPlaceHeirarchy Start", "ParentHeirarchyComponent.GetFormatedParentPlaceHeirarchy");

            var FormatedParentPlaceHeirarchy = "";
            var ParentPlaceHeirarchy = OneViewSessionStorage.Get("ParentPlaceHeirarchy");

            if (ParentPlaceHeirarchy != null) {

                ParentPlaceHeirarchy = JSON.parse(ParentPlaceHeirarchy);

                Separator = (Separator != undefined) ? Separator : ' &nbsp;<i class="icon icon-chevron-right"></i>&nbsp; ';

                for (var i = 2; i < ParentPlaceHeirarchy.length; i++) {
                    FormatedParentPlaceHeirarchy += ParentPlaceHeirarchy[i].ChildDbElementName;
                    FormatedParentPlaceHeirarchy += (i <= ParentPlaceHeirarchy.length - 2) ? ' &nbsp;<i class="icon icon-chevron-right"></i>&nbsp; ' : "";
                }
            }

            OneViewConsole.Debug("GetFormatedParentPlaceHeirarchy End", "ParentHeirarchyComponent.GetFormatedParentPlaceHeirarchy");

            return FormatedParentPlaceHeirarchy;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("FrameWork", "ParentHeirarchyComponent.GetFormatedParentPlaceHeirarchy", Excep);
        }
        finally {
            FormatedParentPlaceHeirarchy = null;
            ParentPlaceHeirarchy = null;
        }
    }

    this.SetParentPlaceHeirarchy = function () {

        try {
            OneViewConsole.Debug("SetParentPlaceHeirarchy Start", "ParentHeirarchyComponent.SetParentPlaceHeirarchy");

            var _oDOM = new DOM();
            _oDOM.AddInnerHtml("DivInfo", MyInstance.GetFormatedParentPlaceHeirarchy());

            OneViewConsole.Debug("SetParentPlaceHeirarchy End", "ParentHeirarchyComponent.SetParentPlaceHeirarchy");
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("FrameWork", "ParentHeirarchyComponent.SetParentPlaceHeirarchy", Excep);
        }
        finally {
            FormatedParentPlaceHeirarchy = null;           
        }
    }   
}
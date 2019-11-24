
//Global variable to save metadata for particular service and user
var MenuMetadata = null;

//    {
//    "ServiceId": 1, "IsforForPortal": false, "IsforForMobile": true,
//    "DatMenuDetails": {
//        "Icon": null, "OperationKey": null, "DisplayNameKey": null, "DisplayOrder": 0, "RouterKey": null, "IsMenuGroup": true,
//        "SubDatMenuDetails": [
//            { "Icon": "icon icon-desktop", "OperationKey": null, "DisplayNameKey": "My Dashboard", "DisplayOrder": 0, "RouterKey": "#/nav", "IsMenuGroup": false, "SubDatMenuDetails": null },
//            { "Icon": "icon icon-cloud-download", "OperationKey": null, "DisplayNameKey": "My Downloads", "DisplayOrder": 0, "RouterKey": "#/nav/downloads", "IsMenuGroup": false, "SubDatMenuDetails": null },
//            { "Icon": "icon icon-box-add", "OperationKey": null, "DisplayNameKey": "My Action Downloads", "DisplayOrder": 0, "RouterKey": "#/nav/actionfollowupdownloads", "IsMenuGroup": false, "SubDatMenuDetails": null },
//            { "Icon": "icon icon-clipboard2", "OperationKey": null, "DisplayNameKey": "My Audits", "DisplayOrder": 0, "RouterKey": "#/nav/my-audit", "IsMenuGroup": false, "SubDatMenuDetails": null },
//            //{ "Icon": "icon icon-edit", "OperationKey": null, "DisplayNameKey": "My Actions", "DisplayOrder": 0, "RouterKey": "#/nav/my-actions", "IsMenuGroup": false, "SubDatMenuDetails": null },
//            //{ "Icon": "icon icon-gears", "OperationKey": null, "DisplayNameKey": "My Settings", "DisplayOrder": 0, "RouterKey": "#/nav/settings", "IsMenuGroup": false, "SubDatMenuDetails": null },
//            //{ "Icon": "icon icon-comments-o", "OperationKey": null, "DisplayNameKey": "My Support", "DisplayOrder": 0, "RouterKey": "#/nav/my-support", "IsMenuGroup": false, "SubDatMenuDetails": null },
//            //{ "Icon": "icon icon-file-text", "OperationKey": null, "DisplayNameKey": "Shift Report", "DisplayOrder": 0, "RouterKey": "#/483", "IsMenuGroup": false, "SubDatMenuDetails": null },
//            //{ "Icon": "icon icon-truck", "OperationKey": null, "DisplayNameKey": "Dispatching", "DisplayOrder": 0, "RouterKey": "#/8272", "IsMenuGroup": false, "SubDatMenuDetails": null },
//            {
//                "Icon": "icon icon-bullhorn", "OperationKey": null, "DisplayNameKey": "My Alerts", "DisplayOrder": 0, "RouterKey": "", "IsMenuGroup": true,
//                "SubDatMenuDetails": [{ "Icon": "icon icon-bullhorn", "OperationKey": null, "DisplayNameKey": "My Alerts", "DisplayOrder": 0, "RouterKey": "#/nav/my-alerts", "IsMenuGroup": false, "SubDatMenuDetails": null }]
//            },
//            { "Icon": "icon icon-power-off", "OperationKey": null, "DisplayNameKey": "Sign Out", "DisplayOrder": 0, "RouterKey": "#/logoutcall", "IsMenuGroup": false, "SubDatMenuDetails": null },
//        ]
//    }, "CreateDate": "\/Date(-62135596800000)\/", "TimeStamp": null, "OVGuid": 0
//}


function DefaultMenuComponent() {

    var MyInstance = this;

    this.LoadMetadata = function () {
        try {
            var oMenuConfigMetaDataDAO = new MenuConfigMetaDataDAO();
            var MenuConfig = oMenuConfigMetaDataDAO.GetByServiceAndUserId(OneViewSessionStorage.Get("ServiceId"), OneViewSessionStorage.Get("LoginUserId"));

            if (MenuConfig.length > 0) {
                
                MenuConfig = JSON.parse(MenuConfig[0].MenuConfig);
                MenuConfig = JSON.parse(MenuConfig);
                MenuMetadata = MenuConfig;
                //alert('MenuMetadata  : ' + JSON.stringify(MenuMetadata));
            }
            else {
                MenuMetadata = null;
            }
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("FrameWork", "DefaultMenuComponent.LoadMetadata", Excep);
        }
    }

    this.Destroy = function () {
        try {
            MenuMetadata = null
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("FrameWork", "DefaultMenuComponent.Destroy", Excep);
        }
    }

    this.GenerateMenu = function () {
        try {

            var HTML = MyInstance.CreateMenu();

            return HTML;
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("FrameWork", "DefaultMenuComponent.GenerateMenu", Excep);
        }
    }

    this.CreateHtml = function (RouterKey, DisplayNameKey, IconHtml) {
        try {

            var Html = '';
            var hrefHtml = '';
            if (RouterKey != "") {
                ////hrefHtml = " href = '" + RouterKey + "'";
                hrefHtml = " href = \"" + RouterKey + "\"";
            }
            Html = '<li class="item item-complex"><a snap-toggle="left" ' + hrefHtml + ' class="item-content">' + IconHtml + DisplayNameKey + '</a></li>';

            return Html;
        }
        catch (Excep) {
            alert('CreateHtml : ' + Excep + "," + JSON.stringify(Excep));
            throw oOneViewExceptionHandler.Create("FrameWork", "DefaultMenuComponent.CreateHtml", Excep);
        }
    }

    this.CreateIconHtml = function (IconClass) {
        try {

            var Html = '<i class="' + IconClass + '"></i>';

            return Html;
        }
        catch (Excep) {
            alert('CreateIconHtml : ' + Excep + "," + JSON.stringify(Excep));
            throw oOneViewExceptionHandler.Create("FrameWork", "DefaultMenuComponent.CreateIconHtml", Excep);
        }
    }

    this.CreateMenu = function () {
        try {

            //var ServiceId = 1;
            var HTML = "";
            if (MenuMetadata != null) {

                //alert('MenuMetadata.SubDatMenuDetails : ' + JSON.stringify(MenuMetadata.SubDatMenuDetails));
                HTML = MyInstance.GetSubMenus(MenuMetadata.SubDatMenuDetails);

            }

            return HTML;
        }
        catch (Excep) {
            //alert('CreateMenu : ' + Excep + "," + JSON.stringify(Excep));
            throw oOneViewExceptionHandler.Create("FrameWork", "DefaultMenuComponent.CreateMenu", Excep);
        }
    }

    this.GetSubMenus = function (SubDatMenuDetails) {
        try {
            var HTML = "";

            if (SubDatMenuDetails != null) {
                for (var i = 0; i < SubDatMenuDetails.length ; i++) {
                    var SubMenuData = SubDatMenuDetails[i];
                    if (SubMenuData.SubDatMenuDetails != null) {
                        HTML += '<div class="item item-divider">';
                        HTML += SubMenuData.DisplayNameKey;
                        HTML += '<ul class="list">';
                        HTML += MyInstance.GetSubMenus(SubMenuData.SubDatMenuDetails);
                        HTML += '</ul>';
                        HTML += '</div>';
                    }

                    else {
                        var IconHtml = "";

                        if (SubMenuData.Icon != "") {
                            IconHtml = MyInstance.CreateIconHtml(SubMenuData.Icon);
                        }

                        HTML += MyInstance.CreateHtml(SubMenuData.RouterKey, SubMenuData.DisplayNameKey, IconHtml);
                    }
                }
            }

            return HTML;
        }
        catch (Excep) {
            //alert('GetSubMenus : ' + Excep + "," + JSON.stringify(Excep));
            throw oOneViewExceptionHandler.Create("FrameWork", "DefaultMenuComponent.GetSubMenus", Excep);
        }
    }

    this.ResetMenu = function ($scope, $compile) {
        try {

            MyInstance.LoadMetadata();
            var Html = MyInstance.GenerateMenu();

            //alert('LoadMenus Html : ' + Html);

            document.getElementById("MainMenuDiv").innerHTML = "";
            if (Html != "") {
                var _oOneViewCompiler = new OneViewCompiler();
                _oOneViewCompiler.CompileAndApeend($scope, $compile, Html, "MainMenuDiv");
            }

       
        }
        catch (Excep) {
            throw oOneViewExceptionHandler.Create("FrameWork", "DefaultMenuComponent.ResetMenu", Excep);
        }
    }
}


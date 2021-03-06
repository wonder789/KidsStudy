import "../css/bootstrap.min.css";
import "../scss/common.scss";
import "../scss/admin.scss";
import "../scss/student.scss";
import "angular-ui-grid/ui-grid.min.css";
import 'font-awesome/scss/font-awesome.scss';
import "./admin/templates/main.tmpl.html";
import "./common/templates/login.tmpl.html";
import "./student/templates/main.tmpl.html";

import StudentService from "./admin/services/StudentService";
import StudentController from "./admin/controllers/StudentController";
import LoginController from "./common/controllers/LoginController";
import AdminMainController from "./admin/controllers/AdminMainController";
import PaperService from "./admin/services/PaperService";
import PaperGroupService from "./admin/services/PaperGroupService";
import AuthService from "./common/services/AuthService";
import PaperGroupController from "./admin/controllers/PaperGroupController";
import PaperController      from "./admin/controllers/PaperController";

import StudentPaperGroupController from "././student/controllers/StudentPaperGroupController";
import StudentMainController from "./student/controllers/StudentMainController";
import StudentMainService    from "./student/services/StudentMainService";

import commonDirectives from "./common/directives/commonDirectives";

let app = angular.module("kidsStudy", [ 'ui.router', 'ui.bootstrap', 'ui.grid', 'ui.grid.selection' ]);

app.config(
    /** @ngInject */
    ($stateProvider, $urlRouterProvider, $qProvider) => {
    
    $qProvider.errorOnUnhandledRejections(false);

    let auth = {
        /** @ngInject */
        auth : ( AuthService, $state ) => {
            return AuthService.check()
                .then( () => {}
                , () => {
                    alert("로그인 후 이용하실수 있습니다.");
                    $state.go("login");
                });

        }
    };

    $stateProvider
        
        .state({
            name : "login",
            url : "/login",
            controller : "LoginController",
            controllerAs : "vm",
            templateUrl : "loginTemplate"  
        })
        .state({
            name : "admin",
            url : "/admin",
            controller : "AdminMainController",
            controllerAs : "main",
            templateUrl : "mainTemplate",
            resolve : auth
        })
        .state({
            name : "student",
            url : "/student",
            controller : "StudentMainController",
            controllerAs : "main",
            templateUrl : "studentMainTemplate",
            resolve : auth
        })
        .state("student.paperGroup",{
            url : "/paperGroup/:groupId",
            views : {
                content : {
                    controller : "StudentPaperGroupController",
                    controllerAs : "content",
                    templateUrl : "studentPaperListTemplate"
                }
            }
        })
        .state("admin.student", {
            url : "/student",
            views : {
                content : {
                    controller : "StudentController",
                    controllerAs : "content",
                    templateUrl : "studentAdminTemplate"
                }
            },
            resolve : auth
            
        })
        .state("admin.paperGroup",{
            url: '/paperGroup',
            views : {
                content : {
                    controller : "PaperGroupController",
                    controllerAs : "content",
                    templateUrl : "paperGroupTemplate"
                }
            },
            resolve : auth
        })
        .state("admin.paper",{
            url: '/paper',
            views : {
                content : {
                    controller : "PaperController",
                    controllerAs : "content",
                    templateUrl : "paperTemplate"
                }
            },
            resolve : auth
        });
    
    $urlRouterProvider.otherwise("/login");

});


app.service("StudentService", StudentService)
    .service("AuthService", AuthService)
    .service("PaperService", PaperService)
    .service("PaperGroupService", PaperGroupService)
    .service("StudentMainService", StudentMainService )
    .controller("StudentController", StudentController)
    .controller("PaperGroupController", PaperGroupController)
    .controller("PaperController", PaperController)
    .controller("LoginController", LoginController)
    .controller("AdminMainController", AdminMainController)
    .controller("StudentMainController", StudentMainController)
    .controller("StudentPaperGroupController", StudentPaperGroupController) ;


    commonDirectives(app);

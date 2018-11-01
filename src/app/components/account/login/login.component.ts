import { Component, OnInit } from '@angular/core';
import { Login } from "../../../models/account";
import { AuthenticationServiceService } from "../../../services/security/authentication-service.service"
import { Router } from '@angular/router';
import { AppComponent } from '../../../app.component';
import { from } from 'rxjs';

declare var $: any;
declare var jQuery: any;
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: [
    './login.component.css',
    '../../../../assets/global/plugins/select2/css/select2.min.css',
    '../../../../assets/global/plugins/select2/css/select2-bootstrap.min.css',
    '../../../../assets/pages/css/login.min.css',
    '../../../../assets/css/forms.css'
  ]
})
export class LoginComponent implements OnInit {
  model = new Login('', '', '');
  public authenticationService;
  private grecaptchaResponse: string = '';

  constructor(public _authenticationServiceService: AuthenticationServiceService, private _router: Router,
    private _appComponent: AppComponent
  ) {

  }

  public ngOnInit() {
    var Login = function () {

      var handleLogin = function () {

        $('.login-form').validate({
          errorElement: 'span', //default input error message container
          errorClass: 'help-block', // default input error message class
          focusInvalid: false, // do not focus the last invalid input
          rules: {
            username: {
              required: true
            },
            password: {
              required: true
            },
            remember: {
              required: false
            }
          },

          messages: {
            username: {
              required: "Username is required."
            },
            password: {
              required: "Password is required."
            }
          },

          invalidHandler: function (event, validator) { //display error alert on form submit   
            $('.alert-danger', $('.login-form')).show();
          },

          highlight: function (element) { // hightlight error inputs
            $(element)
              .closest('.form-group').addClass('has-error'); // set error class to the control group
          },

          success: function (label) {
            label.closest('.form-group').removeClass('has-error');
            label.remove();
          },

          errorPlacement: function (error, element) {
            error.insertAfter(element.closest('.input-icon'));
          },

          submitHandler: function (form) {
            // form.submit();
            return false;
          }
        });
      }

      var handleForgetPassword = function () {
        $('.forget-form').validate({
          errorElement: 'span', //default input error message container
          errorClass: 'help-block', // default input error message class
          focusInvalid: false, // do not focus the last invalid input
          ignore: "",
          rules: {
            email: {
              required: true,
              email: true
            }
          },

          messages: {
            email: {
              required: "Email is required."
            }
          },

          invalidHandler: function (event, validator) { //display error alert on form submit   

          },

          highlight: function (element) { // hightlight error inputs
            $(element)
              .closest('.form-group').addClass('has-error'); // set error class to the control group
          },

          success: function (label) {
            label.closest('.form-group').removeClass('has-error');
            label.remove();
          },

          errorPlacement: function (error, element) {
            error.insertAfter(element.closest('.input-icon'));
          },

          submitHandler: function (form) {
            // form.submit();
            return false;
          }
        });

        jQuery('#forget-password').click(function () {
          jQuery('.login-form').hide();
          jQuery('.forget-form').show();
        });

        jQuery('#back-btn').click(function () {
          jQuery('.login-form').show();
          jQuery('.forget-form').hide();
        });

      }

      var handleRegister = function () {

        function format(state) {
          if (!state.id) { return state.text; }
          var $state = $(
            '<span><img src="../assets/global/img/flags/' + state.element.value.toLowerCase() + '.png" class="img-flag" /> ' + state.text + '</span>'
          );

          return $state;
        }

        if (jQuery().select2 && $('#country_list').size() > 0) {
          $("#country_list").select2({
            placeholder: '<i class="fa fa-map-marker"></i>&nbsp;Select a Country',
            templateResult: format,
            templateSelection: format,
            width: 'auto',
            escapeMarkup: function (m) {
              return m;
            }
          });


          $('#country_list').change(function () {
            $('.register-form').validate().element($(this)); //revalidate the chosen dropdown value and show error or success message for the input
          });
        }

        $('.register-form').validate({
          errorElement: 'span', //default input error message container
          errorClass: 'help-block', // default input error message class
          focusInvalid: false, // do not focus the last invalid input
          ignore: "",
          rules: {

            fullname: {
              required: true
            },
            email: {
              required: true,
              email: true
            },
            address: {
              required: true
            },
            city: {
              required: true
            },
            country: {
              required: true
            },

            username: {
              required: true
            },
            password: {
              required: true
            },
            rpassword: {
              equalTo: "#register_password"
            },

            tnc: {
              required: true
            }
          },

          messages: { // custom messages for radio buttons and checkboxes
            tnc: {
              required: "Please accept TNC first."
            }
          },

          invalidHandler: function (event, validator) { //display error alert on form submit   

          },

          highlight: function (element) { // hightlight error inputs
            $(element)
              .closest('.form-group').addClass('has-error'); // set error class to the control group
          },

          success: function (label) {
            label.closest('.form-group').removeClass('has-error');
            label.remove();
          },

          errorPlacement: function (error, element) {
            if (element.attr("name") == "tnc") { // insert checkbox errors after the container                  
              error.insertAfter($('#register_tnc_error'));
            } else if (element.closest('.input-icon').size() === 1) {
              error.insertAfter(element.closest('.input-icon'));
            } else {
              error.insertAfter(element);
            }
          },

          submitHandler: function (form) {
            form[0].submit();
          }
        });

        jQuery('#register-btn').click(function () {
          jQuery('.login-form').hide();
          jQuery('.register-form').show();
        });

        jQuery('#register-back-btn').click(function () {
          jQuery('.login-form').show();
          jQuery('.register-form').hide();
        });
      }

      return {
        //main function to initiate the module
        init: function () {

          handleLogin();
          handleForgetPassword();
          handleRegister();

        }

      };

    }();

    jQuery(document).ready(function () {
      Login.init();
    });
  }

  loginSubmit(username: string, password: string) {

    this._authenticationServiceService.login(username, password, this.grecaptchaResponse)
      .subscribe((result) => {
        if (result) {
          this._authenticationServiceService.saveCookie(result);
          this._appComponent.ngOnInit();
          console.log(result);
        }
      })
  }

}

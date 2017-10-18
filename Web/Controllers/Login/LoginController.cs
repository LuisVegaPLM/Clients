using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Security;
using Web.Models;

namespace Web.Controllers
{
    public class LoginController : Controller
    {
        private PLMUsers db = new PLMUsers();
        public ApplicationUsers _roWApplicationusers = new ApplicationUsers();
        public Web.Models.Roles _roWrolesUsers = new Web.Models.Roles();
        public Applications _roWApplications = new Applications();
        public UserCountries UserCountries1 = new UserCountries();
        public Users _roWusers = new Users();
        public PLMCryptographyComponent.CryptographyComponent cryptography = new PLMCryptographyComponent.CryptographyComponent();
        Functions Functions = new Functions();
        public ActionResult Index()
        {
            return View();
        }
        [HttpGet]
        public ActionResult Login()
        {
            return View();
        }
        [HttpPost]
        public ActionResult Login(Models.Users _user)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    _user.Password = cryptography.encrypt(_user.Password);
                    string _nickName = _user.NickName;
                    string _password = _user.Password;
                    var _hashkey = System.Configuration.ConfigurationManager.AppSettings["HashKey"];
                    var _roWloginApp = db.Database.SqlQuery<plm_spLoginApplications_Result>("plm_spLoginApplications @User = '" + _nickName + "', @Password ='" + _password + "', @HashKey = '" + _hashkey + "'").ToList();

                    _roWusers.UserId = _roWloginApp[0].UsrUserId;
                    _roWusers.Active = _roWloginApp[0].UserActive;
                    _roWusers.CountryId = _roWloginApp[0].UserCountryId;
                    _roWusers.Email = _roWloginApp[0].UserEmail;
                    _roWusers.LastName = _roWloginApp[0].UserLastName;
                    _roWusers.Name = _roWloginApp[0].UserName;
                    _roWusers.NickName = _roWloginApp[0].UserNickName;
                    _roWusers.Password = _roWloginApp[0].UserPassword;

                    _roWApplicationusers.ApplicationId = _roWloginApp[0].UserApplicationId;
                    _roWApplicationusers.RoleId = _roWloginApp[0].UserRoleId;
                    _roWApplicationusers.UserId = _roWloginApp[0].UserUserId;

                    _roWrolesUsers.Active = _roWloginApp[0].RoleActive;
                    _roWrolesUsers.Description = _roWloginApp[0].RoleDescription;
                    _roWrolesUsers.RoleId = _roWloginApp[0].RoleId;

                    _roWApplications.ApplicationId = _roWloginApp[0].ApplicationsApplicationId;
                    _roWApplications.Active = _roWloginApp[0].ApplicationsActive;
                    _roWApplications.Description = _roWloginApp[0].ApplicationsDescription;
                    _roWApplications.HashKey = _roWloginApp[0].ApplicationsHashKey;

                    FormsAuthentication.SetAuthCookie(_roWusers.NickName, _roWusers.Active = true);
                    if (_roWApplicationusers.UserId == _roWusers.UserId)
                    {
                        if (_roWApplicationusers.RoleId == _roWrolesUsers.RoleId)
                        {
                            UserCont(_roWusers, _roWApplicationusers);
                            if (_roWrolesUsers.Description == "Administrador")
                            {
                                Functions.ActivitySesions(_roWusers, _roWApplicationusers);
                                return RedirectToAction("Index", "Analytics");
                                //return RedirectToAction("RedirectToAction", "Login");
                            }
                            if (_roWrolesUsers.Description == "Vendedor")
                            {
                                Functions.ActivitySesions(_roWusers, _roWApplicationusers);
                                return RedirectToAction("Index", "Analytics");
                            }
                            if (_roWrolesUsers.Description == "Diagramador")
                            {
                                Functions.ActivitySesions(_roWusers, _roWApplicationusers);
                                return RedirectToAction("Index", "Analytics");
                            }
                            if (_roWrolesUsers.Description == "Laboratorio de Información")
                            {
                                Functions.ActivitySesions(_roWusers, _roWApplicationusers);
                                return RedirectToAction("Index", "Analytics");
                            }
                        }
                    }
                }
            }
            catch (Exception _msgException)
            {
                if (_msgException.Message == "_errorAccess")
                {
                    ViewData["Error"] = "No tiene acceso al sistema.";
                }
                else if (_msgException.Message == "_errorapplication")
                {
                    ViewData["Error"] = "Hay un problema con la aplicación.";
                }
                else if (_msgException.Message == "_errorUser")
                {
                    ViewData["Error"] = "Ingrese sus credenciales correctamente.";
                }
                else
                {
                    ViewData["Error"] = "Ocurrio un problema al accesar a los servidores, disculpe los inconvenientes.";
                }
            }
            return View(_user);
        }
        public ActionResult Logout()
        {
            Session.Abandon();
            FormsAuthentication.SignOut();
            return RedirectToAction("Login", "Login");
        }
        public void UserCont(Models.Users user, Models.ApplicationUsers ApplicationUsers)
        {
            Functions _functions = new Functions();
            _functions.Countries(user);
            int userId = user.UserId;
            int countryId = _functions._countriesUsers.CountryId;
            int ApplicationId = _roWApplicationusers.ApplicationId;
            var list = _functions.lcoun;
            List<string> var = new List<string>();
            List<int> country = new List<int>();
            foreach (Countries _eachCountries in list)
            {
                var.Add(_eachCountries.ID);
                CountriesUsers c = new CountriesUsers(country, var, ApplicationId, userId);
                Session["CountriesUsers"] = c;
            }
            foreach (Countries _eachCountry in list)
            {
                country.Add(_eachCountry.CountryId);
                CountriesUsers c = new CountriesUsers(country, var, ApplicationId, userId);
                Session["CountriesUsers"] = c;
            }
        }
        public ActionResult RedirectToAction()
        {
            return View();
        }
    }
}

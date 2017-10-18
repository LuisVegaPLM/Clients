using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Web.Models;

namespace Web.Models
{
    public class Functions
    {
        private PLMUsers db = new PLMUsers();
        ActivitySessions _activitySessions = new ActivitySessions();
        public Countries_Users _countries_Users = new Countries_Users();
        public UserCountries _countriesUsers = new UserCountries();
        Countries _countries = new Countries();
        public List<Countries> lcoun = new List<Countries>();
        public Users _users = new Users();

        public void ActivitySesions(Models.Users user, Models.ApplicationUsers ApplicationUsers)
        {
            _activitySessions.Date = DateTime.Now;
            _activitySessions.UserId = user.UserId;
            _activitySessions.ApplicationId = ApplicationUsers.ApplicationId;
            db.ActivitySessions.Add(_activitySessions);
            db.SaveChanges();
        }
        public void Countries(Models.Users user)
        {
            var _roWuserCountries = from _userCountry in db.UserCountries
                                    where _userCountry.UserId == user.UserId
                                    select _userCountry;
            if (_roWuserCountries.LongCount() > 0)
            {
                foreach (UserCountries _eachRow in _roWuserCountries)
                {
                    _countriesUsers.CountryId = _eachRow.CountryId;
                    _countriesUsers.UserId = _eachRow.UserId;
                    var _roWcountriesUsers = from _contryUsers in db.Countries_Users
                                             where _contryUsers.CountryId == _countriesUsers.CountryId
                                             select _contryUsers;
                    if (_roWcountriesUsers.LongCount() > 0)
                    {
                        foreach (Countries_Users _eachcountries in _roWcountriesUsers)
                        {
                            _countries_Users = new Countries_Users();
                            _countries_Users.Active = _eachcountries.Active;
                            _countries_Users.CountryName = _eachcountries.CountryName;
                            _countries_Users.CountryId = _eachcountries.CountryId;
                            _countries_Users.ID = _eachcountries.ID;
                            lcoun.Add(_countries);
                        }
                    }
                }
            }
        }
    }
}
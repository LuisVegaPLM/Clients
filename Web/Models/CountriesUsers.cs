using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Web.Models
{
    public class CountriesUsers
    {
        #region Constructor

        public CountriesUsers(List<int> country, List<string> var, int ApplicationId, int userId)
        {
            id = new List<string>();
            id = var;
            countryid = new List<int>();
            countryid = country;
            AppId = ApplicationId;
            UId = userId;
        }
        #endregion
        #region Members
        private List<string> id;
        public List<int> countryid;
        public int AppId;
        public int UId;
        #endregion
        #region Properties
        public List<string> var
        {
            get
            {
                return id;
            }
            set
            {
                id = value;
            }
        }
        public List<int> country
        {
            get
            {
                return countryid;
            }
            set
            {
                countryid = value;
            }
        }
        public int ApplicationId
        {
            get
            {
                return AppId;
            }
            set
            {
                AppId = value;
            }
        }
        public int userId
        {
            get
            {
                return UId;
            }
            set
            {
                UId = value;
            }
        }
        #endregion
    }
}
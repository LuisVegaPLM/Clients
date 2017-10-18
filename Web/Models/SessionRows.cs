using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Web.Models
{
    public class SessionRows
    {
        #region Constructor
        public SessionRows(string Values)
        {
            Rows = Values;
        }

        #endregion

        #region Member

        public string Rows;

        #endregion

        #region Properties


        public string Values
        {
            get
            {
                return Rows;
            }
            set
            {
                Rows = value;
            }
        }
        #endregion
    }
}
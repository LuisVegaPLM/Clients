using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Web.Models
{
    public class GetCountries
    {
        public int CountryId { get; set; }
        public string CountryName { get; set; }
        public string ID { get; set; }
        public bool Active { get; set; }
    }
}
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Web.Models
{
    public class GetClients
    {
        public string Name { get; set; }
        public string ProfessionName { get; set; }
        public string SpecialityName { get; set; }
        public int? CountryId { get; set; }
        public string CountryName { get; set; }
        public int? StateId { get; set; }
        public string StateName { get; set; }
        public string Email { get; set; }
    }
}
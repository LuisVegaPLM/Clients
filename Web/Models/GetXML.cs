using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Web.Models
{
    public class GetXML
    {
        public int DivisionId { get; set; }
        public string DivisionName { get; set; }
        public int CategoryId { get; set; }
        public string CategoryName { get; set; }
        public int ProductId { get; set; }
        public string ProductName { get; set; }
        public int PharmaFormId { get; set; }
        public string PharmaForm { get; set; }
        public int EditionId { get; set; }
        public string NameXML { get; set; }
       public string XMLContent { get; set; }
    }
}
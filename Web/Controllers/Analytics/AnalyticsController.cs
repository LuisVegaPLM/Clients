using OfficeOpenXml;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.IO;
using Web.Models;
using Microsoft.Practices.EnterpriseLibrary.Data;
using Microsoft.Practices.EnterpriseLibrary.Data.Sql;
using System.Text;
using System.Data;
using System.Data.Common;
using System.Data.SqlClient;
using System.Xml;
using System.Web.UI.WebControls;
using System.Drawing;


namespace Web.Controllers.Analytics
{
    public class AnalyticsController : Controller
    {
        private DataTable table = new DataTable();

        public ActionResult Index(HttpPostedFileBase file, int? value)
        {
            if (file !=null)
            {
                int tamaño = 0;
                int final = 0;
                //String PathP = System.Configuration.ConfigurationManager.AppSettings["Path"].ToString();
                String PathP = Request.MapPath("~/ReportesXLS");
                string CodeString ="";

                String FileName = file.FileName;
                String Extention = Path.GetExtension(file.FileName);
                var root = Path.Combine(PathP, "Analytics");

                try
                {
                    if (System.IO.Directory.Exists(root))
                    {
                        root = Path.Combine(root, FileName);

                        file.SaveAs(root);
                    }
                    else
                    {
                        Directory.CreateDirectory(root);

                        root = Path.Combine(root, FileName);

                        file.SaveAs(root);
                    }

                }
                catch (Exception e)
                {
                    String msg = e.Message;

                    return Json(msg, JsonRequestBehavior.AllowGet);
                }

                string path = root;
                DirectoryInfo directory = new DirectoryInfo(path);

                FileInfo item = new FileInfo(path);

                string allcontent = getContent(item.FullName);
                allcontent = ReplaceContent(allcontent);
                

                if (value == 1)
                {
                    allcontent = CreateCad(allcontent);

                    //String conexion = "data source=195.192.2.249;initial catalog=PLMClients 20160913;user id=sa;password=t0m$0nl@t1n@";
                    String conexion = System.Configuration.ConfigurationManager.AppSettings["Conexion"].ToString();
                    SqlConnection cnn = new SqlConnection(conexion);
                    cnn.Open();
                    try
                    {

                        String consulta = "select distinct ClientId from plm_vwClientsByApplication where CodeString in (" + allcontent + ")" + " ";
                        SqlCommand cmd = new SqlCommand(consulta, cnn);


                        SqlDataReader read = cmd.ExecuteReader();


                        if (read.HasRows == true)
                        {
                            while (read.Read())
                            {
                                CodeString= CodeString + read.GetValue(0).ToString() + ",";
                            }

                        }


                        allcontent = CodeString.Trim();

                    }

                    catch (Exception e)
                    {
                    }

                }
                tamaño = allcontent.Length;
                final = tamaño - 1;
                allcontent = allcontent.Substring(0, final);

                StreamWriter SW;
                SW = System.IO.File.CreateText(PathP + @"\Content.txt");

                root = Path.Combine(root, "Content.txt");
                SW.Write(allcontent);
                SW.Close();
                SW.Dispose();
                return View();
               
                   
            }
 
            return View();
 }
        public ActionResult Report(string file)
        {

            //String PathP = System.Configuration.ConfigurationManager.AppSettings["Path"].ToString();
            String PathP   = Request.MapPath("~/ReportesXLS");
            FileInfo item = new FileInfo(PathP + @"\Content.txt");

            string allcontent = getContent(item.FullName);

            //String conexion = "data source=195.192.2.249;initial catalog=PLMClients 20160913;user id=sa;password=t0m$0nl@t1n@";
            String conexion = System.Configuration.ConfigurationManager.AppSettings["Conexion"].ToString();
            SqlConnection cnn = new SqlConnection(conexion);
            cnn.Open();
            try
            {
                List<GetClients> GetClient_Result = new List<GetClients>();

                    var auxCountry = "";
                    var auxSatet = "";
                    String consulta = "select c.FirstName + ' '  + c.LastName + ' '  + c.SecondLastName As Name,p.ProfessionName, ss.SpecialityName,c.CountryId, cs.CountryName , c.StateId , s.StateName,c.Email from Clients c left join Countries cs on c.CountryId = cs.CountryId left join States s on c.StateId = s.StateId left join ProfessionClients ps on c.ClientId = ps.ClientId left join Professions p on p.ProfessionId = ps.ProfessionId left join SpecialityClients sc on c.ClientId = sc.ClientId left join Specialities ss on sc.SpecialityId = ss.SpecialityId where c.ClientId in (" + allcontent + ")" + "order by 1,2,3,4 ";  
                    SqlCommand cmd = new SqlCommand(consulta, cnn);
                    

                    SqlDataReader read = cmd.ExecuteReader();
                    
                      
                    if (read.HasRows == true)
                        {
                          while(read.Read())
                          {
                              GetClients clientes = new GetClients();
                              clientes.Name = read.GetValue(0).ToString();
                              clientes.ProfessionName = read.GetValue(1).ToString();
                              clientes.SpecialityName = read.GetValue(2).ToString();
                              auxCountry = read.GetValue(3).ToString();
                              if (auxCountry != "")
                              {
                                  clientes.CountryId = Convert.ToInt32(read.GetValue(3));
                              }
                              else
                              {
                                  clientes.CountryId = null;
                              }

                              clientes.CountryName = read.GetValue(4).ToString();
                              auxSatet = read.GetValue(5).ToString();
                              if (auxSatet != "")
                              {
                                  clientes.StateId = Convert.ToInt32(read.GetValue(5));
                              }
                              else
                              {
                                  clientes.StateId = null;
                              }
                              clientes.StateName = read.GetValue(6).ToString();
                              clientes.Email = read.GetValue(7).ToString();
                              GetClient_Result.Add(clientes);
                          }
                        
                          }
                            
                    else
                    {
                        string men = "No hay datos";
                    }



                    cnn.Close();
                    return View(GetClient_Result);

            }

            catch(Exception e)
            {
                string message = e.Message;
                return View(false);
            }

        }
        public string getContent(string sourcePath)
        {
            if (string.IsNullOrEmpty(sourcePath))
                throw new ArgumentException("The source path cannot be null or empty.");

            StreamReader sr = new StreamReader(sourcePath, System.Text.Encoding.UTF8);
            string Content = sr.ReadToEnd();
            Content = Content.Trim();
            sr.Close();
            sr.Dispose();

            return Content;
        }
        public static string ReplaceContent(string file)
        {
            file = file.Replace("\r\n", ",");
            file = file.Replace(" \" ", "");
            file = file.Replace("/", "");
            file = file.Replace(" / ", "");
            file = file.Replace(":", "");  
            file = file.Replace("®", "");
            file = file.Replace("*", "");
            file = file.Replace("\"", "");

            return file;
        }
        public string CreateCad(string content)
        {
            
            content = "PLM," + content;
            content = content.Replace(",","','");
            content = content + "'";
            content = content.Replace("PLM',", "");


            return content;
        }
        public JsonResult rowsPerPage(string Value)
        {
            if (Value == "0")
            {
                Session["SessionRows"] = null;
            }
            else
            {
                SessionRows SessionRows = new SessionRows(Value);
                Session["SessionRows"] = SessionRows;
            }

            return Json(true, JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetData(int value, int? cid )
        {

            //String PathP = System.Configuration.ConfigurationManager.AppSettings["Path"].ToString();
            String PathP   = Request.MapPath("~/ReportesXLS");
            FileInfo item = new FileInfo(PathP + @"\Content.txt");
            String consulta="";
            string allcontent = getContent(item.FullName);

            //String conexion = "data source=195.192.2.249;initial catalog=PLMClients 20160913;user id=sa;password=t0m$0nl@t1n@";
            String conexion = System.Configuration.ConfigurationManager.AppSettings["Conexion"].ToString();
            SqlConnection cnn = new SqlConnection(conexion);
            cnn.Open();
            try
            {
                List<GetClientsByInfo> GetClientsByInfo_Result = new List<GetClientsByInfo>();

                if(value ==1)
                {
                    consulta = "select  case when p.ProfessionName is null then ' N/A' else p.ProfessionName end As ProfessionName, count (*) AS TotalProfessions from Clients c left join Countries cs on c.CountryId = cs.CountryId left join States s on c.StateId = s.StateId left join ProfessionClients ps on c.ClientId = ps.ClientId left join Professions p on p.ProfessionId = ps.ProfessionId left join SpecialityClients sc on c.ClientId = sc.ClientId left join Specialities ss on sc.SpecialityId = ss.SpecialityId  where c.ClientId in (" + allcontent + ")" + "group by  p.ProfessionName order by 2 desc ";
                }

                if(value ==2)
                {
                    consulta = "select case when ss.SpecialityName is null then ' N/A' else ss.SpecialityName end As SpecialityName,  count (*) AS TotalSpecialityName from Clients c left join Countries cs on c.CountryId = cs.CountryId left join States s on c.StateId = s.StateId left join ProfessionClients ps on c.ClientId = ps.ClientId left join Professions p on p.ProfessionId = ps.ProfessionId left join SpecialityClients sc on c.ClientId = sc.ClientId left join Specialities ss on sc.SpecialityId = ss.SpecialityId  where c.ClientId in (" + allcontent + ")" + "group by  ss.SpecialityName order by 2 desc ";
                }
                if (value== 3)
                {
                    consulta = "select case when c.CountryName is null then ' N/A' else c.CountryName end As CountryName, count (tmp.ClientId) AS TotalCountryName from Countries c left join (select  cs.CountryName , c.CountryId, c.ClientId from Clients c inner join Countries cs on c.CountryId = cs.CountryId where c.ClientId in (" + allcontent + ")) tmp on c.CountryId = tmp.CountryId group by  c.CountryName order by 2 desc ";
                }

                if (value == 4)
                {
                    consulta = "select case when s.StateName is null then ' N/A' else s.StateName end As StateName,  count (tmp.ClientId) AS TotalStateName from States s left join (select s.StateName, s.StateId , c.CountryId, c.ClientId  from States s inner join Countries cs on s.CountryId = cs.CountryId inner join Clients c on cs.CountryId = c.CountryId and s.StateId = c.StateId where c.ClientId in (" + allcontent + ") and c.CountryId  =" + cid + " and s.CountryId = " + cid + ") tmp on  s.StateId = tmp.StateId where s.CountryId = " + cid + " group by s.StateName order by 2 desc";
                }
                
                SqlCommand cmd = new SqlCommand(consulta, cnn);


                SqlDataReader read = cmd.ExecuteReader();


                if (read.HasRows == true)
                {
                    while (read.Read())
                    {
                        GetClientsByInfo GetClientsByInfo = new GetClientsByInfo();
                        GetClientsByInfo.Name = read.GetValue(0).ToString();
                        GetClientsByInfo.Total = Convert.ToInt32(read.GetValue(1));

                        GetClientsByInfo_Result.Add(GetClientsByInfo);
                    }

                }

                else
                {
                    return Json(false, JsonRequestBehavior.AllowGet);
                }



                cnn.Close();
                return Json(GetClientsByInfo_Result, JsonRequestBehavior.AllowGet);

            }

            catch (Exception e)
            {
                string message = e.Message;
                return Json(true, JsonRequestBehavior.AllowGet);
            }

        }
        public JsonResult GetCountry(int value) 
        {
            //String conexion = "data source=195.192.2.249;initial catalog=PLMClients 20160913;user id=sa;password=t0m$0nl@t1n@";
            String conexion = System.Configuration.ConfigurationManager.AppSettings["Conexion"].ToString();
            SqlConnection cnn = new SqlConnection(conexion);
            cnn.Open();

            List<GetCountries> Getcountries_Result = new List<GetCountries>();
            String consulta = "select c.CountryId,c.CountryName,c.ID,c.Active from Countries c order by c.CountryName";

            try
            {
                SqlCommand cmd = new SqlCommand(consulta, cnn);


                SqlDataReader read = cmd.ExecuteReader();


                if (read.HasRows == true)
                {
                    while (read.Read())
                    {
                        GetCountries GetCountriesinf = new GetCountries();
                        GetCountriesinf.CountryId = Convert.ToInt32(read.GetValue(0));
                        GetCountriesinf.CountryName = read.GetValue(1).ToString();
                        GetCountriesinf.ID = read.GetValue(2).ToString();
                        GetCountriesinf.Active = Convert.ToBoolean(read.GetValue(3));


                        Getcountries_Result.Add(GetCountriesinf);
                    }

                }

                else
                {
                    string men = "No hay datos";
                }



                cnn.Close();
                return Json(Getcountries_Result, JsonRequestBehavior.AllowGet);
            }
            catch (Exception e)
            {
                string message = e.Message;
                return Json(true, JsonRequestBehavior.AllowGet);
            }

        }
        public FileResult ExcelReport(string val)
        {

            var bind = new GridView();
            List<GetClients> GetClient_Result = new List<GetClients>();
            //String PathP = System.Configuration.ConfigurationManager.AppSettings["Path"].ToString();
            String PathP   = Request.MapPath("~/ReportesXLS");
            FileInfo item = new FileInfo(PathP + @"\Content.txt");

            string allcontent = getContent(item.FullName);

            //String conexion = "data source=195.192.2.249;initial catalog=PLMClients 20160913;user id=sa;password=t0m$0nl@t1n@";
            String conexion = System.Configuration.ConfigurationManager.AppSettings["Conexion"].ToString();
            SqlConnection cnn = new SqlConnection(conexion);
            cnn.Open();
            try
            {
                

                var auxCountry = "";
                var auxSatet = "";
                String consulta = "select c.FirstName + ' '  + c.LastName + ' '  + c.SecondLastName As Name,p.ProfessionName, ss.SpecialityName,c.CountryId, cs.CountryName , c.StateId , s.StateName,c.Email from Clients c left join Countries cs on c.CountryId = cs.CountryId left join States s on c.StateId = s.StateId left join ProfessionClients ps on c.ClientId = ps.ClientId left join Professions p on p.ProfessionId = ps.ProfessionId left join SpecialityClients sc on c.ClientId = sc.ClientId left join Specialities ss on sc.SpecialityId = ss.SpecialityId where c.ClientId in (" + allcontent + ")" + "order by 1,2,3,4 ";
                SqlCommand cmd = new SqlCommand(consulta, cnn);


                SqlDataReader read = cmd.ExecuteReader();

                    while (read.Read())
                    {
                        GetClients clientes = new GetClients();
                        clientes.Name = read.GetValue(0).ToString();
                        clientes.ProfessionName = read.GetValue(1).ToString();
                        clientes.SpecialityName = read.GetValue(2).ToString();
                        auxCountry = read.GetValue(3).ToString();
                        if (auxCountry != "")
                        {
                            clientes.CountryId = Convert.ToInt32(read.GetValue(3));
                        }
                        else
                        {
                            clientes.CountryId = null;
                        }

                        clientes.CountryName = read.GetValue(4).ToString();
                        auxSatet = read.GetValue(5).ToString();
                        if (auxSatet != "")
                        {
                            clientes.StateId = Convert.ToInt32(read.GetValue(5));
                        }
                        else
                        {
                            clientes.StateId = null;
                        }
                        clientes.StateName = read.GetValue(6).ToString();
                        clientes.Email = read.GetValue(7).ToString();
                        GetClient_Result.Add(clientes);
                    }

                



                cnn.Close();

            }

            catch (Exception e)
            {
                string message = e.Message;
            }



            ///////////////////////////////


            DataColumn Nombre = new DataColumn();
            Nombre.DataType = typeof(string);
            Nombre.ColumnName = "Nombre";


            DataColumn Profesion = new DataColumn();
            Profesion.DataType = typeof(string);
            Profesion.ColumnName = "Profesión";

            DataColumn Especialidad = new DataColumn();
            Especialidad.DataType = typeof(string);
            Especialidad.ColumnName = "Especialidad";

            DataColumn Pais = new DataColumn();
            Pais.DataType = typeof(string);
            Pais.ColumnName = "Pais";

            DataColumn Estado = new DataColumn();
            Estado.DataType = typeof(string);
            Estado.ColumnName = "Estado";

            DataColumn Email = new DataColumn();
            Email.DataType = typeof(string);
            Email.ColumnName = "Email";

            table.Columns.Add(Nombre);
            table.Columns.Add(Profesion);
            table.Columns.Add(Especialidad);
            table.Columns.Add(Pais);
            table.Columns.Add(Estado);
            table.Columns.Add(Email);



            foreach (var resul in GetClient_Result)
            {       table.Rows.Add(
                    resul.Name,
                    resul.ProfessionName,
                    resul.SpecialityName,
                    resul.CountryName,
                    resul.StateName,
                    resul.Email);
                
            }

            string Directory = Request.MapPath("~/ReportesXLS");
            if (System.IO.Directory.Exists(Directory))
            {
                //
            }
            else
            {   // Crea el directorio
                System.IO.Directory.CreateDirectory(Directory);
            }
            bind.DataSource = table;

            FileInfo newFile = new FileInfo(Request.MapPath("~/ReportesXLS/Analytics.xlsx"));
            ExcelPackage pkg = new ExcelPackage(newFile);

            if (newFile.Exists)
            {
                System.IO.File.Delete(Server.MapPath("~/ReportesXLS/Analytics.xlsx"));
                newFile.Delete();
                pkg.Workbook.Worksheets.Delete("Analytics Excel");
                ExcelWorksheet worksheet = pkg.Workbook.Worksheets.Add("Analytics Excel");
                

                worksheet.Cells["A1"].LoadFromDataTable(table, true);
                using (ExcelRange range = worksheet.Cells["A1:F1"])
                {
                    range.Style.Font.Bold = true;
                    range.Style.Fill.PatternType = OfficeOpenXml.Style.ExcelFillStyle.Solid;
                    range.Style.Fill.BackgroundColor.SetColor(Color.DimGray);
                    range.Style.Font.Color.SetColor(Color.White);
                    range.Style.ShrinkToFit = false;
                    range.Style.Font.Size = 12;
                    range.AutoFitColumns();
                    range.Style.Font.Name = "Arial Narrow";
                }
                worksheet.Cells.Style.Font.Name = "Arial Narrow";

            }
            else
            {
                ExcelWorksheet worksheet = pkg.Workbook.Worksheets.Add("Analytics Excel");
               
                worksheet.Cells["A1"].LoadFromDataTable(table, true);
                using (ExcelRange range = worksheet.Cells["A1:F1"])
                {
                    range.Style.Font.Bold = true;
                    range.Style.Fill.PatternType = OfficeOpenXml.Style.ExcelFillStyle.Solid;
                    range.Style.Fill.BackgroundColor.SetColor(Color.DimGray);
                    range.Style.Font.Color.SetColor(Color.White);
                    range.Style.ShrinkToFit = false;
                    range.Style.Font.Size = 12;
                    range.AutoFitColumns();
                    range.Style.Font.Name = "Arial Narrow";
                }
                worksheet.Cells.Style.Font.Name = "Arial Narrow";

            }

            pkg.SaveAs(newFile);
            var filepath = System.IO.Path.Combine(Server.MapPath("~/ReportesXLS/Analytics.xlsx"));
            return File(filepath, "application/vnd.ms-excel", "Analytics.xlsx");
        }
        

        public JsonResult XML(string file)
        {

            int count = 0;
            int final = 0;
            String conexion = "data source=195.192.2.249;initial catalog=Medinet 20170721;user id=sa;password=t0m$0nl@t1n@";
            SqlConnection cnn = new SqlConnection(conexion);
            cnn.Open();
            try
            {
                List<GetXML> GetXML_Result = new List<GetXML>();

                String consulta = "select * from FXML where XMLContent is not null";
                SqlCommand cmd = new SqlCommand(consulta, cnn);


                SqlDataReader read = cmd.ExecuteReader();
                String PathP = System.Configuration.ConfigurationManager.AppSettings["Path"].ToString();
                

                if (read.HasRows == true)
                {
                    while (read.Read())
                    {
                        GetXML GetXML = new GetXML();
                        GetXML.NameXML = read.GetValue(9).ToString();
                        GetXML.XMLContent = read.GetValue(10).ToString();
                        GetXML_Result.Add(GetXML);
                        var root = Path.Combine(PathP, "XML");


                        GetXML.NameXML = ReplaceContent(GetXML.NameXML);

                        if (System.IO.File.Exists(root + @"\" + GetXML.NameXML ))
                        {
                            GetXML.NameXML = GetXML.NameXML + "_1";
                        }


                        StreamWriter SW;
                        SW = System.IO.File.CreateText(root + @"\" + GetXML.NameXML);

                        root = Path.Combine(root, GetXML.NameXML);
                        SW.Write(GetXML.XMLContent);
                        SW.Close();
                        SW.Dispose();
                        count = count + 1;
                        
                    }

                }

                else
                {
                    string men = "No hay datos";
                }
                //return View(GetClient_Result);

                final = count;
                return Json(true, JsonRequestBehavior.AllowGet);

               }

            catch (Exception e)
            {
                string message = e.Message;
                return Json(false, JsonRequestBehavior.AllowGet);
            }

        }

	}
}
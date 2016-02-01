using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using TRS.Models;
using TRS.Repository;

namespace TRS.Service
{
    public class TranslationService
    {
        private readonly TransRepository _repo = null;
        public TranslationService()
        {
            _repo = new TransRepository();
        }

        public IEnumerable<Translation> GetTopToTranslate(int top)
        {
            //return _repo.GetAll().Take(100).Where(t => t.Spanish == string.Empty);
            
            Translation[] translations =
            {
                new Translation {TransId = 1, TransKey = "ABOUT_DATABASECREATEDBY", Text = "Created By"},
                new Translation {TransId = 2, TransKey = "ABOUT_DATABASECREATIONDATE", Text = "Creation Date"},
                new Translation {TransId = 3, TransKey = "ABOUT_DATABASECREATIONMACHINE", Text = "Created on Machine"},
                new Translation {TransId = 4, TransKey = "ABOUT_DATABASEDESCRIPTION", Text = "Description"},
                new Translation {TransId = 5, TransKey = "ABOUT_DATABASEDETAILS", Text = "Database Details"},
                new Translation {TransId = 6, TransKey = "ABOUT_DATABASEID", Text = "Identifier"},
                new Translation {TransId = 7, TransKey = "ABOUT_DATABASEMASTERDATABASEID", Text = "Master Database Id"},
                new Translation {TransId = 8, TransKey = "ABOUT_DOWNLOAD", Text = "Download Version Details"},
                new Translation {TransId = 9,TransKey = "ABOUT_DOWNLOADVERSIONINFORMATION",Text = "Downloads a text file containing the version information"},
                new Translation {TransId = 10,TransKey = "ABOUT_MIT_LICENSING",Text = "Where an MIT license is mentioned, this is a license of the form presented here:"}
            };          
            return translations;  
        }
    }
}
﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using TRS.Models;

namespace TRS.Repository
{
    public class TranslationIni : System.Data.Entity.DropCreateDatabaseAlways<TransDataContext>
    {
        protected override void Seed(TransDataContext context)
        {
            var translations = new List<Translation>
            {
//ABOUT_PROXYINDICATOR	(configured as a Proxy Site)
//ABOUT_THIRDPARTY	Third Party Licenses
//ABOUT_WEBSITEVERSION	Website Version:
//ABOUT_WORKSTATION	Current Workstation:
//ACTIONS	Actions
//ACTIONS_DESCRIPTIONS__	Represents the top level group for the actions in the system.
                new Translation { TransKey = "ABOUT_DATABASECREATEDBY", Text = "Created By"},
                new Translation { TransKey = "ABOUT_DATABASECREATIONDATE", Text = "Creation Date"},
                new Translation { TransKey = "ABOUT_DATABASECREATIONMACHINE", Text = "Created on Machine"},
                new Translation { TransKey = "ABOUT_DATABASEDESCRIPTION", Text = "Description"},
                new Translation { TransKey = "ABOUT_DATABASEDETAILS", Text = "Database Details"},
                new Translation { TransKey = "ABOUT_DATABASEID", Text = "Identifier"},
                new Translation { TransKey = "ABOUT_DATABASEMASTERDATABASEID", Text = "Master Database Id"},
                new Translation { TransKey = "ABOUT_DOWNLOAD", Text = "Download Version Details"},
                new Translation
                {
                    
                    TransKey = "ABOUT_DOWNLOADVERSIONINFORMATION",
                    Text = "Downloads a text file containing the version information"
                },
                new Translation
                {
                    
                    TransKey = "ABOUT_MIT_LICENSING",
                    Text = "Where an MIT license is mentioned, this is a license of the form presented here:"
                },
            };

            translations.ForEach(s => context.Translations.Add(s));
            context.SaveChanges();
        }
    }
}
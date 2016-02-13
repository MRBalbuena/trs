using System;
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
                new Translation {                   
                    TransKey = "ABOUT_DOWNLOADVERSIONINFORMATION",
                    Text = "Downloads a text file containing the version information"
                },
                new Translation{                    
                    TransKey = "ABOUT_MIT_LICENSING",
                    Text = "Where an MIT license is mentioned, this is a license of the form presented here:"
                },
                new Translation{
                    TransKey = "ABOUT_PROXYINDICATOR",
                    Text = "(configured as a Proxy Site)"
                },
                new Translation{
                    TransKey = "ABOUT_THIRDPARTY",
                    Text = "Third Party Licenses"
                },
                new Translation{
                    TransKey = "ABOUT_WEBSITEVERSION",
                    Text = "Website Version:"
                },
                new Translation{
                    TransKey = "ABOUT_WORKSTATION",
                    Text = "Current Workstation:"
                },
                new Translation{
                    TransKey = "ACTIONS",
                    Text = "Actions"
                },
                new Translation{
                    TransKey = "ACTIONS_DESCRIPTIONS__",
                    Text = "Represents the top level group for the actions in the system."
                },
                new Translation{
                    TransKey = "ACTIONS_DESCRIPTIONS_APPROVALJOB_",
                    Text = "Represents the group of actions applicable to Approval Requests in the Repository"
                },
                new Translation{
                    TransKey = "ACTIONS_DESCRIPTIONS_APPROVALJOB_CONTRIBUTE_",
                    Text = "Represents a group of actions applicable to user contributions into an Approval Requests/Job (e.g. attachments, votes)"
                },
                new Translation{
                    TransKey = "ACTIONS_DESCRIPTIONS_APPROVALJOB_CONTRIBUTE_ADDCOMMENT",
                    Text = "Occurs when a user adds a comment to an Approval Request"
                },
            };

            translations.ForEach(s => context.Translations.Add(s));
            context.SaveChanges();
        }
    }
}
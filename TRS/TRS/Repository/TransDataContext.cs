using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;
using TRS.Models;

namespace TRS.Repository
{
    public class TransDataContext: DbContext
    {
        public DbSet<Translation> Translations { get; set; }
    }
}
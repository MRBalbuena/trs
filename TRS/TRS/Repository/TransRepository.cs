using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Data.Entity.Migrations;
using System.Linq;
using System.Runtime.InteropServices;
using System.Web;
using TRS.Models;

namespace TRS.Repository
{
    public class TransRepository: Repository<Translation>
    {
        private readonly TransDataContext _context = null;
        public TransRepository()
        {
            _context = new TransDataContext();
        }
   }
}
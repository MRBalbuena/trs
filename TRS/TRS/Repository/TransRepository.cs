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

        public Translation Get(int id)
        {
            return _context.Translations.Find(id);
        }

        public IEnumerable<Translation> GetAll()
        {
            return _context.Translations;
        }

        public bool Update(Translation translation)
        {
            _context.Translations.AddOrUpdate(translation);
            _context.SaveChanges();
            return true;
        }
   }
}
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using TRS.Repository;

namespace TRS.Service
{
    public class TranslationService
    {
        private readonly TransDataContext _context = null;
        public TranslationService()
        {
            _context = new TransDataContext();
        }


    }
}
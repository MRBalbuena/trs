using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;
using System.Web.UI.WebControls;
using TRS.Models;
using TRS.Repository;
using TRS.Service;

namespace TRS.Controllers
{
    
    public class TranslationController : ApiController
    {
        private readonly TranslationService _translations = null;

        public TranslationController()
        {
            _translations = new TranslationService();
        }

        // GET: Translation
        
        public IEnumerable<Translation> Get()
        {
            return _translations.GetTopToTranslate(100);
        }
    }
}
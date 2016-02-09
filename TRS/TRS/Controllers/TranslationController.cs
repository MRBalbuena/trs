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

        public Translation Get(int id)
        {
            return new Translation
            {
                TransId = id,
                Text = "This is a new phrase to translate",
                TransKey = "NEW_TEXT_TO_TRANSLATE",
                Spanish = ""
            };
        }

        [HttpPost]
        [Route("api/translation/block")]
        public string Block(int id, string user)
        {
            return _translations.BlockPhrase(id, user);
        }

        public void Post(Translation translation)
        {
            _translations.Save(translation);
        }

        [Route("api/users")]
        public IEnumerable<User> GetUsers()
        {
            var users = new List<User> {                 
                new User { Name="Gabriela", Pwd = "GNG"},
                new User { Name="Micaela", Pwd = "MBG"},
                new User { Name="Valentina", Pwd = "VBG"},
                new User { Name="Marcelo", Pwd = "MRB"}
                };
            return users;
        }

        [HttpPost] 
        [Route("api/translation/validate")]      
        public bool Validate(User user)
        {
            return true;
        }
    }
}
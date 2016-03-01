﻿using Newtonsoft.Json;
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
            return _translations.GetTopToTranslate(10);
        }

        [HttpGet]
        [Route("api/translation/getMore")]
        public IEnumerable<Translation> GetMore()
        {
            return _translations.GetTopToTranslate(30);
        }

        public Translation Get(int id)
        {
            return _translations.GetPhrase(id);
        }

        [HttpPost]
        [Route("api/block")]
        public string block([FromBody] string data)
        {
            if (string.IsNullOrEmpty(data)) return "no data available";
            //return "ok";
            int id = Convert.ToInt32( data.Split((",").ToCharArray())[0]);
            string user = data.Split((",").ToCharArray())[1];
            return _translations.BlockPhrase(id, user);
        }

        public void Post(Translation translation)
        {
            _translations.SaveTranslation(translation);
        }

        [HttpGet]
        [Route("api/translation/searchByWords")]
        public IEnumerable<Translation> GetSearchByWords(string words)
        {
            return _translations.SearchByWord(words);
        }

        [HttpGet]
        [Route("api/translation/unchecked")]
        public IEnumerable<Translation> GetUnchecked()
        {
            return _translations.GetUnchecked();
        }

        [Route("api/users")]
        public IEnumerable<User> GetUsers()
        {
            var users = new List<User> {                 
                new User { Name="Gabriela", Pwd = "GGA"},
                new User { Name="Micaela", Pwd = "MBG"},
                new User { Name="Valentina", Pwd = "VBG"},
                new User { Name="Marcelo", Pwd = "MRB"}
                };
            return users;
        }

        [HttpGet] 
        [Route("api/translation/stats")]      
        public Stats GetStats(User user)
        {
            return _translations.GetStats();
        }
    }
}
using System;
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
            var translations = _repo.GetAll()                
                .Where(t => t.Spanish == null)
                .Take(10)
                .OrderBy(t => t.TransId)                
                .ToList();
            translations.Where(t => t.BlockedTime < DateTime.Now.AddMinutes(-10)).ToList().ForEach(t => {
                t.BlockedBy = string.Empty; t.BlockedTime = null;
            }); 
            return translations;
        }

        public Translation GetPhrase(int id)
        {
            return _repo.Get(id);
        }

        public string BlockPhrase(int id, string user)
        {
            var phrase = _repo.Get(id);
            if (!string.IsNullOrEmpty(phrase.BlockedBy)) return phrase.BlockedBy;
            if (!string.IsNullOrEmpty(phrase.Spanish)) return phrase.TransBy;
            phrase.BlockedBy = user;
            phrase.BlockedTime = DateTime.Now;
            _repo.Update(phrase);
            _repo.SaveChanges();
            return "";
        }

        public void SaveTranslation(Translation translation)
        {
            var phrase = _repo.Get(translation.TransId);
            if(phrase != null)
            {
                phrase.Spanish = translation.Spanish;
                phrase.TransBy = translation.TransBy;
                phrase.TransDate = DateTime.Now;
                phrase.BlockedBy = null;
                phrase.BlockedTime = null;
            }
            _repo.Update(phrase);
            _repo.SaveChanges();
        }
    }
}
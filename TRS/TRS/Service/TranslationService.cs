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
            return _repo.GetAll().ToList();
        }

        public Translation GetPhrase(int id)
        {
            return _repo.Get(id);
        }

        public string BlockPhrase(int id, string user)
        {
            var phrase = _repo.Get(id);
            if (!string.IsNullOrEmpty(phrase.BlockedBy)) return phrase.BlockedBy;
            phrase.BlockedBy = user;
            phrase.BlockedTime = TimeSpan.FromTicks(DateTime.Now.Ticks);
            _repo.Update(phrase);
            _repo.SaveChanges();
            return "";
        }

        public void Save(Translation translation)
        {
            //TODO: MRB uncomment when db is set
            //_repo.Update(translation);
            //_repo.SaveChanges();
        }
    }
}
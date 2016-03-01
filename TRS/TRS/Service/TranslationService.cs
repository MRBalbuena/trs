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
                .Take(top)
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

        public Stats GetStats()
        {
            var tot = _repo.GetAll().Count();
            double translated = _repo.GetAll().Count(t => !string.IsNullOrEmpty(t.Spanish));
            double transChecked = _repo.GetAll().Count(t => !string.IsNullOrEmpty(t.CheckedBy));
            return new Stats()
            {
                Checked = Convert.ToInt32(transChecked),
                TotalTranslations = tot,
                Translated = Convert.ToInt32(translated),
                CheckedPercent = (transChecked/tot)*100,
                TranslationsPercent = (translated/tot)*100
            };            
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
                if(translation.TransBy != null)phrase.TransDate = DateTime.Now;
                phrase.BlockedBy = null;
                phrase.BlockedTime = null;
                phrase.CheckedBy = translation.CheckedBy;
                if(translation.CheckedBy != null) phrase.CheckedTime = DateTime.Now;
                phrase.EditedBy = translation.EditedBy;
                if(translation.EditedBy != null) phrase.EditedTime = DateTime.Now;
                phrase.Comment = translation.Comment;
            }
            _repo.Update(phrase);
            _repo.SaveChanges();
        }

        public IEnumerable<Translation> SearchByWord(string words)
        {
            var Translations =
                _repo.GetAll().Where(t => t.Text.ToLower().Contains(words.ToLower()) && !string.IsNullOrEmpty(t.Spanish))
                .Take(50)
                .ToList();
            return Translations;
        }

        public IEnumerable<Translation> GetUnchecked()
        {
            return _repo.GetAll()
                .Where(t => String.IsNullOrEmpty(t.CheckedBy))
                .Take(20);
        }    
    }
}
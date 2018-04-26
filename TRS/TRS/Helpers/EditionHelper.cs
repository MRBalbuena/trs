using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using TRS.Repository;

namespace TRS.Helpers
{
    public static class EditionHelper
    {
        private static List<string> editions = new List<string>();

        public static List<string> GetVersions(TransRepository repo)
        {
            if(editions.Count == 0) {
                editions = repo.GetAll().Select(t => t.Edition).Distinct().OrderByDescending(e => e).ToList();
                editions.Add("All");
            }
            return editions;
        }
    }
}
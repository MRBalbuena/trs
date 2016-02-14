using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace TRS.Models
{
    public class Stats
    {
        public int TotalTranslations { get; set; }
        public int Translated { get; set; }
        public int Checked { get; set; }
        public double TranslationsPercent { get; set; }
        public double CheckedPercent { get; set; }
    }
}
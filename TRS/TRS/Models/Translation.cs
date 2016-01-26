using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Security.AccessControl;
using System.Web;

namespace TRS.Models
{
    public class Translation
    {
        [Key]
        public int TransId { get; set; }
        [Required]
        [StringLength(200)]
        public string TransKey { get; set; }
        [Required]
        [StringLength(1000)]
        public string Text { get; set; }
        public string Spanish { get; set; }
        public string BlockedBy { get; set; }
        public TimeSpan BlockedTime { get; set; }
        public string TransBy { get; set; }
        public DateTime TransDate { get; set; }
        public string CheckedBy { get; set; }
        public DateTime CheckedTime { get; set; }
        public string RejectedBy { get; set; }
        public DateTime RejectedTime { get; set; }
    }
}
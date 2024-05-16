using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace UrlShortenerAPI.Models.Model
{
    public class UrlEntity: DbItem
    {
        public string Url { get; set; } = null!;
        public string ShortUrl { get; set; } = null!;
        public DateTime CreatedAt { get; set; }
        public string UserId { get; set; } = null!;
        public UserEntity User { get; set; } = null!;
    }
}

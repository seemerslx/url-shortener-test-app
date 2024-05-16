using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace UrlShortenerAPI.Models.Interface 
{
    public interface IRegisterCredentionals: IUserCredentionals
    {
        public string Username {get; set; }
    }
}

using PYBS.Entity.Abstract;
using System;
using System.Collections.Generic;
using System.Text;

namespace PYBS.Entity.Token
{
    public class JwtAccessToken : IToken
    {
        public string Token { get; set; }
    }
}

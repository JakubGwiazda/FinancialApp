﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AuthorizationService.Application.Interfaces
{
    public interface ITokenGenerator
    {
        string GenerateJwtToken(string user); 
    }
}

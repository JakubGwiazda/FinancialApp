using FluentResults;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AuthorizationService.Application.Commands
{
    public class LogUserCmd : IRequest<Result>
    {
        public string User { get; set; }
        public string Password { get; set; }
    }
    internal class LogUserHandler : IRequestHandler<LogUserCmd, Result>
    {
        public Task<Result> Handle(LogUserCmd request, CancellationToken cancellationToken)
        {
            throw new NotImplementedException();
        }
    }
}

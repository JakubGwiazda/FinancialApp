using FinancialApp.Application.Interfaces;
using FinancialApp.Domain;
using FluentResults;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FinancialApp.Application.Commands
{

    public class LoginUserCmd : IRequest<Result>
    {
        public string User { get; set; }
        public string Password { get; set; }

        public class LoginUserHandler : IRequestHandler<LoginUserCmd, Result>
        {
            private IUsersRepository _usersRepository;
            public LoginUserHandler(IUsersRepository usersRepository)
            {
                this._usersRepository = usersRepository;
            }

            public async Task<Result> Handle(LoginUserCmd cmd, CancellationToken cancellationToken)
            {
                var user = await _usersRepository.GetRecord<Users>(p => p.Name.Equals(cmd.User) && p.Password.Equals(cmd.Password));

                if (user != null)
                {
                    return Result.Ok();
                }
                else
                {
                    return Result.Fail("Wrong user name or password");

                }
            }
        }
    }
}

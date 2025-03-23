using FinancialApp.Application.Interfaces;
using FinancialApp.Domain;
using FluentResults;
using MediatR;

namespace FinancialApp.Application.Commands
{
    public class AddUserCmd : IRequest<Result>
    {
        public string Name { get; set; }
        public string Password { get; set; }
    }

    public class AddUserHandler : IRequestHandler<AddUserCmd, Result>
    {
        private IUsersRepository _usersRepository;
        public AddUserHandler(IUsersRepository usersRepository)
        {
            this._usersRepository = usersRepository;
        }

        public async Task<Result> Handle(AddUserCmd cmd, CancellationToken cancellationToken)
        {
            await _usersRepository.AddNewRecord(new Users()
            {
                Name = cmd.Name,
                Password = cmd.Password,
                CreationDate = DateTime.UtcNow
            });

            return Result.Ok();
        }
    }
}

using AuthorizationService.Application.Interfaces;
using AuthorizationService.Domain;
using FluentResults;
using MediatR;
using Microsoft.Extensions.Configuration;

namespace AuthorizationService.Application.Commands
{
    public class RegisterUserCmd : IRequest<Result>
    {
        public string Name { get; set; }
        public string Password { get; set; }
    }

    public class RegisterUserHandler : IRequestHandler<RegisterUserCmd, Result>
    {
        private IUserRepository _repository;
        private IConfiguration _configuration;
        private IPasswordManager _passwordManager;
        private ITokenGenerator _tokenGenerator;

        public RegisterUserHandler(IUserRepository userRepository, IConfiguration configuration, IPasswordManager passwordManager, ITokenGenerator tokenGenerator)
        {
            _repository = userRepository;
            _configuration = configuration;
            _passwordManager = passwordManager;
            _tokenGenerator = tokenGenerator;
        }

        public async Task<Result> Handle(RegisterUserCmd cmd, CancellationToken cancellationToken)
        {
            var user = await _repository.GetRecord<Users>(p => p.User == cmd.Name);

            if(user != null)
            {
                return Result.Fail("User about given name exists.");
            }

            var hashedPassword = this._passwordManager.HashPassword(cmd.Password);

            await _repository.AddNewRecord(new Users() { User = cmd.Name, Password = hashedPassword, CreationDate = DateTime.UtcNow });
            await _repository.SaveChangesAsync();

            return Result.Ok();
        }
    }
}

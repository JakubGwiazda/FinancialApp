using AuthorizationService.Application.Interfaces;
using AuthorizationService.Domain;
using FluentResults;
using MediatR;

namespace AuthorizationService.Application.Commands
{
    public class RegisterUserCmd : IRequest<Result>
    {
        public string Name { get; set; }
        public string Password { get; set; }
    }

    internal class RegisterUserHandler : IRequestHandler<RegisterUserCmd, Result>
    {
        private IUserRepository _repository;
        private ITokenGenerator _tokenGenerator;
        public RegisterUserHandler(IUserRepository userRepository, ITokenGenerator tokenGenerator)
        {
            _repository = userRepository;
            _tokenGenerator = tokenGenerator;
        }

        public async Task<Result> Handle(RegisterUserCmd cmd, CancellationToken cancellationToken)
        {
            var token = _tokenGenerator.GenerateJwtToken(cmd.Name);
            await _repository.AddNewRecord(new Users() { User = cmd.Name, Password = cmd.Password, Token = token, CreationDate = DateTime.UtcNow });
            await _repository.SaveChangesAsync();
            throw new NotImplementedException();
        }
    }
}

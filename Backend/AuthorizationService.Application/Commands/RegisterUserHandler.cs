using AuthorizationService.Application.Interfaces;
using AuthorizationService.Domain;
using FluentResults;
using MediatR;
using Microsoft.Extensions.Configuration;

namespace AuthorizationService.Application.Commands
{
    public class RegisterUserCmd : IRequest<Result<string>>
    {
        public string Name { get; set; }
        public string Password { get; set; }
    }

    public class RegisterUserHandler : IRequestHandler<RegisterUserCmd, Result<string>>
    {
        private IUserRepository _repository;
        private ITokenGenerator _tokenGenerator;
        private IConfiguration _configuration;
        public RegisterUserHandler(IUserRepository userRepository, ITokenGenerator tokenGenerator, IConfiguration configuration)
        {
            _repository = userRepository;
            _tokenGenerator = tokenGenerator;
            _configuration = configuration;
        }

        public async Task<Result<string>> Handle(RegisterUserCmd cmd, CancellationToken cancellationToken)
        {
            var jwtSettings = _configuration.GetSection("Jwt");
            var expirationDate = DateTime.UtcNow.AddMinutes(Convert.ToDouble(jwtSettings["ExpiryMinutes"]));

            var token = _tokenGenerator.GenerateJwtToken(cmd.Name);
            await _repository.AddNewRecord(new Users() { User = cmd.Name, Password = cmd.Password, Token = token.token, CreationDate = DateTime.UtcNow, TokenExpirationDate = expirationDate });
            await _repository.SaveChangesAsync();

            return Result.Ok(token.token);
        }
    }
}

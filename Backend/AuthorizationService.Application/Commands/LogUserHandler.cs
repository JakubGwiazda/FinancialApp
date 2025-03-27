using AuthorizationService.Application.Interfaces;
using AuthorizationService.Domain;
using FluentResults;
using MediatR;

namespace AuthorizationService.Application.Commands
{
    public class LogUserCmd : IRequest<Result<string>>
    {
        public string User { get; set; }
        public string Password { get; set; }
    }
    internal class LogUserHandler : IRequestHandler<LogUserCmd, Result<string>>
    {
        private IUserRepository _userRepository;
        private ITokenGenerator _tokenGenerator;

        public LogUserHandler(IUserRepository userRepository, ITokenGenerator tokenGenerator)
        {
            _userRepository = userRepository;
            _tokenGenerator = tokenGenerator;
        }

        public async Task<Result<string>> Handle(LogUserCmd request, CancellationToken cancellationToken)
        {
            var user = await _userRepository.GetRecord<Users>(p => p.User == request.User && p.User == request.Password);

            if (user != null)
            {
                var token = _tokenGenerator.GenerateJwtToken(user.User);
                user.TokenExpirationDate = token.expirationDate;
                user.Token = token.token;
                await _userRepository.SaveChangesAsync();

                return Result.Ok(token.token);
            }

            return Result.Fail("Wrong user name or password");
        }
    }
}
